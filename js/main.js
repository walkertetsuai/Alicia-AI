import * as THREE
from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

import { createRoom }
from "./room.js";

import { setupControls }
from "./controls.js";


// ============================================================
// ALICIA AI
// ROOM CORE
// ============================================================

console.log("🦊 Alicia AI: запуск комнаты");


// ============================================================
// SCENE
// ============================================================

const scene =
    new THREE.Scene();


scene.background =
    new THREE.Color(
        0x9caeb7
    );


scene.fog =
    new THREE.Fog(
        0x9caeb7,
        38,
        95
    );


// ============================================================
// CAMERA
// ============================================================

const camera =
    new THREE.PerspectiveCamera(

        68,

        window.innerWidth /
        window.innerHeight,

        0.05,

        160

    );


camera.position.set(
    0,
    1.7,
    5
);


// ============================================================
// RENDERER
// ============================================================

const renderer =
    new THREE.WebGLRenderer({

        antialias: true,

        powerPreference:
            "high-performance"

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


renderer.outputColorSpace =
    THREE.SRGBColorSpace;


renderer.toneMapping =
    THREE.ACESFilmicToneMapping;


renderer.toneMappingExposure =
    1.08;


document.body.appendChild(
    renderer.domElement
);


// ============================================================
// ROOM
// ============================================================

const room =
    createRoom(
        scene
    );


// ============================================================
// CONTROLS
// ============================================================

const controls =
    setupControls({

        camera,

        domElement:
            renderer.domElement,

        bounds:
            room.bounds

    });


// ============================================================
// CLOCK
// ============================================================

const clock =
    new THREE.Clock();


// ============================================================
// ANIMATION
// ============================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    const delta =
        Math.min(
            clock.getDelta(),
            0.05
        );


    controls.update(
        delta
    );


    renderer.render(
        scene,
        camera
    );

}


animate();


// ============================================================
// RESIZE
// ============================================================

function resize() {

    const width =
        window.innerWidth;

    const height =
        window.innerHeight;


    camera.aspect =
        width / height;


    camera.updateProjectionMatrix();


    renderer.setSize(
        width,
        height,
        false
    );


    renderer.setPixelRatio(

        Math.min(
            window.devicePixelRatio,
            2
        )

    );

}


window.addEventListener(
    "resize",
    resize
);


// Mobile landscape
window.addEventListener(

    "orientationchange",

    () => {

        setTimeout(
            resize,
            150
        );

    }

);


console.log(
    "✅ Alicia AI: сцена готова"
);
