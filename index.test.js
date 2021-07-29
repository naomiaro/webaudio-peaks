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
