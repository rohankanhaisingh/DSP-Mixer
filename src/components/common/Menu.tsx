import { X, ChevronRight } from "lucide-react";

import "./Menu.scss";

export interface MenuProperties {
    onClose?: () => void;
}

export default function Menu({ onClose }: MenuProperties) {
    return (
        <>
            <div className="app-menu-backdrop" onClick={onClose}>
                <div className="app-menu-backdrop__container"></div>
            </div>
            <div className="app-menu">
                <div className="app-menu__container">
                    <div className="app-menu__titlebar">
                        <a href="https://www.fluex.org" style={{
                            textDecoration: "none",
                            color: "inherit",
                            flexGrow: 1
                        }}>
                            <div className="app-menu__titlebar__logo">
                                <img src="/images/fluex-logo.png" alt="Fluex" />
                                <span>fluex.org</span>
                            </div>
                        </a>
                        <div className="app-menu__titlebar__button" onClick={onClose}>
                            <X size={20} />
                        </div>
                    </div>
                    <div className="app-menu__divider"></div>
                    <div className="app-menu__category">
                        <a className="app-menu__category__item" href="https://www.fluexgl.dev/dsp/mixer">
                            <span>Visit live (maintained) demo</span>
                            <ChevronRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}