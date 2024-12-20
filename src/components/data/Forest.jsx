import { useState, useEffect, useRef} from 'react'
import { fetchData } from '../../client API/fetchData';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Chart } from 'chart.js';

export default function Forest() {
    const [forest, setForest] = useState(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchApiData = async() => {
            try{
                const {recentData} = await fetchData();

                const forestData = recentData.forest;
                const filteredData = forestData.filter(item => item['wb:value'] && item['wb:value']['#text']);

                const years = filteredData.map(item => item['wb:date']['#text']);
                const values = filteredData.map(item => item['wb:value']['#text']);

                const latestItem = filteredData.reduce((prev, current) => {
                    const prevYear = parseInt(prev['wb:date']['#text']);
                    const currentYear = parseInt(current['wb:date']['#text']);
                    return prevYear > currentYear ? prev : current;
                })

                const latestYear = latestItem['wb:date']['#text'];
                const latestValue = latestItem['wb:value']['#text'];

                setForest({ year: latestYear, value: latestValue });
    
                buildChart(years.reverse(), values.reverse());
                
            } catch(error) {
                console.log('Error during fetching forest data:', error)
            }
        }
        fetchApiData();
    }, []);
    

    const formatForestValue = (value) => {
        const roundedValue = Number.parseFloat(value).toFixed(2);
        const [integer] = roundedValue.split('.');
        const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        const roundedInteger = Number.parseFloat(formattedInteger).toFixed(2);
        return roundedInteger;
    }

    const buildChart = (years, values) => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        const ctx = document.getElementById('forestChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'line',
                data: {
                labels: years,
                datasets: [{
                    label: 'Global forest area',
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
                        text: 'km²',
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


    return (
    <>
    <div className='flex flex-col items-center justify-center text-sm encode-sans col-span-1 mt-4 md:mt-0'>Last recent value:
        {forest ? (
            <div className='h-[100px] flex flex-col justify-center items-center text-xl anta-regular blink'>
            <span>{forest.year}:</span>
            <span>{formatForestValue(forest.value)} million km<sup>2</sup></span>
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

    <div className='h-[400px] md:col-span-2'>
        <canvas id="forestChart" className='h-fit'></canvas>
    </div>
    </>
    )
}
