import React from 'react';
import Equalizer from './features/equalizer/Equalizer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Equalizer audioFile="/BoxCat_Games_-_05_-_Battle_Boss.mp3" />
      </header>
    </div>
  );
}

export default App;
