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

      mediaRecorder.addEventListener('dataavailable', async (event) => {
        console.log('data available');
        console.log(event.data);

        chunks.push(event.data);

        // Read the binary data from the Blob
        const buffer = await event.data.arrayBuffer();

        // get data from buffer and convert to base64
        const base64 = btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );

        const payload = {
          data: base64,
          userId: '123',
          conversationId: 'abc',
          status: 'in-progress',
        };

        mqttClient?.publish('audio/upload', JSON.stringify(payload));
      });

      mediaRecorder.addEventListener('stop', () => {
        console.log('stop');

        console.log('chunks', chunks);

        chunks = [];

        mqttClient?.end();
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

    const payload = {
      userId: '123',
      conversationId: 'abc',
      status: 'stopped',
    };

    mqttClient?.publish('audio/end', JSON.stringify(payload));

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
