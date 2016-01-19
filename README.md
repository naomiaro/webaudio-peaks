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

#extractPeaks(source, samplesPerPixel, isMono, cueIn, cueOut, bits)
function to extract peaks from an Array, TypedArray, or AudioBuffer

**Params**

- source `TypedArray|AudioBuffer` - 
- samplesPerPixel `number` -
- isMono `boolean` -
- cueIn `number` -
- cueOut `number` -
- bits `number` -

**Returns**: `TypedArray`
