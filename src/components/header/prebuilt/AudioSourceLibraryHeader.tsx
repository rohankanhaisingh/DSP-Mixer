import { AudioLines, Upload } from "lucide-react";
import { useState, useCallback } from "react";

import Button from "../../common/Button";
import HeaderCategory from "../HeaderCategory";

import { addAudioLibraryFileToMemory, type AudioLibraryFile } from "../../../services/audioLibraryService";

export interface AudioSourceLibraryHeaderProperties {
	onFileClick?: (file: AudioLibraryFile) => void;
}

export default function AudioSourceLibraryHeader({ onFileClick }: AudioSourceLibraryHeaderProperties) {

	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [files, setFiles] = useState<AudioLibraryFile[]>([]);

	const uploadButtonOnClick = useCallback(function () {

		if (isUploading) return;

		setIsUploading(true);

		(function () {

			const tempInput = document.createElement("input");
			tempInput.type = "file";
			tempInput.accept = "audio/*";

			tempInput.addEventListener("change", function (event: Event) {

				const target = event.target as HTMLInputElement;

				if (!target.files || target.files.length === 0) {
					setIsUploading(false);
					return;
				}

				const file = target.files[0];

				const fileName: string = file.name;
				const fileSize: number = file.size;
				const fileType: string = file.type;

				addAudioLibraryFileToMemory({
					fileName,
					fileSize,
					fileType,
					file
				}).then(function (item: AudioLibraryFile | null) {
					if (item) {
						setFiles(function (prev: AudioLibraryFile[]) {
							return prev.concat(item);
						});
					}
				})

				target.remove();
				setIsUploading(false);
			});

			tempInput.click();
		})();
	}, [isUploading]);

	const uploadedAudioFileOnClickHandler = useCallback(function (file: AudioLibraryFile) {
		onFileClick?.(file);
	}, []);

	return (
		<HeaderCategory label="Audio library">
			{files.map(function (file: AudioLibraryFile, index: number) {

				return (
					<Button 
						icon={<AudioLines size={16} />} 
						title={file.fileName} 
						text={file.fileName} 
						key={index}
						onClick={() => uploadedAudioFileOnClickHandler(file)} />
				);
			})}

			<Button
				icon={<Upload size={16} />}
				text="Upload file"
				title="Upload file"
				disabled={isUploading}
				onClick={uploadButtonOnClick}
			/>
		</HeaderCategory>
	);
}