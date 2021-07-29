(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WebaudioPeaks"] = factory();
	else
		root["WebaudioPeaks"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 10:
/***/ ((module) => {



/**
 * @param {TypedArray} array - Subarray of audio to calculate peaks from.
 */
function findMinMax(array) {
  var min = Infinity;
  var max = -Infinity;
  var i = 0;
  var len = array.length;
  var curr;

  for (; i < len; i++) {
    curr = array[i];
    if (min > curr) {
      min = curr;
    }
    if (max < curr) {
      max = curr;
    }
  }

  return {
    min: min,
    max: max
  };
}

/**
 * @param {Number} n - peak to convert from float to Int8, Int16 etc.
 * @param {Number} bits - convert to #bits two's complement signed integer
 */
function convert(n, bits) {
  var max = Math.pow(2, bits - 1);
  var v = n < 0 ? n * max : n * (max - 1);
  return Math.max(-max, Math.min(max - 1, v));
}

/**
 * @param {TypedArray} channel - Audio track frames to calculate peaks from.
 * @param {Number} samplesPerPixel - Audio frames per peak
 */
function extractPeaks(channel, samplesPerPixel, bits) {
  var i;
  var chanLength = channel.length;
  var numPeaks = Math.ceil(chanLength / samplesPerPixel);
  var start;
  var end;
  var segment;
  var max;
  var min;
  var extrema;

  //create interleaved array of min,max
  var peaks = makeTypedArray(bits, numPeaks * 2);

  for (i = 0; i < numPeaks; i++) {
    start = i * samplesPerPixel;
    end =
      (i + 1) * samplesPerPixel > chanLength
        ? chanLength
        : (i + 1) * samplesPerPixel;

    segment = channel.subarray(start, end);
    extrema = findMinMax(segment);
    min = convert(extrema.min, bits);
    max = convert(extrema.max, bits);

    peaks[i * 2] = min;
    peaks[i * 2 + 1] = max;
  }

  return peaks;
}

function makeTypedArray(bits, length) {
  return new (new Function(`return Int${bits}Array`)())(length);
}

function makeMono(channelPeaks, bits) {
  var numChan = channelPeaks.length;
  var weight = 1 / numChan;
  var numPeaks = channelPeaks[0].length / 2;
  var c = 0;
  var i = 0;
  var min;
  var max;
  var peaks = makeTypedArray(bits, numPeaks * 2);

  for (i = 0; i < numPeaks; i++) {
    min = 0;
    max = 0;

    for (c = 0; c < numChan; c++) {
      min += weight * channelPeaks[c][i * 2];
      max += weight * channelPeaks[c][i * 2 + 1];
    }

    peaks[i * 2] = min;
    peaks[i * 2 + 1] = max;
  }

  //return in array so channel number counts still work.
  return [peaks];
}

function defaultNumber(value, defaultNumber) {
  if (typeof value === "number") {
    return value;
  } else {
    return defaultNumber;
  }
}

/**
 * @param {AudioBuffer,TypedArray} source - Source of audio samples for peak calculations.
 * @param {Number} samplesPerPixel - Number of audio samples per peak.
 * @param {Boolean} isMono - Whether to render the channels to a single array.
 * @param {Number} cueIn - index in channel to start peak calculations from.
 * @param {Number} cueOut - index in channel to end peak calculations from (non-inclusive).
 * @param {Number} bits - number of bits for a peak.
 */
module.exports = function (
  source,
  samplesPerPixel,
  isMono,
  cueIn,
  cueOut,
  bits
) {
  samplesPerPixel = defaultNumber(samplesPerPixel, 1000);
  bits = defaultNumber(bits, 16);

  if (isMono === null || isMono === undefined) {
    isMono = true;
  }

  if ([8, 16, 32].indexOf(bits) < 0) {
    throw new Error("Invalid number of bits specified for peaks.");
  }

  var numChan = source.numberOfChannels;
  var peaks = [];
  var c;
  var numPeaks;
  var channel;
  var slice;

  cueIn = defaultNumber(cueIn, 0);
  cueOut = defaultNumber(cueOut, source.length);

  if (typeof source.subarray === "undefined") {
    for (c = 0; c < numChan; c++) {
      channel = source.getChannelData(c);
      slice = channel.subarray(cueIn, cueOut);
      peaks.push(extractPeaks(slice, samplesPerPixel, bits));
    }
  } else {
    peaks.push(
      extractPeaks(source.subarray(cueIn, cueOut), samplesPerPixel, bits)
    );
  }

  if (isMono && peaks.length > 1) {
    peaks = makeMono(peaks, bits);
  }

  numPeaks = peaks[0].length / 2;

  return {
    length: numPeaks,
    data: peaks,
    bits: bits
  };
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(10);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});