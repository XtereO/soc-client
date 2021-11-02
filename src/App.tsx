import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import './App.css';
import { setLastMessage, setMessagesState } from './BLL/Reducers/chatReducer';
import { setActiveMusic, setPlayedMusicInterval, setPlayingMusic } from './BLL/Reducers/playerReducer';
import { setNamesState, setProfile, setProfileAsync } from './BLL/Reducers/profileReducer';
import { chatSelector, messagesSelector } from './BLL/Selectors/chatSelector';
import { activeMusicDetailsSelector, activeMusicSettingsSelector, modeSelector, musicsSelector } from './BLL/Selectors/playerSelector';
import { backendURL } from './Consts';
import { streamMessage } from './DAL/api';
import { ChatType } from './Types/chat';
import { MusicType } from './Types/music';
import { Body } from './UI/Body/Body';
import { Footer } from './UI/Footer/Footer';
import { Header } from './UI/Header/Header';
import { getLastItem } from './utils';

export const ModeContext = React.createContext(true)

function App() {

  const dispatch = useDispatch()
  const { isMusicPlay, playedInterval, duration } = useSelector(activeMusicSettingsSelector)
  const musicMode = useSelector(modeSelector)
  const musics = useSelector(musicsSelector)
  const activeMusicDetails = useSelector(activeMusicDetailsSelector)
  const activeChat = useSelector(chatSelector)
  const messages = useSelector(messagesSelector)

  useEffect(()=>{
    subscribe()
  },[])
  const subscribe = async ()=>{
    try{
      const {data} = await streamMessage()
      //@ts-ignore
      dispatch(setMessagesState([data.message],true,data.chat.chatId))
      dispatch(setProfile(data.user,true))
      await subscribe()
    }catch(e){
      setTimeout(()=>{
        subscribe()
      },5000)
    } 
  }

  useEffect(() => {
    let timerId = setTimeout(() => {
      
      if (isMusicPlay && duration > playedInterval) {
        dispatch(setPlayedMusicInterval())
      } else if(duration < playedInterval){
        dispatch(setPlayedMusicInterval(0.1))
        if (musics.length !== 1 && musicMode!=='Repeat') {
          let newAudio: HTMLAudioElement;
          let newMusic: MusicType;
          switch (musicMode) {
            case 'Usual':
              let currentMusicId = 0
              musics.forEach((m, index) => {
                if (m.musicId === activeMusicDetails?.musicId) {
                  currentMusicId = index
                }
              })
              if ((currentMusicId + 1) < musics.length) {
                newAudio = new Audio(backendURL+musics[currentMusicId + 1].musicSrc)
                newMusic = musics[currentMusicId + 1]
              } else {
                newAudio = new Audio(backendURL+musics[0].musicSrc)
                newMusic = musics[0]
              }
              break
            case 'Shufle':
              const filterMusics = musics.filter(m => m.musicId !== activeMusicDetails?.musicId)
              const randomIndex = Math.round((filterMusics.length - 1) * (Math.random()))
              newMusic = filterMusics[randomIndex]
              newAudio = new Audio(backendURL+newMusic.musicSrc)
              break
          }
          dispatch(setPlayingMusic(false))
          //@ts-ignore
          newAudio.addEventListener('loadedmetadata', () => {
            dispatch(setActiveMusic(newMusic, newAudio))
          })
        }else{
          dispatch(setPlayingMusic(true))
        }
      }
    }, 1000)
    if ((!isMusicPlay)) {
      clearTimeout(timerId)
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [isMusicPlay,playedInterval])


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
