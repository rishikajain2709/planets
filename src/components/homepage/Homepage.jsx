import './homepage.css';
import backgroundImage from '/background.jpg';
import { motion } from 'framer-motion';
import { FrameSVGKranox } from '@arwes/react-frames';
import { useBleeps } from '@arwes/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import DataBlock from './DataBlock';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';




export default function Homepage() {
  const bleeps = useBleeps();
  const [showComponentsHome, setShowComponentsHome] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleShow = () => {
    setShowComponentsHome(true)
  }
  
  useEffect(() => {
      const interval = setInterval(() => {
      setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
  }, []);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentTime.toLocaleDateString('en-US', options);
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}>

    
      <div className='bg-cover h-screen w-screen overflow-y-scroll overflow-x-hidden fixed flex flex-col items-center' style={{backgroundImage: `url(${backgroundImage})`}}>
        
        <div className='text-center my-20 mx-5'>
          <h1 className='anta-regular text-5xl md:text-7xl glitch' data-text='One Planet Project'>One Planet Project</h1>
        </div>
        
        {!showComponentsHome && (
          <div style={{
              position: 'relative',
              zIndex: 1,
              }} className='svg-cyber mt-0 md:mt-10 lg:mt-20 w-[300px] h-auto md:w-[360px] md:h-[180px]'>
              <FrameSVGKranox/>

              <div className='py-5 px-8 pl-20 w-fit h-full text-start flex flex-col justify-center encode-sans text-white'>
                <div className='w-[120px]'>
                  <p className='bar general-typewriter italic font-semibold dark-shadow'>Mission check:</p>
                </div>
                <p className='fade-1 mt-3 dark-shadow'>Learn and stay informed about the vital signs of our planet and actions to take</p>
              </div>

              <div className='items-center absolute top-[46%] translate-x-8 w-fit'>
                <div className="circle pulse-target bg-red"></div>
              </div>
          
              <div className='flex justify-center'>
                <button onClick={() => {bleeps.intro?.play(); handleShow()}} className='w-max my-6 cursor-pointer'>
                  <div className='flex flex-row items-center anta-regular text-2xl leading-3 text-neon-cyan cyan-shadow flicker-anim thick-bar'>
                    <FontAwesomeIcon icon={faAnglesRight} className='mr-2'/>
                    <h2 className='mr-[0.1rem]'>Press to continue</h2>
                  </div>
                </button>
              </div>

          </div>
        )}
                
        {showComponentsHome && (
          <div className='flex flex-col items-center lg:flex-row lg:justify-around w-full p-4'>
            
            <DataBlock/>
                  
            <div className='flex flex-col w-full lg:w-min items-center justify-center order-1 lg:order-none'>
              <div className='h-full flex flex-col justify-between my-10 lg:m-10 w-fit lg:w-max items-center box-glow fade-1'>
                
                  <div className='flex flex-col items-center encode-sans py-3 px-4 lg:px-8'>
                    <FontAwesomeIcon icon={faTriangleExclamation} beatFade className='h-10 m-3 text-red'/>
                    <h3 className='vanishing-effect uppercase font-extrabold mt-5 text-2xl lg:text-4xl'>climate change</h3>
                  </div>
                  <div className='flex flex-row justify-between w-full encode-sans px-8 py-3 text-xs'>
                    <span className='glitch-datetime' data-content={formattedTime}>{formattedTime}</span>
                    <span className='glitch-datetime' data-content={formattedDate}>{formattedDate}</span>
                  </div>

              </div>

              <div className='flex flex-col items-center m-10 fade-2'>
                <h3 className='text-xl text-center encode-sans white-shadow glowing-text mb-5'>We are on a collision course.<br/>
                Press the button to find out what you can do to reverse the trend.</h3>

                <div className='relative'>
                  <img src='/radar.png' className='radar'/>
                    <div className='uppercase anta-regular button-act text-xl text-white cyan-shadow'>
                      <Link to='/act-now' onClick={() => bleeps.intro?.play()}>act now</Link>
                    </div>              
                </div>
                
              </div>
            </div>

          </div>
        )}
            
      </div>
    </motion.div>
    </>
  )
}