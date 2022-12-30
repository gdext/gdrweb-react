import { useState, useRef } from 'react';

import GDRWebCanvas from '../components/GDRWebCanvas';
import { useResize } from '../hooks/useResize';

const App = () => {
    const canvasWrapperRef = useRef<HTMLDivElement>(null);

    const [ levelString, setLevelString ] = useState("");
    const [ canvasSize, setCanvasSize ] = useState({ width: 800, height: 600 });

    useResize(canvasWrapperRef, ({ width, height }) => {
        setCanvasSize({ width, height });
        console.log(width, height);
    });

    return <div>
        <div ref={canvasWrapperRef} style={{ height: '50vh', maxWidth: '100%' }}>
            <GDRWebCanvas 
                levelString={levelString} 
                width={canvasSize.width || 800} 
                height={canvasSize.height || 600} 
            />
        </div>


        <p>Enter Level</p>
        <textarea value={levelString} onChange={(e) => setLevelString(e.target.value)} />
        <p>Or upload file</p>
        <input type="file" onChange={(e) => {
            const file = e.target.files?.item(0);
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        console.log(e.target.result.toString());
                        setLevelString(e.target.result.toString());
                    }
                };
                reader.readAsText(file);
            }
        }} />
    </div>;
};

export default App;