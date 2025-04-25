import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import BigWinScreen from './content/BigWinScreen/BigWinScreen'
import SlotMachine from './content/SlotMachine/SlotMachine'

import bigWinImage from '/images/BigWin.png'



function App() {
  const [duration, setDuration] = useState(4000);
  const [isRunning, setisRunning] = useState(false);
  
  const handleButtonOnPlay = () =>{
    if(isRunning) return;
    setisRunning(true);
    setTimeout(() => {
      setisRunning(false);
    }, duration);
  }

  useEffect(() => {
    setisRunning(true);
    setTimeout(() => {
      setisRunning(false);
    }, duration);
    return;
  }, []);

  return (
    <>
      <BigWinScreen>
        <img className='screen__title' src={bigWinImage} alt="Big Win" />
        <SlotMachine maxCount={1000} isRunning={isRunning} duration={duration}/>
        <button className='screen__button_repeat' onClick={handleButtonOnPlay}> Repeat </button>
      </BigWinScreen>
    </>
  )
}

export default App
