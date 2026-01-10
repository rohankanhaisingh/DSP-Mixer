import { type ReactNode } from "react";

export interface WindowContentProperties {
    children?: ReactNode;
}

export default function WindowContent({ children }: WindowContentProperties) {
    return (
        <div className="w-[calc(100%-20px)] h-auto flex flex-col p-[10px] overflow-x-auto overflow-y-auto">
            {children}
        </div>
    )
}