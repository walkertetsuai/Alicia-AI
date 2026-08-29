import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ==========================================
// ALICIA AI
// CAMERA SYSTEM
// PROTOCOL 3
// ==========================================


export function createCamera(
    camera,
    player
) {

    console.log(
        "CAMERA: system loaded"
    );


    const system = {

        sensitivity: 0.002,

        smoothness: 12,

        targetYaw: 0,

        targetPitch: 0,

        currentYaw: 0,

        currentPitch: 0,

        locked: false

    };


    // ======================================
    // POINTER LOCK
    // ======================================

    document.addEventListener(
        "click",
        () => {

            if (
                !system.locked
            ) {

                document.body.requestPointerLock();

            }

        }
    );


    document.addEventListener(
        "pointerlockchange",
        () => {

            system.locked =
                document.pointerLockElement ===
                document.body;


            console.log(
                "CAMERA LOCK:",
                system.locked
            );

        }
    );


    // ======================================
    // MOUSE LOOK
    // ======================================

    document.addEventListener(
        "mousemove",
        (event) => {

            if (!system.locked) {
                return;
            }


            system.targetYaw -=
                event.movementX *
                system.sensitivity;


            system.targetPitch -=
                event.movementY *
                system.sensitivity;


            const limit =
                Math.PI / 2 - 0.05;


            system.targetPitch =
                THREE.MathUtils.clamp(
                    system.targetPitch,
                    -limit,
                    limit
                );

        }
    );


    // ======================================
    // UPDATE
    // ======================================

    function update(delta) {

        const smoothing =
            1 -
            Math.exp(
                -system.smoothness *
                delta
            );


        system.currentYaw =
            THREE.MathUtils.lerp(
                system.currentYaw,
                system.targetYaw,
                smoothing
            );


        system.currentPitch =
            THREE.MathUtils.lerp(
                system.currentPitch,
                system.targetPitch,
                smoothing
            );


        // Передаём направление игроку

        player.yaw =
            system.currentYaw;


        player.pitch =
            system.currentPitch;


        // Камера

        camera.position.copy(
            player.position
        );


        camera.rotation.order =
            "YXZ";


        camera.rotation.y =
            system.currentYaw;


        camera.rotation.x =
            system.currentPitch;

    }


    return {
        update
    };

}
