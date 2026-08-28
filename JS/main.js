import * as THREE
from
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

    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(

        window.innerWidth,
        window.innerHeight
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
            150
        );

    }
);


// ------------------------------------------------------------
// START
// ------------------------------------------------------------

const loading =
document.getElementById(
    "loading"
);


loading.style.display =
    "none";


// ------------------------------------------------------------
// LOOP
// ------------------------------------------------------------

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
