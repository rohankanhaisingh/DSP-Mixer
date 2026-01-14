import { X, ChevronRight } from "lucide-react";
import { Ease } from "@babahgee/easings";
import { useEffect, useState } from "react";

export interface MenuProperties {
    onClose?: () => void;
}

export default function Menu(props: MenuProperties) {
    const onClose = props.onClose;

    const [width, setWidth] = useState<number>(0);

    useEffect(function () {
        Ease(0, 350, "easeOutExpo", 350, function (_width: number) {
            setWidth(_width);
        });
    }, []);

    function handleClose() {
        if (onClose) onClose();
    }

    return (
        <>
            <div className="fixed inset-0 z-[100] h-screen w-screen" onClick={handleClose}>
                <div className="relative h-full w-full"></div>
            </div>

            <div className="fixed right-0 top-0 z-[101] h-screen overflow-hidden bg-[var(--color-surface)] text-[var(--font-size-regular)] shadow-[0_0_10px_rgba(0,0,0,0.25)]" style={{ width: width + "px" }}>
                <div className="flex flex-col gap-5 overflow-hidden p-5 w-[310px] h-[310px]">
                    <div className="flex h-10 w-full justify-between">
                        <a href="https://www.fluex.org" className="flex-1 no-underline text-inherit">
                            <div className="flex flex-row items-center gap-2.5 select-none overflow-hidden">
                                <img
                                    src="/images/fluex-logo.png"
                                    alt="Fluex"
                                    className="scale-[1.5] w-[calc(var(--navigation-bar-initial-height)-var(--navigation-bar-inner-padding)*2)] h-[calc(var(--navigation-bar-initial-height)-var(--navigation-bar-inner-padding)*2)]"
                                />
                                <span className="text-[var(--font-size-large)]">fluex.org</span>
                            </div>
                        </a>

                        <div className="flex h-10 w-10 items-center justify-center rounded-md cursor-pointer hover:bg-[var(--color-panel-hover)]" onClick={handleClose}>
                            <X size={20} />
                        </div>
                    </div>

                    <div className="my-2.5 h-px w-full bg-[var(--color-surface-light)]"></div>

                    <div className="flex w-full flex-col gap-2.5">
                        <a className="flex items-center justify-between gap-2.5 rounded-md no-underline text-[var(--color-text-active)] hover:text-[var(--color-accent)]" href="/">
                            <span>Home</span>
                            <ChevronRight size={16} />
                        </a>

                        <a className="flex items-center justify-between gap-2.5 rounded-md no-underline text-[var(--color-text-active)] hover:text-[var(--color-accent)]" href="/getting-started">
                            <span>Getting started</span>
                            <ChevronRight size={16} />
                        </a>

                        <a className="flex items-center justify-between gap-2.5 rounded-md no-underline text-[var(--color-text-active)] hover:text-[var(--color-accent)]" href="/tutorial">
                            <span>Tutorial</span>
                            <ChevronRight size={16} />
                        </a>
                    </div>

                    <div className="my-2.5 h-px w-full bg-[var(--color-surface-light)]"></div>

                    <div className="flex w-full flex-col gap-2.5">
                        <p className="select-none text-[var(--font-size-small)] font-semibold uppercase text-[var(--color-text-muted)]" style={{ fontFamily: "var(--font-semibold)" }}>
                            FluexGL
                        </p>

                        <a className="flex items-center justify-between gap-2.5 rounded-md no-underline text-[var(--color-text-active)] hover:text-[var(--color-accent)]" href="/fluexgl/">
                            <span>About FluexGL</span>
                            <ChevronRight size={16} />
                        </a>

                        <a className="flex items-center justify-between gap-2.5 rounded-md no-underline text-[var(--color-text-active)] hover:text-[var(--color-accent)]" href="/fluexgl/api-reference">
                            <span>API reference</span>
                            <ChevronRight size={16} />
                        </a>

                        <a className="flex items-center justify-between gap-2.5 rounded-md no-underline text-[var(--color-text-active)] hover:text-[var(--color-accent)]" href="/fluexgl/examples">
                            <span>Examples</span>
                            <ChevronRight size={16} />
                        </a>

                        <a className="flex items-center justify-between gap-2.5 rounded-md no-underline text-[var(--color-text-active)] hover:text-[var(--color-accent)]" href="https://github.com/rohankanhaisingh/FluexGL/">
                            <span>Github repository</span>
                            <ChevronRight size={16} />
                        </a>
                    </div>

                    <div className="my-2.5 h-px w-full bg-[var(--color-surface-light)]"></div>

                    <div className="flex w-full flex-col gap-2.5">
                        <p className="select-none text-[var(--font-size-small)] font-semibold uppercase text-[var(--color-text-muted)]" style={{ fontFamily: "var(--font-semibold)" }}>
                            FluexGL DSP
                        </p>

                        <a className="flex items-center justify-between gap-2.5 rounded-md no-underline text-[var(--color-text-active)] hover:text-[var(--color-accent)]" href="/fluexgl-dsp/">
                            <span>About FluexGL DSP</span>
                            <ChevronRight size={16} />
                        </a>

                        <a className="flex items-center justify-between gap-2.5 rounded-md no-underline text-[var(--color-text-active)] hover:text-[var(--color-accent)]" href="/fluexgl-dsp/api-reference">
                            <span>API reference</span>
                            <ChevronRight size={16} />
                        </a>

                        <a className="flex items-center justify-between gap-2.5 rounded-md no-underline text-[var(--color-text-active)] hover:text-[var(--color-accent)]" href="/fluexgl-dsp/playground">
                            <span>Playground</span>
                            <ChevronRight size={16} />
                        </a>

                        <a className="flex items-center justify-between gap-2.5 rounded-md no-underline text-[var(--color-text-active)] hover:text-[var(--color-accent)]" href="https://github.com/rohankanhaisingh/FluexGL-DSP/">
                            <span>Github repository</span>
                            <ChevronRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
