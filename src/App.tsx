import { useCallback, useEffect, useState } from "react";
import { Folder, FileMusic } from "lucide-react";
import { AudioDevice, DspPipeline } from "@fluex/fluexgl-dsp";

import Loader from "./components/common/Loader";
import NavigationBar from "./components/common/NavigationBar";

import Header from "./components/header/Header";
import HeaderContent from "./components/header/HeaderContent";
import HeaderTitlebar from "./components/header/HeaderTitlebar";
import HeaderDivider from "./components/header/HeaderDivider";

import AudioSourceLibraryHeader from "./components/header/prebuilt/AudioSourceLibraryHeader";
import AudioClipWindow from "./components/window/prebuilt/AudioClipWindow";

import Mixer from "./components/mixer/Mixer";

import { loadLocalAudioFiles, type AudioLibraryFile } from "./services/audioLibraryService";
import { startMixerPeakMeterService } from "./services/mixerPeakMeterService";
import { initializeMixerChannelService } from "./services/mixerChannelService";

import useWindow from "./hooks/useWindow";

import "./styles/App.scss";

const baseUrl = import.meta.env.BASE_URL;

export default function App() {

    const { setContent, setTitle, setIcon, showWindow } = useWindow();

    const [audioDevice, setAudioDevice] = useState<AudioDevice | null>(null);
    const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(true);
    const [isLoaderFadingOut, setIsLoaderFadingOut] = useState<boolean>(false);
    const [hasInitializedPipeline, setHasInitializedPipeline] = useState<boolean>(false);
    const [loadingText, setLoadingText] = useState<string>("");

    const audioLibraryFileOnClickCallback = useCallback(function (file: AudioLibraryFile) {
        setContent(<AudioClipWindow audioLibraryFile={file} />);
        setTitle(file.fileName);
        setIcon(<FileMusic size={14} />);
        showWindow();
    }, [setContent, setTitle, setIcon, showWindow]);

    useEffect(function () {

        let cancelled = false;

        (async function () {
            try {
                const pipeline = new DspPipeline({
                    pathToWasm: baseUrl + "data/fluexgl-dsp-wasm/fluexgl-dsp-wasm_bg.wasm",
                    pathToWorklet: baseUrl + "data/fluexgl-dsp-wasm/fluexgl-dsp-processor.worklet"
                });

                setLoadingText("Initializing DSP pipeline...");
                await pipeline.initializeDpsPipeline();

                setLoadingText("Resolving default audio output device...");
                const resolvedAudioDevice = await pipeline.resolveDefaultAudioOutputDevice();

                if (!resolvedAudioDevice || cancelled) return setLoadingText("Failed to load: no default audio output device found.");

                setAudioDevice(resolvedAudioDevice);
                initializeMixerChannelService(resolvedAudioDevice);
                startMixerPeakMeterService();

                setLoadingText("Loading local audio files...");
                await loadLocalAudioFiles();

                setHasInitializedPipeline(true);
            } catch (err) {
                setHasInitializedPipeline(false);
                setLoadingText("Something went wrong while loading the application. " + err);
                throw err;
            }
        })();

        return function () { cancelled = true; };
    }, []);

    useEffect(function () {

        if (!audioDevice || !hasInitializedPipeline) return;

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
    }, [audioDevice, hasInitializedPipeline]);



    if (!audioDevice) return <Loader isFadingOut={isLoaderFadingOut} loadingText={loadingText} />;

    return (
        <div className="app-layout">
            <div className="app-layout__container">
                {(isLoaderVisible) && (
                    <Loader isFadingOut={isLoaderFadingOut} loadingText={loadingText} />
                )}

                <>
                    <NavigationBar title="DSP Mixer" />
                    <Header position="left">
                        <HeaderContent>
                            <HeaderTitlebar icon={<Folder size={20} />} title="Explorer" />
                            <HeaderDivider />
                            <AudioSourceLibraryHeader onFileClick={audioLibraryFileOnClickCallback} />
                        </HeaderContent>
                    </Header>

                    <Mixer
                        audioDevice={audioDevice as AudioDevice}
                    />

                    {/* <Header position="right">
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
                    </Header> */}
                </>
            </div>
        </div>
    )
}