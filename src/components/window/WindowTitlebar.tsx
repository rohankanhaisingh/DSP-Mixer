import { type ReactNode, useCallback, useState } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";

export interface WindowTitlebarProperties {
    title?: string;
    icon?: ReactNode;
    draggable?: boolean;
    onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onCloseButtonClick?: () => void;
    onChangeWindowSizeButtonClick?: (isExpanded: boolean) => void;
}

export default function WindowTitlebar({ title, icon, draggable, onMouseDown, onCloseButtonClick, onChangeWindowSizeButtonClick }: WindowTitlebarProperties) {

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const onChangeWindowSizeButtonClickCallback = useCallback(function () {

        onChangeWindowSizeButtonClick?.(!isExpanded);
        setIsExpanded(!isExpanded);

    }, [isExpanded]);

    return (
        <div
            className="flex flex-row justify-between items-center bg-[var(--color-surface-light)] rounded-t-[5px] px-[10px] py-[5px] text-[var(--color-shadow-grey-300)]"
            onMouseDown={draggable ? onMouseDown : undefined}
        >
            <div className="flex flex-row gap-[10px]">
                {icon}
                <span>{title}</span>
            </div>
            <div className="flex flex-row gap-[10px]">
                <div className="w-[20px] h-[20px] rounded-[5px] flex items-center justify-center hover:bg-[var(--color-panel-hover)] cursor-pointer" onClick={onChangeWindowSizeButtonClickCallback}>
                    {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </div>
                <div className="w-[20px] h-[20px] rounded-[5px] flex items-center justify-center hover:bg-[var(--color-panel-hover)] cursor-pointer" onClick={onCloseButtonClick}>
                    <X size={16} />
                </div>
            </div>
        </div>
    );
}