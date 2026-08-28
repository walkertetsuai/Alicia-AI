import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { createScene }
from "./scene.js";

import { setupCamera }
from "./camera.js";

import { setupLighting }
from "./lighting.js";


// ============================================================
// ALICIA AI
// PROTOCOL 01 — CORE
// ============================================================


// ------------------------------------------------------------
// RENDERER
// ------------------------------------------------------------

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


// ------------------------------------------------------------
// GRAPHICS
// ------------------------------------------------------------

renderer.shadowMap.enabled =
    true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    1.1;


// ------------------------------------------------------------
// ADD CANVAS
// ------------------------------------------------------------

document.body.appendChild(
    renderer.domElement
);


// ------------------------------------------------------------
// SCENE
// ------------------------------------------------------------

const scene =
    createScene();


// ------------------------------------------------------------
// CAMERA
// ------------------------------------------------------------

const camera =
    setupCamera();


// ------------------------------------------------------------
// LIGHTING
// ------------------------------------------------------------

setupLighting(
    scene
);


// ------------------------------------------------------------
// RESIZE
// ------------------------------------------------------------

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
        height
    );
}


window.addEventListener(
    "resize",
    resize
);


window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(
            resize,
            200
        );

    }
);


// ------------------------------------------------------------
// LOADING SCREEN
// ------------------------------------------------------------

const loading =
    document.getElementById(
        "loading"
    );


if (loading) {

    loading.style.opacity =
        "0";

    setTimeout(
        () => {

            loading.style.display =
                "none";

        },
        500
    );
}


// ------------------------------------------------------------
// ANIMATION
// ------------------------------------------------------------

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const elapsed =
        clock.getElapsedTime();


    // --------------------------------------------------------
    // TEST CUBE
    // --------------------------------------------------------

    const testCube =
        scene.userData.testCube;


    if (testCube) {

        testCube.rotation.y +=
            0.01;

        testCube.rotation.x +=
            0.003;


        // лёгкое движение света
        if (
            scene.userData.testLight
        ) {

            scene.userData.testLight.intensity =
                3 +
                Math.sin(
                    elapsed * 2
                ) * 0.25;
        }
    }


    // --------------------------------------------------------
    // RENDER
    // --------------------------------------------------------

    renderer.render(
        scene,
        camera
    );
}


// ------------------------------------------------------------
// START ENGINE
// ------------------------------------------------------------

animate();


// ------------------------------------------------------------
// DEBUG
// ------------------------------------------------------------

console.log(
    "Alicia AI — Protocol 01"
);

console.log(
    "Three.js engine started"
);
