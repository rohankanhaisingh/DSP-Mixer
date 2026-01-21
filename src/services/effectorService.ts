import { Chorus, SoftClip, Effector, Channel, LowPassFilter, HardClip } from "@fluex/fluexgl-dsp";

export function listAvailableEffects(): string[] {
    return [
        "Chorus",
        "SoftClip",
        "LowPassFilter",
        "HardClip"
    ];
}

export function attachEffectOnChannel(effectName: string, channel: Channel) {

    let effect: Effector | null = null;

    switch (effectName) {
        case "SoftClip":
            effect = new SoftClip({});
            break;
        case "Chorus":
            effect = new Chorus({});
            break;
        case "LowPassFilter":
            effect = new LowPassFilter({});
            break;
        case "HardClip":
            effect = new HardClip({});
            break;
    }

    if (!effect) return;

    channel.AddEffect(effect);

    const analyserEffect: Effector | null = channel.GetFirstEffectByLabel("ChannelPostAnalyser");

    if (!analyserEffect)
        throw new Error(`Analyser effect (label: ChannelPostAnalyser) not found on channel ${channel.id}.`);

    channel.MoveEffectToIndex(analyserEffect, channel.effects.length + 2);
    console.log(channel.effects)
}

export function detachEffectOnChannel(effect: Effector, channel: Channel) {

    if(effect.label === "ChannelPostAnalyser")
        return alert("Cannot remove ChannelPostAnalyser, because this effect is important.");

    channel.DetachEffect(effect);
}