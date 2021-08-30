import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import { Body } from './UI/Body/Body';
import { Header } from './UI/Header/Header';

function App() {

  //true - pc, false - phone
  let [mode, setMode] = useState(true)
  const changeMode = () =>{
    if(window.innerWidth>760){
      setMode(true)
    }else{
      setMode(false)
    }
  }


  useEffect(()=>{
    changeMode()
    window.addEventListener('resize',changeMode)
  },[])
  return (
    <HashRouter>
    <div>
      <Header/>      
    </div>
    <div className="mt-3">
      <Body mode={mode}/>
    </div>
    </HashRouter>
  );
}

export default App;
