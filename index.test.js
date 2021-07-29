const { AudioBuffer } = require("standardized-audio-context-mock");
const extractPeaks = require("./");

test("Empty buffer gives empty peaks", () => {
  const buffer = new AudioBuffer({ length: 0, sampleRate: 44100 });

  expect(extractPeaks(buffer)).toStrictEqual({
    length: 0,
    data: [new Int16Array(0)],
    bits: 16
  });
});

test("Cues of zero gives empty peaks", () => {
  const buffer = new AudioBuffer({ length: 44100, sampleRate: 44100 });

  expect(extractPeaks(buffer, 1000, true, 0, 0)).toStrictEqual({
    length: 0,
    data: [new Int16Array(0)],
    bits: 16
  });
});

test("Peak length respects samplesPerPixel", () => {
  const samplesPerPixel = 1000;
  const sampleRate = 44100;
  const buffer = new AudioBuffer({ length: sampleRate, sampleRate });
  const expectedPeakLength = Math.ceil(sampleRate / samplesPerPixel);

  expect(
    extractPeaks(buffer, samplesPerPixel, true, 0, sampleRate)
  ).toStrictEqual({
    length: expectedPeakLength,
    data: [new Int16Array(expectedPeakLength * 2)],
    bits: 16
  });
});

test("Calculates proper peaks", () => {
  const samplesPerPixel = 1000;
  const sampleRate = 44100;
  const samplesArray = new Float32Array([0, -0.25, -0.33, 0.45, 0.86, 0.77]); // -0.33,0.86
  const expectedPeakLength = Math.ceil(samplesArray.length / samplesPerPixel);

  expect(extractPeaks(samplesArray, samplesPerPixel)).toStrictEqual({
    length: expectedPeakLength,
    data: [new Int16Array([-10813, 28179])],
    bits: 16
  });
});
