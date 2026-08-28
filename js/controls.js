import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ==========================================
// ALICIA AI
// CONTROL SYSTEM
// PROTOCOL 2
// DEBUG VERSION
// ==========================================

export function createControls(player, camera) {

    console.log("CONTROLS: module loaded");

    const keys = {};

    window.addEventListener("keydown", (event) => {

        keys[event.code] = true;

        console.log("KEY DOWN:", event.code);

    });

    window.addEventListener("keyup", (event) => {

        keys[event.code] = false;

    });


    function update(delta) {

        let forward = 0;
        let right = 0;

        if (keys["KeyW"]) forward += 1;
        if (keys["KeyS"]) forward -= 1;

        if (keys["KeyD"]) right += 1;
        if (keys["KeyA"]) right -= 1;


        if (forward === 0 && right === 0) {
            return;
        }


        const direction =
            new THREE.Vector3();

        camera.getWorldDirection(direction);

        direction.y = 0;
        direction.normalize();


        const rightVector =
            new THREE.Vector3();

        rightVector.crossVectors(
            direction,
            new THREE.Vector3(0, 1, 0)
        );

        rightVector.normalize();


        player.position.addScaledVector(
            direction,
            forward * player.speed * delta
        );

        player.position.addScaledVector(
            rightVector,
            right * player.speed * delta
        );


        // Границы комнаты

        player.position.x =
            THREE.MathUtils.clamp(
                player.position.x,
                -6.3,
                6.3
            );

        player.position.z =
            THREE.MathUtils.clamp(
                player.position.z,
                -4.3,
                4.3
            );


        camera.position.copy(
            player.position
        );

    }


    return {
        update
    };

}
