import * as THREE
from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ============================================================
// PLAYER CONTROLS
// ============================================================

export function setupControls({

    camera,
    domElement,
    bounds

}) {

    const keys = {

        forward: false,
        backward: false,

        left: false,
        right: false

    };


    // ========================================================
    // SETTINGS
    // ========================================================

    const PLAYER_HEIGHT =
        1.7;

    const PLAYER_RADIUS =
        0.45;

    const MOVE_SPEED =
        5.0;

    const MOUSE_SPEED =
        0.002;


    // ========================================================
    // CAMERA ROTATION
    // ========================================================

    let yaw = 0;
    let pitch = 0;

    camera.rotation.order =
        "YXZ";


    function onMouseMove(event) {

        if (
            document.pointerLockElement
            !== domElement
        ) {
            return;
        }

        yaw -=
            event.movementX *
            MOUSE_SPEED;

        pitch -=
            event.movementY *
            MOUSE_SPEED;

        const limit =
            Math.PI / 2 -
            0.05;

        pitch =
            THREE.MathUtils.clamp(
                pitch,
                -limit,
                limit
            );

    }


    // ========================================================
    // POINTER LOCK
    // ========================================================

    domElement.addEventListener(
        "click",
        () => {

            if (
                document.pointerLockElement
                !== domElement
            ) {

                domElement.requestPointerLock();

            }

        }
    );


    document.addEventListener(
        "mousemove",
        onMouseMove
    );


    // ========================================================
    // KEYBOARD
    // ========================================================

    function setKey(
        code,
        value
    ) {

        switch (code) {

            case "KeyW":
            case "ArrowUp":

                keys.forward =
                    value;

                break;


            case "KeyS":
            case "ArrowDown":

                keys.backward =
                    value;

                break;


            case "KeyA":
            case "ArrowLeft":

                keys.left =
                    value;

                break;


            case "KeyD":
            case "ArrowRight":

                keys.right =
                    value;

                break;

        }

    }


    window.addEventListener(
        "keydown",
        event => {

            setKey(
                event.code,
                true
            );

        }
    );


    window.addEventListener(
        "keyup",
        event => {

            setKey(
                event.code,
                false
            );

        }
    );


    window.addEventListener(
        "blur",
        () => {

            keys.forward = false;
            keys.backward = false;

            keys.left = false;
            keys.right = false;

        }
    );


    // ========================================================
    // MOVEMENT
    // ========================================================

    const forward =
        new THREE.Vector3();

    const right =
        new THREE.Vector3();

    const movement =
        new THREE.Vector3();


    function update(
        delta
    ) {

        camera.rotation.y =
            yaw;

        camera.rotation.x =
            pitch;


        // ----------------------------------------------------
        // DIRECTION
        // ----------------------------------------------------

        forward.set(

            -Math.sin(yaw),

            0,

            -Math.cos(yaw)

        );


        right.set(

            Math.cos(yaw),

            0,

            -Math.sin(yaw)

        );


        movement.set(
            0,
            0,
            0
        );


        if (
            keys.forward
        ) {

            movement.add(
                forward
            );

        }


        if (
            keys.backward
        ) {

            movement.sub(
                forward
            );

        }


        if (
            keys.right
        ) {

            movement.add(
                right
            );

        }


        if (
            keys.left
        ) {

            movement.sub(
                right
            );

        }


        // ----------------------------------------------------
        // NORMALIZE
        // ----------------------------------------------------

        if (
            movement.lengthSq()
            > 0
        ) {

            movement.normalize();

            movement.multiplyScalar(

                MOVE_SPEED *
                delta

            );


            camera.position.add(
                movement
            );

        }


        // ====================================================
        // WALL COLLISION
        // ====================================================

        camera.position.x =
            THREE.MathUtils.clamp(

                camera.position.x,

                bounds.minX +
                    PLAYER_RADIUS,

                bounds.maxX -
                    PLAYER_RADIUS

            );


        camera.position.z =
            THREE.MathUtils.clamp(

                camera.position.z,

                bounds.minZ +
                    PLAYER_RADIUS,

                bounds.maxZ -
                    PLAYER_RADIUS

            );


        // ====================================================
        // FIX PLAYER HEIGHT
        // ====================================================

        camera.position.y =
            PLAYER_HEIGHT;

    }


    // ========================================================
    // PUBLIC API
    // ========================================================

    return {

        update

    };

}
