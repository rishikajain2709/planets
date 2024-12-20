import { useState, useEffect, useRef } from 'react';
import { fetchMethane, fetchData } from "../../client API/fetchData";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Chart } from 'chart.js';


export default function Methane() {
    const [recentCh4, setRecentCh4] = useState(null);
    const [ch4Data, setCh4Data] = useState([]);
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
            try {
                const {recentData} = await fetchData();
                setRecentCh4(recentData.methane);
                const ch4Data = await fetchMethane();
                setCh4Data(ch4Data);
                
            }catch(error){
                console.log('Error during fetching CH4 data:', error)
            }
        }
        fetchApiData()
    }, []);

    const getYearMonth = (data) => {
        const year = data.date.split('.')[0];
        const monthCode = data.date.split('.')[1];
        const month = monthsMap[monthCode];
        return {year, month}
    }
    
    useEffect(() => {
        if(ch4Data.length > 0){
            const aggregatedData = {};
            ch4Data.forEach(item => {
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

            const ctx = document.getElementById('ch4Chart').getContext('2d');
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: labels,
                  datasets: [{
                    label: 'Methane level',
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
                        text: 'Part Per Billion (ppb)',
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
    }, [ch4Data])
    
    return (
    <>
        <div className='h-[400px] row-span-2 order-1 md:order-none'>
            <canvas id="ch4Chart" className='h-fit'></canvas>
        </div>

        <div className='flex flex-col items-center justify-center text-sm encode-sans mt-4 md:mt-0'>Last recent value:
        {recentCh4 ? (
            <div className='h-[100px] flex flex-col justify-center items-center text-xl anta-regular blink'>
            <span>{getYearMonth(recentCh4).month}, {getYearMonth(recentCh4).year}:</span>
            <span>{recentCh4.trend} ppb</span>
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
