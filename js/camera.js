import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ==========================================
// ALICIA AI
// CAMERA SYSTEM
// PROTOCOL 3
// ==========================================


export function createCamera(camera, player) {

    console.log("CAMERA: system loaded");


    const cameraSystem = {

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

            if (!cameraSystem.locked) {

                document.body.requestPointerLock();

            }

        }
    );


    document.addEventListener(
        "pointerlockchange",
        () => {

            cameraSystem.locked =
                document.pointerLockElement ===
                document.body;

            console.log(
                "CAMERA LOCK:",
                cameraSystem.locked
            );

        }
    );


    // ======================================
    // MOUSE
    // ======================================

    document.addEventListener(
        "mousemove",
        (event) => {

            if (!cameraSystem.locked) {
                return;
            }


            cameraSystem.targetYaw -=
                event.movementX *
                cameraSystem.sensitivity;


            cameraSystem.targetPitch -=
                event.movementY *
                cameraSystem.sensitivity;


            // Ограничение вертикального взгляда

            const limit =
                Math.PI / 2 - 0.05;


            cameraSystem.targetPitch =
                THREE.MathUtils.clamp(
                    cameraSystem.targetPitch,
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
                -cameraSystem.smoothness *
                delta
            );


        cameraSystem.currentYaw =
            THREE.MathUtils.lerp(
                cameraSystem.currentYaw,
                cameraSystem.targetYaw,
                smoothing
            );


        cameraSystem.currentPitch =
            THREE.MathUtils.lerp(
                cameraSystem.currentPitch,
                cameraSystem.targetPitch,
                smoothing
            );


        camera.rotation.order =
            "YXZ";


        camera.rotation.y =
            cameraSystem.currentYaw;


        camera.rotation.x =
            cameraSystem.currentPitch;


        // Камера следует за игроком

        camera.position.copy(
            player.position
        );

    }


    // ======================================
    // RETURN
    // ======================================

    return {
        update: update
    };

}
