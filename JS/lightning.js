import * as THREE
from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


export function setupLighting(
    scene
) {

    const light =
        new THREE.HemisphereLight(

            0xcfe5ff,

            0x3a2014,

            0.8
        );


    scene.add(
        light
    );
}
