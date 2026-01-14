import { type ReactNode } from "react";

export type HeaderPosition = "left" | "right";

export interface HeaderProperties {
    position?: HeaderPosition;
    children?: ReactNode;
}

export default function Header({ position, children }: HeaderProperties) {
    return (
        <div
            className={[
                "p-5 flex overflow-y-auto",
                position === "left" ? "[grid-area:left]" : "",
                position === "right" ? "[grid-area:right]" : ""
            ].filter(Boolean).join(" ")}
        >
            {children}
        </div>
    );
}
