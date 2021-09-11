import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import './App.css';
import { setProfileAsync } from './BLL/Reducers/profileReducer';
import { Body } from './UI/Body/Body';
import { Footer } from './UI/Footer/Footer';
import { Header } from './UI/Header/Header';

export const ModeContext = React.createContext(true)

function App() {

  const dispatch = useDispatch()

  //true - pc, false - phone
  let [mode, setMode] = useState(true)
  const changeMode = () => {
    if (window.innerWidth > 760) {
      setMode(true)
    } else {
      setMode(false)
    }
  }


  useEffect(() => {
    changeMode()
    window.addEventListener('resize', changeMode)

    return () => {
      window.removeEventListener('resize', changeMode)
    }
  }, [])
  return (
    <HashRouter>
      <ModeContext.Provider value={mode}>
      <div style={{ height: '100%' }}>
        <div>
          <Header />
        </div>
        <div className="mt-3" style={{ marginBottom: 100 }}>
          <Body mode={mode} />
        </div>
        <div style={{ width: '100%', position: 'fixed', bottom: 0 }}>
          <Footer />
        </div>
      </div>
      </ModeContext.Provider>
    </HashRouter>

  );
}

export default App;
