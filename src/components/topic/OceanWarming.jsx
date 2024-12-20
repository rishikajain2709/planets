import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import Header from "../header/Header"
import Ocean from "../data/Ocean"

export default function OceanWarming() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        {
          src: '/images/coral-bleaching.jpeg',
          alt: 'coral bleaching',
          caption: "Coral bleaching is a phenomenon caused by stressful conditions, like rising temperatures, pollution and changes in water's chemistry."
        },
        {
          src: '/images/hurricane.jpeg',
          alt: 'hurricanes',
          caption: 'Rising ocean temperatures increases the intensity of precipitation and the amount of energy available to fuel hurricanes.'
        },
        {
          src: '/images/marine-habitat.jpg',
          alt: 'loss habitat',
          caption: 'Climate change is causing marine species to disappear from their habitat twice as fast as land animals and it also forced species migration which can alter an ecosystem.'
        }
    ];

    const handlePrevClick = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
    const handleNextClick = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };


    return (
    <>
        <div className="flex flex-col">
            <Header/>

                <div className="flex flex-col mx-4 md:mx-12">
                    <div className='w-fit'>
                        <h1 className='infinite-typewriter thick-bar anta-regular text-xl text-neon-cyan'>Ocean warming</h1>
                    </div>

                    <div className="my-8 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 h-fit">
                            <div className="flex flex-col encode-sans text-justify">
                                <p className="pb-4">Covering more than 70% of Earth&apos;s surface, our global 
                                ocean has a very high heat capacity. It <i className="text-neon-cyan">has absorbed 90% of the warming</i> that
                                has occurred in recent decades due to increasing greenhouse gases, and the top few meters of the ocean
                                store as much heat as Earth&apos;s entire atmosphere. The effects of ocean warming include sea level rise 
                                due to thermal expansion, coral bleaching, accelerated melting of Earth&apos;s major ice sheets, intensified hurricanes and 
                                changes in ocean health and biochemistry.</p>
                                <p className="pb-4">Heat stored in the ocean causes its water to expand, which is responsible for one-third to
                                one-half of <i className="text-neon-cyan">global sea level rise</i>. Most of the added energy is 
                                stored at the surface, at a depth of zero to 700 meters. The last 10 years were the ocean&apos;s 
                                warmest decade since at least the 1800s. The year 2023 was the ocean&apos;s warmest recorded year.
                                </p>
                            </div>
                            
                            <div className="pb-6 md:p-0">
                                <div>
                                    <div className="relative">
                                        <img src={images[currentImageIndex].src} alt={images[currentImageIndex].alt}/>
                                        <button onClick={handlePrevClick} className="absolute top-1/2 left-0 w-10">
                                            <FontAwesomeIcon icon={faChevronLeft} className="h-8 lg:h-5 text-white/60 hover:text-white"/>
                                        </button>   
                                        <button onClick={handleNextClick} className="absolute top-1/2 right-0 w-10">
                                            <FontAwesomeIcon icon={faChevronRight} className="h-8 lg:h-5 text-white/60 hover:text-white"/>
                                        </button>
                                    </div>

                                    <figcaption className="mt-2 mb-8 lg:mb-0 text-xs text-justify encode-sans italic text-white/60">
                                        {images[currentImageIndex].caption}
                                    </figcaption>
                                </div>
                                
                            </div>

                        </div>
                        <cite className="text-sm">Source: <a href="https://climate.nasa.gov/vital-signs/ocean-warming/?intent=121"
                            target='_blank' className='hover:underline underline-offset-[5px] decoration-1'>NASA Climate Change - Ocean warming</a>
                        </cite>
                    </div>

                    <hr className="divider"></hr>

                    <div className="my-8">
                        <h2 className="anta-regular pb-4 glowing-text white-shadow">Global ocean temperature anomalies</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:mt-6">
                            <p className="encode-sans text-sm text-justify row-span-1">The CO<sub>2</sub> we produce is absorbed and 
                            dissolved into the ocean, making it more acidic. The ocean is also suffering from deoxygenation, 
                            due to contamination and global warming, making it less habitable for marine organism. The ocean 
                            modulates earth temperature. It takes up most of the excess heat that we humans produce, making it warmer, 
                            and as result, less able to absorb heat. Without the ocean temperature regulatory effect, the global 
                            average temperature would be around 50 degrees Celsius instead of 15.<br/>
                            The Extended Reconstructed Sea Surface Temperature (ERSST) dataset is a global analysis of SST data 
                            derived from the International Comprehensive Ocean-Atmosphere Dataset (ICOADS). The chart represents the 
                            average temperature registered in January - February for each year since 1851.
                            </p>
                            
                            <Ocean/>
                        </div>
                    </div>
                </div>
        </div>
    </>
  )
}
