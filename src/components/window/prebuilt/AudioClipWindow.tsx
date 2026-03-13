import { useState } from "react";
import { type AudioClip } from "@fluex/fluexgl-dsp";

import { type AudioLibraryFile } from "../../../services/audioLibraryService";
import { getAudioClipById } from "../../../services/audioClipService";

import useTranslation from "../../../hooks/useTranslations";
import HeaderDivider from "../../header/HeaderDivider";

export interface AudioClipWindowProperties {
    audioLibraryFile: AudioLibraryFile;
}

export default function AudioClipWindow({ audioLibraryFile }: AudioClipWindowProperties) {

    const translate = useTranslation();

    const [associatedAudioClip, setAssociatedAudioClip] = useState<AudioClip | null>(getAudioClipById(audioLibraryFile.id));

    console.log(associatedAudioClip);

    if(!associatedAudioClip)
        return <p>Error: No associated audio clip has been found.</p>

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center"
        }}>
            <h1 style={{
                fontSize: "1.6rem"
            }}>{audioLibraryFile.fileName}</h1>
            
            <HeaderDivider />
        </div>
    )
}