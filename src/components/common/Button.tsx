import LoaderIndicator from "./LoaderIndicator";

import { type ReactNode, type RefObject } from "react";

export type ButtonStyle = "normal" | "red";

export interface ButtonProperties {
    icon?: ReactNode;
    text?: string;
    title?: string;
    disabled?: boolean;
    ref?: RefObject<HTMLDivElement | null>;
    style?: ButtonStyle;
    onClick?: () => void;
}

export default function Button({ icon, text, title, onClick, ref, disabled = false, style = "normal" }: ButtonProperties ) {

    return (
        <div className={`flex items-center gap-[10px] p-[10px] bg-[var(--color-panel)] rounded-[5px] select-none cursor-pointer transition-colors duration-150 ease-in-out ${style} ${disabled ? "disabled" : ""}`} title={title} role="button" onClick={() => !disabled && onClick?.()} ref={ref ?? null}>
            {disabled ? <LoaderIndicator size="small" theme="fluexgl-dsp" /> : icon}
            <span className="text-[var(--font-size-small)] w-full overflow-hidden whitespace-nowrap">{text}</span>
        </div>
    )
}