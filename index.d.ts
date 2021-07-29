declare type Peaks = Int8Array | Int16Array | Int32Array;
declare type Bits = 8 | 16 | 32;

export type PeakData = {
  length: number;
  data: Peaks[];
  bits: Bits;
};

export default function WebaudioPeaks(
  buffer: AudioBuffer | Float32Array,
  samplesPerPixel?: number,
  mono?: boolean,
  cueIn?: number,
  cueOut?: number,
  bits?: Bits,
): PeakData;
