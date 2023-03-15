import React from 'react';
// import mqtt from 'mqtt'
// declare mqtt as a global variable
// declare const mqtt: any;
// declare mqtt as attribute of window that is included by https://unpkg.com/mqtt/dist/mqtt.min.js
declare global {
  interface Window {
    mqtt: any;
  }
}

let mqttClient: any | null = null;
let stream: MediaStream | null = null;
let mediaRecorder: MediaRecorder | null = null;

let chunks: any[] = [];

interface NewConversationProps {}

function NewConversation({}: NewConversationProps) {
  const [isRecording, setRecording] = React.useState(false);

  const buttonText = isRecording ? 'Stop' : 'Start';

  async function startRecording() {
    try {
      const options = {
        clean: true, // retain session
        connectTimeout: 4000, // Timeout period
        // Authentication information
        clientId: 'speeky_user_1',
        username: 'speeky_user_1',
      };

      mqttClient = window.mqtt.connect('ws://localhost:8083/mqtt', options);
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener('dataavailable', (event) => {
        console.log('data available');
        console.log(event.data);

        chunks.push(event.data);

        const payload = {
          data: event.data,
          userId: '123',
          conversationId: 'abc',
        };

        mqttClient?.publish('audio', JSON.stringify(payload));
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

      tracks.forEach((track) => {
        track.stop();
      });
    }

    if (mediaRecorder) {
      mediaRecorder.stop();
    }

    if (mqttClient) {
      mqttClient.end();
    }

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
