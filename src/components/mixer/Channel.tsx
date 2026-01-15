import { useState, useEffect, useCallback, useRef } from "react";
import { Settings } from "lucide-react";
import { v4 } from "uuid";
import { AudioClip, Channel as DspChannel } from "@fluex/fluexgl-dsp";

import Fader from "./Fader";
import Knob from "./Knob";

import { getChannelById } from "../../services/mixerChannelService";
import { addPeakMeterDataToRegistry, removePeakMeterDataFromRegistryById } from "../../services/mixerPeakMeterService";

export interface ChannelProperties {
    label?: string;
    channelCount?: string;
    isMaster?: boolean;
    internalChannelId: string;
    onSettingsButtonClick?: (channel: DspChannel) => void;
}

export default function Channel({ label, channelCount, internalChannelId, onSettingsButtonClick }: ChannelProperties) {

    const [channelVolume, setChannelVolume] = useState<number>(100);
    const [channelLabel, setChannelLabel] = useState<string>(label ?? "Channel");
    const [channelCountColor, setChannelCountColor] = useState<string>("var(--color-surface-light)");
    const [channelPanning, setChannelPanning] = useState<number>(0);
    const [channelClipMix, setChannelClipMix] = useState<number>(1);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const channelCountColorOnClick = useCallback(function () {

        const tempInput = document.createElement("input");
        tempInput.type = "color";

        tempInput.addEventListener("change", function () {
            setChannelCountColor(tempInput.value);
            tempInput.remove();
        });

        tempInput.click();
    }, []);

    const settingsButtonClickCallback = useCallback(function () {

        const associatedChannel = getChannelById(internalChannelId);
        if (associatedChannel) onSettingsButtonClick?.(associatedChannel);

    }, [internalChannelId, onSettingsButtonClick]);

    useEffect(function () {

        const associatedChannel = getChannelById(internalChannelId);
        if (!associatedChannel || !associatedChannel.audioClipPlayer) return;

        associatedChannel.label = channelLabel;
        associatedChannel.Volume(1 / 100 * channelVolume);
        associatedChannel.Pan(channelPanning);

        associatedChannel.audioClipPlayer.audioClips.forEach(function (clip: AudioClip) {
            clip.SetVolume(channelClipMix);
        });

    }, [internalChannelId, channelLabel, channelVolume, channelPanning, channelClipMix]);

    useEffect(function () {

        const canvas: HTMLCanvasElement | null = canvasRef.current;
        const context: CanvasRenderingContext2D | null | undefined = canvas?.getContext("2d");
        const channel = getChannelById(internalChannelId);

        if (!canvas || !context || !channel) return;

        const dataId: string = v4();

        addPeakMeterDataToRegistry({
            canvas: canvas,
            context: context,
            channel: channel,
            id: dataId
        });

        return function () {
            removePeakMeterDataFromRegistryById(dataId);
        };

    }, [internalChannelId]);

    return (
        <div
            className="w-[40px] h-full select-none transition-[background] duration-[150ms]"
            style={{
                animation: "channelAppearAnimation 300ms ease forwards"
            }}
        >
            <div className="absolute inset-0 flex flex-col gap-2.5">
                <div
                    className="flex h-[30px] w-full items-center justify-center"
                    style={{ background: channelCountColor }}
                    onClick={channelCountColorOnClick}
                >
                    <span className="text-[var(--font-size-small)] font-[var(--font-semibold)]">
                        {channelCount ?? "?"}
                    </span>
                </div>

                <div className="flex h-[110px] w-full justify-center overflow-hidden">
                    <input
                        spellCheck={false}
                        value={channelLabel}
                        onInput={function (event) {
                            setChannelLabel((event.target as HTMLInputElement).value);
                        }}
                        placeholder="Channel"
                        className="
                            bg-transparent
                            border-none
                            outline-none
                            text-[var(--font-size-small)]
                            whitespace-nowrap
                            mb-2.5
                            [writing-mode:vertical-rl]
                            rotate-180
                            font-inherit
                            text-inherit
                        "
                    />
                </div>

                <div className="flex h-[120px] flex-row gap-[5px] p-[5px] rounded-[5px] bg-[var(--color-surface-light)]">
                    <canvas
                        id={"channel-" + internalChannelId}
                        ref={canvasRef}
                        className="w-full h-full"
                    />
                </div>

                <Fader
                    initialValue={100}
                    onChange={function (value: number) {
                        setChannelVolume(value);
                    }}
                />

                <div className="flex flex-col gap-[5px]">
                    <div
                        className="
                            flex h-[40px] w-[40px] items-center justify-center
                            rounded-[5px]
                            cursor-pointer
                            transition-[background,color] duration-[150ms]
                            bg-[var(--color-panel)]
                            text-[var(--color-panel-text-muted)]
                            hover:bg-[var(--color-panel-hover)]
                        "
                        onClick={settingsButtonClickCallback}
                    >
                        <Settings size={20} />
                    </div>
                </div>

                <div className="mt-auto flex flex-col items-center gap-[5px]">
                    <p className="text-[8px] uppercase">Panning</p>
                    <Knob
                        min={-1}
                        max={1}
                        step={0.1}
                        defaultValue={0}
                        onChange={function (value: number) {
                            setChannelPanning(value);
                        }}
                    />

                    <p className="text-[8px] uppercase">Clip Mix</p>
                    <Knob
                        min={0}
                        max={1}
                        step={0.01}
                        defaultValue={1}
                        onChange={function (value: number) {
                            setChannelClipMix(value);
                        }}
                    />
                </div>
            </div>

            <style>{`
                .mixer-channel-hover-bg:hover { background: var(--color-surface); }
            `}</style>
        </div>
    );
}
