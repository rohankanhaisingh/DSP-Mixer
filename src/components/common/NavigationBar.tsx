import { Grip } from "lucide-react";
import { useState } from "react";

import Menu from "./Menu";

export interface NavigationBarProperties {
    title?: string;
}

export default function NavigationBar({title }: NavigationBarProperties) {

    const [isShowingMenu, setIsShowingMenu] = useState<boolean>(false);

    function openMenu() {
        setIsShowingMenu(true);
    }

    function closeMenu() {
        setIsShowingMenu(false);
    }

    return (
        <>
            <div className="[grid-area:nav] px-5 text-[var(--font-size-medium)]">
                <div className="relative flex flex-row items-center gap-5 h-full w-full">
                    <a href="https://www.fluex.org?from=https://www.fluexgl.dev" className="no-underline text-inherit">
                        <div className="flex flex-row items-center gap-2.5 select-none overflow-hidden">
                            <img src="/images/fluex-logo.png" alt="Fluex" className="scale-[1.5] w-[calc(var(--navigation-bar-initial-height)-var(--navigation-bar-inner-padding)*2)] h-[calc(var(--navigation-bar-initial-height)-var(--navigation-bar-inner-padding)*2)]" />
                            <span className="text-[var(--font-size-large)]">fluex.org</span>
                        </div>
                    </a>

                    <a href="/" className="no-underline text-inherit">
                        <div className="rounded-md bg-[var(--color-surface-light)] px-2.5 py-[5px]">
                            <span>fluexgl</span>
                        </div>
                    </a>

                    <div>
                        <span>{title}</span>
                    </div>

                    <div className="ml-auto flex items-center justify-center rounded-md cursor-pointer transition-[background] duration-150 ease-in-out hover:bg-[var(--color-panel-hover)] w-[calc(var(--navigation-bar-initial-height)-var(--navigation-bar-inner-padding)*2)] h-[calc(var(--navigation-bar-initial-height)-var(--navigation-bar-inner-padding)*2)]" onClick={openMenu}>
                        <Grip size={20} />
                    </div>
                </div>
            </div>

            {isShowingMenu && <Menu onClose={closeMenu} />}
        </>
    );
}
