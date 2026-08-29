import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";
import { createRoom } from "./room.js";
import { setupControls } from "./controls.js";


// ======================================================
// ALICIA AI
// MAIN
// ======================================================

console.log("ALICIA AI: MAIN START");


// ======================================================
// СЦЕНА
// ======================================================

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x9bb6c4);


// ======================================================
// КАМЕРА
// ======================================================

const camera =
    new THREE.PerspectiveCamera(
        70,
        window.innerWidth /
        window.innerHeight,
        0.1,
        200
    );


// Начальная позиция

camera.position.set(
    0,
    2,
    12
);


// ======================================================
// RENDERER
// ======================================================

const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


renderer.shadowMap.enabled =
    true;


renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;


document.body.appendChild(
    renderer.domElement
);


// ======================================================
// КОМНАТА
// ======================================================
//
// ТОЛЬКО ЗДЕСЬ создаётся комната.
//
// main.js больше ничего не строит.
//

const room =
    createRoom(scene);


console.log(
    "ROOM:",
    room
);


// ======================================================
// УПРАВЛЕНИЕ
// ======================================================

setupControls(
    camera,
    renderer.domElement
);


// ======================================================
// RESIZE
// ======================================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);


// ======================================================
// ANIMATION
// ======================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    renderer.render(
        scene,
        camera
    );

}


animate();


console.log(
    "ALICIA AI: READY"
);
