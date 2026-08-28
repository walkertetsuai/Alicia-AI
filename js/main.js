import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { createRoom } from "./room.js";


// ======================================================
// ALICIA AI
// PROTOCOL 1
// MAIN
// ======================================================


// ------------------------------------------------------
// Основная сцена
// ------------------------------------------------------

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x101216);


// ------------------------------------------------------
// Камера
// ------------------------------------------------------

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(
    0,
    1.7,
    6
);


// ------------------------------------------------------
// Рендерер
// ------------------------------------------------------

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document
    .getElementById("game")
    .appendChild(renderer.domElement);


// ------------------------------------------------------
// Освещение
// ------------------------------------------------------

const ambientLight = new THREE.HemisphereLight(
    0xffffff,
    0x444444,
    1.8
);

scene.add(ambientLight);


const mainLight = new THREE.DirectionalLight(
    0xffffff,
    2.5
);

mainLight.position.set(
    5,
    8,
    4
);

mainLight.castShadow = true;

scene.add(mainLight);


// ------------------------------------------------------
// Создание комнаты
// ------------------------------------------------------

createRoom(scene);


// ------------------------------------------------------
// Resize
// ------------------------------------------------------

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});


// ------------------------------------------------------
// Запуск
// ------------------------------------------------------

function animate() {

    requestAnimationFrame(animate);

    renderer.render(
        scene,
        camera
    );

}

animate();


// ------------------------------------------------------
// Убираем экран загрузки
// ------------------------------------------------------

setTimeout(() => {

    const loading =
        document.getElementById("loading");

    loading.style.opacity = "0";

    setTimeout(() => {
        loading.remove();
    }, 500);

}, 500);
