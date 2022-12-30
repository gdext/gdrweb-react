import { useState, useRef, useEffect, RefObject } from "react";

import { WebGLContext, GDRWebRenderer, GDLevel } from "../GDRWeb/src/main";
import spritesheet from "../GDRWeb/assets/spritesheet.png";

export const useGDRWeb = (canvasRef: RefObject<HTMLCanvasElement>, levelStr: string) => {

    const [ isDragging, setIsDragging ] = useState(false);

    const rendererRef = useRef<GDRWebRenderer>();
    const levelRef = useRef<any>(null);
    const updateInterval = useRef<any>(null);

    // render the level
    const render = () => {
        try {
            if (rendererRef.current && levelRef.current) 
                rendererRef.current.render(levelRef.current);
        } catch (e) {
            console.log("bruh");
        }
    };

    const setCamera = (s: { x?: number, y?: number, zoom?: number }) => {
        if (!rendererRef.current) return;
        const { x, y, zoom } = s;

        rendererRef.current.camera.x = x ?? rendererRef.current.camera.x;
        rendererRef.current.camera.y = y ?? rendererRef.current.camera.y;
        rendererRef.current.camera.zoom = zoom ?? rendererRef.current.camera.zoom;

        render();
    };

    useEffect(() => {
        if (canvasRef.current) {
            // create the renderer
            const context = new WebGLContext(canvasRef.current);
            const renderer = new GDRWebRenderer(context, spritesheet);
            rendererRef.current = renderer;
            renderer.on('load', render);

            // automatically refresh every 5 seconds
            updateInterval.current = setInterval(render, 5000);

            return () => {
                clearInterval(updateInterval.current);
                rendererRef.current = undefined;
            }
        }
    }, [canvasRef]);

    useEffect(() => {
        // parse the level and re-render
        if (rendererRef.current && levelStr) {
            const level = GDLevel.parse(rendererRef.current, levelStr);
            levelRef.current = level;
        }
        if (!levelStr) levelRef.current = null;
        render();
    }, [levelStr]);

    // begin the update cycle if dragging

    return {
        isDragging, setIsDragging,
        render, setCamera,
        renderer: rendererRef.current
    }

}