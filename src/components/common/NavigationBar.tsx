import "./NavigationBar.scss";

import { Grip } from "lucide-react";
import { useState } from "react";

import Menu from "./Menu";
import fluexLogo from "../../../public/images/fluex-logo.png";

export interface NavigationBarProperties {
    title?: string;
}

export default function NavigationBar({ title }: NavigationBarProperties) {

    const [isShowingMenu, setIsShowingMenu] = useState<boolean>(false);

    return (
        <>
            <div className="app-navbar">
                <div className="app-navbar__container">
                    <a href="https://www.fluex.org?from=https://www.fluexgl.dev" className="link-wrapper">
                        <div className="app-navbar__logo">
                            <img src={fluexLogo} alt="Fluex" />
                            <span>fluex.org</span>
                        </div>
                    </a>
                    <a href="/" className="link-wrapper">
                        <div className="app-navbar__project-name">
                            <span>fluexgl</span>
                        </div>
                    </a>
                    <div className="app-navbar__title">
                        <span>{title}</span>
                    </div>
                    <div className="app-navbar__menu-button" onClick={() => setIsShowingMenu(true)} >
                        <Grip size={20}/>
                    </div>
                </div>
            </div>

            {isShowingMenu && <Menu onClose={() => setIsShowingMenu(false)}/> }
        </>
    )
}