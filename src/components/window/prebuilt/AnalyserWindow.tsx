import type { Analyser } from "@fluex/fluexgl-dsp";
import { useEffect, useRef } from "react";

import { MIXER_CHANNEL_FFTSIZE } from "../../../utilities/constants";
import useWindow from "../../../hooks/useWindow";

export interface AnalyserWindowProperties {
    analyser: Analyser
}

export default function AnalyserWindow({ analyser }: AnalyserWindowProperties) {

    const { windowData } = useWindow();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const contextRef = useRef<CanvasRenderingContext2D>(null);

    useEffect(function () {

        if (!canvasRef.current || !wrapperRef.current) return;

        const canvas = canvasRef.current,
            wrapper = wrapperRef.current;

        const wrapperBoundaries: DOMRect = wrapper.getBoundingClientRect();

        canvas.width = wrapperBoundaries.width;
        canvas.height = wrapperBoundaries.height;
    }, [windowData]);

    useEffect(function () {

        if (!canvasRef.current) return;

        const canvas = canvasRef.current,
            context = canvas.getContext("2d");

        contextRef.current = context;
    }, [canvasRef]);

    useEffect(function () {

        let frameId: number = 0;

        function render() {
            frameId = window.requestAnimationFrame(render);

            if (!contextRef.current || !canvasRef.current) return;

            const ctx = contextRef.current;
            const canvas = canvasRef.current;

            const data: Uint8Array | null = analyser.GetWaveformByteData();
            if (!data) return;

            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);
            ctx.save();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#FFFFFF";
            ctx.beginPath();

            const n = data.length;

            for (let i = 0; i < n; i++) {

                const v = data[i] / 255,
                    x = (i / (n - 1)) * width,
                    y = height - (v * height);

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.stroke();
            ctx.restore();
        }

        frameId = window.requestAnimationFrame(render);

        analyser.SetOptions({
            fftSize: 4096
        });

        return function () {
            contextRef.current = null;
            analyser.SetOptions({ fftSize: MIXER_CHANNEL_FFTSIZE });
            window.cancelAnimationFrame(frameId);
        };

    }, [analyser]);

    return (
        <div className="w-full h-full" ref={wrapperRef}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}