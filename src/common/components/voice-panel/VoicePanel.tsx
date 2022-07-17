import { useEffect, useRef, useState } from 'react';
import { voiceRecorder } from '../../services/voice-recorder';

function VoicePanel() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  async function onStartHandler() {
    await voiceRecorder.start();

    setIsRecording(true);
  }

  function onStopHandler() {
    voiceRecorder.stop();

    setIsRecording(false);
  }

  useEffect(() => {
    voiceRecorder.onblob = function (blob: Blob) {
      if (!audioRef || !audioRef.current) return;

      const audioURL = window.URL.createObjectURL(blob);

      audioRef.current.src = audioURL;
    };
  }, []);

  const display = isRecording ? 'recording...' : 'waiting to start';

  return (
    <div>
      <div>{display}</div>
      <div>
        <button onClick={onStartHandler}>Start</button>
        <button onClick={onStopHandler}>Stop</button>
      </div>
      <div>
        <audio controls ref={audioRef}></audio>
      </div>
    </div>
  );
}

export default VoicePanel;
