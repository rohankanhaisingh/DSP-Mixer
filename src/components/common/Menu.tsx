import { X, ChevronRight } from "lucide-react";
import { Ease } from "@babahgee/easings";
import { useEffect, useState } from "react";

import "./Menu.scss";

export interface MenuProperties {
    onClose?: () => void;
}

export default function Menu({ onClose }: MenuProperties) {

    const [width, setWidth] = useState<number>(0);

    useEffect(function () {
        Ease(0, 350, "easeOutExpo", 350, _width => setWidth(_width));
    }, []);

    return (
        <>
            <div className="app-menu-backdrop" onClick={onClose}>
                <div className="app-menu-backdrop__container"></div>
            </div>
            <div className="app-menu" style={{
                width: width + "px"
            }}>
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
                        <a className="app-menu__category__item" href="/">
                            <span>Home</span>
                            <ChevronRight size={16} />
                        </a>
                        <a className="app-menu__category__item" href="/getting-started">
                            <span>Getting started</span>
                            <ChevronRight size={16} />
                        </a>
                        <a className="app-menu__category__item" href="/tutorial">
                            <span>Tutorial</span>
                            <ChevronRight size={16} />
                        </a>
                    </div>
                    <div className="app-menu__divider"></div>
                    <div className="app-menu__category">
                        <p className="app-menu__category__title">FluexGL</p>
                        <a className="app-menu__category__item" href="/fluexgl/">
                            <span>About FluexGL</span>
                            <ChevronRight size={16} />
                        </a>
                        <a className="app-menu__category__item" href="/fluexgl/api-reference">
                            <span>API reference</span>
                            <ChevronRight size={16} />
                        </a>
                        <a className="app-menu__category__item" href="/fluexgl/examples">
                            <span>Examples</span>
                            <ChevronRight size={16} />
                        </a>
                        <a className="app-menu__category__item" href="https://github.com/rohankanhaisingh/FluexGL/">
                            <span>Github repository</span>
                            <ChevronRight size={16} />
                        </a>
                    </div>
                    <div className="app-menu__divider"></div>
                    <div className="app-menu__category">
                        <p className="app-menu__category__title">FluexGL DSP</p>
                        <a className="app-menu__category__item" href="/fluexgl-dsp/">
                            <span>About FluexGL DSP</span>
                            <ChevronRight size={16} />
                        </a>
                        <a className="app-menu__category__item" href="/fluexgl-dsp/api-reference">
                            <span>API reference</span>
                            <ChevronRight size={16} />
                        </a>
                        <a className="app-menu__category__item" href="/fluexgl-dsp/playground">
                            <span>Playground</span>
                            <ChevronRight size={16} />
                        </a>
                        <a className="app-menu__category__item" href="https://github.com/rohankanhaisingh/FluexGL-DSP/">
                            <span>Github repository</span>
                            <ChevronRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}