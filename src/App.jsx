import React, { useState, useEffect }from 'react';
import Timer from './componenets/Timer';
import WinAudio from './audio/win.mp3';

export default function App() {

  const [time, setTime] = useState(15);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const seconds = time * 60;

  const countDown = () => {
    isPaused ? [setIsPaused(false), setTimeRemaining(timeRemaining - 1)] : setTimeRemaining(seconds);
    // The above code is the below refactored.
    // if(isPaused === false) {
    //   setTimeRemaining(seconds)
    // } else {
    //   setIsPaused(false);
    //   setTimeRemaining(timeRemaining - 1)
    // }
  };

  const minutesRemaining = Math.floor(timeRemaining/60)
  const secondsRemaining = timeRemaining % 60
  
  const TimerDisplay = () => {
    let result = {};
    if(minutesRemaining < 10) {
      result.minutesRemaining = `0${minutesRemaining}`
    } else {result.minutesRemaining = minutesRemaining}
    
    if(secondsRemaining < 10) {
      result.secondsRemaining = `0${secondsRemaining}`
    } else {result.secondsRemaining = secondsRemaining}
    return <h1 className='timer-display' >{result.minutesRemaining}:{result.secondsRemaining}</h1>
  }
  
  let intervel = null;

  const pauseCount = () => {
    setIsPaused(true);
    clearInterval(intervel);
  }

  const stopCount = () => {
    setTimeRemaining(0)
    // clearInterval(intervel) //use this to create pause feature.
  }

  useEffect(() => {
    const timerNoise = document.getElementsByClassName('audio-win')[0]

    if(timeRemaining <= 0) {
      clearInterval(intervel);
      timerNoise.play()
    } else {
      intervel = setInterval(() => {
        setTimeRemaining(timeRemaining => timeRemaining - 1)
      },1000);
      return () => clearInterval(intervel);
    }
  }, [timeRemaining]);

  let timeOptions = [];
  for(let i = 0; i < 26; i++) {
    timeOptions.push(<option value={i} key={i}>{i}</option>)
  }

  return(
    <div className='app-body'>
      {/* <input 
        type={'number'} 
        value={time} 
        onChange={(e) => setTime(e.target.value)}
      /> */}
      <TimerDisplay/>
      <select
        value={time} 
        onChange={(e) => setTime(e.target.value)}
      >
        {timeOptions}
      </select>
      <button onClick={countDown}>🏁</button>
      <button onClick={pauseCount}>⏸</button>
      <button onClick={stopCount}>🛑</button>
      <audio className='audio-win'>
        <source src={WinAudio} type='audio/mpeg'/>
      </audio>
    </div>
  )
}
