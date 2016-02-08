/// <reference path="../libs/typings/easeljs.d.ts" />
/// <reference path="../libs/typings/jquery.d.ts" />
/// <reference path="../libs/typings/MediaStream.d.ts" />
/**
 * Created by Vlad  Titov http://uplight.ca  on 7/15/2014.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var upl;
(function (upl) {
    var Oscillator = (function () {
        function Oscillator(prefix) {
            var _this = this;
            console.log('Oscillator');
            this.view = $('#' + prefix + '-oscillator');
            this.range = this.view.find('[data-id=an_range]:first').on('input', null, function (evt) { return _this.onRangeChanged(evt); });
            this.inicator = this.view.find('[data-id=frequency]:first');
            var audioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new audioContext();
            this.view.find('[name=wave]').on('click', null, function (evt) { return _this.onWavesClick(evt); });
            this.view.find('[data-id=onoff]').on('click', null, function (evt) { return _this.onOnOffClick(evt); });
            this.volume = this.view.find('[data-id=volume]').on('input', null, function (evt) { return _this.onVolume(evt); });
            this.volumeInd = this.view.find('[data-id=volumeind]').text(this.volume.val());
        }
        Oscillator.prototype.onVolume = function (evt) {
            var val = this.volume.val();
            if (this.gain)
                this.gain.gain.value = val;
            this.volumeInd.text(val);
        };
        Oscillator.prototype.createOscillator = function () {
            this.oscillator = this.audioContext.createOscillator();
            this.gain = this.audioContext.createGain();
            this.gain.gain.value = this.volume.val();
            this.onRangeChanged();
            this.gain.connect(this.audioContext.destination);
            this.oscillator.connect(this.gain);
            this.oscillator.start(0);
        };
        Oscillator.prototype.onOnOffClick = function (evt) {
            if ($(evt.currentTarget).is(':checked'))
                this.createOscillator();
            else
                this.oscillator.stop(0);
        };
        Oscillator.prototype.onWavesClick = function (evt) {
            if (!$(evt.currentTarget).is(':checked'))
                return;
            switch (String($(evt.currentTarget).data('id'))) {
                case 'sin':
                    this.oscillator.type = OscillatorType.sine; //'sine';
                    break;
                case 'square':
                    this.oscillator.type = OscillatorType.square; //'square';
                    break;
                case 'triangle':
                    this.oscillator.type = OscillatorType.triangle; //'triangle';
                    break;
                case 'sawtooth':
                    this.oscillator.type = OscillatorType.sawtooth; //'sawtooth';
                    break;
            }
        };
        Oscillator.prototype.onRangeChanged = function (evt) {
            if (evt === void 0) { evt = null; }
            var val = this.range.val();
            val = Math.round(Math.pow(val, 3));
            this.inicator.text(val);
            if (this.oscillator)
                this.oscillator.frequency.value = val;
        };
        return Oscillator;
    })();
    upl.Oscillator = Oscillator;
    var ImageToArray = (function () {
        function ImageToArray(container) {
            var canvas = document.createElement("canvas");
            container.appendChild(canvas);
            this.d2 = canvas.getContext('2d');
            var stage = new c.Stage(canvas);
            this.stage = stage;
        }
        return ImageToArray;
    })();
    upl.ImageToArray = ImageToArray;
    var c = createjs;
    var CustomWave = (function () {
        function CustomWave(container) {
            var _this = this;
            var canvas = document.createElement("canvas");
            container.appendChild(canvas);
            this.d2 = canvas.getContext('2d');
            var stage = new c.Stage(canvas);
            this.stage = stage;
            this.stage.addEventListener('mousedown', function (evt) { return _this.mouseDown(evt); });
            this.stage.addEventListener('mouseup', function (evt) { return _this.mouseUp(evt); });
            this.stage.addEventListener('mousemove', function (evt) { return _this.mouseMove(evt); });
        }
        CustomWave.prototype.mouseDown = function (evt) {
        };
        CustomWave.prototype.mouseUp = function (evt) {
        };
        CustomWave.prototype.mouseMove = function (evt) {
        };
        return CustomWave;
    })();
    upl.CustomWave = CustomWave;
    var Dot = (function (_super) {
        __extends(Dot, _super);
        function Dot(dot) {
            var _this = this;
            _super.call(this);
            this.d = 3;
            this.color = '#000000';
            this.name = dot.id.toString();
            this.x = dot.x;
            this.y = dot.y;
            this.model = dot;
            var sh = new c.Shape();
            sh.graphics.beginFill(this.color);
            sh.graphics.drawCircle(0, 0, this.d);
            sh.graphics.endFill();
            this.addChild(sh);
            this.addEventListener('mouseover', function (evt) { return _this.onMouseOver(evt); });
            this.addEventListener('mouseout', function (evt) { return _this.onMouseOut(evt); });
        }
        Dot.prototype.onMouseOver = function (evt) {
        };
        Dot.prototype.onMouseOut = function (evt) {
        };
        return Dot;
    })(c.Container);
    var VODot = (function () {
        function VODot(id, x, y, joins) {
            if (joins === void 0) { joins = null; }
            this.id = id;
            this.x = x;
            this.y = y;
            this.joins = joins;
        }
        return VODot;
    })();
    upl.VODot = VODot;
})(upl || (upl = {}));
//# sourceMappingURL=UplOscillator.js.map