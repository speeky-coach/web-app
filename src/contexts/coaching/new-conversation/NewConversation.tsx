import React from 'react';

let stream: MediaStream | null = null;
let mediaRecorder: MediaRecorder | null = null;

let chunks: any[] = [];

interface NewConversationProps {}

function NewConversation({}: NewConversationProps) {
  const [isRecording, setRecording] = React.useState(false);

  const buttonText = isRecording ? 'Stop' : 'Start';

  async function startRecording() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener('dataavailable', (event) => {
        console.log('data available');
        console.log(event.data);

        chunks.push(event.data);
      });

      mediaRecorder.start(1000);

      setRecording(true);
    } catch (err) {
      console.log('error', err);
    }
  }

  async function stopRecording() {
    if (!stream) return;

    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    if (!mediaRecorder) return;

    mediaRecorder.stop();

    const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recorded-audio.webm';
    link.click();
    URL.revokeObjectURL(url);

    console.log('blob', blob);
    console.log('chunks', chunks);

    chunks = [];

    setRecording(false);
  }

  return (
    <div>
      <h2>New Conversation</h2>

      <div>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default NewConversation;
