import { createContext, useState, type ReactNode } from "react";
import { AppWindow } from "lucide-react";

import Window from "../components/window/Window";

export interface WindowContextValue {
    showWindow(): void;
    closeWindow(): void;
    setTitle(title: string): void;
    setIcon(icon: ReactNode): void;
    setContent(content: ReactNode): void;
    windowData: WindowData;
}

export interface WindowData {
    width: number;
    height: number;
    x: number;
    y: number;
}

export const WindowContext = createContext<WindowContextValue | null>(null);

export interface WindowProviderProperties {
    children?: React.ReactNode;
}

export default function WindowProvider({ children }: WindowProviderProperties) {

    const [windowTitle, setWindowTitle] = useState<string>("In-browser window");
    const [windowIcon, setWindowIcon] = useState<ReactNode>(<AppWindow size={16} />);
    const [windowContent, setWindowContent] = useState<ReactNode | null>();
    const [windowIsVisible, setWindowIsVisible] = useState<boolean>(false);
    const [windowData, setWindowData] = useState<WindowData>({ width: 0, height: 0, x: 0, y: 0 });
    
    function showWindow() {
        setWindowIsVisible(true);
    }

    function closeWindow() {
        setWindowIsVisible(false);
    }

    function setTitle(title: string) {
        setWindowTitle(title);
    }

    function setIcon(icon: ReactNode) {
        setWindowIcon(icon);
    }

    function setContent(content: ReactNode) {
        setWindowContent(content);
    }

    function setInternalWindowData(data: WindowData) {
        setWindowData(data);
    }

    const value: WindowContextValue = {
        showWindow,
        closeWindow,
        setTitle,
        setIcon,
        setContent,
        windowData
    };

    return (
        <>
            <WindowContext.Provider value={value}>
                {children}

                {windowIsVisible && (
                    <Window
                        title={windowTitle}
                        icon={windowIcon}
                        onCloseButtonClick={() => closeWindow()}
                        setInternalWindowData={setInternalWindowData}>
                        {windowContent}
                    </Window>
                )}
            </WindowContext.Provider>
        </>
    );
}