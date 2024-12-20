import { useState, useEffect, useRef } from 'react';
import { fetchIce, fetchData } from "../../client API/fetchData";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Chart } from 'chart.js';


export default function Ice() {
    const [recentIce, setRecentIce] = useState(null);
    const [iceData, setIceData] = useState([]);
    const chartRef = useRef(null);
    
    const monthsMap = {
        '01' : 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
    }

    useEffect(() => {
        const fetchApiData = async() => {
            try{
                const {recentData} = await fetchData();
                //setRecentIce(recentData.ice);
                const iceData = await fetchIce();
                
                // rimozione di questi due dati perchè hanno un'anomalia
                delete iceData['198712'];
                delete iceData['198801'];
                
                const allDataKeys = Object.keys(iceData);
                const mostRecentDate = allDataKeys[allDataKeys.length - 1];
                const year = mostRecentDate.substring(0, 4);
                const month = mostRecentDate.substring(4);
                const monthString = monthsMap[month];
                const value = recentData.ice.value;

                setRecentIce({ year, month: monthString, value });

                // dati aggregati: media dei valori mensili per ogni anno
                const aggregatedData = {};
                for (const key in iceData) {
                  if (Object.hasOwnProperty.call(iceData, key)) {
                    const year = key.substring(0, 4);
                    const month = key.substring(4);
                    const value = iceData[key].value;

                    if (!aggregatedData[year]) {
                      aggregatedData[year] = { totalValue: 0, count: 0, month: month};
                    }

                    aggregatedData[year].totalValue += parseFloat(value);
                    aggregatedData[year].count++;
                    aggregatedData[year].month = month;
                  }
                }
                const processedIceData = [];
                for (const year in aggregatedData) {
                  if (Object.hasOwnProperty.call(aggregatedData, year)) {
                    const averageValue = aggregatedData[year].totalValue / aggregatedData[year].count;
                    const month = aggregatedData[year].month;
                    processedIceData.push({ year, month, value: averageValue });
                  }
                }

                // per avere i dati completi di mese e anno:
                /*const processedIceData = [];
                for (const key in iceData) {
                    //utilizzo del metodo hasOwnProperty di Object su un oggetto specificato
                    if (Object.hasOwnProperty.call(iceData, key)) {
                      const year = key.substring(0, 4); 
                      const month = key.substring(4);
                      const value = iceData[key].value;

                      processedIceData.push({ year, month, value });
                    }
                }*/
             
                // calcolo del valore più recente
                /*if (processedIceData.length > 0){
                    const latestData = processedIceData[processedIceData.length - 1];
                    latestData.month = monthsMap[latestData.month];
                    setRecentIce(latestData)
                    
                  } else {
                    console.log('Error in fetching last value.')
                }*/

                setIceData(processedIceData);
            }catch(error){
                console.log('Error during fetching ice data:', error)
            }
        }
        fetchApiData();
    }, []);


    useEffect(() => {
        if (iceData.length > 0){
            // dati completi di mese e anno:
            /*const labels = iceData.map(item => `${item.year}-${item.month}`);
            const values = iceData.map(item => item.value);*/

            const labels = iceData.map((item) => item.year);
            const values = iceData.map((item) => item.value);

            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const ctx = document.getElementById('iceChart').getContext('2d');
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: labels,
                  datasets: [{
                    label: 'Global Sea Ice Extent',
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
                        text: 'Million km²',
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
    }, [iceData])

    

    return (
    <>
        <div className='flex flex-col items-center justify-center text-sm encode-sans col-span-1 mt-4 md:mt-0'>Last recent value:
        {recentIce ? (
            <div className='h-[100px] flex flex-col justify-center items-center text-xl anta-regular blink'>
            <span>{recentIce.month}, {recentIce.year}:</span>
            <span>{recentIce.value} million km<sup>2</sup></span>
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
            <canvas id="iceChart" className='h-fit'></canvas>
        </div>
    </>
  )
}
