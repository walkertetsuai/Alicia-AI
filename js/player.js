import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ==========================================
// ALICIA AI
// PLAYER SYSTEM
// PROTOCOL 3
// ==========================================


export function createPlayer(camera) {

    const player = {

        position:
            new THREE.Vector3(
                0,
                1.7,
                3
            ),

        speed: 3.5,

        yaw: 0,

        pitch: 0

    };


    camera.position.copy(
        player.position
    );


    camera.rotation.order =
        "YXZ";


    console.log(
        "PLAYER: system loaded"
    );


    return player;
}
