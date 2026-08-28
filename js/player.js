import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ==========================================
// ALICIA AI
// PLAYER SYSTEM
// PROTOCOL 2
// ==========================================


export function createPlayer(camera) {

    const player = {

        // Позиция игрока
        position: new THREE.Vector3(
            0,
            1.7,
            3
        ),

        // Скорость движения
        speed: 3.5,

        // Направление взгляда
        yaw: 0,

        pitch: 0

    };


    // Устанавливаем камеру
    camera.position.copy(
        player.position
    );


    console.log(
        "ALICIA AI: Player System создан"
    );


    return player;
}
