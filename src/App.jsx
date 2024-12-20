import Loader from './components/Loader'
import Pages from './pages/Pages'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BleepsProvider } from '@arwes/react';
import { Helmet } from 'react-helmet'


const bleepsSettings = {
  master: {
    volume: 0.4
  },
  bleeps: {
    intro: {
      sources: [ { src: 'https://arwes.dev/assets/sounds/intro.mp3', type: 'audio/mpeg' } ]
    },
    click: {
      sources: [ { src: 'https://arwes.dev/assets/sounds/click.mp3', type: 'audio/mpeg' } ]
    }
  }
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  

  return (
    <>
    <BrowserRouter>
      <Helmet>
        <meta charset="UTF-8" />
        <title>One Planet Project</title>
        <meta name="description" content="Stay informed and learn about CLIMATE CHANGE and its impacts" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="news, pollution, information, data, science, climate change, climate crisis, global warming, nasa, planet" />
        <meta name="author" content="Chiara Bissolo" />
        <meta property="og:title" content="One Planet Project" />
        <meta property="og:description" content="One Planet Project - a web app for climate change" />
        <meta property="og:image" content="/image-og.png" />
        <meta property="og:url" content="https://one-planet-project-web.vercel.app/" />
        <meta property="og:type" content="website"/>
        <link rel="canonical" href="https://one-planet-project-web.vercel.app/"/>
        <link rel="icon" type="image/png" href="/favicon/website-favicon.ico"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Encode+Sans+Expanded&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Anta&family=Encode+Sans+Expanded&display=swap" rel="stylesheet" />
      </Helmet>

      <BleepsProvider {...bleepsSettings}>
      
        {loading ? <Loader/> : <Pages/>}
       
      </BleepsProvider>
    </BrowserRouter>
    </>
  )
}

export default App