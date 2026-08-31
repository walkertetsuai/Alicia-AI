import * as THREE
from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ============================================================
// PLAYER CONTROLLER
// ============================================================

export function setupControls({

    camera,
    domElement,
    room

}) {

    // ========================================================
    // SETTINGS
    // ========================================================

    const PLAYER_HEIGHT =
        1.68;

    const PLAYER_RADIUS =
        0.32;

    const MOVE_SPEED =
        3.65;

    const MOUSE_SPEED =
        0.00205;


    // ========================================================
    // INPUT
    // ========================================================

    const keys = {

        forward: false,
        backward: false,

        left: false,
        right: false

    };


    let yaw =
        camera.rotation.y;

    let pitch =
        camera.rotation.x;


    camera.rotation.order =
        "YXZ";


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

                domElement
                    .requestPointerLock?.();

            }

        }
    );


    document.addEventListener(
        "mousemove",
        event => {

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


            pitch =
                THREE.MathUtils.clamp(

                    pitch,

                    -1.47,

                    1.47

                );

        }
    );


    // ========================================================
    // MOBILE LOOK
    // ========================================================

    let lastTouchX = 0;
    let lastTouchY = 0;

    let touchLooking =
        false;


    domElement.addEventListener(
        "touchstart",
        event => {

            if (
                event.touches.length !== 1
            ) {
                return;
            }


            const touch =
                event.touches[0];


            lastTouchX =
                touch.clientX;

            lastTouchY =
                touch.clientY;

            touchLooking =
                true;

        },

        {
            passive: true
        }
    );


    domElement.addEventListener(
        "touchmove",
        event => {

            if (
                !touchLooking ||
                event.touches.length !== 1
            ) {
                return;
            }


            const touch =
                event.touches[0];


            const dx =
                touch.clientX -
                lastTouchX;


            const dy =
                touch.clientY -
                lastTouchY;


            lastTouchX =
                touch.clientX;

            lastTouchY =
                touch.clientY;


            yaw -=
                dx * 0.004;


            pitch -=
                dy * 0.004;


            pitch =
                THREE.MathUtils.clamp(

                    pitch,

                    -1.47,

                    1.47

                );

        },

        {
            passive: true
        }
    );


    domElement.addEventListener(
        "touchend",
        () => {

            touchLooking =
                false;

        }
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


            if (
                event.code === "KeyE" &&
                !event.repeat
            ) {

                room.interact(
                    camera
                );

            }

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

            keys.forward =
                false;

            keys.backward =
                false;

            keys.left =
                false;

            keys.right =
                false;

        }
    );


    // ========================================================
    // MOVEMENT VECTORS
    // ========================================================

    const forward =
        new THREE.Vector3();

    const right =
        new THREE.Vector3();

    const movement =
        new THREE.Vector3();


    // ========================================================
    // COLLISION
    // ========================================================

    function collides(
        x,
        z
    ) {

        const bounds =
            room.bounds;


        if (
            x - PLAYER_RADIUS <
            bounds.minX
        ) {
            return true;
        }


        if (
            x + PLAYER_RADIUS >
            bounds.maxX
        ) {
            return true;
        }


        if (
            z - PLAYER_RADIUS <
            bounds.minZ
        ) {
            return true;
        }


        if (
            z + PLAYER_RADIUS >
            bounds.maxZ
        ) {
            return true;
        }


        const colliders =
            room.getColliders();


        for (
            const collider
            of colliders
        ) {

            if (
                collider.enabled === false
            ) {
                continue;
            }


            if (

                x + PLAYER_RADIUS >
                collider.minX &&

                x - PLAYER_RADIUS <
                collider.maxX &&

                z + PLAYER_RADIUS >
                collider.minZ &&

                z - PLAYER_RADIUS <
                collider.maxZ

            ) {

                return true;

            }

        }


        return false;

    }


    function moveWithCollision(
        dx,
        dz
    ) {

        // move X separately so player
        // slides naturally along objects

        const nextX =
            camera.position.x +
            dx;


        if (
            !collides(
                nextX,
                camera.position.z
            )
        ) {

            camera.position.x =
                nextX;

        }


        const nextZ =
            camera.position.z +
            dz;


        if (
            !collides(
                camera.position.x,
                nextZ
            )
        ) {

            camera.position.z =
                nextZ;

        }

    }


    // ========================================================
    // UPDATE
    // ========================================================

    function update(
        delta
    ) {

        camera.rotation.y =
            yaw;

        camera.rotation.x =
            pitch;


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


        if (
            movement.lengthSq() >
            0
        ) {

            movement.normalize();

            movement.multiplyScalar(

                MOVE_SPEED *
                delta

            );


            moveWithCollision(

                movement.x,

                movement.z

            );

        }


        camera.position.y =
            PLAYER_HEIGHT;

    }


    return {

        update

    };

}
