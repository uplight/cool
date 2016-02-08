// Type definitions for WebRTC
// Project: http://dev.w3.org/2011/webrtc/
// Definitions by: Ken Smith <https://github.com/smithkl42/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Taken from http://dev.w3.org/2011/webrtc/editor/getusermedia.html
/*
interface BiquadFilterNode extends AudioNode {
    Q: number;
    frequency: { value: number };
    gain: number
    type: string;
    getFrequencyResponse(frequencyHz: any, magResponse: any, phaseResponse: any): Object
    NOTCH:string
}

interface AudioDestinationNode extends AudioNode {


}
interface AudioBuffer {
    getChanelData(num: number): Float32Array

}
interface AudioProcessingEvent extends Event {
    inputBuffer: AudioBuffer;
    outputBuffer: AudioBuffer;
}
interface ScriptProcessorNode extends AudioNode{
    onaudioprocess: (evt: AudioProcessingEvent) => void;
    bufferSize: number;
}
interface AudioListener {


}

interface AnalyserNode extends AudioNode {
    fftSize: number
    frequencyBinCount: number;
    minDecibels: number;
    maxDecibels: number;
    smoothingTimeConstant: number;
    getFloatFrequencyData(): number[]; //Float array
    getByteFrequencyData(): number[];//byte array
    getByteTimeDomainData(araay:Uint8Array): number[]//unsigned byte array


}
interface GainNode extends AudioNode{
    gain: { value: number };

}
interface ChannelSplitterNode extends MediaStreamAudioSourceNode  {

    //connect(merger: ChannelMergerNode, num1: number, num2: number):void;
}
interface ChannelMergerNode extends AudioNode {


}
interface MediaStreamAudioDestinationNode extends AudioNode {
    stream: MediaStream;
}

interface JavaScriptNode {


}


interface AudioNode {
    context: AudioContext;
    numberOfInputs: number;
    numberOfOutputs: number;
    connect(destination: AudioNode, output?:number,input?:number);
    disconnect(output?:number);
}


interface OscillatorNode extends AudioNode {
    frequency: { value: number };
    detune: any;
    type: string;
    setWaveTable(waveTable: any);
    start(time: number);
    stop(time: number);

}
*/
declare class OscillatorType {
    static sine:string;
    static square:string;
    static sawtooth:string;
    static triangle:string;
    static custom:string;
}

interface MediaStreamAudioSourceNode extends AudioNode{

}

interface AudioMediaStreamTrack extends AudioNode {
    stream: MediaStream;
}
interface AudioContext  {
    new (): AudioContext;
    createGain(): GainNode;
  //  sampleRate: number;
    ended: boolean;
   // destination: AudioDestinationNode;
   // listener: AudioListener
   // currentTime: number;
    oncomplete: Function;
    createMediaStreamSource(straem: MediaStream): MediaStreamAudioSourceNode;
   // createJavaScriptNode(bufferSize: number, numInputChannels: number, numOutputChannels: number): JavaScriptNode;
    createChannelSplitter(num: number): ChannelSplitterNode;
    createChannelMerger(num: number): ChannelMergerNode;
    createBiquadFilter(): BiquadFilterNode;
    createAnalyser(): AnalyserNode
    createMediaStreamDestination(): AudioMediaStreamTrack
    createScriptProcessor(buffer: number, inputs: number, outputs: number): ScriptProcessorNode;
    createOscillator(): OscillatorNode;
}


interface Window {
    webkitAudioContext: AudioContext;
    AudioContext: AudioContext;
}
//declare  window.webkitAudioContext()

interface MediaStreamConstraints {
	audio: any;
	video: any;
}
declare var MediaStreamConstraints: {
	prototype: MediaStreamConstraints;
	new (): MediaStreamConstraints;
}

interface MediaTrackConstraints {
	mandatory: MediaTrackConstraintSet;
	optional: MediaTrackConstraint[];
}
declare var MediaTrackConstraints: {
	prototype: MediaTrackConstraints;
	new (): MediaTrackConstraints;
}

// ks - Not defined in the source doc.
interface MediaTrackConstraintSet {
}
declare var MediaTrackConstraintSet: {
	prototype: MediaTrackConstraintSet;
	new (): MediaTrackConstraintSet;
}

// ks - Not defined in the source doc.
interface MediaTrackConstraint {
}
declare var MediaTrackConstraint: {
	prototype: MediaTrackConstraint;
	new (): MediaTrackConstraints;
}

interface Navigator {
	getUserMedia(constraints: MediaStreamConstraints, successCallback: (stream: any) => void, errorCallback: (error: Error) => void);
	webkitGetUserMedia(constraints: MediaStreamConstraints, successCallback: (stream: any) => void, errorCallback: (error: Error) => void);
}

interface EventHandler { (event: Event): void; }

interface NavigatorUserMediaSuccessCallback { (stream: LocalMediaStream): void; }

interface NavigatorUserMediaError {
	PERMISSION_DENIED: number; // = 1;
	code: number;
}
declare var NavigatorUserMediaError: {
	prototype: NavigatorUserMediaError;
	new (): NavigatorUserMediaError;
	PERMISSION_DENIED: number; // = 1;
}

interface NavigatorUserMediaErrorCallback { (error: NavigatorUserMediaError): void; }

interface MediaStreamTrackList {
	length: number;
	item: MediaStreamTrack;
	add(track: MediaStreamTrack): void;
	remove(track: MediaStreamTrack): void;
	onaddtrack: (event: Event) => void;
	onremovetrack: (event: Event) => void;
}
declare var MediaStreamTrackList: {
	prototype: MediaStreamTrackList;
	new (): MediaStreamTrackList;
}
declare var webkitMediaStreamTrackList: {
	prototype: MediaStreamTrackList;
	new (): MediaStreamTrackList;
}

interface MediaStream {
	label: string;
	id: string;
	getAudioTracks(): MediaStreamTrackList;
	getVideoTracks(): MediaStreamTrackList;
	ended: boolean;
	onended: (event: Event) => void;
}
declare var MediaStream: {
	prototype: MediaStream;
	new (): MediaStream;
	new (trackContainers: MediaStream[]): MediaStream;
	new (trackContainers: MediaStreamTrackList[]): MediaStream;
	new (trackContainers: MediaStreamTrack[]): MediaStream;
}
declare var webkitMediaStream: {
	prototype: MediaStream;
	new (): MediaStream;
	new (trackContainers: MediaStream[]): MediaStream;
	new (trackContainers: MediaStreamTrackList[]): MediaStream;
	new (trackContainers: MediaStreamTrack[]): MediaStream;
}

// an - not defined in source doc.
interface SourceInfo {
	label: string;
	id: string;
	kind: string;
	facing: string;
}
declare var SourceInfo: {
	prototype: SourceInfo;
}

interface LocalMediaStream extends MediaStream {
	stop(): void;
}

interface MediaStreamTrack {
	kind: string;
	label: string;
	enabled: boolean;
	LIVE: number; // = 0;
	MUTED: number; // = 1;
	ENDED: number; // = 2;
	readyState: number;
	onmute: (event: Event) => void;
	onunmute: (event: Event) => void;
	onended: (event: Event) => void;
}

declare var MediaStreamTrack: {
	prototype: MediaStreamTrack;
	new (): MediaStreamTrack;
	LIVE: number; // = 0;
	MUTED: number; // = 1;
	ENDED: number; // = 2;
	getSources: (callback: (sources: SourceInfo[]) => void) => void;
}

interface streamURL extends URL {
	createObjectURL(stream: MediaStream): string;
}
//declare var URL: {
//	prototype: MediaStreamTrack;
//	new (): URL;
//	createObjectURL(stream: MediaStream): string;
//}

interface WebkitURL extends streamURL {
}
declare var webkitURL: {
	prototype: WebkitURL;
	new (): streamURL;
	createObjectURL(stream: MediaStream): string;
}
 
