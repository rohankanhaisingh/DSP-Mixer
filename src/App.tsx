import { useEffect, useState, useCallback } from "react";
import { Folder } from "lucide-react";
import { AudioDevice, DspPipeline, Channel, AudioClip } from "@fluex/fluexgl-dsp";

import Loader from "./components/common/Loader";
import NavigationBar from "./components/common/NavigationBar";
import LoaderIndicator from "./components/common/LoaderIndicator";

import Header from "./components/header/Header";
import HeaderContent from "./components/header/HeaderContent";
import HeaderTitlebar from "./components/header/HeaderTitlebar";
import HeaderDivider from "./components/header/HeaderDivider";

import AudioSourceLibraryHeader from "./components/header/prebuilt/AudioSourceLibraryHeader";
import AudioClipSettingsHeader from "./components/header/prebuilt/AudioClipSettingsHeader";
import ChannelSettingsHeader from "./components/header/prebuilt/ChannelSettingsHeader";
import ApplicationInfoHeader from "./components/header/prebuilt/ApplicationInfoHeader";

import Mixer from "./components/mixer/Mixer";

import { type AudioLibraryFile, getAudioLibraryFileById } from "./services/audioLibraryService";
import { startMixerPeakMeterService } from "./services/mixerPeakMeterService";
import { initializeMixerChannelService } from "./services/mixerChannelService";

import "./styles/App.scss";

const baseUrl = import.meta.env.BASE_URL;

export default function App() {

    const [audioDevice, setAudioDevice] = useState<AudioDevice | null>(null);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const [selectedAudioFile, setSelectedAudioFile] = useState<AudioLibraryFile | null>(null);

    const [isLoadingRightHeader, setIsLoadingRightHeader] = useState<boolean>(false);

    const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(true);
    const [isLoaderFadingOut, setIsLoaderFadingOut] = useState<boolean>(false);

    useEffect(function () {

        let cancelled = false;

        (async function () {
            try {
                const pipeline = new DspPipeline({
                    pathToWasm: baseUrl + "fluexgl-dsp-wasm-release-0.4.2/fluexgl-dsp-wasm_bg.wasm",
                    pathToWorklet: baseUrl + "fluexgl-dsp-wasm-release-0.4.2/fluexgl-dsp-processor.worklet"
                });

                await pipeline.InitializeDpsPipeline();

                const resolvedAudioDevice = await pipeline.ResolveDefaultAudioOutputDevice();

                if (!resolvedAudioDevice || cancelled) {
                    return;
                }

                setAudioDevice(resolvedAudioDevice);
                initializeMixerChannelService(resolvedAudioDevice);
                startMixerPeakMeterService();

            } catch (error) {
                console.error("Failed to initialize DSP pipeline:", error);
            }
        })();

        return function () { cancelled = true; };
    }, []);

    useEffect(function () {

        if (!audioDevice) return;

        let timeOut: number;

        setTimeout(function () {

            setIsLoaderFadingOut(true);

            timeOut = window.setTimeout(function () {
                setIsLoaderVisible(false);
            }, 250);
        }, 1000);

        return function () {
            clearTimeout(timeOut);
        }
    }, [audioDevice]);

    const onMixerChannelSettingsButtonClick = useCallback(function (channel: Channel) {

        setSelectedAudioFile(null);
        setSelectedChannel(null);
        setIsLoadingRightHeader(true);

        setTimeout(function () {
            setIsLoadingRightHeader(false);
            setSelectedChannel(channel);
        }, 100)
    }, []);

    const handleOnAudioLibraryFileClick = useCallback(function (file: AudioLibraryFile) {

        setSelectedChannel(null);
        setSelectedAudioFile(null);
        setIsLoadingRightHeader(true);

        setTimeout(function () {
            setIsLoadingRightHeader(false);
            setSelectedAudioFile(file);
        }, 100);
    }, []);

    const onAudioClipSelectFromChannelSettingsCallback = useCallback(function (clip: AudioClip) {

        const associatedLibraryFile: AudioLibraryFile | null = getAudioLibraryFileById(clip.id);

        if (!associatedLibraryFile) return;

        handleOnAudioLibraryFileClick(associatedLibraryFile);
    }, []);

    if (!audioDevice) return <Loader isFadingOut={isLoaderFadingOut} />;

    return (
        <div className="app-layout">
            <div className="app-layout__container">
                {(isLoaderVisible) && (
                    <Loader isFadingOut={isLoaderFadingOut} />
                )}

                <>
                    <NavigationBar title="DSP Mixer" />

                    <Header position="left">
                        <HeaderContent>
                            <HeaderTitlebar icon={<Folder size={20} />} title="Explorer" />
                            <HeaderDivider />
                            <AudioSourceLibraryHeader onFileClick={handleOnAudioLibraryFileClick} />
                        </HeaderContent>
                    </Header>

                    <Mixer
                        audioDevice={audioDevice as AudioDevice}
                        onChannelSettingsButtonClick={onMixerChannelSettingsButtonClick}
                    />

                    <Header position="right">
                        {selectedChannel && <ChannelSettingsHeader channel={selectedChannel} onAudioClipSelect={onAudioClipSelectFromChannelSettingsCallback} />}
                        {selectedAudioFile && <AudioClipSettingsHeader audioFile={selectedAudioFile} />}
                        {isLoadingRightHeader && (
                            <div style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <LoaderIndicator theme="fluexgl-dsp" size="regular" />
                            </div>
                        )}
                        {(!selectedChannel && !selectedAudioFile && !isLoadingRightHeader) && (
                            <ApplicationInfoHeader />
                        )}
                    </Header>
                </>
            </div>
        </div>
    )
}