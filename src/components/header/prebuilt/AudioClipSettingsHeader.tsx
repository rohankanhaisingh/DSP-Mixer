import { AudioLines, Plus, Link, Bolt, Unlink } from "lucide-react";
import { format } from "bytes";
import { useCallback, useEffect, useState, useRef } from "react";
import { AudioClip, AudioClipPlayer, Channel } from "@fluex/fluexgl-dsp";

import { type AudioLibraryFile } from "../../../services/audioLibraryService";
import { createAudioClipAssociatedToLibrary, getAudioClipById, subscribeToAudioClips } from "../../../services/audioClipService";
import { getChannels } from "../../../services/mixerChannelService";

import HeaderContent from "../HeaderContent";
import HeaderTitlebar from "../HeaderTitlebar";
import HeaderDivider from "../HeaderDivider";
import HeaderCategory from "../HeaderCategory";

import AudioClipPlayerHeader from "./AudioClipPlayerHeader";

import Button from "../../common/Button";
import FloatingSelectionBox from "../../common/FloatingSelectionBox";

export interface AudioFileDataProperties {
    audioFile: AudioLibraryFile;
}

export default function AudioClipSettingsHeader({ audioFile }: AudioFileDataProperties) {

    const selectChannelButtonRef = useRef<HTMLDivElement>(null);

    const [associatedAudioClip, setAssociatedAudioClip] = useState<AudioClip | null>(getAudioClipById(audioFile.id));
    const [isShowingChannelSelection, setIsShowingChannelSelection] = useState<boolean>(false);
    const [selectedAudioClipPlayer, setSelectedAudioClipPlayer] = useState<AudioClipPlayer | null>(associatedAudioClip?.audioClipPlayer ?? null);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

    useEffect(function () {

        const handleChange = () => setAssociatedAudioClip(getAudioClipById(audioFile.id)),
            unsubscribe = subscribeToAudioClips(handleChange);

        handleChange();
        return unsubscribe;
    }, [audioFile.id]);

    useEffect(function () {

        if (!associatedAudioClip || !selectedAudioClipPlayer || associatedAudioClip.audioClipPlayer === selectedAudioClipPlayer) return;

        if (associatedAudioClip.context)
            associatedAudioClip.audioClipPlayer?.DetachAudioClip(associatedAudioClip);

        selectedAudioClipPlayer?.AttachAudioClip(associatedAudioClip);

    }, [selectedAudioClipPlayer, associatedAudioClip, selectedChannel]);

    const createAudioClipCallback = useCallback(function () {

        const clip: AudioClip | null = createAudioClipAssociatedToLibrary(audioFile);

        if (clip) setAssociatedAudioClip(clip);
    }, [audioFile]);

    const onSelectChannelCallback = useCallback(function (channel: Channel) {

        if(!channel.audioClipPlayer) return alert("Cannot attach audio clip to channel, because the channel's AudioClipPlayer is undefined.");

        setIsShowingChannelSelection(false);
        setSelectedChannel(channel);
        setSelectedAudioClipPlayer(channel.audioClipPlayer);
    }, []);

    return (
        <>
            <HeaderContent>
                <HeaderTitlebar icon={<AudioLines size={20} />} title={audioFile.fileName} />
                <HeaderDivider />
                <HeaderCategory label="Details">
                    <p>File name: {audioFile.fileName}</p>
                    <p>File size: {format(audioFile.fileSize)}</p> 
                    <p>Duration: {audioFile.audioSourceData.audioBuffer.duration.toFixed(2)} seconds</p>
                    <p>Sample rate: {audioFile.audioSourceData.audioBuffer.sampleRate}</p>
                    <p>Channels (mostly L+R): {audioFile.audioSourceData.audioBuffer.numberOfChannels}</p>
                    <p>Id: <code>{audioFile.id}</code></p>
                </HeaderCategory>
                <HeaderDivider />
                <HeaderCategory label="DSP Audio clip">
                    {!associatedAudioClip && (
                        <Button
                            icon={<Plus size={16} />}
                            title="Create audio clip"
                            text="Create audio clip"
                            onClick={createAudioClipCallback}
                        />
                    )}
                    {associatedAudioClip && <AudioClipPlayerHeader audioClip={associatedAudioClip} />}
                </HeaderCategory>
                <HeaderDivider />
                <HeaderCategory label="DSP Channels">
                    {associatedAudioClip && (
                        <>
                            {!selectedAudioClipPlayer && <p>This audio clip has not been attached to any channel yet. Attach this clip to a channel before controlling it.</p>}

                            {selectedAudioClipPlayer && (
                                <>
                                    <p>Attached to {(selectedAudioClipPlayer.channel as Channel)?.label ?? "Channel"}</p>
                                    <Button icon={<Unlink size={16} />} text="Detach from channel" style="red" />
                                </>
                            )}

                            <Button icon={<Link size={16} />} text="Attach to channel" onClick={() => setIsShowingChannelSelection(true)} ref={selectChannelButtonRef} />
                        </>
                    )}
                    {!associatedAudioClip && (
                        <p>This audio clip cannot be attached to a channel yet, because no DSP audio clip has been made. Make one before attaching it to any channel.</p>
                    )}
                </HeaderCategory>
            </HeaderContent>

            {isShowingChannelSelection && <FloatingSelectionBox<Channel>
                title="Channels"
                onCancel={() => setIsShowingChannelSelection(false)}
                onSelect={onSelectChannelCallback}
                anchor={selectChannelButtonRef.current ?? undefined}
                items={getChannels().map(function (channel: Channel) {
                    return {
                        icon: <Bolt size={16} />,
                        label: channel.label ?? "Channel",
                        data: channel
                    }
                })}
            />}
        </>
    );
}