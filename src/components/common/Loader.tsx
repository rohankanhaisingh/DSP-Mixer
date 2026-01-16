import LoaderIndicator from "./LoaderIndicator";
import "./Loader.scss";

export interface LoaderProperties {
    isFadingOut: boolean;
}

export default function Loader({ isFadingOut }: LoaderProperties) {
    return (
        <div className={`app-loader ${isFadingOut ? "fade-out" : ""}`}>
            <div className="app-loader__container">
                <div className="app-loader__logo">
                    <div className="app-loader__logo__icon">
                        <img src="/images/fluex-logo.png" alt="Fluex" />
                    </div>
                    <span>fluex.org</span>
                </div>
                <p className="app-loader__loading-text">Loading DSP playground</p>
                <LoaderIndicator theme="fluexgl-dsp"/>
            </div>
        </div>
    )
}