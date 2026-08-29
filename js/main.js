import * as THREE
    from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

import { createRoom }
    from "./room.js";

import { setupControls }
    from "./controls.js";


// ==================================================
// SCENE
// ==================================================

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x9bb6c4);


// ==================================================
// CAMERA
// ==================================================

const camera =
    new THREE.PerspectiveCamera(
        70,
        window.innerWidth /
        window.innerHeight,
        0.1,
        300
    );

camera.position.set(
    0,
    2,
    12
);


// ==================================================
// RENDERER
// ==================================================

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

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

document.body.appendChild(
    renderer.domElement
);


// ==================================================
// ROOM
// ==================================================

createRoom(scene);


// ==================================================
// CONTROLS
// ==================================================

const updateControls =
    setupControls(
        camera,
        renderer.domElement
    );


// ==================================================
// CLOCK
// ==================================================

const clock =
    new THREE.Clock();


// ==================================================
// LOOP
// ==================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    const delta =
        Math.min(
            clock.getDelta(),
            0.05
        );


    updateControls(
        delta
    );


    renderer.render(
        scene,
        camera
    );

}


animate();


// ==================================================
// RESIZE
// ==================================================

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
