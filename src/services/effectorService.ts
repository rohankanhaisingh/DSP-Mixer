import { Chorus, SoftClip, Effector, Channel, Master, LowPassFilter, HardClip, Reverb } from "@fluex/fluexgl-dsp";

export function listAvailableEffects(): string[] {
    return [
        "Chorus",
        "SoftClip",
        "LowPassFilter",
        "HardClip",
        "Reverb"
    ];
}

function createEffectByName(effectName: string): Effector | null {

    switch (effectName) {
        case "SoftClip":
            return new SoftClip();
        case "Chorus":
            return new Chorus({});
        case "LowPassFilter":
            return new LowPassFilter({});
        case "HardClip":
            return new HardClip();
        case "Reverb":
            return new Reverb();
        default:
            return null;
    }
}

export function attachEffectOnChannel(effectName: string, channel: Channel) {

    const effect: Effector | null = createEffectByName(effectName);

    if (!effect) return;

    channel.addEffect(effect);

    const analyserEffect: Effector | null = channel.getFirstEffectByLabel("ChannelPostAnalyser");

    if (!analyserEffect)
        throw new Error(`Analyser effect (label: ChannelPostAnalyser) not found on channel ${channel.id}.`);

    const analyserIndex: number = channel.effects.findIndex(e => e.id === analyserEffect.id);

    channel.moveEffectToIndex(effect, analyserIndex);
}

export function detachEffectOnChannel(effect: Effector, channel: Channel) {

    if(effect.label === "ChannelPostAnalyser")
        return alert("Cannot remove ChannelPostAnalyser, because this effect is important.");

    channel.detachEffect(effect);
}

export function attachEffectOnMaster(effectName: string, master: Master) {

    const effect: Effector | null = createEffectByName(effectName);

    if (!effect) return;

    const analyserEffect: Effector | undefined = master.effects.find(e => e.label === "MasterPostAnalyser");

    if (!analyserEffect) {
        master.attachEffect(effect);
        return;
    }

    // Master has no moveEffectToIndex, so the analyser is detached and re-attached
    // afterwards to push it back to the end of the chain. This keeps the master
    // meter reflecting the fully processed (post-effect) signal, just like on
    // regular channels. The analyser itself is stateless besides its configured
    // options, which are preserved across re-initialization.
    master.detachEffect(analyserEffect);
    master.attachEffect(effect);
    master.attachEffect(analyserEffect);
}

export function detachEffectOnMaster(effect: Effector, master: Master) {

    if (effect.label === "MasterPostAnalyser")
        return alert("Cannot remove MasterPostAnalyser, because this effect is important.");

    master.detachEffect(effect);
}