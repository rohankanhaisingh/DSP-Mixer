export type LoaderIndicatorSizes = "extra-small" | "small" | "regular";
export type LoaderIndicatorTheme = "regular" | "fluexgl-dsp";

export interface LoaderIndicatorProperties {
    size?: LoaderIndicatorSizes;
    theme?: LoaderIndicatorTheme;
}

export default function LoaderIndicator(props: LoaderIndicatorProperties) {
    var size = props.size ?? "regular";
    var theme = props.theme ?? "regular";

    var sizeClasses: Record<LoaderIndicatorSizes, {
        outer: string;
        spinner: string;
        inner: string;
    }> = {
        "extra-small": {
            outer: "w-[14px] h-[14px]",
            spinner: "w-[14px] h-[14px]",
            inner: "w-[12px] h-[12px]",
        },
        small: {
            outer: "w-[20px] h-[20px]",
            spinner: "w-[20px] h-[20px]",
            inner: "w-[18px] h-[18px]",
        },
        regular: {
            outer: "w-[50px] h-[50px]",
            spinner: "w-[50px] h-[50px]",
            inner: "w-[44px] h-[44px]",
        },
    };

    var themeClasses: Record<LoaderIndicatorTheme, {
        spinnerBg: string;
        innerBg: string;
    }> = {
        regular: {
            spinnerBg:
                "bg-[linear-gradient(0deg,rgba(255,255,255,0.2)_33%,#1572ff_100%)]",
            innerBg: "bg-white",
        },
        "fluexgl-dsp": {
            spinnerBg:
                "bg-[linear-gradient(0deg,var(--color-surface-light)_33%,#EFE6DD_100%)]",
            innerBg: "bg-[var(--color-surface-light)]",
        },
    };

    return (
        <div
            className={`
                ${sizeClasses[size].outer}
            `}
        >
            <div className="relative w-full h-full">
                <span
                    className={`
                        inline-block
                        rounded-full
                        box-border
                        animate-spin
                        ${sizeClasses[size].spinner}
                        ${themeClasses[theme].spinnerBg}
                    `}
                />
                <span
                    className={`
                        absolute left-1/2 top-1/2
                        -translate-x-1/2 -translate-y-1/2
                        rounded-full
                        box-border
                        ${sizeClasses[size].inner}
                        ${themeClasses[theme].innerBg}
                    `}
                />
            </div>
        </div>
    );
}
