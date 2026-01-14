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
}

export function detachEffectOnChannel(effect: Effector, channel: Channel) {
    channel.DetachEffect(effect);
}