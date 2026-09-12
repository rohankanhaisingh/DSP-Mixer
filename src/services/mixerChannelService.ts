import { AudioDevice, Master, Channel, Analyser } from "@fluex/fluexgl-dsp"

import { MIXER_CHANNEL_FFTSIZE, MIXER_CHANNEL_SMOOTHNING_TIME_CONSTANT, MIXER_CHANNEL_MAX_DEXIBELS, MIXER_CHANNEL_MIN_DECIBELS } from "../utilities/constants";

export let audioDevice: AudioDevice | null = null;

export function initializeMixerChannelService(_audioDevice: AudioDevice) {

    audioDevice = _audioDevice;

    const masterChannel: Master = _audioDevice.getMasterChannel();

    const masterAnalyser: Analyser = new Analyser({
        fftSize: 16384,
        smoothingTimeConstant: MIXER_CHANNEL_SMOOTHNING_TIME_CONSTANT,
        maxDecibels: MIXER_CHANNEL_MAX_DEXIBELS,
        minDecibels: MIXER_CHANNEL_MIN_DECIBELS
    });

    masterAnalyser.label = "MasterPostAnalyser";

    masterChannel.attachEffect(masterAnalyser);

    for (let i = 0; i < 20; i++) {

        const channel: Channel = _audioDevice.createChannel();
        channel.label = `Channel ${i + 1}`;

        const channelAnalyser: Analyser = new Analyser({
            fftSize: MIXER_CHANNEL_FFTSIZE,
            smoothingTimeConstant: MIXER_CHANNEL_SMOOTHNING_TIME_CONSTANT,
            maxDecibels: MIXER_CHANNEL_MAX_DEXIBELS,
            minDecibels: MIXER_CHANNEL_MIN_DECIBELS
        });

        channelAnalyser.label = "ChannelPostAnalyser";

        channel.addEffect(channelAnalyser);
        channel.moveEffectToIndex(channelAnalyser, "end");
        masterChannel.attachChannel(channel);
    }
}

export function createNewChannel() {

    if (!audioDevice) return;

    const masterChannel = audioDevice.getMasterChannel(),
        channel: Channel = audioDevice.createChannel(`Channel ${masterChannel.channels.length + 1}`);

    const analyser = new Analyser({
        fftSize: MIXER_CHANNEL_FFTSIZE,
        smoothingTimeConstant: MIXER_CHANNEL_SMOOTHNING_TIME_CONSTANT,
        maxDecibels: MIXER_CHANNEL_MAX_DEXIBELS,
        minDecibels: MIXER_CHANNEL_MIN_DECIBELS
    });

    analyser.label = "ChannelPostAnalyser";
    
    channel.addEffect(analyser);
    channel.moveEffectToIndex(analyser, "end");
    channel.send(masterChannel);
}

export function getMasterChannel(): Master | null {

    if (!audioDevice) return null;

    return audioDevice.getMasterChannel();
}

export function getChannelById(id: string) {

    if (!audioDevice) return;

    const master = audioDevice.getMasterChannel(),
        channel: Channel = master.channels.filter(channel => channel.id === id)[0];

    return channel;
}

export function getChannels(): Channel[] {

    if (!audioDevice) return [];

    const master = audioDevice.getMasterChannel();

    return master.channels;
}

export function sendChannelToChannel(sourceChannel: Channel, targetChannel: Channel) {
    sourceChannel.send(targetChannel);
}

export function unsendChannelFromChannel(sourceChannel: Channel, targetChannel: Channel) {
    sourceChannel.unsend(targetChannel);
}