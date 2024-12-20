import { useState, useEffect, useRef } from "react"
import { fetchCarbonDioxide, fetchData } from "../../client API/fetchData";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Chart from 'chart.js/auto';




export default function CarbonDioxide() {
    const [recentCo2, setRecentCo2] = useState(null);
    const [co2Data, setCo2Data] = useState([]);
    const chartRef = useRef(null);
   
    const monthsMap = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    }

    useEffect(() => {
        const fetchApiData = async() => {
            try {
                const {recentData} = await fetchData();
                setRecentCo2(recentData.carbonDioxide);
                const co2Data = await fetchCarbonDioxide();
                setCo2Data(co2Data);
            }catch(error){
                console.log('Error during fetching CO2 data:', error)
            }
        }
        fetchApiData()
    }, []);

    const getMonthName = (monthNumber) => {
        return monthsMap[monthNumber];
    };

    useEffect(() => {
        if(co2Data.length > 0){
            //valori annuali
            const yearlyData = co2Data.reduce((acc, curr) => {
            const year = curr.year;
            if (!acc[year]) {
                acc[year] = {
                    count: 1,
                    totalTrend: parseFloat(curr.trend)
                };
            } else {
                acc[year].count++;
                acc[year].totalTrend += parseFloat(curr.trend);
            }
            return acc;
            }, {});

            const averageData = Object.keys(yearlyData).map(year => {
                return {
                    year: year,
                    averageTrend: (yearlyData[year].totalTrend / yearlyData[year].count).toFixed(2)
                };
            });

            const labels = averageData.map(item => item.year);
            const values = averageData.map(item => item.averageTrend);

            //valori mensili
            /*const monthlyData = co2Data.reduce((acc, curr) => {
              const year = curr.year;
              const month = curr.month;
              const trend = parseFloat(curr.trend);

              if(!acc[year]){
                acc[year] = {}
              }
              if(!acc[year][month]){
                acc[year][month] ={
                  count: 1,
                  totalTrend: trend
                }
              } else {
                acc[year][month].count++;
                acc[year][month].totalTrend += trend;
              }

              return acc;
            }, {});

            const averageMonthlyData = Object.keys(monthlyData).flatMap(year => {
              return Object.keys(monthlyData[year]).map(month => {
                  const count = monthlyData[year][month].count;
                  const totalTrend = monthlyData[year][month].totalTrend;
                  const averageTrend = (totalTrend / count).toFixed(2);
                  return {
                      label: `${monthsMap[parseInt(month)]} ${year}`,
                      value: averageTrend
                  };
              });
            });

            const labels = averageMonthlyData.map(item => item.label);
            const values = averageMonthlyData.map(item => item.value);*/
            
            //valori giornalieri
            //const labels = co2Data.map(item => `${item.year}-${item.month}`);
            //const values = co2Data.map(item => item.trend);
            
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const ctx = document.getElementById('co2Chart').getContext('2d');            
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: labels,
                  datasets: [{
                    label: 'Carbon dioxide level',
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
                        text: 'Part Per Million (ppm)',
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
                        color: 'rgba(250, 250, 250)'
                      }
                    }
                  }
                }
              })
            }
    }, [co2Data])

    return (
    <>
      <div className='h-[400px] row-span-2 order-1 md:order-none'>
          <canvas id="co2Chart" className='h-fit'></canvas>
      </div>
      
      <div className='flex flex-col items-center justify-center text-sm encode-sans mt-4 md:mt-0'>Last recent value:
      {recentCo2 ? (
          <div className='h-[100px] flex flex-col justify-center items-center text-xl anta-regular blink'>
              <span>{getMonthName(recentCo2.month)}, {recentCo2.year}:</span>
              <span>{recentCo2.trend} ppm</span>
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
