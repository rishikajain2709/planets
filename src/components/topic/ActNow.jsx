import Header from "../header/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle, faBuilding, faCartShopping, faChevronCircleDown, faChevronCircleRight, faCow, faIndustry, faLeaf, faSeedling, faSmog, faSolarPanel, faTemperatureLow, faTree, faTreeCity, faWheatAwn } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";

export default function ActNow() {
    const [showPopover, setShowPopover] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [hoveredImg, setHoveredImg] = useState(null);
    

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    
    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        setPopoverPosition({ x: clientX, y: clientY });
    };
    const handleMouseEnter = () => {
        const { clientX, clientY } = event;
        setPopoverPosition({ x: clientX, y: clientY });
        setShowPopover(true);
    };
    const handleMouseLeave = () => {
        setShowPopover(false);
    };

    const handleMouseEnterImg = (img) => {
        setHoveredImg(img);
    };
    const handleMouseLeaveImg = () => {
        setHoveredImg();
    };


    return (
    <>
        <div className="flex flex-col">
            <Header/>

            <div className="flex flex-col items-center mx-4 md:mx-12">     
                <h1 className="uppercase encode-sans gradient-text text-center font-semibold text-3xl my-6 md:mt-0">Act now for planet</h1>
                
                <div className="my-8 w-full">

                    <div className="encode-sans flex flex-col md:flex-row h-auto">
                        <div className="w-full">
                            <div className="border-2 border-white/60 rounded-sm h-full text-justify p-6">
                                <p className="mb-2">• What is climate change?</p><br/>
                                <p>Climate change refers to changes in weather patterns and conditions around the world.<br/>   
                                Global warming causes climate change, which poses a serious threat to us 
                                in the forms of flooding, hurricanes, droughts and <i className="text-neon-cyan">extreme weather</i>. 
                                The more average temperatures increase, the worse the impacts of climate change become.</p>
                            </div>
                        </div>

                        {windowWidth < 768 ? (
                        <FontAwesomeIcon icon={faChevronCircleDown} className="p-6 self-center text-white/60"/>
                        ) : (
                        <FontAwesomeIcon icon={faChevronCircleRight} className="p-6 self-center text-white/60"/>
                        )}

                        <div className="w-full">
                            <div className="border-2 border-white/60 rounded-sm h-full text-justify p-6">
                                <p className="mb-2 uppercase">• the causes</p><br/>
                                <p><i className="text-neon-cyan">Human activities</i> are driving the global warming trend observed 
                                since the mid-20th century. Specifically the burning of fossil fuels such as coal, oil, gasoline, 
                                natural gas, and other pollutants, which results in the greenhouse effect.
                                </p>
                                <ul className="mt-4 text-sm uppercase">
                                    <li><FontAwesomeIcon icon={faIndustry} className="mr-3"/>Burning fossil fuels</li>
                                    <li><FontAwesomeIcon icon={faTree} className="mr-3"/>Deforestation</li>
                                    <li><FontAwesomeIcon icon={faCow} className="mr-3"/>Increasing farming</li>
                                    <li><FontAwesomeIcon icon={faSeedling} className="mr-3"/>Fertilisers</li>
                                    <li><FontAwesomeIcon icon={faSmog} className="mr-3"/>Pollution</li>
                                </ul>
                            </div>
                        </div>

                        {windowWidth < 768 ? (
                        <FontAwesomeIcon icon={faChevronCircleDown} className="p-6 self-center text-white/60"/>
                        ) : (
                        <FontAwesomeIcon icon={faChevronCircleRight} className="p-6 self-center text-white/60"/>
                        )}

                        <div className="w-full">
                            <div className="border-2 border-white/60 rounded-sm h-full text-justify p-6">
                                <p className="mb-2 uppercase">• the effects</p><br/>
                                <p>The effects of human-caused global warming <i className="text-neon-cyan">are happening now</i>, 
                                are irreversible for people alive today, and will worsen as long as humans add greenhouse gases to 
                                the atmosphere.<br/> We already see effects scientists predicted, such as the loss of sea ice, melting 
                                glaciers and ice sheets, sea level rise, and more intense heat waves.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <hr className="divider"></hr>

                <div className="encode-sans grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 my-8 w-full">
                    <div>
                        <a href='https://science.nasa.gov/climate-change/faq/what-is-the-greenhouse-effect/' target='_blank'>
                            <img 
                            src='/greenhouse-effect.gif' 
                            alt='greenhouse-effect' 
                            className='rounded-md my-2 cursor-pointer'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                            />
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

                    <div className="text-justify">
                        <p className='mb-4'>Why does the global temperature increase occur?</p>
                        <p>
                            Global warming occurs when CO<sub>2</sub> and other air pollutants collect in the atmosphere 
                            and absorb sunlight and solar radiation that have bounced off the earth&apos;s surface.<br/> 
                            Normally this radiation would escape into space, but these pollutants trap the heat and cause the 
                            planet to get hotter. 
                            These <i className="text-neon-cyan">heat-trapping pollutants</i> - specifically carbon dioxide, 
                            methane, nitrous oxide, water vapor, and synthetic fluorinated 
                            gases - are known as <i className="text-neon-cyan">greenhouse gases</i>, and their impact is called 
                            the greenhouse effect.<br/> Greenhouse effect is a natural process that makes Earth hospitable for life.
                            But <i className="text-neon-cyan">human activities</i> are increasing the concentration of these gases in the athmosphere,
                            which trap extra heat and warming the planet.  
                        </p>
                    </div>
                </div>

                <hr className="divider"></hr>
                    
                <div className='encode-sans grid grid-cols-1 md:grid-cols-2 items-center gap-x-8 gap-y-8 my-8 w-full'>

                    <div className='text-justify'>
                        {!hoveredImg && (
                        <div className='target-div'>
                            <h3 className='uppercase text-4xl vanishing-effect'>climate change effects</h3>
                        </div>
                        )}

                        {hoveredImg && (
                            <div className="target-div">
                                {hoveredImg === "glaciers" && (
                                <div>
                                    <p className='font-bold mb-2'>Ice melting</p>
                                    <p>The melting of glaciers affects the availability of fresh water for irrigation and domestic use, endangers 
                                        the lives of animals living in frozen environments and affects ocean levels. The rapid loss of Antarctica
                                        and Greenland has an impact on ocean currents, which slow them down.</p>
                                </div>
                                )}
                                {hoveredImg === "air-pollutants" && (
                                <div>
                                    <p className='font-bold mb-2'>Air pollution</p>
                                    <p>Allergies, asthma, and infectious disease outbreaks will become more common due to increased growth
                                        of pollen-producing ragweed, higher levels of air pollution, and the spread of conditions favorable 
                                        to pathogens and mosquitoes.</p>
                                </div>
                                )}
                                {hoveredImg === "ocean" && (
                                <div>
                                    <p className='font-bold mb-2'>Rising and warming oceans</p>
                                    <p>Sea levels would rise following the melting of the ice, submerging the coasts. The increase in CO<sub>2</sub>
                                        in the atmosphere would change the pH of the oceans, making them more acidic and upsetting their balance
                                        with possible extinctions and upheavals in the food chain. Warming oceans would cause species to migrate
                                        into new waters. These changes have serious effects on native species with consequent ecological impact.</p>
                                </div>
                                )}
                                {hoveredImg === "habitats-loss" && (
                                <div>
                                    <p className='font-bold mb-2'>Habitats loss</p>
                                    <p>Disruption of habitats such as coral reefs and alpine meadows could drive many plant and animal species
                                        to extinction. Furthermore, in the seas, as is happening in the Mediterranean Sea, the migration of species
                                        from tropical areas can lead to an ecological imbalance and the extinction of native species.</p>
                                </div>
                                )}
                                {hoveredImg === "extreme-weather" && (
                                <div>
                                    <p className='font-bold mb-2'>Extreme weather and natural disasters</p>
                                    <p>Increase in the frequency and intensity of extreme events such as floods, hurricanes, 
                                        droughts, heat waves and frost will have strong repercussions on agriculture and the 
                                        geographical concentration of inhabited areas.</p>
                                </div>
                                )}
                                {hoveredImg === "desertification" && (
                                <div>
                                    <p className='font-bold mb-2'>Deforestation and desertification</p>
                                    <p>In the middle latitudes there will be areas more subject to desertification phenomena,
                                        following droughts and heat waves. The intensive exploitation of natural resources and deforestation
                                        also causes the land to dry up.</p>
                                </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className='flex flex-row justify-center w-full relative mx-0 my-6 md:mx-6'>
                        <div className='gallery'>
                            <img src='act-now/glaciers.jpg' onMouseEnter={() => handleMouseEnterImg("glaciers")}
                            onMouseLeave={handleMouseLeaveImg}></img>
                            <img src='act-now/air-pollutants.jpg' onMouseEnter={() => handleMouseEnterImg("air-pollutants")}
                            onMouseLeave={handleMouseLeaveImg}></img>
                            <img src='act-now/ocean.jpg' onMouseEnter={() => handleMouseEnterImg("ocean")}
                            onMouseLeave={handleMouseLeaveImg}></img>
                            <img src='act-now/habitats-loss.jpg' onMouseEnter={() => handleMouseEnterImg("habitats-loss")}
                            onMouseLeave={handleMouseLeaveImg}></img>
                            <img src='act-now/extreme-weather.png' onMouseEnter={() => handleMouseEnterImg("extreme-weather")}
                            onMouseLeave={handleMouseLeaveImg}></img>
                            <img src='act-now/desertification.jpg' onMouseEnter={() => handleMouseEnterImg("desertification")}
                            onMouseLeave={handleMouseLeaveImg}></img>
                        </div>
                    </div>

                </div>
                    
                    
                <hr className="divider"></hr>

                <div className="my-8 w-full">
                    <div className="encode-sans flex flex-col items-center">
                        <p className="p-4 md:p-12 text-center glow-gradient">How can we reduce our impact and what can we ask to our government?</p>
                        <ul className="grid grid-cols-2 md:grid-cols-4 gap-8 text-justify my-8">
                            <li className="flex flex-col white-shadow rounded-sm gradient-bg p-2">
                                <FontAwesomeIcon icon={faLeaf} className="m-2"/>
                                <p>Reduce food waste, meat consumption and adopt a plant based diet</p>
                            </li>
                            <li className="flex flex-col white-shadow rounded-sm gradient-bg p-2">
                                <FontAwesomeIcon icon={faWheatAwn} className="m-2"/>
                                <p>A more sustainable farming and agriculture technique</p>
                            </li>
                            <li className="flex flex-col white-shadow rounded-sm gradient-bg p-2">
                                <FontAwesomeIcon icon={faTemperatureLow} className="m-2"/>
                                <p>Lower heating and cut a/c consumption and prefer low-energy appliances</p>
                            </li>
                            <li className="flex flex-col white-shadow rounded-sm gradient-bg p-2">
                                <FontAwesomeIcon icon={faBicycle} className="m-2"/>
                                <p>Move less by car and prefer a more sustainable transport, like train or bus</p>
                            </li>
                            <li className="flex flex-col white-shadow rounded-sm gradient-bg p-2">
                                <FontAwesomeIcon icon={faBuilding} className="m-2"/>
                                <p>Improve the energy efficiency of buildings, both private and industrial</p>
                            </li>
                            <li className="flex flex-col white-shadow rounded-sm gradient-bg p-2">
                                <FontAwesomeIcon icon={faSolarPanel} className="m-2"/>
                                <p>Have a more green energy resource, such as renewable and nuclear one</p>
                            </li>
                            <li className="flex flex-col white-shadow rounded-sm gradient-bg p-2">
                                <FontAwesomeIcon icon={faTreeCity} className="m-2"/>
                                <p>Protect primary forests, plant new trees and create green areas in cities</p>
                            </li>
                            <li className="flex flex-col white-shadow rounded-sm gradient-bg p-2">
                                <FontAwesomeIcon icon={faCartShopping} className="m-2"/>
                                <p>Reduce unnecessary purchases. Apply law of 3 R: reduce, reuse and recycle</p>
                            </li>
                        </ul>
                    </div>

                    <div className='encode-sans mx-auto my-6 text-center md:w-3/5'>
                        <p className='mb-4'>Informing and raising <i className='text-neon-cyan'>awareness</i> among the population
                        about climate change, its causes and the actions that can be taken to reduce the global warming is essential
                        to <i className="text-neon-cyan">promote change</i>.</p>
                        <p>Finally, fighting climate change requires a <i className='text-neon-cyan'>global and cooperative
                        commitment</i> from governments, companies, organizations and individuals.</p>
                    </div>
                </div>
                
        </div>


        
        </div>
    </>
  )
}
