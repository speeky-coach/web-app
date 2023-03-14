class MyWorkletProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.port.onmessage = this.handleMessage.bind(this);
    this.bufferSize = 4096;
    this.inputBuffer = new Float32Array(this.bufferSize);
    this.continueProcessing = true;
  }

  handleMessage(event) {
    if (event.data === 'stop') {
      this.port.close();
      this.port.onmessage = null;
      this.continueProcessing = false;
    }
  }

  process(inputs, outputs, parameters) {
    let input = inputs[0][0];

    for (let i = 0; i < this.bufferSize; i++) {
      this.inputBuffer[i] = input[i];
    }

    let pcmEncodedData = this.encodePCM(this.inputBuffer);
    this.port.postMessage({ buffer: pcmEncodedData });
    return this.continueProcessing;
  }

  encodePCM(samples) {
    let buffer = new ArrayBuffer(samples.length * 2);
    let view = new DataView(buffer);

    for (let i = 0; i < samples.length; i++) {
      let val = samples[i];
      view.setInt16(i * 2, val * 0x7fff, true);
    }

    return buffer;
  }

  encodeRAW(samples) {
    let buffer = new ArrayBuffer(samples.length * 4);
    let view = new DataView(buffer);

    for (let i = 0; i < samples.length; i++) {
      let val = samples[i];
      view.setFloat32(i * 4, val, true);
    }

    return buffer;
  }
}

registerProcessor('my-worklet-processor', MyWorkletProcessor);
