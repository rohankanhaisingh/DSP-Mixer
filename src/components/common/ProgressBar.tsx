import { type RefObject, useState, useRef, useEffect, useCallback } from "react";

import { computeWaveformBars } from "../../utilities/scripts/audio-buffer-computings";
import { drawWaveformBarsOnCanvas } from "../../utilities/scripts/waveform-renderer";

export interface ProgressBarPosition {
    x: number;
    y: number;
}

export interface ProgressBarOnChangeEvent {
    time: number;
    progressBarWidthInPixels: number;
}

export interface ProgressBarProperties {
    audioClipDuration: number;
    parentialContainer: RefObject<HTMLDivElement>;
    audioBuffer?: AudioBuffer;
    currentTime?: number;
    onDrag?: () => void;
    onChange?: (event: ProgressBarOnChangeEvent) => void;
}

export default function ProgressBar(props: ProgressBarProperties) {
    const { audioClipDuration, parentialContainer, currentTime, onDrag, onChange, audioBuffer } = props;

    const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
    const [progressBarFullWidth, setProgressBarFullWidth] = useState<number>(0);

    const isDraggingRef = useRef(false);
    const progressBarBodyRef = useRef<HTMLDivElement | null>(null);
    const progressBarPositionRef = useRef<ProgressBarPosition | null>(null);
    const draggedOffsetRef = useRef<number>(0);
    const waveFormCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const handleStopIsDragging = useCallback(function () {
        if (!isDraggingRef.current || progressBarFullWidth === 0) return;

        isDraggingRef.current = false;

        const seekedTime: number = Number(((audioClipDuration / progressBarFullWidth) * draggedOffsetRef.current).toFixed(2));

        onChange?.({
            time: seekedTime,
            progressBarWidthInPixels: draggedOffsetRef.current
        });
    }, [audioClipDuration, progressBarFullWidth, onChange]);

    const handleThumbMouseDown = useCallback(function () {
        const body = progressBarBodyRef.current;
        if (!body) return;

        const rect = body.getBoundingClientRect();
        progressBarPositionRef.current = { x: rect.x, y: rect.y };

        isDraggingRef.current = true;
    }, []);

    const handleThumbDragging = useCallback(function (event: MouseEvent) {
        if (!isDraggingRef.current || !progressBarPositionRef.current) return;
        if (progressBarFullWidth === 0) return;

        let offset: number = event.clientX - progressBarPositionRef.current.x;

        if (offset < 0) offset = 0;
        if (offset > progressBarFullWidth) offset = progressBarFullWidth;

        draggedOffsetRef.current = offset;

        const trackerWidthInPercentages: number = (100 / progressBarFullWidth) * offset;

        setProgressBarWidth(trackerWidthInPercentages);
        onDrag?.();
    }, [progressBarFullWidth, onDrag]);

    useEffect(function () {
        function updateWidth() {
            if (!progressBarBodyRef.current) return;

            const rect = progressBarBodyRef.current.getBoundingClientRect();
            setProgressBarFullWidth(rect.width);
        }

        updateWidth();
        window.addEventListener("resize", updateWidth);

        return function () {
            window.removeEventListener("resize", updateWidth);
        };
    }, []);

    useEffect(function () {
        const container = parentialContainer.current;
        if (!container) return;

        function onMove(event: MouseEvent) {
            handleThumbDragging(event);
        }

        function onUp() {
            handleStopIsDragging();
        }

        function onLeave() {
            handleStopIsDragging();
        }

        container.addEventListener("mousemove", onMove);
        container.addEventListener("mouseup", onUp);
        container.addEventListener("mouseleave", onLeave);

        return function () {
            container.removeEventListener("mousemove", onMove);
            container.removeEventListener("mouseup", onUp);
            container.removeEventListener("mouseleave", onLeave);
        };
    }, [parentialContainer, handleThumbDragging, handleStopIsDragging]);

    useEffect(function () {
        if (progressBarFullWidth === 0) return;
        if (audioClipDuration === 0) return;
        if (isDraggingRef.current) return;

        const safeCurrentTime = Math.max(0, Math.min(currentTime ?? 0, audioClipDuration));

        const offset = (safeCurrentTime / audioClipDuration) * progressBarFullWidth;
        draggedOffsetRef.current = offset;

        const trackerWidthInPercentages: number = (100 / progressBarFullWidth) * offset;
        setProgressBarWidth(trackerWidthInPercentages);
    }, [currentTime, audioClipDuration, progressBarFullWidth]);

    useEffect(function () {
        if (!waveFormCanvasRef.current || !audioBuffer) return;

        const canvas = waveFormCanvasRef.current;

        const peaks = computeWaveformBars(audioBuffer, 256);
        drawWaveformBarsOnCanvas(canvas, peaks, {
            color: "rgba(255, 255, 255, 0.10)"
        });
    }, [audioBuffer]);

    return (
        <div className="w-full h-[60px] flex items-center relative">
            <canvas className="w-full h-[60px]" ref={waveFormCanvasRef}></canvas>

            <div className="w-full h-[3px] rounded-md bg-[var(--color-shadow-grey-400)] absolute z-[2]" ref={progressBarBodyRef}>
                <div className="h-[3px] bg-[var(--color-white)] relative" style={{ width: progressBarWidth + "%" }}>
                    <div
                        className="
                            w-[15px] h-[15px]
                            absolute right-[-6px] top-[-6px]
                            z-[1]
                            rounded-[10px]
                            bg-[var(--color-white)]
                            transition-transform duration-150 ease-in-out
                            cursor-grab
                            hover:scale-[1.2]
                        "
                        onMouseDown={handleThumbMouseDown}
                    />
                </div>
            </div>
        </div>
    );
}
