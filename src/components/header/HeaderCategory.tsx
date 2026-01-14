import { type ReactNode } from "react";

export interface HeaderCategoryProperties {
    label?: string;
    children?: ReactNode;
}

export default function HeaderCategory({ label, children }: HeaderCategoryProperties) {
    return (
        <div className="relative h-auto flex flex-col gap-2.5">
            <p
                className="uppercase text-[var(--color-text-muted)]"
                style={{ fontFamily: "var(--font-semibold)" }}
            >
                {label ?? "Category"}
            </p>

            <div className="flex flex-col gap-2.5">
                {children}
            </div>
        </div>
    );
}
