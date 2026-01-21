import { Bolt, AudioLines, Sparkles, CircleMinus } from "lucide-react";
import { useState, useRef, useCallback } from "react";

import HeaderContent from "../HeaderContent";
import HeaderTitlebar from "../HeaderTitlebar";
import HeaderDivider from "../HeaderDivider";
import HeaderCategory from "../HeaderCategory";

import FloatingSelectionBox from "../../common/FloatingSelectionBox";
import Button from "../../common/Button";


import { listAvailableEffects, attachEffectOnChannel, detachEffectOnChannel } from "../../../services/effectorService";

import { Channel, AudioClip, Effector } from "@fluex/fluexgl-dsp";
import { showEffectWindow } from "../../../services/effectWindowService";
import useWindow from "../../../hooks/useWindow";

export interface ChannelSettingsProperties {
    channel: Channel;
    onAudioClipSelect?(clip: AudioClip): void;
}

export default function ChannelSettingsHeader({ channel, onAudioClipSelect }: ChannelSettingsProperties) {

    const [isShowingEffectSelection, setIsShowingEffectSelection] = useState<boolean>(false);
    const [isShowingEffectDetachList, setIsShowingEffectDetachList] = useState<boolean>(false);

    const selectEffectButtonRef = useRef<HTMLDivElement>(null);
    const removeEffectButtonRef = useRef<HTMLDivElement>(null);

    const useWindowHookValues = useWindow();

    const onEffectSelectCallback = useCallback(function (effectName: string) {
        setIsShowingEffectSelection(false);
        attachEffectOnChannel(effectName, channel);
    }, []);

    const onDetachEffectCallback = useCallback(function (effect: Effector) {
        setIsShowingEffectDetachList(false);
        detachEffectOnChannel(effect, channel);
    }, []);

    const onShowEffectWindowCallback = useCallback(function (effect: Effector) {
        showEffectWindow(effect, useWindowHookValues);
    }, []);

    if (!channel.audioClipPlayer) {
        return (
            <>
                <HeaderContent>
                    <p>No AudioClipPlayer found on channel.</p>
                </HeaderContent>
            </>
        )
    }

    return (
        <>
            <HeaderContent>
                <HeaderTitlebar icon={<Bolt size={20} />} title={channel.label ?? "Channel"} />
                <HeaderDivider />
                <HeaderCategory label="Details">
                    <p>Label: {channel.label}</p>
                    <p>Id: <code>{channel.id}</code></p>
                </HeaderCategory>
                <HeaderCategory label="Audio clips">
                    {channel.audioClipPlayer.audioClips.length !== 0 ? channel.audioClipPlayer.audioClips.map(function (clip: AudioClip, index: number) {
                        return (
                            <Button icon={<AudioLines size={16} />} title={clip.label ?? "Audio clip"} text={clip.label ?? "Audio clip"} key={index} onClick={() => onAudioClipSelect?.(clip)} />
                        );
                    }) : <p>No audio clips attached.</p>}
                </HeaderCategory>
                <HeaderCategory label="Attached effects">
                    {channel.effects.length !== 0 ? channel.effects.map(function (effect, index) {
                        return (
                            <Button icon={<Sparkles size={16} />} title={effect.label ?? "Effect"} text={effect.label ?? "Effect"} key={index} onClick={() => onShowEffectWindowCallback(effect)} />
                        );
                    }) : <>
                        <p>No effects applied.</p>
                    </>}
                </HeaderCategory>
                <HeaderDivider />
                <HeaderCategory label="Effect controls">
                    <Button icon={<Sparkles size={16} />} title="Add Effect" text="Add Effect" onClick={() => setIsShowingEffectSelection(true)} ref={selectEffectButtonRef} />
                    <Button icon={<CircleMinus size={16} />} title="Remove effect" text="Remove effect" style="red" onClick={() => setIsShowingEffectDetachList(true)} ref={removeEffectButtonRef} />
                </HeaderCategory>
            </HeaderContent>

            {isShowingEffectSelection && <FloatingSelectionBox<string>
                title="Select Effect"
                items={listAvailableEffects().map(function (effectName: string) {
                    return {
                        item: effectName,
                        label: effectName,
                        icon: <Sparkles size={16} />,
                        data: effectName
                    }
                })}
                onSelect={onEffectSelectCallback}
                onCancel={() => setIsShowingEffectSelection(false)}
                anchor={selectEffectButtonRef.current ?? undefined}
            />}

            {isShowingEffectDetachList && <FloatingSelectionBox<Effector>
                title="Select effect"
                items={channel.effects.map(function (effect: Effector) {
                    return {
                        item: effect,
                        label: effect.label ?? "Effect",
                        icon: <Sparkles size={16} />,
                        data: effect
                    }
                })}
                onSelect={onDetachEffectCallback}
                onCancel={() => setIsShowingEffectDetachList(false)}
                anchor={removeEffectButtonRef.current ?? undefined}
            />}
        </>
    )
}