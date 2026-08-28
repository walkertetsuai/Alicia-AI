import * as THREE
from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


export function setupCamera() {

    const camera =
        new THREE.PerspectiveCamera(

            78,

            window.innerWidth /
            window.innerHeight,

            0.05,

            150
        );


    camera.position.set(
        0,
        2.05,
        7
    );


    return camera;
}
