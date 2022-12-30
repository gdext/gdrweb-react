import { useState } from 'react';

import GDRWebCanvas from '../components/GDRWebCanvas';

const App = () => {
    const [ levelString, setLevelString ] = useState("");

    return <div>
        <GDRWebCanvas levelString={levelString} width={800} height={600} />


        <p>Enter Level</p>
        <textarea onChange={(e) => setLevelString(e.target.value)} />
    </div>;
};

export default App;