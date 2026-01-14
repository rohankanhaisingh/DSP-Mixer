import { type PropsWithChildren } from "react";

export default function HeaderContent({ children }: PropsWithChildren) {
    return (
        <div
            className="
                w-full flex flex-col gap-5
                text-[var(--font-size-small)]
                pb-5
                animate-header-content-fade-in
                [&_code]:bg-[rgba(0,0,0,0.25)]
                [&_code]:px-0.5
                [&_code]:py-[2px]
                [&_code]:rounded-md
            "
        >
            {children}
        </div>
    );
}
