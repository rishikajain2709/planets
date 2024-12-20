import { useState, useEffect, useRef } from 'react';
import { fetchOcean, fetchData } from "../../client API/fetchData";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Chart } from 'chart.js';


export default function Ocean() {
    const [recentOcean, setRecentOcean] = useState(null);
    const [oceanData, setOceanData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchApiData = async() => {
            try{
                const {recentData} = await fetchData();            
                const oceanData = await fetchOcean();
                setOceanData(oceanData);

                const years = Object.keys(oceanData);
                const values = Object.values(oceanData);
                
                const lastYear = years[years.length - 1];
                const lastValue = recentData.ocean;

                setRecentOcean({year: lastYear, value: lastValue});

                buildChart(years, values);
            } catch(error){
                console.log('Error during fetching ocean data:', error)
            }
        }
        fetchApiData()
    }, []);

    const buildChart = (years, values) => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('oceanChart').getContext('2d');
            chartRef.current = new Chart(ctx, {
            type: 'line',
                data: {
                labels: years,
                datasets: [{
                    label: 'Global Ocean Temperature Anomalies',
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
                        text: 'Degrees Celsius',
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
        {recentOcean ? (
            <div className='h-[100px] flex flex-col justify-center items-center text-xl anta-regular blink'>
            <span>{recentOcean.year}:</span>
            <span>{recentOcean.value} °C</span>
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
        <canvas id="oceanChart" className='h-fit'></canvas>
    </div>
    </>
  )
}
