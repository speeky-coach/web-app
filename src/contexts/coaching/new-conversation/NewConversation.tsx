import React from 'react';
import axios, { AxiosInstance } from 'axios';

let stream: MediaStream | null = null;
let audioContext: AudioContext | null = null;
let input: MediaStreamAudioSourceNode | null = null;
const workletUrl = '/js/worklet.js';
let workletNode: AudioWorkletNode | null = null;

let chunks: any[] = [];

let client: AxiosInstance | null = null;

function sendChunksToServer() {
  /* 
  transform this into a stream and send it to the server using axios
  let formData = new FormData();
  for (let i = 0; i < chunks.length; i++) {
    formData.append('audio[]', chunks[i]);
  }
  xhr.send(formData); */
  if (!client) return;

  client.post('/coaching/conversations', chunks);

  chunks = [];
}

interface NewConversationProps {}

function NewConversation({}: NewConversationProps) {
  const [isRecording, setRecording] = React.useState(false);

  const buttonText = isRecording ? 'Stop' : 'Start';

  async function startRecording() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new AudioContext();
      input = audioContext.createMediaStreamSource(stream);

      await audioContext.audioWorklet.addModule(workletUrl);
      workletNode = new AudioWorkletNode(audioContext, 'my-worklet-processor');
      workletNode.port.onmessage = (event) => {
        console.log('message', event.data);

        let pcmEncodedData = event.data.buffer;
        chunks.push(pcmEncodedData);
        if (chunks.length >= 10) {
          sendChunksToServer();
        }
      };

      input.connect(workletNode);
      workletNode.connect(audioContext.destination);

      // set client as axios instance that will send the audio data to the server as stream
      client = axios.create({
        baseURL: 'http://localhost:4000',
        headers: {
          'Content-Type': 'audio/wav',
        },
        responseType: 'stream',
      });

      setRecording(true);
    } catch (err) {
      console.log('error', err);
    }
  }

  async function stopRecording() {
    if (!stream) return;

    stream.getTracks().forEach((track) => track.stop());

    if (!workletNode) return;

    workletNode.port.postMessage('stop');

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
