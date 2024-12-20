import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Searchbar from './Searchbar';
import Topics from './Topics';
import { motion } from 'framer-motion';


export default function Header() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1)
    }

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    
    return (
    <>
        <header className='encode-sans flex flex-col text-sm p-8 mb-12 bg-gray-800'>
            <Link to='/'>
                <h1 className='anta-regular text-3xl my-4 md:mt-0 text-center glitch' data-text='One Planet Project'>One Planet Project</h1>
            </Link>
            

            <div className='flex flex-col md:flex-row justify-between items-center md:items-end'>
                <div className='flex flex-col items-center md:items-start md:mx-4'>
                    <button type='button' onClick={handleBack}
                    className='flex flex-row items-center my-4 md:my-0 hover:text-neon-cyan'>
                        <FontAwesomeIcon icon={faArrowLeft} className='mr-3'/>Back
                    </button>
                    <div className='uppercase gradient-text underline-gradient font-semibold my-6 md:mt-3 md:mb-0'>
                        <Link to='/act-now'>act now for planet</Link>
                    </div> 
                </div>

                <div className='flex flex-col md:flex-row md:items-end'>
                    <Searchbar />
                    <button type='button' onClick={toggleDropdown}
                    className='flex flex-row justify-center items-center mt-8 hover:text-neon-cyan md:mx-4 md:ml-12'>
                        Topics<FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} className='ml-3'/>
                    </button>
                </div>
                
            </div>

            <nav className='flex flex-row justify-center md:justify-end'>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <Topics/>
                    </motion.div>
                )}   
            </nav>
        </header>
        
    </>
    )
}
