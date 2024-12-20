import Header from "../header/Header"
import { useState } from 'react'
import CarbonDioxide from "../data/CarbonDioxide"
import Methane from "../data/Methane"
import NitrousOxide from "../data/NitrousOxide"



export default function GreenhouseGases() {  
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setPopoverPosition({ x: clientX, y: clientY });
  };
  const handleMouseEnter = (event) => {
      const { clientX, clientY } = event;
      setPopoverPosition({ x: clientX, y: clientY });
      setShowPopover(true);
  };
  const handleMouseLeave = () => {
      setShowPopover(false);
  };


  return (
    <>
      <div className="flex flex-col">
        <Header/>

        <div className="flex flex-col mx-4 md:mx-12">
          <div className='w-fit'>
            <h1 className='infinite-typewriter thick-bar anta-regular text-xl text-neon-cyan'>Greenhouse gases</h1>
          </div>

          <div className="my-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 h-fit">
              <p className='encode-sans pb-4 text-justify'>Human emissions of greenhouse gases are the primary driver of climate change today.<br/>
                <i className="text-neon-cyan">CO<sub>2</sub></i> and other greenhouse gases like <i className="text-neon-cyan">methane</i> and <i className="text-neon-cyan">nitrous oxide</i> are emitted
                when we burn fossil fuels, produce materials such as steel, cement, and plastics, and grow the food we eat.<br/>
                If we want to reduce these emissions, we need to transform our energy systems, industries, and food systems.
                At the same time, we need to tackle energy poverty, low standards of living, and poor nutrition, which all remain
                enormous problems for billions of people. Technological advances could allow us to do both.</p>
              <p className='encode-sans pb-4 text-justify'>The prices of solar, wind, and batteries have plummeted in recent decades, increasingly 
                undercutting the cost of fossil fuel alternatives. Further progress could allow us to 
                provide <i className="text-neon-cyan">cheap, clean energy</i> for everyone. Political change is essential to create
                a system that supports rapid decarbonization.<br/>
                Emissions are still rising in many parts of the world. However, several countries have managed to cut their emissions
                in recent decades. With affordable low-carbon technologies, other countries can increase their living standards without
                the high-carbon pathway that rich countries followed in the past.</p>
            </div>

            <cite className="text-sm">Source: <a href="https://ourworldindata.org/co2-and-greenhouse-gas-emissions" target='_blank'
              className='hover:underline underline-offset-[5px] decoration-1'>Our World in Data - CO<sub>2</sub> and greenhouse gas 
              emissions</a>.
            </cite>
          </div>

          <hr className="divider"></hr>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 my-8">
            <div className="bg-neon-cyan/30 rounded-sm p-2 h-fit">
              <div className="encode-sans pb-4 text-sm md:text-base text-justify">
                <p className="italic pb-2">• How much greenhouse gases does the world emit every year?</p>
                <p>This chart shows the change in global greenhouse gas emissions over time. Greenhouse gases are measured in <i>carbon dioxide-equivalents</i>.
                </p>
              </div>
                <a href='https://ourworldindata.org/greenhouse-gas-emissions' target='_blank'>
                  <img src="/chart/total-ghg-emission.png" alt="global-emissions"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}/>
                </a>
                {showPopover && (
                  <div
                  style={{
                      position: 'fixed',
                      top: popoverPosition.y + 10,
                      left: popoverPosition.x + 10,
                      backgroundColor: 'rgb(250, 250, 250, .8)',
                      fontSize: '0.8rem',
                      padding: '1px 5px',
                      borderRadius: '2px',
                      zIndex: 999,
                  }}>
                  <span className='encode-sans text-dark'>Click for more</span>
                  </div>
                )}
            </div>
            
            <div className="bg-neon-cyan/30 rounded-sm p-2 h-fit">
              <p className="encode-sans pb-4 text-sm md:text-base text-justify">
                A wide range of sectors and processes contribute to global emissions. So there is no single or simple solution to tackle climate change.
                To reach net-zero emissions we need innovations across all these sectors. Single solutions will not get us there.
              </p>
              <a href='https://ourworldindata.org/ghg-emissions-by-sector' target='_blank'>
                <img src="/chart/emissions-by-sector.png" alt="emissions-by-sector"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}/>
              </a>
              {showPopover && (
                <div
                style={{
                    position: 'fixed',
                    top: popoverPosition.y + 10,
                    left: popoverPosition.x + 10,
                    backgroundColor: 'rgb(250, 250, 250, .8)',
                    fontSize: '0.8rem',
                    padding: '1px 5px',
                    borderRadius: '2px',
                    zIndex: 999,
                }}>
                <span className='encode-sans text-dark'>Click for more</span>
                </div>
              )}
            </div>
          </div>

          <hr className="divider"></hr>

          <div className="my-8 flex flex-col">

            <div className="mb-8">
              <h2 className="anta-regular pb-4 glowing-text white-shadow">CO<sub>2</sub> emissions</h2>
              
                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 items-start gap-x-8 gap-y-8 md:mt-6">
                  <p className="encode-sans text-sm text-justify row-span-1">Carbon dioxide is part of natural biogeochemical cycles, and for thousands
                  of years, the natural concentration in earth atmosphere was around 280 ppm.
                  From the beginning of the industrial revolution, human activities like the burning of fossil fuels, deforestation,
                  and livestock have increased this amount by more than 30%.
                  </p>

                  <CarbonDioxide/>
                </div>
              
            </div>

            <hr className="divider"></hr>

            <div className="my-8">
              <h2 className="anta-regular pb-4 glowing-text white-shadow">CH<sub>4</sub> emissions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 items-start gap-x-8 gap-y-8 md:mt-6">
                <p className="encode-sans text-sm text-justify row-span-1">Methane is a flammable gas formed by geological and biological processes.
                  Some of it are leaks from natural gas systems and wetlands. 50-65% of total global emissions come from human activities.
                  Methane is a gas with a global warming potential several times stronger than of CO<sub>2</sub>.
                  From the beginning of the industrial revolution, human activities have increased this amount by around 150%.
                </p>

                <Methane/>
              </div>
          
            </div>

            <hr className="divider"></hr>

            <div className="my-8">
              <h2 className="anta-regular pb-4 glowing-text white-shadow">NO emissions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 items-start gap-x-8 gap-y-8 md:mt-6">
                <p className="encode-sans text-sm text-justify row-span-1">Nitrous oxide is a gas that is produced by the combustion 
                of fossil fuel and solid waste, nitrogen-base fertilizers, sewage treatment plants, natural processes, and other 
                agricultural and industrial activities. It is the third largest heat-trapping gas in the atmosphere and the biggest 
                ozone-destroying compound emitted by human activities.
                </p>
                
                <NitrousOxide/>
              </div>         
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
