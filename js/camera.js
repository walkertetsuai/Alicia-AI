import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ==========================================
// ALICIA AI
// CAMERA SYSTEM
// PROTOCOL 3
// ==========================================

export function createCamera(camera, player, renderer) {

    console.log("CAMERA: system loaded");

    const system = {

        sensitivity: 0.0025,

        smoothness: 15,

        targetYaw: 0,

        targetPitch: 0,

        currentYaw: 0,

        currentPitch: 0,

        locked: false

    };


    const canvas = renderer.domElement;


    // ======================================
    // CLICK → POINTER LOCK
    // ======================================

    canvas.addEventListener(
        "click",
        () => {

            canvas.requestPointerLock();

        }
    );


    // ======================================
    // POINTER LOCK STATE
    // ======================================

    document.addEventListener(
        "pointerlockchange",
        () => {

            system.locked =
                document.pointerLockElement === canvas;

            console.log(
                "CAMERA LOCK:",
                system.locked
            );

        }
    );


    // ======================================
    // MOUSE
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

        const smooth =
            1 -
            Math.exp(
                -system.smoothness *
                delta
            );


        system.currentYaw =
            THREE.MathUtils.lerp(
                system.currentYaw,
                system.targetYaw,
                smooth
            );


        system.currentPitch =
            THREE.MathUtils.lerp(
                system.currentPitch,
                system.targetPitch,
                smooth
            );


        // Передаём направление взгляда игроку

        player.yaw =
            system.currentYaw;


        player.pitch =
            system.currentPitch;


        // Позиция камеры

        camera.position.copy(
            player.position
        );


        // Вращение камеры

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
