/* eslint-disable no-undef */
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Header from '../../header/Header';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import { styled } from '@mui/system';
import ForecastChart from './ForecastChart';
import AirTables from './AirTables';



export default function LocationSearched() {
    const apiKey = import.meta.env.VITE_SOME_KEY;
    const [locationData, setLocationData] = useState(null);
    const [optionsLocation, setOptionsLocation] = useState([])
    const { search } = useParams();
    const [loading, setLoading] = useState(true);
    const [datetime, setDatetime] = useState(null);
    


    useEffect(() => {
        const getSearch = async() => {
            setLoading(true);
            setOptionsLocation([]);
            setLocationData(null);
            setDatetime(null);

            try {
                if(search !== ''){
                    const response = await axios.get(`https://api.waqi.info/search/?token=${apiKey}&keyword=${search}`)
                    setOptionsLocation(response.data.data)
                } else {
                    console.log('Location not valid.')
                    setOptionsLocation([]);
                }
            } catch (error) {
              console.error('Error fetching data:', error);
              setOptionsLocation([])
            }finally {
                setLoading(false);
            }
        };
        getSearch();
    }, [search, apiKey])

    const handleClick = async(uid) => {
        setLoading(true);

        try {
            const response = await axios.get(`https://api.waqi.info/feed/@${uid}/?token=${apiKey}`);
            setLocationData(response.data);

            if (response.data?.data?.time?.s) {
                const currentDate = response.data.data.time.s;
                const [date, time] = currentDate.split(' ');
                const shortedTime = time.substring(0, 5);
                setDatetime({ date, time: shortedTime });
            }
        } catch (error) {
            console.error('Something goes wrong:', error);
            setLocationData(null)
        } finally {
            setLoading(false);
        }
    };

    //popper
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
        document.body.style.overflowY = 'auto';
    };
    const handleMouseLeave = () => {
        setOpen(false);
    };
    const handleMouseClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };
    const handleClose = () => {
        setOpen(false)
    };
    const canBeOpen = open && Boolean(anchorEl)
    const id = canBeOpen ? 'table-popper' : undefined

    //tabella popper
    const StyledTableCell = styled(TableCell)({
        '&.green': {
          backgroundColor: '#16a34a',
          color: 'rgb(250, 250, 250)',
        },
        '&.yellow': {
          backgroundColor: '#eab308',
          color: 'rgb(250, 250, 250)',
        },
        '&.orange': {
          backgroundColor: '#ea580c',
          color: 'rgb(250, 250, 250)',
        },
        '&.red': {
          backgroundColor: '#b91c1c',
          color: 'rgb(250, 250, 250)',
        },
        '&.purple': {
          backgroundColor: '#9f1239',
          color: 'rgb(250, 250, 250)',
        },
        '&.violet': {
          backgroundColor: '#4a044e',
          color: 'rgb(250, 250, 250)',
        },
    });

    const rows = [
        { range: '0 - 50', quality: 'Good', className: 'green' },
        { range: '51 - 100', quality: 'Moderate', className: 'yellow' },
        { range: '101 - 150', quality: 'Unhealthy for sensitive groups', className: 'orange' },
        { range: '151 - 200', quality: 'Unhealthy', className: 'red' },
        { range: '201 - 300', quality: 'Very unhealthy', className: 'purple' },
        { range: '301 - 500', quality: 'Hazardous', className: 'violet' }
    ];

    const keyWeatherMappings = {
        t: 'Temperature',
        w: 'Wind',
        h: 'Humidity',
        p: 'Pressure',
        r: 'Rain'
    };

    const keyPollutantMappings = {
        pm10: 'PM₁₀',
        pm25: 'PM₂‚₅',
        so2: 'Sulfur Dioxide',
        no2: 'Nitrous Dioxide',
        co: 'Carbon Monoxide',
        o3: 'Ozone',
    };

    const getMappedPollutant = (pollutant) => {
        return keyPollutantMappings[pollutant] || 'Unknown';
    };
    const dominentPol = locationData?.data?.dominentpol;
    const mappedDominentPol = getMappedPollutant(dominentPol);

    const filteredWeatherKeys = locationData?.data?.iaqi ? Object.keys(locationData.data.iaqi)
        .filter(key => ['t', 'w', 'h', 'p', 'r'].includes(key)) : [];
    const filteredPollutantKeys = locationData?.data?.iaqi ? Object.keys(locationData.data.iaqi)
        .filter(key => ['pm10', 'pm25', 'so2', 'no2', 'co', 'o3'].includes(key)) : [];

    const paramsWeather = filteredWeatherKeys.map(key => keyWeatherMappings[key]);
    const valuesWeather = filteredWeatherKeys.map(key => locationData.data.iaqi[key].v);

    const paramsPollutant = filteredPollutantKeys.map(key => keyPollutantMappings[key]);
    const valuesPollutant = filteredPollutantKeys.map(key => locationData.data.iaqi[key].v);
    
    const getAqiColorClass = (aqi) => {
        if (aqi >= 0 && aqi <= 50) {
          return {bgColorClass: 'bg-green-600', textColorClass: 'text-green-600', message: 'Good'};
        } else if (aqi >= 51 && aqi <= 100) {
          return {bgColorClass: 'bg-yellow-500', textColorClass: 'text-yellow-500', message: 'Moderate'};
        } else if (aqi >= 101 && aqi <= 150) {
          return {bgColorClass: 'bg-orange-600', textColorClass: 'text-orange-600', message: 'Unhealthy for sensitive groups'};
        } else if (aqi >= 151 && aqi <= 200) {
          return {bgColorClass: 'bg-red', textColorClass: 'text-red', message: 'Unhealthy'};
        } else if (aqi >= 201 && aqi <= 300) {
          return {bgColorClass: 'bg-rose-800', textColorClass: 'text-rose-800', message: 'Very unhealthy'} ;
        } else if (aqi >= 301 && aqi <= 500) {
          return {bgColorClass: 'bg-fuchsia-950', textColorClass: 'text-fuchsia-950', message: 'Hazardous'};
        } else {
          return {bgColorClass: 'bg-zinc-50/50', textColorClass: 'text-white', message: ''};
        }
    };

    const getExplanation = (message) => {
        switch (message) {
            case 'Good':
                return 'Air quality is considered satisfactory, and air pollution poses little or no risk. Caution is not necessary.';
            case 'Moderate':
                return 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution. CAUTION: active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.';
            case 'Unhealthy for sensitive groups':
                return 'Members of sensitive groups may experience health effects. The general public is not likely to be affected. CAUTION: active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.';
            case 'Unhealthy':
                return 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects. CAUTION: active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion.';
            case 'Very unhealthy':
                return 'Health warnings of emergency conditions. The entire population is more likely to be affected. CAUTION: active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.';
            case 'Hazardous':
                return 'Health alert: everyone may experience more serious health effects. CAUTION: Everyone should avoid all outdoor exertion.';
            default:
                return 'No data available';
        }
    };
    
    const aqiData = locationData?.data?.aqi;
    const { bgColorClass, textColorClass, message } = getAqiColorClass(aqiData);
    
    //forecast pollutant data
    const ozoneForecast = locationData?.data?.forecast?.daily?.o3 || [];
    const pm10Forecast = locationData?.data?.forecast?.daily?.pm10 || [];
    const pm25Forecast = locationData?.data?.forecast?.daily?.pm25 || [];



    return (
        <>
        <div className='flex flex-col'>
            <Header/>

            <div className='encode-sans py-0 px-8'>
                
                <h2 className='mb-10'>Results for: {search}</h2>

                {locationData && locationData.data ? (
                <div className='flex flex-col lg:flex-row my-6'>
                    <div className='flex flex-col mb-5'>
                        <div className='mb-5 w-fit'>
                            {datetime && datetime.date && datetime.time ? (
                                <p className='text-white/60 text-xs mb-2'>Update {datetime.date} {datetime.time}</p>
                            ) : (
                                <p className='text-white/60 text-xs mb-2'>Date unknown</p>
                            )}
                            <p>Monitoring station: <a href={`https://www.google.com/maps/search/?api=1&query=${locationData.data.city.geo[0]},${locationData.data.city.geo[1]}`}
                                target='_blank' className='hover:underline underline-offset-[5px] decoration-1'>
                                {locationData.data.city.name}</a>
                            </p>
                        </div>
      
                        {aqiData && (
                            <div>
                                AQI:
                                <span className={`p-1 ml-1 cursor-default rounded-sm ${bgColorClass}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleMouseClick}
                                aria-describedby={id}>{aqiData}</span>
                                <span className={`ml-1 ${textColorClass}`}>{message}</span>
                                <p className='glowing-text white-shadow mt-2'>Dominent pollutant: {mappedDominentPol}</p>

                                <Popper
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                placement='bottom-start'
                                disablePortal={false}
                                modifiers={[
                                    {
                                        name: 'preventOverflow',
                                        enabled: true,
                                    },
                                ]}
                                transition
                                onClose={handleClose}
                                className='w-[240px] md:w-[400px] lg:w-[600px]'
                                >
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <TableContainer component={Paper}>
                                            <div className='p-3 text-xs encode-sans'>
                                                
                                                <span className={`font-semibold ${textColorClass}`}>{message}: {' '}</span>
                                                <span>{getExplanation(message)}</span>
                                                
                                            </div>
                                            <Table> 
                                                <TableBody>
                                                {rows.map((row, index) => (
                                                    <TableRow key={row.range} 
                                                        sx={{border: 'none'}}>
                                                        <StyledTableCell 
                                                            sx={{
                                                                textAlign: 'center',
                                                                fontSize: '0.75rem',
                                                                fontFamily: 'Encode Sans Expanded, sans-serif', 
                                                                border: 'none',
                                                                borderBottom: index === rows.length - 1 ? 'none' : '1px solid rgba(17, 24, 39, 0.3)'
                                                            }}
                                                            className={row.className}>{row.range}</StyledTableCell>
                                                        <TableCell 
                                                            sx={{
                                                                fontSize: '0.75rem',
                                                                fontFamily: 'Encode Sans Expanded, sans-serif', 
                                                                color: 'rgb(17, 24, 39)',
                                                                border: 'none',
                                                                borderBottom: index === rows.length - 1 ? 'none' : '1px solid rgba(17, 24, 39, 0.3)'}}>{row.quality}</TableCell>
                                                    </TableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                    </Fade>
                                )}

                                </Popper>
                            </div>
                        )}

                        <AirTables 
                            paramsWeather={paramsWeather} 
                            valuesWeather={valuesWeather} 
                            paramsPollutant={paramsPollutant} 
                            valuesPollutant={valuesPollutant}/>

                    </div>

                    <ForecastChart ozoneForecast={ozoneForecast} pm10Forecast={pm10Forecast} pm25Forecast={pm25Forecast}/>

                </div>
                ) : (
                <div>
                    {loading ? (
                        <Box 
                            sx={{ 
                                display: 'flex',
                                justifyContent: {
                                    xs: 'center',
                                    sm: 'start'
                                }, 
                                margin: '0' 
                                }}>
                            <CircularProgress sx={{ color: 'rgba(250, 250, 250, .6)' }} size={26} />
                        </Box>
                        ) : (
                        <div>
                            {optionsLocation.length > 0 ? (
                                <>
                                    <span>Choose a location:</span>
                                    {optionsLocation.map((item, index) => (
                                        <ul key={index} className='list-disc list-inside flex items-center my-3'>
                                            <li>{item.station.name}</li>
                                            <FontAwesomeIcon icon={faLocationArrow} 
                                            className='ml-3 cursor-pointer hover:text-neon-cyan'
                                            onClick={() => handleClick(item.uid)}/>   
                                        </ul>
                                        ))
                                    }
                                </>
                            ) : (
                                <p>No location found.</p>
                            )}
                            
                        </div>
                    )}
                </div>
                )}
                    
            </div>
        </div>
        
        </>
    )
}
