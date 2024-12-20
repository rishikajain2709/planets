import { useBleeps } from '@arwes/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Searchbar() {
  const bleeps = useBleeps();

  const [search, setSearch] = useState('');
  const navigate = useNavigate()
    
  const handleSearchClick = () => {
      if (search.trim() === '') {
          alert('Input search is empty or not valid. Please insert a valid input.')
      } else {
          navigate('/location-searched/' + search);
      }
      setSearch('')
  }

  return (
    <>
        <div className="flex flex-col justify-center items-center">

          <div className='mt-3 text-start encode-sans relative'>
            <label className='text-sm text-white'>Monitoring pollutant levels:</label>

            <div className='w-max mt-2 bg-zinc-50/50 px-2 py-1 rounded-sm text-start'>
              <input 
                type='text' 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder='Search location...'
                className='caret-neon-pink bg-transparent placeholder-zinc-50 text-sm text-dark'/>
                <FontAwesomeIcon 
                  icon={faMagnifyingGlass}
                  onClick={() => { bleeps.click?.play(); handleSearchClick() }}
                  className='text-dark cursor-pointer hover:text-neon-pink'/>
            </div>
          </div>

        </div>
    </>
  )
}
