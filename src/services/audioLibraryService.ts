import { v4 } from "uuid";
import { type AudioSourceData, LoadAudioSourceFromBlob } from "@fluex/fluexgl-dsp";

export const audioLibraryFiles: AudioLibraryFile[] = [];

export interface AudioLibraryFile {
    id: string;
    fileName: string;
    fileSize: number;
    audioSourceData: AudioSourceData;
}

export interface AudioLibraryFileData {
    fileName: string;
    fileSize: number;
    fileType: string;
    file: Blob;
}

export async function addAudioLibraryFileToMemory(data: AudioLibraryFileData): Promise<AudioLibraryFile | null> {

    const audioSourceData = await LoadAudioSourceFromBlob(data.file);
    if (!audioSourceData) return null;

    const { fileName, fileSize } = data;

    const item: AudioLibraryFile = {
        fileName,
        fileSize,
        audioSourceData,
        id: v4()
    };

    audioLibraryFiles.push(item);

    return item;
}

export function getAudioLibraryFileById(id: string): AudioLibraryFile | null {

    const foundItem = audioLibraryFiles.find(function (item) {
        return item.id === id;
    });

    return foundItem ?? null;
}