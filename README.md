webaudio-peaks
=================
Small library to extract peaks from an array of audio samples or a webaudio AudioBuffer.

## Installation

  `npm install webaudio-peaks`


## Basic Usage

```javascript
var extractPeaks = require('webaudio-peaks');

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//decode an ArrayBuffer into an AudioBuffer
audioCtx.decodeAudioData(audioData, function(decodedData) {

  //calculate peaks from an AudioBuffer
  var peaks = extractPeaks(decodedData, 10000, true);
});
```

###extractPeaks(source, samplesPerPixel, isMono, cueIn, cueOut, bits)
function to extract peaks from a TypedArray, or AudioBuffer

**Params**

- source `TypedArray|AudioBuffer` - A source of audio samples.
- samplesPerPixel `number` - Number of samples used to calculate a single peak.
- isMono `boolean` - Combine all channels into one array of peaks or not.
- cueIn `number` - Sample to begin at. The offset is inclusive.
- cueOut `number` - Sample to end at. The offset is exclusive.
- bits `(8|16|32)` - Resolution of calculated peaks.

**Returns**: `object`

```javascript
{
    length: `number` //Number of calculated peaks,
    //Computed peak data, length ==  #channels or 1 if isMono == true
    //Each entry of type `Int{bits}Array`
    data: `Array`
    bits: `(8|16|32)` //Resolution of calculated peaks.
}
```

## License

[MIT License](http://doge.mit-license.org)