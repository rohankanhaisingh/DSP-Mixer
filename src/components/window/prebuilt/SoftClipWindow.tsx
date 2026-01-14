import { SoftClip } from "@fluex/fluexgl-dsp";
import { useState, useEffect } from "react";

import Knob from "../../common/Knob";

export interface SoftClipWindowProperties {
    softClip: SoftClip;
}

export default function SoftClipWindow({ softClip }: SoftClipWindowProperties) {

    const [initialDrive, setInitialDrive] = useState(softClip.drive);
    const [drive, setDrive] = useState(initialDrive);

    useEffect(() => {
        setInitialDrive(softClip.drive);
    }, [softClip]);

    useEffect(function () {
        softClip.SetDrive(drive);
    }, [drive]);

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col gap-[10px] items-center">
                <p>Drive: {drive.toFixed(1)}</p>
                <Knob defaultValue={0} value={drive} min={0} max={10} step={0.1} onChange={_drive => setDrive(_drive)} />
            </div>
        </div>
    )
}