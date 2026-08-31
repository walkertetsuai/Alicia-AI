import * as THREE
from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

import { createRoom }
from "./room.js";

import { setupControls }
from "./controls.js";


// ============================================================
// ALICIA AI
// STABLE ROOM CORE
// ============================================================

console.log("🦊 Alicia AI: запуск");


// ============================================================
// SCENE
// ============================================================

const scene = new THREE.Scene();

scene.background =
    new THREE.Color(0x9eb4bf);

scene.fog =
    new THREE.Fog(
        0x9eb4bf,
        35,
        90
    );


// ============================================================
// CAMERA
// ============================================================

const camera =
    new THREE.PerspectiveCamera(
        68,
        window.innerWidth / window.innerHeight,
        0.05,
        150
    );

camera.position.set(
    0,
    1.7,
    10
);


// ============================================================
// RENDERER
// ============================================================

const renderer =
    new THREE.WebGLRenderer({

        antialias: true,

        powerPreference: "high-performance"

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

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    1.05;

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


// iPhone / Android landscape fix
window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(
            resize,
            150
        );

    }
);


// ============================================================
// START
// ============================================================

animate();

console.log(
    "✅ Alicia AI: комната запущена стабильно"
);
