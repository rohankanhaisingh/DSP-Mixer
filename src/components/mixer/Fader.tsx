import { useState, useRef, type MouseEvent } from "react";
import { Ease } from "@babahgee/easings";
import "./Fader.scss";

export interface FaderProperties {
    initialValue?: number;
    maximumValue?: number;
    onChange?: (value: number) => void;
}

export default function Fader({ initialValue, maximumValue, onChange }: FaderProperties) {

    const [internalValue, setInternalValue] = useState<number>(initialValue ?? 100);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [maxValue] = useState<number>(maximumValue ?? 120);

    const bodyRef = useRef<HTMLDivElement>(null);

    function handleThumbMovement(event: MouseEvent<HTMLDivElement>): void {

        if (!isDragging || !bodyRef.current) return;

        const bodyBoundary: DOMRect = bodyRef.current.getBoundingClientRect();

        const bottomOffset: number = bodyBoundary.bottom - event.clientY;

        let ratio: number = bottomOffset / bodyBoundary.height;

        if (ratio < 0) ratio = 0;
        if (ratio > 1) ratio = 1;

        const calculatedInternalValue: number = maxValue * ratio;

        const fixedValue: number = Number(calculatedInternalValue.toFixed(1))

        setInternalValue(fixedValue);
        onChange?.(fixedValue);
    }

    function handleThumbMouseDown(event: MouseEvent<HTMLDivElement>): void {

        event.preventDefault();

        if (event.button !== 1) return setIsDragging(true);

        Ease(internalValue, 100, "easeOutExpo", 1000, function (value: number) {

            const fixedValue: number = Number(value.toFixed(1));

            setInternalValue(fixedValue);
            onChange?.(fixedValue);
        });

        setIsDragging(false);
    }

    const displayPercentage: number = Math.max(0, Math.min(100, (internalValue / maxValue) * 100));

    return (
        <div
            className={`channel-fader ${isDragging ? "is-dragging" : ""}`}
            onMouseMove={handleThumbMovement}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
        >
            <div className="channel-fader__body" ref={bodyRef}>
                <div
                    className="channel-fader__body__current"
                    style={{ height: displayPercentage + "%" }}
                >
                    <div className="channel-fader__body__current__container">
                        <div className="channel-fader__body__current__label">
                            <span>{internalValue}%</span>
                        </div>
                        <div
                            className="channel-fader__body__current__thumb"
                            onMouseDown={handleThumbMouseDown}
                        >
                            <div className="channel-fader__body__current__thumb__line"></div>
                            <div className="channel-fader__body__current__thumb__line"></div>
                            <div className="channel-fader__body__current__thumb__line"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}