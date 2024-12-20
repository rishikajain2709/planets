/* eslint-disable react/prop-types */
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function ForecastChart( {ozoneForecast, pm10Forecast, pm25Forecast} ) {
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        return daysOfWeek[date.getDay()];
    };

    const chartOzoneData = {
        labels: ozoneForecast.map(dayData => getDayOfWeek(dayData.day)),
        datasets: [
            {
                type: 'line',
                label: 'Min',
                data: ozoneForecast.map(dayData => dayData.min),
                backgroundColor: '#ff00c1',
                borderColor: '#ff00c1',
                borderWidth: 2,
                fill: false,
                pointRadius: 2,
                tension: 0
            },
            {
                type: 'line',
                label: 'Max',
                data: ozoneForecast.map(dayData => dayData.max),
                backgroundColor: '#00ffe2',
                borderColor: '#00ffe2',
                borderWidth: 2,
                fill: false,
                pointRadius: 2,
                tension: 0
            },
            {
                type: 'bar',
                label: 'Average',
                data: ozoneForecast.map(dayData => dayData.avg),
                backgroundColor: '#fafafa',
                borderWidth: 0,
            }
        ]
    };
    const optionsOzone = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#fafafa',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 12,
                    },
                }
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        const index = context[0].dataIndex;
                        const date = ozoneForecast[index].day;
                        return date;
                    }
                },
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    color: '#fafafa',
                    text: 'Weekdays',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 11,
                        lineHeight: 1,
                    },
                },
                ticks: {
                    color: '#fafafa',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 11,
                        lineHeight: 1,
                    },
                },
                grid: {color: '#fafafa20'}
            },
            y: {
                title: {
                    display: false,
                    color: '#fafafa',
                    text: 'Ozone level',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 11,
                        lineHeight: 1,
                    },
                },
                ticks: {
                    color: '#fafafa',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 11,
                        lineHeight: 1,
                    },
                },
                grid: {color: '#fafafa20'}
            }
        }
    };


    const chartPm10Data = {
        labels: pm10Forecast.map(dayData => getDayOfWeek(dayData.day)),
        datasets: [
            {
                type: 'line',
                label: 'Min',
                data: pm10Forecast.map(dayData => dayData.min),
                backgroundColor: '#ff00c1',
                borderColor: '#ff00c1',
                borderWidth: 2,
                fill: false,
                pointRadius: 2,
                tension: 0
            },
            {
                type: 'line',
                label: 'Max',
                data: pm10Forecast.map(dayData => dayData.max),
                backgroundColor: '#00ffe2',
                borderColor: '#00ffe2',
                borderWidth: 2,
                fill: false,
                pointRadius: 2,
                tension: 0
            },
            {
                type: 'bar',
                label: 'Average',
                data: pm10Forecast.map(dayData => dayData.avg),
                backgroundColor: '#fafafa',
                borderWidth: 0,
            }
        ]
    };
    const optionsPm10 = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#fafafa',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 12,
                    },
                }
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        const index = context[0].dataIndex;
                        const date = pm10Forecast[index].day;
                        return date;
                    }
                },
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    color: '#fafafa',
                    text: 'Weekdays',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 11,
                        lineHeight: 1,
                    },
                },
                ticks: {
                    color: '#fafafa',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 11,
                        lineHeight: 1,
                    },
                },
                grid: {color: '#fafafa20'}
            },
            y: {
                title: {
                    display: false,
                    color: '#fafafa',
                    text: 'PM₁₀ level',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 11,
                        lineHeight: 1,
                    },
                },
                ticks: {
                    color: '#fafafa',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 11,
                        lineHeight: 1,
                    },
                },
                grid: {color: '#fafafa20'}
            }
        }
    };


    const chartPm25Data = {
        labels: pm25Forecast.map(dayData => getDayOfWeek(dayData.day)),
        datasets: [
            {
                type: 'line',
                label: 'Min',
                data: pm25Forecast.map(dayData => dayData.min),
                backgroundColor: '#ff00c1',
                borderColor: '#ff00c1',
                borderWidth: 2,
                fill: false,
                pointRadius: 2,
                tension: 0
            },
            {
                type: 'line',
                label: 'Max',
                data: pm25Forecast.map(dayData => dayData.max),
                backgroundColor: '#00ffe2',
                borderColor: '#00ffe2',
                borderWidth: 2,
                fill: false,
                pointRadius: 2,
                tension: 0
            },
            {
                type: 'bar',
                label: 'Average',
                data: pm25Forecast.map(dayData => dayData.avg),
                backgroundColor: '#fafafa',
                borderWidth: 0,
            }
        ]
    };
    const optionsPm25 = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#fafafa',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 12,
                    },
                }
            },
            tooltip: {
                callbacks: {
                    title: function(context) {
                        const index = context[0].dataIndex;
                        const date = pm25Forecast[index].day;
                        return date;
                    }
                },
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    color: '#fafafa',
                    text: 'Weekdays',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 11,
                        lineHeight: 1,
                    },
                },
                ticks: {
                    color: '#fafafa',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 11,
                        lineHeight: 1,
                    },
                },
                grid: {color: '#fafafa20'}
            },
            y: {
                title: {
                    display: false,
                    color: '#fafafa',
                    text: 'PM₁₀ level',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 11,
                        lineHeight: 1,
                    },
                },
                ticks: {
                    color: '#fafafa',
                    font: {
                        family: ' "Encode Sans Expanded", sans-serif ',
                        size: 11,
                        lineHeight: 1,
                    },
                },
                grid: {color: '#fafafa20'}
            }
        }
    };


    return (
    <> 
        <div className='flex flex-col mt-10 md:mt-0 lg:ml-12 w-full'>      
            <h4 className='encode-sans text-base'>Daily forecast</h4>

            <div className='grid grid-cols-1 xl:grid-cols-2 gap-12'>

                <div className='mt-6'>
                    <p className='text-sm'>• Ozone - O<sub>3</sub></p>
                    <Bar data={chartOzoneData} options={optionsOzone}/>
                </div>
                <div className='my-6'>
                    <p className='text-sm'>• PM<sub>10</sub></p>
                    <Bar data={chartPm10Data} options={optionsPm10}/>
                </div>
                <div className='my-6'>
                    <p className='text-sm'>• PM<sub>2,5</sub></p>
                    <Bar data={chartPm25Data} options={optionsPm25}/>
                </div>
                
            </div>
        </div>
    </>
  )
}
