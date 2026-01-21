import { LowPassFilter } from "@fluex/fluexgl-dsp";
import { useState, useEffect } from "react";

import Knob from "../../mixer/Knob";

export interface LowPassFilterWindowProperties {
    lowPassFilter: LowPassFilter;
}

export default function LowPassFilterWindow({ lowPassFilter }: LowPassFilterWindowProperties) {

    const [cutoff, setCutoff] = useState<number>(lowPassFilter.cutoff);
    const [q, setQ] = useState<number>(lowPassFilter.q ?? 0.7);

    useEffect(function () {
        lowPassFilter.SetCutoff(cutoff);
        lowPassFilter.SetQ(q);
    }, [cutoff, q]);

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col gap-[10px] items-center text-center justify-end">
                <p>Cutoff: {cutoff} hz</p>
                <Knob defaultValue={4000} value={cutoff} min={lowPassFilter.minFrequency} max={(lowPassFilter.context?.sampleRate ?? 48000) / 2} step={1} onChange={function (value) { setCutoff(value); }} />
            </div>
            <div className="flex flex-col gap-[10px] items-center text-center justify-end">
                <p>Q: {q.toFixed(2)}</p>
                <Knob defaultValue={0.7} value={q} min={0.1} max={4} step={0.01} onChange={_q => setQ(_q)} />
            </div>
        </div>
    );
}