export type PeakData = {
    length: number, 
    data: Int8Array[] | Int16Array[] | Int32Array[], 
    bits: number
}

export default function webaudioPeaks(buffer: AudioBuffer, samplesPerPixel?: number, mono?: boolean, cueIn
    ?: number, cueOut?: number): PeakData