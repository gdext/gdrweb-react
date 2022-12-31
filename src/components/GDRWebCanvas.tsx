import { useRef, useEffect, PointerEvent, WheelEvent } from 'react';

import { GDRWebCanvasConfig, defaultCanvasConfig } from '../configs/canvasConfig';
import { useGDRWeb } from '../hooks/useGDRWeb';
import { parseMouseOptions, parseWheelOptions } from '../util/parseProps';
import { recursiveObjectMerge } from '../util/functions';

type GDRWebProps = {
    levelString: string,
    width: number,
    height: number,
    config?: GDRWebCanvasConfig
}

const GDRWebCanvas = ({ levelString, width, height, config: providedConfig }: GDRWebProps) => {

    // Get config

    const config: GDRWebCanvasConfig = recursiveObjectMerge(defaultCanvasConfig, providedConfig);


    // Setup refs and hooks

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const currentMouseButtonRef = useRef<number>(-1);
    
    const { 
        renderer, setCamera, 
        isDragging, setIsDragging 
    } = useGDRWeb(canvasRef, levelString);


    // Prevent zoom on ctrl+wheel

    useEffect(() => {
        const preventZoom = (e: any) => {
            if (e.ctrlKey) e.preventDefault();
        }
        window.addEventListener('wheel', preventZoom, { passive: false });
        return () => window.removeEventListener('wheel', preventZoom);
    }, []);


    // Setup utilities

    const panButtons = parseMouseOptions(config.pan!.mouseButtons!);
    const wheelFunctions = parseWheelOptions(config.wheel);
    const zoomMultiplier = config.zoom!.sensitivity! * (config.zoom!.invert! ? -1 : 1);
    const wheelXMultiplier = config.pan!.wheelSensitivity! * (config.pan!.invertWheelX ? -1 : 1);
    const wheelYMultiplier = config.pan!.wheelSensitivity! * (config.pan!.invertWheelY ? -1 : 1);

    const mouseButton = () => currentMouseButtonRef.current;

    const beginPan = (e: PointerEvent) => {
        currentMouseButtonRef.current = e.button;
        setIsDragging(true);
    }

    const endPan = () => {
        currentMouseButtonRef.current = -1;
        setIsDragging(false);
    }

    const processPan = (e: PointerEvent) => {
        if (renderer && isDragging) {
            if (!panButtons.containsButton(mouseButton())) return;

            const zoomFactor = 1 / (renderer.camera.zoom || 1);
            const deltaX = -e.movementX * zoomFactor;
            const deltaY = e.movementY * zoomFactor;
            setCamera({ 
                x: renderer.camera.x + deltaX, 
                y: renderer.camera.y + deltaY 
            });
        }
    }

    const zoomCamera = (e: WheelEvent, modifiers: string[]) => {
        if (renderer) {
            if (!wheelFunctions.getFunction(modifiers).has('zoom')) return;

            let zoom = renderer.camera.zoom;
            if(e.deltaY >= 0) zoom *= 1 - (e.deltaY/1000) * zoomMultiplier;
            else zoom /= 1 - (e.deltaY/-1000) * zoomMultiplier;

            if (zoom > config!.zoom!.max!) 
                zoom = 10;
            else if (zoom < config!.zoom!.min!) 
                zoom = 0.2;

            setCamera({ zoom });
        }
    }

    const wheelPanCamera = (e: WheelEvent, modifiers: string[]) => {
        if (renderer) {
            let delta = [0, 0];
            if (wheelFunctions.getFunction(modifiers).has('x')) delta[0] = 1;
            if (wheelFunctions.getFunction(modifiers).has('y')) delta[1] = 1;

            if (!delta[0] && !delta[1]) return;

            const zoomFactor = 1 / (renderer.camera.zoom || 1);
            const deltaX = e.deltaY * zoomFactor * delta[0] * wheelXMultiplier;
            const deltaY = -e.deltaY * zoomFactor * delta[1] * wheelYMultiplier;

            let x = renderer.camera.x + deltaX;
            let y = renderer.camera.y + deltaY;

            setCamera({ x, y });
        }
    }

    const processScroll = (e: WheelEvent) => {
        const modifiers = [
            e.ctrlKey ? 'ctrl' : null,
            e.shiftKey ? 'shift' : null,
            e.altKey ? 'alt' : null
        ].filter((m) => m !== null) as string[];

        zoomCamera(e, modifiers);
        wheelPanCamera(e, modifiers);
    }

    const pixelRatio = window.devicePixelRatio || 1;


    return (
        <div
            onPointerDown={beginPan}
            onPointerUp={endPan}
            onPointerLeave={endPan}
            onPointerMove={processPan}
            onContextMenu={(e) => e.preventDefault()}
            onWheel={processScroll}
        >
            <canvas id="canvas" ref={canvasRef}
                width={width * pixelRatio} height={height * pixelRatio}  
                style={{ width: width, height: height }}
            />
        </div>
    );
}

export default GDRWebCanvas;