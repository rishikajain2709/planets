import Header from '../header/Header';
import Temperature from '../data/Temperature';

export default function GlobalTemperature() {
  return (
    <>
        <div className='flex flex-col'>
            <Header/>
                
                <div className='flex flex-col mx-4 md:mx-12'>
                    <div className='w-fit'>
                        <h1 className='infinite-typewriter thick-bar anta-regular text-xl text-neon-cyan'>Global temperature</h1>
                    </div>

                    <div className="my-8 w-full">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 h-fit'>
                            <div className='encode-sans pb-4 text-justify'>
                                <p>Air temperatures on Earth have been rising since the Industrial Revolution. While natural 
                                    variability plays some part, the preponderance of evidence indicates 
                                    that <i className='text-neon-cyan'>human activities</i> - particularly emissions of heat-trapping
                                    greenhouse gases - are mostly responsible for making our planet warmer. Earth northern hemisphere 
                                    is warming faster. The arctic is warmed between 2 °C (3.6 °F) and 4 °C (7.2 °F). Earth temperature 
                                    and the proportion of gases such as CO<sub>2</sub>, methane and NO in the atmosphere is strictly 
                                    correlated.<br/>
                                    According to an ongoing temperature analysis led by scientists at NASA&apos;s Goddard Institute 
                                    for Space Studies (GISS), the average global temperature on Earth has increased by at 
                                    least 1.1° Celsius since 1880.<br/>
                                    Global warming reached an estimated <i className='text-neon-cyan'>1.27 °C in February 2024</i>. 
                                    If the 30-year warming trend leading up to then continued, global warming would reach 1.5 °C by 
                                    August 2033. We must limit the increase of global temperature if we want to avoid a 
                                    future in which everyday life around the world is marked by its worst, <i className='text-neon-cyan'>most 
                                    devastating effects</i>.
                                </p>
                            </div>
                            <div className='encode-sans pb-4 text-justify'>
                                <p className='italic pb-2'>• Why should we care about one or two degrees of global warming?</p>
                                <p>After all, the temperatures we experience locally and in short periods 
                                can fluctuate significantly due to predictable, cyclical events and hard-to-predict wind and precipitation 
                                patterns. But the <i className='text-neon-cyan'>global temperature mainly depends on how much energy 
                                the planet receives from the Sun and how much it radiates back into space</i>. The energy coming from 
                                the Sun fluctuates very little by year, while the amount of energy radiated by Earth is closely tied 
                                to the chemical composition of the atmosphere - particularly the amount of heat-trapping greenhouse 
                                gases.<br/>
                                A <i className='text-neon-cyan'>one degree global change is significant</i> because it takes a 
                                vast amount of heat to warm all of the oceans, the atmosphere, and the land masses by that much. 
                                In the past, a one to two degree drop was all it took to plunge the Earth into the Little Ice Age. 
                                A five degree drop was enough to bury a large part of North America under a towering mass of ice 20,000 
                                years ago.
                                </p>
                            </div>
                        </div>
                        <cite className="text-sm">Source: <a href="https://climate.nasa.gov/vital-signs/global-temperature/?intent=121"
                            className='hover:underline underline-offset-[5px] decoration-1'>NASA Climate Change - Global 
                            Temperature</a> and <a href='https://climate.copernicus.eu/' 
                             className='hover:underline underline-offset-[5px] decoration-1'>Copernicus Climate Change Service</a>.
                        </cite>
                    </div>

                    <hr className="divider"></hr>

                    <div className='my-8'>
                        <h2 className="anta-regular pb-4 glowing-text white-shadow">Global temperature anomalies</h2>
                        <Temperature/>
                    </div>
                </div>
        </div>
    </>
  )
}
