import { useEffect, useState } from "react";
import { Folder } from "lucide-react";
import { AudioDevice, DspPipeline } from "@fluex/fluexgl-dsp";

import Loader from "./components/common/Loader";
import NavigationBar from "./components/common/NavigationBar";

import Header from "./components/header/Header";
import HeaderContent from "./components/header/HeaderContent";
import HeaderTitlebar from "./components/header/HeaderTitlebar";
import HeaderDivider from "./components/header/HeaderDivider";

import AudioSourceLibraryHeader from "./components/header/prebuilt/AudioSourceLibraryHeader";

import Mixer from "./components/mixer/Mixer";

import { loadLocalAudioFiles } from "./services/audioLibraryService";
import { startMixerPeakMeterService } from "./services/mixerPeakMeterService";
import { initializeMixerChannelService } from "./services/mixerChannelService";

import "./styles/App.scss";

const baseUrl = import.meta.env.BASE_URL;

export default function App() {

    const [audioDevice, setAudioDevice] = useState<AudioDevice | null>(null);
    const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(true);
    const [isLoaderFadingOut, setIsLoaderFadingOut] = useState<boolean>(false);
    const [hasInitializedPipeline, setHasInitializedPipeline] = useState<boolean>(false);
    const [loadingText, setLoadingText] = useState<string>("");

    useEffect(function () {

        let cancelled = false;

        (async function () {
            try {
                const pipeline = new DspPipeline({
                    pathToWasm: baseUrl + "fluexgl-dsp-wasm-release-0.4.7/fluexgl-dsp-wasm_bg.wasm",
                    pathToWorklet: baseUrl + "fluexgl-dsp-wasm-release-0.4.7/fluexgl-dsp-processor.worklet"
                });

                setLoadingText("Initializing DSP pipeline...");
                await pipeline.InitializeDpsPipeline();

                setLoadingText("Resolving default audio output device...");
                const resolvedAudioDevice = await pipeline.ResolveDefaultAudioOutputDevice();

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



    // const onAudioClipSelectFromChannelSettingsCallback = useCallback(function (clip: AudioClip) {

    //     const associatedLibraryFile: AudioLibraryFile | null = getAudioLibraryFileById(clip.id);

    //     if (!associatedLibraryFile) return;

    //     // handleOnAudioLibraryFileClick(associatedLibraryFile);
    // }, []);

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
                            <AudioSourceLibraryHeader onFileClick={() => null} />
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