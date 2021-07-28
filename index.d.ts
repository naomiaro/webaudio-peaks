export type PeakData = {
  length: number;
  data: Int8Array[] | Int16Array[] | Int32Array[];
  bits: 8 | 16 | 32;
};

export default function webaudioPeaks(
  buffer: AudioBuffer,
  samplesPerPixel?: number,
  mono?: boolean,
  cueIn?: number,
  cueOut?: number
): PeakData;
