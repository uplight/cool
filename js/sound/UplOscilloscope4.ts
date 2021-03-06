﻿/// <reference path="../libs/typings/easeljs.d.ts" />
/// <reference path="../libs/typings/MediaStream.d.ts" />
/// <reference path="../libs/typings/jquery.d.ts" />
/**
 * Created by Vlad  Titov http://uplight.ca  on 7/5/2014.
 */
module upl {

    import c = createjs;
declare var  MediaDevices:any
    export class Oscilloscope {

        private stage: c.Stage;
       // private line: c.Shape;
        private view: JQuery;
        private select: JQuery;

        private jsNode: ScriptProcessorNode;
        private audioContext: AudioContext;
        private mediaStriam: MediaStream;
        
        private wetGain: GainNode
        private dryGain: GainNode
        private effectInput: GainNode        
        private lineColor: string;
        private bufferSize:number=2048;
        private speed: HTMLSpanElement;
        private width: number;
        private oscAnalyser:OscRecorder

        private btnStartStop:JQuery;
        private lengthV:JQuery

        private isRecording:number=0;

        private dataV:JQuery;

        private btnPrint:JQuery;
        private btnClear: JQuery;
        private maxValue: HTMLSpanElement;

        private sensitivityV:JQuery;
        private sensitivity:number=0;

        constructor(private prefix: string) {

            var view: JQuery = $('#' + prefix+'-oscilloscope');
            this.stage = new c.Stage(document.getElementById(prefix+'-screen1'));

            this.bufferSize=Number(view.data('buffer') || 2048);
            this.select = view.find('[data-id=input_select]:first').on('change', null, (evt: JQueryEventObject) => this.onInputChanged(evt));

            var canvas:JQuery=$('#'+prefix+'-screen1');

            this.lineColor = String(canvas.data('color')) || '#000000';
            this.width = canvas.width();

            var audioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new audioContext();

            navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia);
            if (navigator.getUserMedia) setTimeout(() => this.getInputsList(), 200);
            else alert('browser doest support getUserMedia');
            this.speed = <HTMLSpanElement>document.getElementById(prefix + '-speed');
            this.maxValue = <HTMLSpanElement>document.getElementById(prefix + '-maxval');

            this.oscAnalyser= new OscRecorder(prefix);

            this.btnStartStop =  view.find('[data-id=start_stop]:first').on('click', null, (evt:JQueryEventObject) => this.onStartStop(evt));
            this.lengthV= view.find('[data-id=length]:first');


            this.oscAnalyser.onReady=()=>{
                this.btnStartStop.removeClass('color-red');
                setTimeout(()=>{
                this.btnStartStop.text('Start Recording');
                this.btnPrint.attr('disabled',false);
                this.btnClear.attr('disabled',false);
            },500)};

            this.dataV=$('#'+prefix+'-dataView')
            this.btnPrint=view.find('[data-id=print]:first').on('click',null,(evt)=>this.onPrintClick(evt)).attr('disabled',true);
            this.btnClear=view.find('[data-id=clear]:first').on('click',null,(evt)=>this.onClearClick(evt)).attr('disabled',true);
            this.sensitivityV=view.find('[data-id=sensitivity]:first').on('change',null,(evt)=>this.onSensitivityChanged(evt));

           // navigator.getUserMedia({ video: false, audio: true }, (stream: MediaStream) => this.onConnect(stream), function (e) {

              //  alert('Error getting audio');
               // console.log(e);
         //   });

            

        }

        private onSensitivityChanged(evt:JQueryEventObject):void{
            var num:number=this.sensitivityV.val();
            if(isNaN(num) || num>120 || num<0) num=0;
            this.sensitivity=num;
          //  this.oscAnalyser.setSensitivity(num);
        }
        private onClearClick(evt:JQueryEventObject):void{
            this.dataV.text('');
            this.oscAnalyser.reset();
            this.btnPrint.attr('disabled',true);
            this.btnClear.attr('disabled',true);
        }
        private onPrintClick(evt:JQueryEventObject):void{

           // this.oscAnalyser.drawFullMemory();
           // return;
        var ar:number[] = this.oscAnalyser.getRefers();

        var ar1:Uint8Array[]=this.oscAnalyser.getData();
            var str:string='';
            //var obj:{}={}
           // console.log('onPrintClick',ar);
            for(var i=0,n=ar.length;i<n;i++){
                var ar2:Uint8Array= ar1[i];
                var ar3:string[]=[]

                for(var i2=0,n2=ar2.length;i2<n2;i2++) ar3[i2]=ar2[i2].toString();
                str += (ar[i]+':'+ar3.join(','))+"\n";
                //console.log(ar[i]);
            }

            this.dataV.text(str);


        }

        private start_stop(evt:JQueryEventObject): void {
            this.jsNode.disconnect();
        }

        private getInputsList(): void {
            MediaStreamTrack.getSources((info: SourceInfo[]) => this.gotSources(info));
           // console.log( navigator.MediaDevices);
            //MediaDevices.enumerateDevices().then((info: SourceInfo[]) => this.gotSources(info));
        }

        private gotSources(souces: SourceInfo[]): void {          
           //   console.log(souces);
            var str:string=''
            for (var i = 0, n = souces.length; i < n; i++) if(souces[i].kind=='audio')  str += '<option value="' + souces[i].id + '">' +(souces[i].label || 'Input ' + i)+'</option>'
           this.select.html(str);  
            this.getUserMedia({ audio: true, video: false });         
        }

        private getUserMedia(constraints: MediaStreamConstraints): void {
            navigator.getUserMedia(constraints, (stream: MediaStream) => this.onConnect(stream), function (e) {
                alert('Error getting audio');
                console.log(e);
            });
        }
        private onInputChanged(evt: JQueryEventObject): void {
            var select: HTMLSelectElement = <HTMLSelectElement> evt.currentTarget;
            //  clearInterval(this.timer);
            var constraints: MediaStreamConstraints = {
                audio: {
                    optional: [{ sourceId: select.value }]
                },
                video: false
            };
            console.log('getting source ' + select.value);
            this.getUserMedia(constraints);
           

        }

       // private gainFilter: GainNode;
        // private destination: AudioMediaStreamTrack;
        //private destination: MediaStreamAudioDestinationNode;
        private outputStream: MediaStream;


        private jsProcessor: ScriptProcessorNode;
        private analyser:AnalyserNode;
        private graphics:c.Graphics;

        private onConnect(stream: MediaStream): void {
            this.mediaStriam = stream;
            // console.log(stream);          
            var context: AudioContext = this.audioContext;

            var color: string = this.lineColor;

/////////////////////////////////////////////////////
            var streamSource: MediaStreamAudioSourceNode = context.createMediaStreamSource(stream);
           this.analyser = context.createAnalyser();


           this.jsProcessor = context.createScriptProcessor(this.bufferSize, 1, 1);
            streamSource.connect(this.analyser);
            this.jsProcessor.connect(this.analyser);
            this.jsProcessor.onaudioprocess =(evt: AudioProcessingEvent)=>this.onProcess(evt);
            this.stage.removeAllChildren();
            this.stage.update();
           var sh: c.Shape = new c.Shape();
           this.stage.addChild(sh);
           this.graphics = sh.graphics;

           // this.showProcess(jsProcessor,analyser);

        }

/*
        private showProcess(jsProcessor: ScriptProcessorNode, analyser: AnalyserNode): void {
            var stage = this.stage;
            stage.removeAllChildren();
            stage.update();

            var sh: c.Shape = new c.Shape();
            stage.addChild(sh);
            var g: c.Graphics = sh.graphics;


            var start: number = Date.now();
            var speed: HTMLSpanElement = this.speed;
            //txt.text(start.toString());
            var count = 0;
            //var width: number = this.width;
            var step: number = this.width / this.bufferSize;
            var color:string =this.lineColor;
            var rec:OscRecorder = this.oscAnalyser;
            var size:number= this.bufferSize;
            var sens:number=0;
            var sense:number=0;
            jsProcessor.onaudioprocess = function (evt: AudioProcessingEvent) {
                // console.log(evt);
                var data: Uint8Array = new Uint8Array(size);
                analyser.getByteTimeDomainData(data);
                g.clear();
                g.setStrokeStyle(1);
                g.beginStroke(color);
                g.moveTo(0, data[0]);
                var isRec:number=0
                if(sense==0) isRec=1;

                for (var i = 1, n = data.length; i < n; i++){
                    g.lineTo(step*i, data[i]);
                    if(sense==0) continue;

                    if(isRec==0 && (( data[i]<(128-sense) || ( data[i]>(128+sense)))))isRec=1;
                }
               // } for (var i = 1, n = data.length; i < n; i++)  g.lineTo(step*i, data[i]);
                stage.update();
                var end = Date.now();
                if (++count == 9) {
                    count = 0;
                    speed.textContent = ((end - start)/10).toString();
                    start = end;
                   // console.log(i);
                }
               if(isRec)sense = rec.addData(data,end);
            };
        }
*/

        private onProcess(evt: AudioProcessingEvent){
            var size:number= this.bufferSize;
            var data: Uint8Array = new Uint8Array(size);
            this.analyser.getByteTimeDomainData(data);
            var g:c.Graphics = this.graphics;
            g.clear();
            g.setStrokeStyle(1);
            g.beginStroke(this.lineColor);
            g.moveTo(0, data[0]);
            var step: number = this.width / this.bufferSize;
            var sense:number = this.sensitivity;
            var isRec:number=0;
            var max: number = 0;
            if (sense == 0) isRec = 1;

            for (var i = 1, n = size; i < n; i++){
                var val: number = data[i]
                g.lineTo(step * i,val);               
               if((val < (128 - max)) || (val > (128 + max))) max = Math.abs(128-val);
                if(sense==0) continue;
                if(isRec==0 && (( data[i]<(128-sense) || ( data[i]>(128+sense)))))isRec=1;
            }
            this.stage.update();
            var end = Date.now();
            if(isRec) this.oscAnalyser.addData(data,end);
            this.maxValue.textContent = (max).toString();
            if (++this.count == 9) {
                this.count = 0;
                this.speed.textContent = ((end - this.start) / 10).toString();
               
                this.start = end;
                // console.log(i);
            }


        }

        private start:number=0;
        private count:number=0;

        private onStartStop(evt:JQueryEventObject):void{
            if(this.btnStartStop.text()!='Start Recording'){
                this.btnStartStop.text('Start Recording');
                this.oscAnalyser.stopRecording();
                this.btnStartStop.removeClass('color-red');
            }else{
                this.btnStartStop.text('Stop Recording');
                this.btnStartStop.addClass('color-red');
                this.oscAnalyser.startRecording(this.lengthV.val());
            }

        }

    }

    export class OscRecorder {



        private view:JQuery;
        private stage: c.Stage;
        private data: Uint8Array[]=[];
        private refer: number[]=[];
        private range: JQuery;

        private screens:JQuery;
        private length:number=1000;


        private isRecording:boolean=false;
        private graphics:c.Graphics;
        private stamp:c.Text;

        private color:string;
        onReady:Function;

        getRefers():number[]{
            return this.refer;
        }
        getData():Uint8Array[]{
            return this.data
        }

        addData(ar:Uint8Array,timestamp:number):number{
            if(!this.isRecording) return 0;
            this.data.push(ar);
            this.refer.push(timestamp);
            var l:number=this.refer.length;
            this.screens.text(l.toString());
            this.range.val(l);
            setTimeout(()=> this.drawArrayScreen(ar,timestamp),20);
            if(l>=this.length)this.gotFull();
            return l;

        }
        private gotFull():void{
            this.stopRecording();
        }
        reset():void{
            this.data=[];
            this.refer=[];
            this.range.val(0);
            this.range.attr('disabled',true);
            this.screens.text('0');
            this.stage.removeAllChildren();
            this.graphics=null;

        }
        startRecording(num:number):void{
           // console.log('Start recording '+num);
            //this.reset();
            this.length=num;
            this.range.attr('max',num-1);
            this.isRecording=true;
        }

        stopRecording():void{
            this.isRecording=false;
            this.range.attr('disabled',false);
            if(this.refer.length>0 && this.onReady) this.onReady();
            //this.range.attr('max',this.length-1);
        }


        constructor(prefix:string) {
            this.view= $('#'+prefix+'-recorder');
            var canvas:JQuery = $('#'+prefix+'-screen2');

            this.stage = new c.Stage(document.getElementById(prefix+'-screen2'));
            this.range=this.view.find('[data-id=an_range]:first').on('input',null,(evt:JQueryEventObject)=>this.onRangeChanged(evt));
            this.screens=this.view.find('[data-id=screens]:first');
            this.color = String(canvas.data('color'))||'0x000000';
        }

        private createGraphics():c.Graphics{
            var sh:c.Shape = new c.Shape();
            var txt:c.Text= new c.Text();
            this.stamp=txt;
            this.stage.addChild(txt);
            this.stage.addChild(sh);
            return sh.graphics;
        }

         drawFullMemory():void{
             var start:number= Date.now();
            var ar:Uint8Array[] =this.data;
            var out:number[]=[];
             this.stage.removeAllChildren();
           //  var g:c.Graphics= this.graphics;
           //  g.clear();
            // g.setStrokeStyle(1);
            // g.beginStroke(this.color);


            var step=0.01;
             var offset:number=0;
            for(var i=0,n=ar.length;i<n;i++){
               // var out:number[]=[];
                var sh:c.Shape= new c.Shape();
                var g=sh.graphics;
                g.setStrokeStyle(1);
                g.beginStroke(this.color);
                offset+=100;
               // for(var i2=0,n2= ar[i].length;i2<n2;i2++)out.push(ar[i][i2]);
                this.drawArray(ar[i],g,step,offset);
                this.stage.addChild(sh);


            }
             this.stage.update();
             console.log('total array '+out.length+' takes :'+(Date.now()-start)+' ms');
        //setTimeout(()=>this.drawArray(out),100);

        }
        private drawArray(ar:Uint8Array,g:c.Graphics,step:number,offset:number):void{
          //  var start:number= Date.now();
            g.moveTo(0, ar[0]);
            for (var i = 1, n = ar.length; i < n; i++)  g.lineTo(step*i+offset, ar[i]);
            // console.log(i);
           ;
            //console.log('drawArray takes : '+(Date.now()-start));
        }
        private drawArrayScreen(ar:Uint8Array,ts:number):void{
            if(!this.graphics) this.graphics=this.createGraphics();
            var d:Date=new Date(ts);
            this.stamp.text=d.toDateString()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+':'+d.getMilliseconds();

            // this.currentTime.text(d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+':'+d.getMilliseconds());
            var step=1024/ar.length;
            var g:c.Graphics= this.graphics;
            g.clear();
            g.setStrokeStyle(1);
            g.beginStroke(this.color);
            g.moveTo(0, ar[0]);
            for (var i = 1, n = ar.length; i < n; i++)  g.lineTo(step*i, ar[i]);
           // console.log(i);
            this.stage.update();
        }

        private onRangeChanged(evt:JQueryEventObject):void{
            var n:number=this.range.val();
            if(isNaN(n) || n<0 || n>=this.refer.length) return;
            var ar:Uint8Array= this.data[n];
            var ts:number=this.refer[n];
            this.drawArrayScreen(ar,ts);
        }


    }
  
  
}

