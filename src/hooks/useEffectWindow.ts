import { useContext } from "react";

import { EffectWindowContext, type EffectWindowContextValue } from "../providers/EffectWindowProvider";

export default function useEffectWindow(): EffectWindowContextValue {

    const context = useContext(EffectWindowContext);

    if(context === null) 
        throw new Error("useEffectWindow must be used within an EffectWindowProvider");

    return context;
}