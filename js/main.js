import * as THREE
from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

import { createRoom }
from "./room.js";

import { setupControls }
from "./controls.js";


// ============================================================
// ALICIA AI
// ROOM CORE v5
// ============================================================

console.log("🦊 Alicia Room v5: boot");


// ============================================================
// SCENE
// ============================================================

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0xbecbd0);

scene.fog =
    new THREE.Fog(
        0xbecbd0,
        24,
        65
    );


// ============================================================
// CAMERA
// ============================================================

const camera =
    new THREE.PerspectiveCamera(

        66,

        window.innerWidth /
        window.innerHeight,

        0.05,

        100

    );

camera.position.set(
    1.8,
    1.68,
    4.7
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

        room

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
            0.04
        );


    controls.update(
        delta
    );


    room.update(
        delta,
        camera
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


window.addEventListener(
    "orientationchange",
    () => setTimeout(
        resize,
        120
    )
);


// ============================================================
// LOADING
// ============================================================

requestAnimationFrame(
    () => {

        requestAnimationFrame(
            () => {

                document
                    .getElementById("loading")
                    ?.classList.add("hidden");

            }
        );

    }
);


console.log(
    "✅ Alicia Room v5: running"
);
