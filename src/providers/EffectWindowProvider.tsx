import { createContext, useState } from "react";
import { Sparkles } from "lucide-react";
import { Chorus, Effector, LowPassFilter, SoftClip } from "@fluex/fluexgl-dsp";

import Window from "../components/window/Window";

import SoftClipWindow from "../components/window/prebuilt/SoftClipWindow";
import ChorusWindow from "../components/window/prebuilt/ChorusWindow";
import LowPassFilterWindow from "../components/window/prebuilt/LowPassFilterWindow";

export interface EffectWindowContextValue {
    currentEffect: Effector | null;
    showEffectWindow(effect: Effector): void;
    closeEffectWindow(): void;
}

export const EffectWindowContext = createContext<EffectWindowContextValue | null>(null);

export interface EffectWindowProviderProperties {
    children?: React.ReactNode;
}

export default function EffectWindowProvider({ children }: EffectWindowProviderProperties) {

    const [currentEffect, setCurrentEffect] = useState<Effector | null>(null);

    function showEffectWindow(effect: Effector) {
        setCurrentEffect(effect);
    }

    function closeEffectWindow() {
        setCurrentEffect(null);
    }

    const value: EffectWindowContextValue = {
        currentEffect,
        showEffectWindow,
        closeEffectWindow
    };

    return (
        <>
            <EffectWindowContext.Provider value={value}>
                {children}
            </EffectWindowContext.Provider>

            {currentEffect !== null && (
                <Window
                title={currentEffect.label ?? "Effector"}
                icon={<Sparkles size={16} />}
                onCloseButtonClick={() => closeEffectWindow()}>
                    {(function () {

                        switch (currentEffect.name) {
                            case "SoftClip":
                                return <SoftClipWindow softClip={currentEffect as SoftClip} />;
                            case "Chorus":
                                return <ChorusWindow chorus={currentEffect as Chorus} />
                            case "LowPassFilter":
                                return <LowPassFilterWindow lowPassFilter={currentEffect as LowPassFilter}/>
                            }
                        return null;
                    })()}
                </Window>
            )}
        </>
    );
}