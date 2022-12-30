let {GDRWebRenderer, GDLevel, WebGLContext} = require('../build/src/main');
let bloodbath = require('./testLevel.txt');


window.onload = () => {
    let canvas = document.getElementById('canvas');

    let renderer = new GDRWebRenderer(
        new WebGLContext(canvas),
        "../assets/spritesheet.png"
    );

    let level = GDLevel.parse(renderer, bloodbath);

    renderer.on('load', () => {
        renderer.render(level);
    });

    let drag = false;

    document.onmousemove = (e) => {
        if (drag) {
            renderer.camera.x -= e.movementX / renderer.camera.zoom;
            renderer.camera.y += e.movementY / renderer.camera.zoom;

            renderer.render(level);
        }
    }

    canvas.onmousedown = () => {
        drag = true;
    }

    canvas.onwheel = (e) => {
        renderer.camera.zoom *= 1 - (e.deltaY / 1000);

        renderer.render(level);
    }

    document.onmouseup = () => {
        drag = false;
    }

    document.getElementById('play').onclick = () => {
        var audio = new Audio('467339.mp3');
        audio.currentTime = level.song_offset;
        audio.play();

        function update() {
            window.requestAnimationFrame(update);

            let pos = level.posAt(audio.currentTime - level.song_offset + 0.5);

            renderer.camera.x = pos;

            //console.log(pos);
            renderer.render(level);
        }

        update();
    }

    //renderer.render(level);
}