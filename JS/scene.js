import * as THREE
from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


export function createScene() {

    const scene =
        new THREE.Scene();


    scene.background =
        new THREE.Color(
            0x182027
        );


    return scene;
}
