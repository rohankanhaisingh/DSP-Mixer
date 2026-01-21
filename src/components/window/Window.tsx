import { type ReactNode, useEffect, useRef, useState } from "react";
import { Ease } from "@babahgee/easings";

import WindowTitlebar from "./WindowTitlebar";
import WindowContent from "./WindowContent";

import "./Window.scss";
import type { WindowData } from "../../providers/WindowProvider";

export interface WindowProperties {
    title?: string;
    icon?: ReactNode;
    width?: number;
    height?: number;
    children?: ReactNode;
    onCloseButtonClick?: () => void;
    setInternalWindowData: (data: WindowData) => void;
}

export default function Window({ title, width, height, children, icon, onCloseButtonClick, setInternalWindowData }: WindowProperties) {

    const [windowWidth, setWindowWidth] = useState<number>(width ?? 400);
    const [windowHeight, setWindowHeight] = useState<number>(height ?? 230);

    const [scaling, setScaling] = useState<number>(0.9);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const [positionX, setPositionX] = useState<number>(innerWidth / 2 - windowWidth / 2);
    const [positionY, setPositionY] = useState<number>(innerHeight / 2 - windowHeight / 2);

    const dragStartRef = useRef<{
        mouseX: number;
        mouseY: number;
        startX: number;
        startY: number;
    } | null>(null);

    useEffect(function () {
        Ease(0.9, 1, "easeOutExpo", 500, function (scale: number) {
            setScaling(scale);
        });
    }, []);

    useEffect(function () {
        if (!isDragging) {
            return;
        }

        function handleMouseMove(event: MouseEvent) {
            if (!dragStartRef.current) return;

            const deltaX = event.clientX - dragStartRef.current.mouseX;
            const deltaY = event.clientY - dragStartRef.current.mouseY;

            const rawX = dragStartRef.current.startX + deltaX;
            const rawY = dragStartRef.current.startY + deltaY;

            const margin: number = 20;

            const maxX = window.innerWidth - windowWidth - margin;
            const maxY = window.innerHeight - windowHeight - margin;

            const clampedX = Math.min(Math.max(rawX, margin), Math.max(maxX, 0));
            const clampedY = Math.min(Math.max(rawY, margin), Math.max(maxY, 0));

            setPositionX(clampedX);
            setPositionY(clampedY);
        }

        function handleMouseUp() {
            setIsDragging(false);
            dragStartRef.current = null;
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return function () {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, windowWidth, windowHeight]);

    useEffect(function() {
        setInternalWindowData({
            width: windowWidth,
            height: windowHeight,
            x: positionX,
            y: positionY
        });
    }, [windowWidth, windowHeight, positionX, positionY]);

    function handleTitlebarMouseDown(event: React.MouseEvent<HTMLDivElement>) {

        event.preventDefault();

        dragStartRef.current = {
            mouseX: event.clientX,
            mouseY: event.clientY,
            startX: positionX,
            startY: positionY
        };

        setIsDragging(true);
    }

    function onChangeWindowSizeButtonClick(isExpanded: boolean) {

        if (isExpanded) {

            Ease(positionX, 20, "easeOutExpo", 350, x => setPositionX(x));
            Ease(positionY, 20, "easeOutExpo", 350, y => setPositionY(y));
            Ease(windowWidth, innerWidth - 40, "easeOutExpo", 350, width => setWindowWidth(width));
            Ease(windowHeight, innerHeight - 40, "easeOutExpo", 350, height => setWindowHeight(height));
        } else {

            Ease(windowWidth, width ?? 400, "easeOutExpo", 350, width => setWindowWidth(width));
            Ease(windowHeight, height ?? 200, "easeOutExpo", 350, height => setWindowHeight(height));
            Ease(positionX, innerWidth / 2 - windowWidth / 2, "easeOutExpo", 350, x => setPositionX(x));
            Ease(positionY, innerHeight / 2 - windowHeight / 2, "easeOutExpo", 350, y => setPositionY(y));
        }
    }

    return (
        <div
            className="app-window"
            style={{
                width: windowWidth + "px",
                height: windowHeight + "px",
                transform: "scale(" + scaling + ")",
                position: "absolute",
                left: positionX + "px",
                top: positionY + "px"
            }}
        >
            <div className="app-window__container">
                <WindowTitlebar
                    icon={icon}
                    title={title}
                    draggable={true}
                    onMouseDown={handleTitlebarMouseDown}
                    onCloseButtonClick={onCloseButtonClick}
                    onChangeWindowSizeButtonClick={onChangeWindowSizeButtonClick}
                />
                <WindowContent>
                    {children}
                </WindowContent>
            </div>
        </div>
    );
}