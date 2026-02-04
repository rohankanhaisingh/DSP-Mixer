import { AudioDevice, Channel } from "@fluex/fluexgl-dsp";

import { useCallback, useEffect, useState, useRef } from "react";
import { Ease } from "@babahgee/easings";

import MixerChannel from "./Channel";
import CreateChannelButton from "./CreateChannelButton";

import "./Mixer.scss";
import { createNewChannel } from "../../services/mixerChannelService";
import ChannelSettingsHeader from "../header/prebuilt/ChannelSettingsHeader";
import Header from "../header/Header";

export interface MixerProperties {
    audioDevice: AudioDevice;
}

export default function Mixer({ audioDevice }: MixerProperties) {

    const masterChannel = audioDevice.GetMasterChannel();

    const [channels, setChannels] = useState<Channel[]>(function () {
        return masterChannel.channels.slice();
    });

    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

    const mixerScrollerRef = useRef<HTMLDivElement | null>(null);
    const previousChannelCountRef = useRef<number>(channels.length);

    useEffect(function () {
        setChannels(masterChannel.channels.slice());
    }, [masterChannel]);

    useEffect(function () {

        const previousCount = previousChannelCountRef.current,
            currentCount = channels.length;

        if (currentCount > previousCount) {

            const mixerScroller = mixerScrollerRef.current;

            if (mixerScroller) {

                let start = mixerScroller.scrollLeft,
                    end = mixerScroller.scrollWidth - mixerScroller.clientWidth;

                if (end < 0) end = 0;

                Ease(start, end, "easeOutExpo", 1000, function (scrollX: number) {
                    if (mixerScroller) {
                        mixerScroller.scroll({ left: scrollX });
                    }
                });
            }
        }

        previousChannelCountRef.current = currentCount;
    }, [channels.length]);

    useEffect(function () {

        const current = mixerScrollerRef.current;

        if (!current) return;

        current.addEventListener("wheel", function (event: WheelEvent) {

            const direction: string = (event.deltaY < 0) ? "up" : "down";

            switch (direction) {
                case "up":
                    current.scroll({ left: current.scrollLeft + 20 });
                    return;
                case "down":
                    current.scroll({ left: current.scrollLeft - 20 });
                    return;
            }
        });

    }, [mixerScrollerRef]);

    const createChannelButtonOnClick = useCallback(function () {

        createNewChannel();
        setChannels(masterChannel.channels.slice());
    }, [masterChannel]);

    const settingsButtonClickCallback = useCallback(function (channel: Channel) {
        setSelectedChannel(channel);
    }, []);

    return (
        <div className="app-mixer">
            <div className="app-mixer__container">
                <div className="app-mixer__container__channels" ref={mixerScrollerRef}>
                    <MixerChannel
                        channelCount="M"
                        label="Master channel"
                        internalChannelId={masterChannel.id}
                        isMaster
                    />

                    {channels.map(function (channel: Channel, index: number) {
                        return (
                            <MixerChannel
                                key={index}
                                label={channel.label ?? "Channel"}
                                channelCount={(index + 1).toString() ?? "0"}
                                internalChannelId={channel.id}
                                onSettingsButtonClick={settingsButtonClickCallback}
                            />
                        );
                    })}

                    <CreateChannelButton onClick={createChannelButtonOnClick} />
                </div>
                <Header>
                    {selectedChannel && <ChannelSettingsHeader channel={selectedChannel} onAudioClipSelect={() => null} />}
                </Header>
            </div>
        </div>
    );
}