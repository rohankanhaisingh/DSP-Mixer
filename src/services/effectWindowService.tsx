import type { Analyser, Chorus, Effector, LowPassFilter, Reverb, SoftClip } from "@fluex/fluexgl-dsp";

import type { WindowContextValue } from "../providers/WindowContext";

import AnalyserWindow from "../components/window/prebuilt/AnalyserWindow";
import ChorusWindow from "../components/window/prebuilt/ChorusWindow";
import LowPassFilterWindow from "../components/window/prebuilt/LowPassFilterWindow";
import SoftClipWindow from "../components/window/prebuilt/SoftClipWindow";
import ReverbWindow from "../components/window/prebuilt/ReverbWindow";

export function showEffectWindow(effect: Effector, deps: WindowContextValue) {

    deps.setTitle(effect.label ?? "Channel effect");
    deps.showWindow();

    switch (effect.name) {
        case "Analyser":
            // The waveform/spectrum toolbar needs more room than the default window size.
            deps.setSize(560, 440);
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
            break;
        case "Reverb":
            deps.setContent(<ReverbWindow reverb={effect as Reverb}/>);
            break;
    }
}