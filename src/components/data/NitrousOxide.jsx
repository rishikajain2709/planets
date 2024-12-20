import { useState, useEffect, useRef } from 'react';
import { fetchNitrousOxide, fetchData } from "../../client API/fetchData";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Chart } from 'chart.js';

export default function NitrousOxide() {
    const [recentNo, setRecentNo] = useState(null);
    const [noData, setNoData] = useState([]);
    const chartRef = useRef(null);
    
    const monthsMap = {
        '1': 'January',
        '2': 'February',
        '3': 'March',
        '4': 'April',
        '5': 'May',
        '6': 'June',
        '7': 'July',
        '8': 'August',
        '9': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
    }

    useEffect(() => {
        const fetchApiData = async() => {
            try{
                const {recentData} = await fetchData();
                setRecentNo(recentData.nitrousOxide);
                const noData = await fetchNitrousOxide();
                setNoData(noData);
            } catch(error){
                console.log('Error during fetching NO data:', error)
            }
        }
        fetchApiData();
    }, []);

    const getYearMonth = (data) => {
        const year = data.date.split('.')[0];
        const monthCode = data.date.split('.')[1];
        const month = monthsMap[monthCode];
        return {year, month}
    }

    useEffect(() => {
        if(noData.length > 0){
            const aggregatedData = {};
            noData.forEach(item => {
              const year = item.date.split('.')[0];
              if (!aggregatedData[year]) {
              aggregatedData[year] = [];
              }
              aggregatedData[year].push(parseFloat(item.trend));
            });

            const averageData = Object.keys(aggregatedData).map(year => {
                const average = aggregatedData[year].reduce((acc, curr) => acc + curr, 0) / aggregatedData[year].length;
                return { year, average };
            });
  
            const labels = averageData.map(item => item.year);
            const values = averageData.map(item => item.average);
  
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const ctx = document.getElementById('noChart').getContext('2d');
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: labels,
                  datasets: [{
                    label: 'Nitrous oxide level',
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
                        color: 'rgba(250, 250, 250)'
                      }
                    },
                    y: {
                      beginAtZero: false,
                      stepSize: 3,
                      display: true,
                      title: {
                        display: true,
                        text: 'NO mole fraction (ppb)',
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
                        color: 'rgba(250, 250, 250'
                      }
                    }
                  }
                }
            })
        }
    }, [noData]);
    
    return (
    <>
        <div className='h-[400px] row-span-2 order-1 md:order-none'>
            <canvas id="noChart" className='h-fit'></canvas>
        </div>

        <div className='flex flex-col items-center justify-center text-sm encode-sans mt-4 md:mt-0'>Last recent value:
        {recentNo ? (
            <div className='h-[100px] flex flex-col justify-center items-center text-xl anta-regular blink'>
            <span>{getYearMonth(recentNo).month}, {getYearMonth(recentNo).year}:</span>
            <span>{recentNo.trend} ppb</span>
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
    </>
  )
}
