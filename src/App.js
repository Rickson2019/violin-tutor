import React from 'react';

import PitchPractice from './pages/PitchPractice/PitchPractice'
import MusicSymbols from './pages/MusicSymbols/MusicSymbols'
import NoteReading from './pages/NoteReading/NoteReading'

import AppBar from './pages/AppBar/AppBar'
import WelcomePage from './pages/WelcomePage/WelcomePage'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";

import NotLiveRoute from 'react-live-route'
import { withRouter } from 'react-router-dom'

const LiveRoute = withRouter(NotLiveRoute)

function App() {
  return (
   
      <div className="App">
        <div id='top'>
          <AppBar />
          <WelcomePage />
        </div>

        <div id='mid'>
          <LiveRoute path='/pitch-practice' component={PitchPractice} alwaysLive={true} />
          <LiveRoute exact path='/music-symbols-practice' component={MusicSymbols} alwaysLive={true} />
          <LiveRoute exact path='/sight-reading-practice' component={NoteReading} alwaysLive={true} />


        </div>

        {/* <div id='bottom'>
          <Link to='/pitch-practice'>Pitch</Link>
          <Link to='/music-symbols-practice'>music-symbols</Link>
        </div> */}

      </div>
   
  );
}

export default App;
