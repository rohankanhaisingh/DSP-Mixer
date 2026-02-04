import "./FileExplorer.scss";

import { FileMusic, Folder, FolderOpen } from "lucide-react";
import { useState } from "react";

interface FileComponentProperties {
    name: string;
    path: string;
}

interface DirectoryComponentProperties {
    name: string;
    files: { [key: string]: string };
}

function FileComponent({ name, path }: FileComponentProperties) {
    return (
        <div className="file-explorer__file" title={path}>
            <FileMusic size={14} />
            <span>{name}</span>
        </div>
    )
}

function DirectoryComponent({ name, files }: DirectoryComponentProperties) {

    const [isShowingFiles, setIsShowingFiles] = useState<boolean>(false);

    return (
        <div className="file-explorer__directory">
            <div className="file-explorer__directory__directory-name" onClick={() => setIsShowingFiles(!isShowingFiles)}>
                {(function () {
                    return isShowingFiles
                        ? <FolderOpen size={14} />
                        : <Folder size={14} />
                })()}
                {name}
            </div>
            {isShowingFiles && (
                <div className="file-explorer__directory__files">
                    {Object.keys(files).map(function (name: string) {
                        return <FileComponent name={name} path={files[name]} />
                    })}
                </div>
            )}
        </div>
    )
}

export interface FileStructure {
    [key: string]: string | {
        [key: string]: string;
    };
}

export interface FileExplorerProperties {
    fileStructure: FileStructure;
}


export default function FileExplorer({ fileStructure }: FileExplorerProperties) {

    console.log(fileStructure);

    return (
        <div className="file-explorer">
            {Object.keys(fileStructure).map(function (name: string) {

                const isFile: boolean = typeof fileStructure[name] === "string",
                    directoryItems = fileStructure[name] as { [key: string]: string };

                return isFile
                    ? <FileComponent name={name} path={fileStructure[name] as string} />
                    : <DirectoryComponent name={name} files={directoryItems} />;
            })}
        </div>
    );
}