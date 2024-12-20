import Header from "../header/Header";
import Ice from "../data/Ice";
import './topic.css';
import './../homepage/homepage.css';
import { useState } from "react";

export default function IceMelting() {
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

  const images = [
    { src: "/images/ocean-wave.jpg", alt: "Ocean rising", text: "Ocean level rising" },
    { src: "/images/glacier-habitat.jpg", alt: "Polar bear", text: "Habitat loss for some species" },
    { src: "/images/ocean-iceberg.jpg", alt: "Ocean currents", text: "Changes in ocean current circulation" },
    { src: "/images/glacier-mountain.jpg" , alt: "Mountains", text: "For mountain glaciers: poor water supply" }
  ];

  return (
    <>
      <div className="flex flex-col">
        <Header/>

          <div className="flex flex-col mx-4 md:mx-12">
            <div className='w-fit'>
              <h1 className='infinite-typewriter thick-bar anta-regular text-xl text-neon-cyan'>Ice melting</h1>
            </div>

            <div className="my-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 h-fit">
                <p className='encode-sans pb-4 text-justify'>Ice acts like a <i className="text-neon-cyan">protective cover</i> over
                the Earth and our oceans. These bright white spots reflect excess heat back into space and keep the planet cooler.
                In theory, the Arctic remains colder than the equator because <i className="text-neon-cyan">more of the heat from
                the sun is reflected off the ice</i>, back into space. Glaciers around the world can range from ice that is several 
                hundred to several thousand years old and provide a scientific record of how climate has changed over time.</p>
                <p className='encode-sans pb-4 text-justify'>Through their study, we gain valuable information about the extent to which the planet is rapidly warming.
                Today, about 10% of land area on Earth is covered with glacial ice. Almost <i className="text-neon-cyan">90% is in 
                Antarctica</i>, while the remaining <i className="text-neon-cyan">10% is in the Greenland ice cap</i>. 
                Rapid glacial melt in Antarctica and Greenland also influences ocean currents, as massive amounts of very cold
                glacial-melt water entering warmer ocean waters is slowing ocean currents. 
                And as ice on land melts, sea levels will continue to rise.</p>
              </div>
              <cite className="text-sm">Source: <a href="https://www.worldwildlife.org/pages/why-are-glaciers-and-sea-ice-melting"
                className='hover:underline underline-offset-[5px] decoration-1'>WWF - Why are glaciers and sea ice melting?</a>
              </cite>
            </div>

            <hr className="divider"></hr>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 my-8">
              
              <div className="bg-neon-cyan/30 rounded-sm p-2 h-full">
                <p className="encode-sans pb-4 text-sm md:text-base text-justify">The graph presents cumulative change in mass of ice
                  sheets, measured relative to a base year of 2002. For reference, 1000 billion metric tons is equal to about 260 cubic
                  miles of ice - <i className="text-neon-cyan">enough to raise sea level by about 3 millimeters</i>.</p>
                  <a href="https://ourworldindata.org/grapher/ice-sheet-mass-balance" target="_blank"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}>
                    <img src="/chart/ice-sheet-mass-balance.png" alt="ice-sheet"/>
                  </a>
                  {showPopover && (
                    <div
                    style={{
                        position: 'fixed',
                        top: popoverPosition.y + 10,
                        left: popoverPosition.x + 10,
                        backgroundColor: 'rgba(250, 250, 250, .8)',
                        fontSize: '0.8rem',
                        padding: '1px 5px',
                        borderRadius: '2px',
                        zIndex: 999,
                    }}>
                    <span className='encode-sans text-dark'>Click for more</span>
                    </div>
                  )}
              </div>

              <div className="h-full">
                <p className='encode-sans pb-4 text-center'>What are the effects of melting glaciers?</p>

                <div className="grid sm:grid-cols-1 md:grid-cols-1 md:grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="img-item">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto block md:h-24 md:object-cover lg:h-auto"
                      />
                      <div className="overlay"></div>
                      <p className="img-text">{image.text}</p>
                    </div>
                  ))}
                </div>  
              </div>

            </div>

            <hr className="divider"></hr>

            <div className="my-8">
              <h2 className="anta-regular pb-4 glowing-text white-shadow">Global sea ice extent</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:mt-6">
                <p className="encode-sans text-sm text-justify row-span-1">The arctic is warming around twice as fast as global average.
                    Some of the reasons for this are: the arctic amplification, the albedo effect, and black carbon.
                    From 1979 to 1996, we lost 2.2 - 3% of the arctic ice cover. From 2010 to present we are losing 12.85% per decade!
                    Another consequence is permafrost thawing. This is a process in which large amounts of methane is released to the 
                    atmosphere, fueling more the process of global warming.<br/>
                    The chart presents global sea ice extent from 1979-2024, on annual basis.
                </p>
                
                <Ice/>
              </div>
              
            </div>
            
          </div>
      </div>
    </>
  )
}
