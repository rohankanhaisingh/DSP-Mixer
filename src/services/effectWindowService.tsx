import type { Analyser, Chorus, Effector, LowPassFilter, SoftClip } from "@fluex/fluexgl-dsp";

import type { WindowContextValue } from "../providers/WindowProvider";

import AnalyserWindow from "../components/window/prebuilt/AnalyserWindow";
import ChorusWindow from "../components/window/prebuilt/ChorusWindow";
import LowPassFilterWindow from "../components/window/prebuilt/LowPassFilterWindow";
import SoftClipWindow from "../components/window/prebuilt/SoftClipWindow";

export function showEffectWindow(effect: Effector, deps: WindowContextValue) {

    deps.setTitle(effect.label ?? "Channel effect");
    deps.showWindow();

    switch (effect.name) {
        case "Analyser":
            deps.setContent(<AnalyserWindow analyser={effect as Analyser} />)
            break;
        case "Chorus":
            deps.setContent(<ChorusWindow chorus={effect as Chorus} />)
            break;
        case "LowPassFilter":
            deps.setContent(<LowPassFilterWindow lowPassFilter={effect as LowPassFilter} />)
            break;
        case "SoftClip":
            deps.setContent(<SoftClipWindow softClip={effect as SoftClip} />)
            break
    }
}