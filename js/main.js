import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

import { createRoom }
    from "./room.js";

import { createPlayer }
    from "./player.js";

import { createControls }
    from "./controls.js";

import { createCamera }
    from "./camera.js";


// ==========================================
// ALICIA AI
// MAIN SYSTEM
// PROTOCOL 3
// ==========================================

console.log("ALICIA AI: Protocol 3 starting");


// ==========================================
// SCENE
// ==========================================

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x101216);


// ==========================================
// CAMERA
// ==========================================

const camera =
    new THREE.PerspectiveCamera(
        70,
        window.innerWidth /
        window.innerHeight,
        0.1,
        1000
    );


// ==========================================
// RENDERER
// ==========================================

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

document
    .getElementById("game")
    .appendChild(
        renderer.domElement
    );


// ==========================================
// LIGHT
// ==========================================

const ambientLight =
    new THREE.HemisphereLight(
        0xffffff,
        0x444444,
        1.8
    );

scene.add(
    ambientLight
);


const mainLight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

mainLight.position.set(
    5,
    8,
    4
);

mainLight.castShadow = true;

scene.add(
    mainLight
);


// ==========================================
// ROOM
// ==========================================

createRoom(scene);


// ==========================================
// PLAYER
// ==========================================

const player =
    createPlayer(camera);


// ==========================================
// CONTROLS
// ==========================================

const controls =
    createControls(player);


// ==========================================
// CAMERA SYSTEM
// ==========================================

const cameraSystem =
    createCamera(
        camera,
        player
    );


// ==========================================
// RESIZE
// ==========================================

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


// ==========================================
// GAME LOOP
// ==========================================

let previousTime =
    performance.now();


function animate(currentTime) {

    requestAnimationFrame(
        animate
    );


    const delta =
        Math.min(
            (currentTime -
                previousTime) / 1000,
            0.05
        );


    previousTime =
        currentTime;


    // Управление

    controls.update(
        delta
    );


    // Камера

    cameraSystem.update(
        delta
    );


    // Рендер

    renderer.render(
        scene,
        camera
    );

}


requestAnimationFrame(
    animate
);


// ==========================================
// LOADING SCREEN
// ==========================================

const loading =
    document.getElementById(
        "loading"
    );

if (loading) {

    loading.style.opacity = "0";

    setTimeout(
        () => loading.remove(),
        500
    );

}


console.log(
    "ALICIA AI: Protocol 3 ready"
);
