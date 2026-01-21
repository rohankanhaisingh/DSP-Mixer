// TODO: Channels hebben geen analyser meer, maar kan handmatig worden toegepast als een effect.
// Haal de analyser effect op om de waveform gegevens op te halen.

import { Channel, Analyser } from "@fluex/fluexgl-dsp";

export interface ChannelPeakMeterData {
    channel: Channel;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    id: string;
    smoothedPeak?: number;
    analyser: Analyser;
}

const channelPeakMeterDataRegistry: ChannelPeakMeterData[] = [];

let frameRate: number = 140,
    lastTimestamp: number = Date.now();

function internalRenderLoop() {

    window.requestAnimationFrame(internalRenderLoop);

    const now: number = Date.now();

    if (now < lastTimestamp + (1000 / frameRate)) return;

    lastTimestamp = Date.now();

    const attack = 0.5,
        release = 0.05;

    for (let i = 0; i < channelPeakMeterDataRegistry.length; i++) {

        const peakMeterData = channelPeakMeterDataRegistry[i],
            analyser = peakMeterData.analyser,
            canvas = peakMeterData.canvas,
            context = peakMeterData.context;

        const rect = canvas.getBoundingClientRect(),
            targetWidth = Math.floor(rect.width),
            targetHeight = Math.floor(rect.height);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {

            canvas.width = targetWidth;
            canvas.height = targetHeight;
        }

        const width = canvas.width,
            height = canvas.height;

        if (width === 0 || height === 0) continue;

        const waveformData = analyser.GetWaveformFloatData();
        // const waveformData: number[] = [];

        if (!waveformData) continue;

        let instantaneousPeak = 0;

        for (let s = 0; s < waveformData.length; s++) {

            let sample = waveformData[s] * 2;

            if (sample < 0) {
                sample = -sample;
            } else if (sample > instantaneousPeak) {
                instantaneousPeak = sample;
            }
        }

        if (instantaneousPeak < 0) {
            instantaneousPeak = 0;
        }
        if (instantaneousPeak > 1) {
            instantaneousPeak = 1;
        }

        let smoothedPeak = peakMeterData.smoothedPeak;

        if (typeof smoothedPeak !== "number") {

            smoothedPeak = instantaneousPeak;
        } else {

            if (instantaneousPeak > smoothedPeak) {
                smoothedPeak = smoothedPeak + (instantaneousPeak - smoothedPeak) * attack;
            } else {
                smoothedPeak = smoothedPeak + (instantaneousPeak - smoothedPeak) * release;
            }
        }

        peakMeterData.smoothedPeak = smoothedPeak;

        context.clearRect(0, 0, width, height);
        context.save();

        const barHeight = height * smoothedPeak;

        context.fillStyle = "#35e37a";
        context.fillRect(0, height - barHeight, width, barHeight);

        if (smoothedPeak > 0.95) {

            context.fillStyle = "#ff3b3b";
            context.fillRect(0, 0, width, 4);
        }

        context.restore();
    }
}

export function startMixerPeakMeterService() {
    internalRenderLoop();
}

export function addPeakMeterDataToRegistry(data: ChannelPeakMeterData): ChannelPeakMeterData | null {

    for (const _data of channelPeakMeterDataRegistry)
        if (_data.id === data.id)
            return null;

    channelPeakMeterDataRegistry.push(data);
    return data;
}

export function removePeakMeterDataFromRegistryById(id: string) {

    for (let i = 0; i < channelPeakMeterDataRegistry.length; i++) {

        const data: ChannelPeakMeterData = channelPeakMeterDataRegistry[i];

        if (data.id === id)
            channelPeakMeterDataRegistry.splice(i, 1);
    }
}