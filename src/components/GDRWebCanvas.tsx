import React, { useRef, PointerEvent, WheelEvent } from 'react';

import { useGDRWeb } from '../hooks/useGDRWeb';

type GDRWebProps = {
    levelString: string,
    width: number,
    height: number
}

const GDRWebCanvas = ({ levelString, width, height }: GDRWebProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { 
        renderer, setCamera, 
        isDragging, setIsDragging 
    } = useGDRWeb(canvasRef, levelString);

    const moveCamera = (e: PointerEvent) => {
        if (renderer && isDragging) {
            const zoomFactor = 1 / (renderer.camera.zoom || 1);
            const deltaX = -e.movementX * zoomFactor;
            const deltaY = e.movementY * zoomFactor;
            setCamera({ 
                x: renderer.camera.x + deltaX, 
                y: renderer.camera.y + deltaY 
            });
        }
    }
    const zoomCamera  = (e: WheelEvent) => {
        if (renderer) {
            let zoom = renderer.camera.zoom;
            if(e.deltaY >= 0) zoom *= 1 - (e.deltaY/1000);
            else zoom /= 1 - (e.deltaY/-1000);

            if (zoom > 10) 
                zoom = 10;
            else if (zoom < 0.2) 
                zoom = 0.2;

            setCamera({ zoom });
        }
    }

    return (
        <div
            onPointerDown={() => setIsDragging(true)}
            onPointerUp={() => setIsDragging(false)}
            onPointerLeave={() => setIsDragging(false)}
            onPointerMove={moveCamera}
            onWheel={zoomCamera}
        >
            <canvas id="canvas" width={width} height={height} ref={canvasRef} />
        </div>
    );
}

export default GDRWebCanvas;