export function computeWaveformBars(
    audioBuffer: AudioBuffer,
    barCount: number
): Float32Array {

    var left = audioBuffer.getChannelData(0);
    var right = audioBuffer.numberOfChannels > 1
        ? audioBuffer.getChannelData(1)
        : null;

    var samplesPerBar = Math.floor(left.length / barCount);
    if (samplesPerBar < 1) samplesPerBar = 1;

    var bars = new Float32Array(barCount);
    var globalMax = 0;

    for (var i = 0; i < barCount; i++) {
        var start = i * samplesPerBar;
        var end = Math.min(start + samplesPerBar, left.length);

        var peak = 0;

        for (var j = start; j < end; j++) {
            var sample = left[j];

            if (right) {
                sample = (sample + right[j]) * 0.5;
            }

            var abs = Math.abs(sample);
            if (abs > peak) peak = abs;
        }

        bars[i] = peak;
        if (peak > globalMax) globalMax = peak;
    }

    if (globalMax > 0) {
        for (var k = 0; k < bars.length; k++) {
            bars[k] = bars[k] / globalMax;
        }
    }

    return bars;
}

export function computeWaveformPeaks(audioBuffer: AudioBuffer, width: number, channelIndex = 0) {

    const data = audioBuffer.getChannelData(channelIndex);
    const samplesPerPixel = Math.floor(data.length / width) || 1;

    const peaks = {
        min: new Float32Array(width),
        max: new Float32Array(width)
    };

    for (let i = 0; i < width; i++) {
        const start = i * samplesPerPixel;
        const end = Math.min(start + samplesPerPixel, data.length);

        let min = 1.0;
        let max = -1.0;

        for (let j = start; j < end; j++) {
            const v = data[j];
            if (v < min) min = v;
            if (v > max) max = v;
        }

        peaks.min[i] = min;
        peaks.max[i] = max;
    }

    return peaks;
}