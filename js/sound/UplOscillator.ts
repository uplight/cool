/// <reference path="../libs/typings/easeljs.d.ts" />
/// <reference path="../libs/typings/jquery.d.ts" />
/// <reference path="../libs/typings/MediaStream.d.ts" />
/**
 * Created by Vlad  Titov http://uplight.ca  on 7/15/2014.
 */

module upl {
    export class Oscillator {
        private view: JQuery;
        private range: JQuery;
        private inicator: JQuery;
        private gain: GainNode;


        private audioContext: AudioContext;
        private oscillator: OscillatorNode;


        private currentValue: number;
        private volume: JQuery;
        private volumeInd: JQuery;


        constructor(prefix: string) {
            console.log('Oscillator');
            this.view = $('#' + prefix + '-oscillator');
            this.range = this.view.find('[data-id=an_range]:first').on('input', null, (evt: JQueryEventObject) => this.onRangeChanged(evt));
            this.inicator = this.view.find('[data-id=frequency]:first');


            var audioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new audioContext();

            this.view.find('[name=wave]').on('click', null, (evt: JQueryEventObject) => this.onWavesClick(evt));
            this.view.find('[data-id=onoff]').on('click', null, (evt: JQueryEventObject) => this.onOnOffClick(evt));

            this.volume = this.view.find('[data-id=volume]').on('input', null, (evt: JQueryEventObject) => this.onVolume(evt));
            this.volumeInd = this.view.find('[data-id=volumeind]').text(this.volume.val());

        }
               
        private onVolume(evt: JQueryEventObject): void {
            var val: number = this.volume.val();
            if (this.gain) this.gain.gain.value = val;
            this.volumeInd.text(val);


        }
        private createOscillator(): void {

            this.oscillator = this.audioContext.createOscillator();
            this.gain = this.audioContext.createGain();
            this.gain.gain.value = this.volume.val();
            this.onRangeChanged();

            this.gain.connect(this.audioContext.destination);
            this.oscillator.connect(this.gain);
            this.oscillator.start(0);
        }
        private onOnOffClick(evt: JQueryEventObject): void {
            if ($(evt.currentTarget).is(':checked')) this.createOscillator();
            else this.oscillator.stop(0);

        }

        private onWavesClick(evt: JQueryEventObject): void {
            if (!$(evt.currentTarget).is(':checked')) return;

            switch (String($(evt.currentTarget).data('id'))) {
                case 'sin':
                    this.oscillator.type = OscillatorType.sine;//'sine';
                    break;
                case 'square':
                    this.oscillator.type = OscillatorType.square;//'square';
                    break;
                case 'triangle':
                    this.oscillator.type = OscillatorType.triangle;//'triangle';
                    break;
                case 'sawtooth':
                    this.oscillator.type = OscillatorType.sawtooth;//'sawtooth';
                    break;


            }


        }
        
        private onRangeChanged(evt: JQueryEventObject= null): void {
            var val: number = this.range.val();

            val = Math.round(Math.pow(val, 3));
            this.inicator.text(val);
            if (this.oscillator) this.oscillator.frequency.value = val;
        }
    }

    export class ImageToArray {
        private d2: CanvasRenderingContext2D;
        private stage: c.Stage;
        private btnLoad: JQuery;

        constructor(container: HTMLDivElement) {
            var canvas: HTMLCanvasElement = document.createElement("canvas");
            container.appendChild(canvas);
            this.d2 = canvas.getContext('2d');
            var stage: c.Stage = new c.Stage(canvas);
            this.stage = stage;
        }

    }


    import c = createjs;

    export class CustomWave {
        private stage: c.Stage;
        private d2: CanvasRenderingContext2D;
        private dots: c.Container;
        private lines: c.Container;
        private draw: c.Shape;

        constructor(container: HTMLDivElement) {            
            var canvas:HTMLCanvasElement = document.createElement("canvas");
            container.appendChild(canvas);
            this.d2 = canvas.getContext('2d');
            var stage: c.Stage = new c.Stage(canvas);
            this.stage = stage;
            this.stage.addEventListener('mousedown', (evt: MouseEvent) => this.mouseDown(evt));
            this.stage.addEventListener('mouseup', (evt: MouseEvent) => this.mouseUp(evt));
            this.stage.addEventListener('mousemove', (evt: MouseEvent) => this.mouseMove(evt));
        }


        private mouseDown(evt: MouseEvent): void {

        }
        private mouseUp(evt: MouseEvent): void {

        }

        private mouseMove(evt: MouseEvent): void {

        }

    }

    class Dot extends c.Container  {

        joins: number[];
        x: number;
        y: number;

        private d: number = 3;
        private color: string = '#000000';
        private over: c.Shape;       
        model:VODot
       

        constructor(dot:VODot) {
            super();
            this.name = dot.id.toString();
            this.x = dot.x;
            this.y = dot.y;           

            this.model = dot;

            var sh: c.Shape = new c.Shape();
           
            sh.graphics.beginFill(this.color);
            sh.graphics.drawCircle(0, 0, this.d);
            sh.graphics.endFill();
            this.addChild(sh);
            this.addEventListener('mouseover', (evt: MouseEvent) => this.onMouseOver(evt));
            this.addEventListener('mouseout', (evt: MouseEvent) => this.onMouseOut(evt));

        }

        private onMouseOver(evt: MouseEvent): void {
           

        }

        private onMouseOut(evt: MouseEvent): void {


        }
   
    }
    export class VODot {

        constructor(public id: number, public x: number, public y: number, public joins: number[]= null) { }
    }
}