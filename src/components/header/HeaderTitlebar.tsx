import { type ReactNode } from "react";

export interface HeaderTitlebarProperties {
    icon?: ReactNode;
    title?: string;
}

export default function HeaderTitlebar({ icon, title }: HeaderTitlebarProperties) {
    return (
        <div className="w-full flex flex-row items-center gap-2.5">
            {icon}
            <span className="text-[var(--font-size-regular)] whitespace-nowrap overflow-hidden">
                {title}
            </span>
        </div>
    );
}
