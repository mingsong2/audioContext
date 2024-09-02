import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Record from './record.js';
import "./HZRecorder.js";
function App() {
  var recorder;
  const audioRef = useRef(null);
  const recordInstance = new Record();
  const [count, setCount] = useState(0)
  const startRecord = () => {
    // recordInstance.startRecord();
    HZRecorder.get(function (rec) {
      recorder = rec;
      console.log("rec",rec);
      recorder.start();
    });
  }
  const stopRecord = () => {
    // recordInstance.stopRecord();
    recorder.stop();
  }
  const playRecord = () => {
    recorder.play(audioRef.current);
  } 
  const uploadRecord = () => {
    recorder.upload();
  }
  return (
    <>
      <audio ref={audioRef} controls autoPlay></audio>
      <button onClick={startRecord}>开始录音</button>
      <button onClick={stopRecord}>停止录音</button>
      <button onClick={playRecord}>开始播放</button>
      <button onClick={uploadRecord}>提交</button>
    </>
  )
}

export default App
