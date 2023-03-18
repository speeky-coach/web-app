import React from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

socket.on('connect', () => {
  console.log(socket.id);
});

socket.on('data', () => {
  // ...
});

socket.on('disconnect', (reason) => {
  // ...
});

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

      const payload = {
        userId: '123',
        conversationId: 'abc',
        status: 'started',
      };

      socket.emit('new-conversation-started', payload);

      mediaRecorder.addEventListener('dataavailable', async (event) => {
        console.log('data available');
        console.log(event.data);

        chunks.push(event.data);

        const payload = {
          data: event.data,
          userId: '123',
          conversationId: 'abc',
          status: 'in-progress',
        };

        socket.emit('new-conversation-in-progress', payload);
      });

      mediaRecorder.addEventListener('stop', () => {
        console.log('stop');

        console.log('chunks', chunks);

        chunks = [];

        const payload = {
          userId: '123',
          conversationId: 'abc',
          status: 'stopped',
        };

        socket.emit('new-conversation-stopped', payload);
      });

      mediaRecorder.start(2000);

      setRecording(true);
    } catch (err) {
      console.log('error', err);
    }
  }

  async function stopRecording() {
    if (stream) {
      const tracks = stream.getTracks();
      console.log('tracks', tracks);

      tracks.forEach((track) => {
        track.stop();
      });
    }

    if (mediaRecorder) {
      mediaRecorder.stop();
    }

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
