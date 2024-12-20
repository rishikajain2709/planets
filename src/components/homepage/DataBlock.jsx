import { createFrameOctagonClip } from '@arwes/frames';
import { FrameSVGNefrex } from '@arwes/react-frames';
import { Link } from 'react-router-dom'
import { useBleeps } from '@arwes/react'
//import '../homepage.css'
import AirQualityBox from './AirQualityBox';
import { useState, useEffect } from 'react';
import { fetchData } from "../../client API/fetchData";


export default function DataBlock() {
    const bleeps = useBleeps();
    const [recentCo2, setRecentCo2] = useState(null);
    const [recentCh4, setRecentCh4] = useState(null);
    const [recentNo, setRecentNo] = useState(null);
    const [recentTemperature, setRecentTemperature] = useState(null);
    const [recentIce, setRecentIce] = useState(null);
    const [recentOcean, setRecentOcean] = useState(null);
    const [recentForest, setRecentForest] = useState(null);

    const formatForestValue = (value) => {
        const roundedValue = Number.parseFloat(value).toFixed(2);
        const [integer] = roundedValue.split('.');
        const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        const roundedInteger = Number.parseFloat(formattedInteger).toFixed(2);
        return roundedInteger;
    }

    useEffect(() => {
        const fetchRecentData = async () => {
          try {
            const { recentData } = await fetchData();
            setRecentCo2(recentData.carbonDioxide);
            setRecentCh4(recentData.methane);
            setRecentNo(recentData.nitrousOxide);
            setRecentTemperature(recentData.temperature);
            setRecentIce(recentData.ice);
            setRecentOcean(recentData.ocean);
            setRecentForest(recentData.forest);
            
          } catch (error) {
            console.log(error);
          }
        };
        fetchRecentData();
    }, []);
    



    return (
    <>
    <div className='flex flex-col justify-start w-[250px]'>
        <AirQualityBox/>

        <div className='gradient-lines my-5'>
            <h3 className='anta-regular mb-3 text-center fade-2'>Greenhouse gases</h3>
            <div className='flex flex-col'>
                <div style={{
                    width: '100%',
                    height: 'auto',
                    clipPath: createFrameOctagonClip({
                        leftTop: false,
                        rightTop: true,
                        rightBottom: false,
                        leftBottom: true
                    }),
                    background: '#00ffe230',
                }}>

                <div className='py-5 px-8 fade-2'>
                    <div className='anta-regular'>
                    <div className='w-fit'><h3 className='text-white infinite-typewriter-1 bar uppercase'>co<sub>2</sub> level</h3></div>
                        {recentCo2 && recentCo2.trend ? (
                            <span className='pulse-value'>{recentCo2.trend} ppm</span>
                        ) : (
                            <span className='pulse-value'>Loading...</span>
                        )}
                    </div>
                    <Link to='/greenhouse-gases' onClick={() => bleeps.click?.play()} className='float-right data-button anta-regular'>More</Link>
                </div>
                </div>

                <div style={{
                    width: '100%',
                    height: 'auto',
                    clipPath: createFrameOctagonClip({
                        leftTop: false,
                        rightTop: true,
                        rightBottom: false,
                        leftBottom: true
                    }),
                    background: '#00ffe230',
                    margin: '1rem 0'
                }}>

                <div className='py-5 px-8 fade-2'>
                    <div className='anta-regular'>
                    <div className='w-fit'><h3 className='text-white infinite-typewriter bar uppercase'>ch<sub>4</sub> level</h3></div>
                        {recentCh4 && recentCh4.trend ? (
                            <span className='pulse-value'>{recentCh4.trend} ppb</span>
                        ) : (
                            <span className='pulse-value'>Loading...</span>
                        )}
                    </div>
                    <Link to='/greenhouse-gases' onClick={() => bleeps.click?.play()} className='float-right data-button anta-regular'>More</Link>
                </div>
                </div>

                <div style={{
                    width: '100%',
                    height: 'auto',
                    clipPath: createFrameOctagonClip({
                        leftTop: false,
                        rightTop: true,
                        rightBottom: false,
                        leftBottom: true
                    }),
                    background: '#00ffe230'
                }}>

                <div className='py-5 px-8 fade-2'>
                    <div className='anta-regular'>
                        <div className='w-fit'><h3 className='text-white infinite-typewriter-2 bar uppercase'>no level</h3></div>
                        {recentNo && recentNo.trend ? (
                            <span className='pulse-value'>{recentNo.trend} ppb</span>
                        ) : (
                            <span className='pulse-value'>Loading...</span>
                        )}
                    </div>
                    <Link to='/greenhouse-gases' onClick={() => bleeps.click?.play()} className='float-right data-button anta-regular'>More</Link>
                </div>
                </div>
            </div>

        </div>
    </div>
    

    <div className='flex flex-col justify-start w-[250px] lg:order-2'>

        <div className='flex flex-col my-5 lg:mt-0'>
            <div style={{
                position: 'relative',
                width: '100%',
                height: 'auto',
                zIndex: 1,
                }} className='svg-cyber'>
                <FrameSVGNefrex/>

                <div className='py-5 px-8 fade-2'>
                <div className='anta-regular w-min'>
                    <div className='w-fit'><h3 className='text-white infinite-typewriter bar uppercase'>Global temperature</h3></div>
                    {recentTemperature && recentTemperature.station ? (
                        <span className='pulse-value'>{recentTemperature.station} °C</span>
                    ) : (
                        <span className='pulse-value'>Loading...</span>
                    )}
                </div>
                <Link to='/global-temperature' onClick={() => bleeps.click?.play()} className='float-right data-button anta-regular'>More</Link>
                </div>
            </div>
        </div>

        <div className='flex flex-col my-5'>
            <div style={{
                position: 'relative',
                width: '100%',
                height: 'auto',
                zIndex: 1,
                }} className='svg-cyber'>
                <FrameSVGNefrex/>

                <div className='py-5 px-8 fade-2'>
                <div className='anta-regular'>
                    <div className='w-fit'><h3 className='text-white infinite-typewriter-2 bar uppercase'>Sea ice extent</h3></div>
                    {recentIce && recentIce.value ? (
                        <span className='pulse-value'>{recentIce.value} million km<sup>2</sup></span>
                    ) : (
                        <span className='pulse-value'>Loading...</span>
                    )}
                </div>
                <Link to='/ice-melting' onClick={() => bleeps.click?.play()} className='float-right data-button anta-regular'>More</Link>
                </div>
            </div>
        </div>

        <div className='flex flex-col my-5'>
            <div style={{
                position: 'relative',
                width: '100%',
                height: 'auto',
                zIndex: 1,
                }} className='svg-cyber'>
                <FrameSVGNefrex/>

                <div className='py-5 px-8 fade-2'>
                    <div className='anta-regular'>
                        <div className='w-fit'><h3 className='text-white infinite-typewriter-1 bar uppercase'>Ocean warming</h3></div>
                        {recentOcean && recentOcean ? (
                            <span className='pulse-value'>{recentOcean} °C</span>
                        ) : (
                            <span className='pulse-value'>Loading...</span>
                        )}
                    </div>
                    <Link to='/ocean-warming' onClick={() => bleeps.click?.play()} className='float-right data-button anta-regular'>More</Link>
                </div>
            </div>
        </div>
            
        <div className='flex flex-col my-5 lg:mb-0'>
            <div style={{
                position: 'relative',
                width: '100%',
                height: 'auto',
                zIndex: 1,
                }} className='svg-cyber'>
                <FrameSVGNefrex/>

                <div className='py-5 px-8 fade-2'>
                <div className='anta-regular'>
                    <div className='w-fit'><h3 className='text-white infinite-typewriter bar uppercase'>Forest cover</h3></div>
                    {recentForest ? (
                        <span className='pulse-value'>{formatForestValue(recentForest[2]['wb:value']['#text'])} million km<sup>2</sup></span>
                    ) : (
                        <span className='pulse-value'>Loading...</span>
                    )}
                </div>
                <Link to='/forest-cover' onClick={() => bleeps.click?.play()} className='float-right data-button anta-regular'>More</Link>
                </div>
            </div>
        </div>
    
    </div>
    
    </>
  )
}
