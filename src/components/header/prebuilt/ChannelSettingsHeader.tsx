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
import useTranslation from "../../../hooks/useTranslations";

export interface ChannelSettingsProperties {
    channel: Channel;
    onAudioClipSelect?(clip: AudioClip): void;
}

export default function ChannelSettingsHeader({ channel, onAudioClipSelect }: ChannelSettingsProperties) {
    const translate = useTranslation();

    const [isShowingEffectSelection, setIsShowingEffectSelection] = useState<boolean>(false);
    const [isShowingEffectDetachList, setIsShowingEffectDetachList] = useState<boolean>(false);

    const selectEffectButtonRef = useRef<HTMLDivElement>(null);
    const removeEffectButtonRef = useRef<HTMLDivElement>(null);

    const useWindowHookValues = useWindow();

    const onEffectSelectCallback = useCallback(function (effectName: string) {
        setIsShowingEffectSelection(false);
        attachEffectOnChannel(effectName, channel);
    }, [channel]);

    const onDetachEffectCallback = useCallback(function (effect: Effector) {
        setIsShowingEffectDetachList(false);
        detachEffectOnChannel(effect, channel);
    }, [channel]);

    const onShowEffectWindowCallback = useCallback(function (effect: Effector) {
        showEffectWindow(effect, useWindowHookValues);
    }, [useWindowHookValues]);

    if (!channel.audioClipPlayer) {
        return (
            <>
                <HeaderContent>
                    <p>{translate("channel_settings.no_audio_clip_player")}</p>
                </HeaderContent>
            </>
        );
    }

    const channelTitle = channel.label ?? translate("audio_clip_settings.channel_fallback");

    return (
        <>
            <HeaderContent>
                <HeaderTitlebar icon={<Bolt size={20} />} title={channelTitle} />
                <HeaderDivider />

                <HeaderCategory label={translate("audio_clip_settings.details_category_title")}>
                    <p>{translate("channel_settings.label", [channel.label ?? ""])}</p>
                    <p>
                        {translate("channel_settings.id", [""])} <code>{channel.id}</code>
                    </p>
                </HeaderCategory>

                <HeaderCategory label={translate("channel_settings.audio_clips_category_title")}>
                    {channel.audioClipPlayer.audioClips.length !== 0 ? (
                        channel.audioClipPlayer.audioClips.map(function (clip: AudioClip, index: number) {
                            const clipLabel = clip.label ?? translate("channel_settings.audio_clip_fallback");

                            return (
                                <Button
                                    icon={<AudioLines size={16} />}
                                    title={clipLabel}
                                    text={clipLabel}
                                    key={index}
                                    onClick={function () {
                                        if (onAudioClipSelect) onAudioClipSelect(clip);
                                    }}
                                />
                            );
                        })
                    ) : (
                        <p>{translate("channel_settings.no_audio_clips_attached")}</p>
                    )}
                </HeaderCategory>

                <HeaderCategory label={translate("channel_settings.attached_effects_category_title")}>
                    {channel.effects.length !== 0 ? (
                        channel.effects.map(function (effect: Effector, index: number) {
                            const effectLabel = effect.label ?? translate("channel_settings.effect_fallback");

                            return (
                                <Button
                                    icon={<Sparkles size={16} />}
                                    title={effectLabel}
                                    text={effectLabel}
                                    key={index}
                                    onClick={function () {
                                        onShowEffectWindowCallback(effect);
                                    }}
                                />
                            );
                        })
                    ) : (
                        <p>{translate("channel_settings.no_effects_applied")}</p>
                    )}
                </HeaderCategory>

                <HeaderDivider />

                <HeaderCategory label={translate("channel_settings.effect_controls_category_title")}>
                    <Button
                        icon={<Sparkles size={16} />}
                        title={translate("channel_settings.add_effect")}
                        text={translate("channel_settings.add_effect")}
                        onClick={function () {
                            setIsShowingEffectSelection(true);
                        }}
                        ref={selectEffectButtonRef}
                    />
                    <Button
                        icon={<CircleMinus size={16} />}
                        title={translate("channel_settings.remove_effect")}
                        text={translate("channel_settings.remove_effect")}
                        style="red"
                        onClick={function () {
                            setIsShowingEffectDetachList(true);
                        }}
                        ref={removeEffectButtonRef}
                    />
                </HeaderCategory>
            </HeaderContent>

            {isShowingEffectSelection && (
                <FloatingSelectionBox<string>
                    title={translate("channel_settings.select_effect_title")}
                    items={listAvailableEffects().map(function (effectName: string) {
                        return {
                            item: effectName,
                            label: effectName,
                            icon: <Sparkles size={16} />,
                            data: effectName,
                        };
                    })}
                    onSelect={onEffectSelectCallback}
                    onCancel={function () {
                        setIsShowingEffectSelection(false);
                    }}
                    anchor={selectEffectButtonRef.current ?? undefined}
                />
            )}

            {isShowingEffectDetachList && (
                <FloatingSelectionBox<Effector>
                    title={translate("channel_settings.select_effect_title")}
                    items={channel.effects.map(function (effect: Effector) {
                        return {
                            item: effect,
                            label: effect.label ?? translate("channel_settings.effect_fallback"),
                            icon: <Sparkles size={16} />,
                            data: effect,
                        };
                    })}
                    onSelect={onDetachEffectCallback}
                    onCancel={function () {
                        setIsShowingEffectDetachList(false);
                    }}
                    anchor={removeEffectButtonRef.current ?? undefined}
                />
            )}
        </>
    );
}
