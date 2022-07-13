import React from 'react';
import './services/voice-recorder';
import VoicePanel from './components/voice-panel/VoicePanel';

function App() {
  return (
    <div className="App">
      <header className="App-header">Speeky</header>
      <main>
        <VoicePanel />
      </main>
    </div>
  );
}

export default App;
