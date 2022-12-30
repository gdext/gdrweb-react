import { useState, useRef, PointerEvent, WheelEvent } from 'react';

import { useGDRWeb } from '../hooks/useGDRWeb';
import { GDLevel } from '../GDRWeb/src/level';

const App = () => {
    const [ levelString, setLevelString ] = useState("");
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
            if(e.deltaY >= 0) renderer.camera.zoom *= 1 - (e.deltaY/1000);
            else renderer.camera.zoom /= 1 - (e.deltaY/-1000);

            if(renderer.camera.zoom > 10) 
                renderer.camera.zoom = 10;
            else if(renderer.camera.zoom < 0.2) 
                renderer.camera.zoom = 0.2;
        }
    }

    return <div>
        <div
            onPointerDown={() => setIsDragging(true)}
            onPointerUp={() => setIsDragging(false)}
            onPointerLeave={() => setIsDragging(false)}
            onPointerMove={moveCamera}
            onWheel={zoomCamera}
        >
            <canvas id="canvas" width="1280" height="720" ref={canvasRef} />
        </div>

        
        <p>Enter Level</p>
        <textarea onChange={(e) => setLevelString(e.target.value)} />
    </div>;
};

export default App;