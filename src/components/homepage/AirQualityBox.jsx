//import '../homepage.css'
import Searchbar from '../header/Searchbar';
import { FrameSVGCorners } from '@arwes/react-frames';


export default function AirQualityBox() {

    return (
    <>
      <div className='flex flex-col mb-5 lg:m-0'>
        <div style={{
            position: 'relative',
            width: '100%',
            height: 'fit-content',
            zIndex: 1,
            }} className='svg-cyber'>
            <FrameSVGCorners
            cornerLength={28}
            strokeWidth={1.2}
            />
        
            <div className='text-center m-6 fade-2'>
              <h3 className='anta-regular text-neon-pink pink-shadow glowing-text text-xl'>Air quality index</h3>
              <Searchbar/>
            </div>
        </div>
      </div>
    </>
    )
}
