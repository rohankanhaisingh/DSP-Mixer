import type { Reverb } from "@fluex/fluexgl-dsp";
import { useState, useEffect } from "react";

import Knob from "../../mixer/Knob";


export interface ReverbWindowProperties {
    reverb: Reverb;
}

export default function ReverbWindow({ reverb }: ReverbWindowProperties) {

    const [initialRoomSize, setInitialRoomSize] = useState<number>(reverb.roomSize),
        [initialDamping, setInitialDamping] = useState<number>(reverb.damping),
        [initialStereoSpreadMs, setInitialStereoSpreadMs] = useState<number>(reverb.stereoSpreadMs),
        [initialMix, setInitialMix] = useState<number>(reverb.mix);

    const [roomSize, setRoomSize] = useState<number>(initialRoomSize),
        [damping, setDamping] = useState<number>(initialDamping),
        [stereoSpreadMs, setStereoSpreadMs] = useState<number>(initialStereoSpreadMs),
        [mix, setMix] = useState<number>(initialMix);

    useEffect(function(){ 
        setInitialRoomSize(reverb.roomSize);
        setInitialDamping(reverb.damping);
        setInitialStereoSpreadMs(reverb.stereoSpreadMs);
        setInitialMix(reverb.mix);
    }, [reverb]);

    useEffect(function() {
        reverb.setRoomSize(roomSize);
        reverb.setDamping(damping);
        reverb.setStereoSpreadMs(stereoSpreadMs);
        reverb.setMix(mix);
    }, [roomSize, damping, stereoSpreadMs, mix, reverb])

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col gap-[10px] items-center">
                <p>Room size: {roomSize.toFixed(1)}</p>
                <Knob defaultValue={0} value={roomSize} min={0} max={10} step={0.1} onChange={_roomSize => setRoomSize(_roomSize)} />
            </div>
            <div className="flex flex-col gap-[10px] items-center">
                <p>Damping: {damping.toFixed(1)}</p>
                <Knob defaultValue={1} value={damping} min={0} max={10} step={0.01} onChange={_damping => setDamping(_damping)} />
            </div>
            <div className="flex flex-col gap-[10px] items-center">
                <p>Stereo spread (ms): {stereoSpreadMs.toFixed(1)}</p>
                <Knob defaultValue={1} value={stereoSpreadMs} min={0} max={100} step={1} onChange={_stereoSpreadMs => setStereoSpreadMs(_stereoSpreadMs)} />
            </div>
            <div className="flex flex-col gap-[10px] items-center">
                <p>Mix: {mix.toFixed(1)}</p>
                <Knob defaultValue={1} value={mix} min={0} max={1} step={0.01} onChange={_mix => setMix(_mix)} />
            </div>
        </div>
    );
}