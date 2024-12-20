import Forest from "../data/Forest";
import Header from "../header/Header"
import { useState } from "react";

export default function ForestCover() {
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
              <h1 className='infinite-typewriter thick-bar anta-regular text-xl text-neon-cyan'>Forest cover</h1>
            </div>

            <div className="my-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 h-fit">
                <p className="encode-sans pb-4 text-justify">Forests cover nearly one-third of the land area on our planet and are home
                to most of the world&apos;s life on land. They are also <i className="text-neon-cyan">essential</i> to human health, 
                purifying our water and air and serving as our first line of defense against new infectious diseases.<br/>
                Additionally, forests provide more than 86 million green jobs and resources such as food and fuel that support billions 
                of people&apos;s livelihoods. Forests also play a critical role in <i className="text-neon-cyan">mitigating climate 
                change</i> because they act as carbon sinks-soaking up carbon dioxide that would otherwise be free in the atmosphere 
                and contributing to ongoing changes in climate patterns.<br/>But forests across the globe are under threat, jeopardizing these benefits. 
                The threats manifest themselves in the form of <i className="text-neon-cyan">deforestation and forest degradation</i>.
                </p>
                <p className="encode-sans pb-4 text-justify">The leading cause of deforestation is <i className="text-neon-cyan">agriculture</i>, due 
                to increased demand and shifts in diet toward greater meat consumption. In 2022, the world 
                lost <i className="text-neon-cyan">more than 16 million acres</i> of forest according to the 2023 Forest 
                Declaration Assessment.<br/><i className="text-neon-cyan">Fires</i> are another cause of 
                forest loss, and they become problematic when they occur in the wrong place, at the wrong frequency, or at the wrong 
                severity.<br/>Another cause are infrastructures, in particular <i className="text-neon-cyan">linear 
                infrastructures</i> (such as roads, railways and canals) and dams. Transportation and energy infrastructure are 
                considered essential elements of a thriving economy, but they are often a major cause of negative environmental 
                impacts, particularly when poorly planned or built.
                </p>
                <p className="encode-sans pb-4 text-justify">
                Deforestation is mostly occurring in <i className="text-neon-cyan">tropical and subtropical regions</i> of 
                the world, where these forests are home to much of the world&apos;s biodiversity.<br/> 
                In the Amazon alone, around 17% of the forest has been lost in the last 50 years, mainly due to forest conversion 
                for cattle ranching. Deforestation in this region is especially rampant near more populated areas, roads, 
                and rivers, but remote areas have also been encroached upon with the discovery of valuable resources like gold and oil.<br/>
                The impact of deforestation is <i className="text-neon-cyan">huge</i> and regards various aspects: reduced biodiversity, 
                disruption of water cycle, increased greenhouse gas emissions, increased soil erosion and disruption of livelihoods 
                for indigenous people and local communities.
                </p>
              </div>

              <cite className="text-sm">Source: <a href="https://www.worldwildlife.org/threats/deforestation-and-forest-degradation"
              target='_blank' className='hover:underline underline-offset-[5px] decoration-1'>WWF - Deforestation and forest degradation</a>
              </cite>
            </div>

            <hr className="divider"></hr>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 my-8">
              <div className="bg-neon-cyan/30 rounded-sm p-2 h-fit">
                <div className="encode-sans pb-4 text-sm md:text-base text-justify">
                  <p className="italic pb-2">• How much deforestation occurs each year?</p>
                  <p>Over the decade since 2010, it is estimated that <i className="text-neon-cyan">10 million hectares</i> of forest were cut down each year. Deforestation rates were much significantly higher than net forest loss, which measures deforestation plus any gains in forest over a given period.<br/>
                  Forest recovery and plantation offsets a lot of deforestation, but often the positives of regrowing one hectare 
                  of forest don&apos;t offset the &apos;losses&apos; of one hectare of deforestation. Cutting down one hectare of rich, 
                  tropical rainforest cannot be completely compensate by the plantation of forest in a temperate country.<br/>
                  Forest expansion is positive, but does not negate the need to finally end deforestation. 
                  Deforestation rates are still high across the tropics.
                  </p>
                </div>
                <a href="https://ourworldindata.org/deforestation" target="_blank">
                  <img src="/chart/annual-deforestation.png" alt="global-deforestation"
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
                <p className="encode-sans pb-4 text-sm md:text-base text-justify">Forest loss captures two fundamental 
                impacts on forest cover: <i className="text-neon-cyan">deforestation</i> and <i className="text-neon-cyan">forest degradation.</i><br/>
                27% of global forest loss is driven by deforestation. The remaining 73% came from the three drivers 
                of forest degradation: logging of forestry products from plantations (26%); shifting, local agriculture (24%); 
                and wildfires (23%).<br/>95% of the world&apos;s deforestation occurs in the tropics, in contrast most forest degradation 
                occurs in temperate countries.
                </p>
                <a href="https://ourworldindata.org/deforestation#not-all-forest-loss-is-equal-what-is-the-difference-between-deforestation-and-forest-degradation"
                target="_blank">
                  <img src="/chart/forest-loss.png" alt="deforestation-and-net-loss"
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

            <div className="my-8">
              <h2 className="anta-regular pb-4 glowing-text white-shadow">Global forest cover</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:mt-6">
                <p className="encode-sans text-sm text-justify row-span-1">95% of the world&apos;s deforestation occurs in the tropics. In Latin America and Southeast Asia deforestation is driven mainly for the clearance of trees to grow crops such as palm oil and soy, and pasture for beef production.<br/> In contrast, most forest degradation occurs in temperate countries. Temperate regions have gone through a period of high deforestation rates in the past centuries (significant between 1700 and 1900), due to populations grow, costructions of infrastructure and demand for agricultural 
                land and fuel, before a slowing and reversal of this trend. Moving into the 20th century, there was a stepwise change: the hotspot of deforestation changed from Europe to tropical countries across Asia and Latin America. So today, 
                forest loss across North America and Europe is the result of harvesting forestry products from tree plantations, or tree loss in wildfires.<br/>
                Africa is different here. Forests are mainly cut and burned to make space for local, subsistence agriculture or 
                for fuelwood for energy. This &apos;shifting agriculture&apos; category can be difficult to allocate between deforestation and degradation: it often requires close monitoring over time to understand how permanent these agricultural practices are. Deforestation has greatly altered landscapes around the world. In this chart you can see how much forest area is lost on planet, from 1992. 
                </p>
                  
                <Forest/>
              </div>
            </div>

          </div>

        

          
      </div>
    </>
  )
}
