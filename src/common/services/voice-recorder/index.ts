declare global {
  interface Window {
    _voiceRecorder: VoiceRecorder;
  }
}

class VoiceRecorder {
  public mediaStream: MediaStream | null = null;
  public mediaRecorder: MediaRecorder | null = null;
  public chunks: Blob[] = [];
  public blob: Blob | null = null;
  public onblob: (blob: Blob) => void = () => {};

  constructor() {}

  public async start(): Promise<void> {
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      console.log('getUserMedia not supported on your browser!');

      return;
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      this.mediaRecorder = new MediaRecorder(this.mediaStream);

      this.mediaRecorder.addEventListener(
        'dataavailable',
        this.onDataAvailableHandler.bind(this)
      );

      this.mediaRecorder.addEventListener(
        'stop',
        this.onStopHandler.bind(this)
      );

      this.mediaRecorder.start();
    } catch (error) {
      console.log('The following getUserMedia error occurred: ' + error);
    }
  }

  private onDataAvailableHandler(event: BlobEvent) {
    this.chunks.push(event.data);
  }

  private onStopHandler() {
    const mimeType = this.mediaRecorder?.mimeType;

    this.blob = new Blob(this.chunks, { type: mimeType });

    this.chunks = [];

    this.mediaStream?.getTracks().forEach((track: MediaStreamTrack) => {
      track.stop();
    });

    this.onblob(this.blob);
  }

  public stop() {
    this.mediaRecorder?.stop();
  }

  public flush() {
    this.blob = null;
  }
}

export const voiceRecorder = new VoiceRecorder();

window._voiceRecorder = voiceRecorder;

export default VoiceRecorder;
