import { AudioDevice, Master, Channel, Analyser } from "@fluex/fluexgl-dsp"

import { MIXER_CHANNEL_FFTSIZE, MIXER_CHANNEL_SMOOTHNING_TIME_CONSTANT, MIXER_CHANNEL_MAX_DEXIBELS, MIXER_CHANNEL_MIN_DECIBELS } from "../utilities/constants";

export let audioDevice: AudioDevice | null = null;

export function initializeMixerChannelService(_audioDevice: AudioDevice) {

    audioDevice = _audioDevice;

    const masterChannel: Master = _audioDevice.GetMasterChannel();

    for (let i = 0; i < 20; i++) {

        const channel: Channel = _audioDevice.CreateChannel();
        channel.label = `Channel ${i + 1}`;

        const channelAnalyser: Analyser = new Analyser({
            fftSize: MIXER_CHANNEL_FFTSIZE,
            smoothingTimeConstant: MIXER_CHANNEL_SMOOTHNING_TIME_CONSTANT,
            maxDecibels: MIXER_CHANNEL_MAX_DEXIBELS,
            minDecibels: MIXER_CHANNEL_MIN_DECIBELS
        });

        channelAnalyser.label = "ChannelPostAnalyser";

        channel.AddEffect(channelAnalyser);
        channel.MoveEffectToIndex(channelAnalyser, "end");
        masterChannel.AttachChannel(channel);
    }
}

export function createNewChannel() {

    if (!audioDevice) return;

    const masterChannel = audioDevice.GetMasterChannel(),
        channel: Channel = audioDevice.CreateChannel(`Channel ${masterChannel.channels.length + 1}`);

    const analyser = new Analyser({
        fftSize: MIXER_CHANNEL_FFTSIZE,
        smoothingTimeConstant: MIXER_CHANNEL_SMOOTHNING_TIME_CONSTANT,
        maxDecibels: MIXER_CHANNEL_MAX_DEXIBELS,
        minDecibels: MIXER_CHANNEL_MIN_DECIBELS
    });

    analyser.label = "ChannelPostAnalyser";
    
    channel.AddEffect(analyser);
    channel.MoveEffectToIndex(analyser, "end");
    channel.Send(masterChannel);
}

export function getChannelById(id: string) {

    if (!audioDevice) return;

    const master = audioDevice.GetMasterChannel(),
        channel: Channel = master.channels.filter(channel => channel.id === id)[0];

    return channel;
}

export function getChannels(): Channel[] {

    if (!audioDevice) return [];

    const master = audioDevice.GetMasterChannel();

    return master.channels;
}