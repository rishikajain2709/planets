import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';

export default function Temperature() {
    const [temperatureData, setTemperatureData] = useState([]);
    const chartRef = useRef(null);
    const [recentTemperature, setRecentTemperature] = useState(null);
    

    useEffect(() => {
      const fetchTemperatureData = async() => {
        try{
          const response = await axios.get('https://global-warming.org/api/temperature-api')
          setTemperatureData(response.data.result)

          if (response.data.result.length > 0){
            const latestData = response.data.result[response.data.result.length - 1];
            const year = latestData.time.split('.')[0];
            const monthCode = latestData.time.split('.')[1];

            const monthsMap = {
              '04': 'January',
              '13': 'February',
              '21': 'March',
              '29': 'April',
              '38': 'May',
              '46': 'June',
              '54': 'July',
              '63': 'August',
              '71': 'September',
              '79': 'October',
              '88': 'November',
              '96': 'December',
            }
            const month = monthsMap[monthCode];

            setRecentTemperature({
              year,
              month,
              station: latestData.station
            });
          } else {
            console.log('Error in fetching last value.')
          }
        } catch(error){
          console.log('Error in fetching temperature data:', error)
        }
      }
      fetchTemperatureData();
    }, [])


    useEffect(() => {
      if(temperatureData.length > 0){
        //creazione di un oggetto per raccogliere i valori station per ogni anno
        const aggregatedData = {};
        temperatureData.forEach(item => {
          const year = item.time.split('.')[0];
          if (!aggregatedData[year]) {
            aggregatedData[year] = [];
          }
          aggregatedData[year].push(parseFloat(item.station));
        });
        //calcolo della media dei valori station per ogni anno
        const averageData = Object.keys(aggregatedData).map(year => {
          const average = aggregatedData[year].reduce((acc, curr) => acc + curr, 0) / aggregatedData[year].length;
          return { year, average };
        });
        
        const labels = averageData.map(item => item.year);
        const values = averageData.map(item => item.average);

        if (chartRef.current) {
          chartRef.current.destroy();
        }

        const ctx = document.getElementById('temperatureChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Average global temperature anomalies',
              data: values,
              backgroundColor: 'rgba(220, 38, 38, 0.7)',
              borderColor: 'rgba(220, 38, 38, 1)',
              borderWidth: 1,
              pointBackgroundColor: 'rgba(220, 38, 38, 0.7)',
              pointRadius: 2,
            }]
          },
          options: {
            plugins: {
              tooltip: {
                enabled: true,
              },
              legend: {
                labels: {
                  font: {
                      family: ' "Encode Sans Expanded", sans-serif ',
                      size: 12,
                  },
                  color: 'rgba(250, 250, 250, 1)'
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Year',
                  color: 'rgba(250, 250, 250, 1)',
                  font: {
                    family: ' "Encode Sans Expanded", sans-serif ',
                    size: 11,
                    lineHeight: 1,
                  },
                },
                grid: {
                  color: 'rgba(250, 250, 250, 0.2)'
                },
                ticks: {
                  color: 'rgba(250, 250, 250, 1)'
                }
              },
              y: {
                beginAtZero: false,
                stepSize: 3,
                display: true,
                title: {
                  display: true,
                  text: 'Temperature Anomaly (°C)',
                  color: 'rgba(250, 250, 250, 1)',
                  font: {
                    family: ' "Encode Sans Expanded", sans-serif ',
                    size: 11,
                    lineHeight: 1
                  },
                },
                grid: {
                  color: 'rgba(250, 250, 250, 0.2)'
                },
                ticks: {
                  color: 'rgba(250, 250, 250, 1)'
                }
              }
            }
          }
        })
      }
    }, [temperatureData]);
    
    return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center md:mb-4">
          <p className='encode-sans text-sm text-justify'>This chart shows global temperature anomalies from year 1880 to present.
          For each year an average of the global temperature was calculated starting from the temperatures recorded for each month.
          The temperature is measured in Celsius and datasets are processed by GISTEMP (GISS Surface Temperature Analysis),
          at NASA Goddard Institute for Space Studies.
          </p>
          <div className='flex flex-col items-center justify-center my-12'>Last recent value:
            {recentTemperature ? (
              <div className='h-[100px] flex flex-col justify-center items-center text-xl anta-regular blink'>
                <span>{recentTemperature.month}, {recentTemperature.year}:</span>
                <span>{recentTemperature.station} °C</span>
              </div>
            ) : (
              <div className='my-4'>
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                  <CircularProgress sx={{color: 'rgb(250,250,250, .6)'}} size={26}/>
                </Box>
                <p className='text-xs text-center text-white/60'>No data available now.<br/>Please wait for loading...</p>
              </div>
            )}
          </div>
        </div>

        <div className='h-[400px]'>
          <canvas id="temperatureChart" className='h-fit'></canvas>
        </div>
      </div>
    </>
  )
}
