import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

alert("THREE.JS ЗАПУЩЕН");


// ==========================================
// SCENE
// ==========================================

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x222222);


// ==========================================
// CAMERA
// ==========================================

const camera =
    new THREE.PerspectiveCamera(
        70,
        window.innerWidth /
        window.innerHeight,
        0.1,
        100
    );

camera.position.set(
    0,
    0,
    5
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

document.body.appendChild(
    renderer.domElement
);


// ==========================================
// TEST OBJECT
// ==========================================

const geometry =
    new THREE.BoxGeometry(
        2,
        2,
        2
    );

const material =
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    });

const cube =
    new THREE.Mesh(
        geometry,
        material
    );

scene.add(
    cube
);


// ==========================================
// LOOP
// ==========================================

function animate() {

    requestAnimationFrame(
        animate
    );

    cube.rotation.x += 0.01;

    cube.rotation.y += 0.01;

    renderer.render(
        scene,
        camera
    );

}

animate();
