import LoaderIndicator from "./LoaderIndicator";

export interface LoaderProperties {
    isFadingOut: boolean;
}

export default function Loader(props: LoaderProperties) {
    const isFadingOut = props.isFadingOut;

    const rootClassName =
        "fixed inset-0 z-[9999] h-screen w-screen " +
        "bg-[var(--color-surface)] text-[const(--color-white)] " +
        "text-[const(--font-size-small)]" + (isFadingOut ? " animate-loader-fade-out opacity-0" : "");

    return (
        <div className={rootClassName}>
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-5">
                <div className="flex h-[60px] flex-row items-center gap-2.5 text-[var(--font-size-extra-large)]">
                    <div className="h-[60px] w-[60px]">
                        <img src="/images/fluex-logo.png" alt="Fluex" className="h-full w-full scale-[1.5]" />
                    </div>
                    <span>fluex.org</span>
                </div>

                <p>Loading DSP playground</p>

                <LoaderIndicator theme="fluexgl-dsp" />
            </div>
        </div>
    );
}
