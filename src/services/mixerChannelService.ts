// TODO: Voeg een analyser effect toe aan elke kanaal dat gecreeërd word.

import { AudioDevice, Master, Channel } from "@fluex/fluexgl-dsp"

// import { MIXER_CHANNEL_FFTSIZE, MIXER_CHANNEL_SMOOTHNING_TIME_CONSTANT, MIXER_CHANNEL_MAX_DEXIBELS, MIXER_CHANNEL_MIN_DECIBELS } from "../utilities/constants";

export let audioDevice: AudioDevice | null = null;

export function initializeMixerChannelService(_audioDevice: AudioDevice) {

    audioDevice = _audioDevice;

    const masterChannel: Master = _audioDevice.GetMasterChannel();

    for (let i = 0; i < 20; i++) {

        const channel: Channel = _audioDevice.CreateChannel();
        channel.label = `Channel ${i + 1}`;

        // channel.SetAnalyserOptions({
        //     smoothingTimeConstant:  MIXER_CHANNEL_SMOOTHNING_TIME_CONSTANT,
        //     fftSize: MIXER_CHANNEL_FFTSIZE,
        //     maxDecibels: MIXER_CHANNEL_MAX_DEXIBELS,
        //     minDecibels: MIXER_CHANNEL_MIN_DECIBELS
        // });

        masterChannel.AttachChannel(channel);
    }
}

export function getChannelById(id: string) {

    if (!audioDevice) return;

    const master = audioDevice.GetMasterChannel();

    const channel: Channel = master.channels.filter(channel => channel.id === id)[0];

    return channel;
}

export function getChannels(): Channel[] {

    if (!audioDevice) return [];

    const master = audioDevice.GetMasterChannel();

    return master.channels;
}