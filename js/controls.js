import * as THREE
from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ============================================================
// ALICIA PLAYER CONTROLLER
// v5.2
//
// WASD
// Mouse look
// Collision
// Safe spawn
// Automatic recovery
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
    // SAFE FALLBACK POSITION
    // ========================================================

    const SAFE_POSITION =
        new THREE.Vector3(

            0.85,

            PLAYER_HEIGHT,

            1.15

        );


    // ========================================================
    // INPUT
    // ========================================================

    const keys = {

        forward:
            false,

        backward:
            false,

        left:
            false,

        right:
            false

    };


    // ========================================================
    // VIEW
    // ========================================================

    let yaw =
        0;


    let pitch =
        0;


    camera.rotation.order =
        "YXZ";


    // ========================================================
    // COLLISION CHECK
    // ========================================================

    function collides(
        x,
        z
    ) {

        const bounds =
            room.bounds;


        // ----------------------------------------------------
        // ROOM BOUNDARIES
        // ----------------------------------------------------

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


        // ----------------------------------------------------
        // OBJECT COLLIDERS
        // ----------------------------------------------------

        const colliders =
            room.getColliders();


        for (
            const collider
            of colliders
        ) {

            if (
                collider.enabled ===
                false
            ) {

                continue;

            }


            const overlapX =

                x +
                PLAYER_RADIUS >

                collider.minX &&

                x -
                PLAYER_RADIUS <

                collider.maxX;


            const overlapZ =

                z +
                PLAYER_RADIUS >

                collider.minZ &&

                z -
                PLAYER_RADIUS <

                collider.maxZ;


            if (
                overlapX &&
                overlapZ
            ) {

                return true;

            }

        }


        return false;

    }


    // ========================================================
    // VALIDATE SPAWN
    // ========================================================

    function validateSpawn() {

        const bounds =
            room.bounds;


        // first clamp player inside room

        camera.position.x =
            THREE.MathUtils.clamp(

                camera.position.x,

                bounds.minX +
                PLAYER_RADIUS +
                0.05,

                bounds.maxX -
                PLAYER_RADIUS -
                0.05

            );


        camera.position.z =
            THREE.MathUtils.clamp(

                camera.position.z,

                bounds.minZ +
                PLAYER_RADIUS +
                0.05,

                bounds.maxZ -
                PLAYER_RADIUS -
                0.05

            );


        camera.position.y =
            PLAYER_HEIGHT;


        // if clamped position is still
        // inside furniture, use known-safe spawn

        if (
            collides(

                camera.position.x,

                camera.position.z

            )
        ) {

            camera.position.copy(
                SAFE_POSITION
            );

        }


        console.log(
            "✅ Player spawn:",
            camera.position
        );

    }


    validateSpawn();


    // ========================================================
    // POINTER LOCK
    // ========================================================

    domElement.addEventListener(

        "click",

        () => {

            if (

                document.pointerLockElement
                !==
                domElement

            ) {

                domElement
                    .requestPointerLock?.();

            }

        }

    );


    // ========================================================
    // MOUSE LOOK
    // ========================================================

    document.addEventListener(

        "mousemove",

        event => {

            if (

                document.pointerLockElement
                !==
                domElement

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
    // KEYBOARD
    // ========================================================

    function setKey(
        code,
        value
    ) {

        switch (
            code
        ) {

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


            // ------------------------------------------------
            // INTERACTION
            // ------------------------------------------------

            if (

                event.code ===
                "KeyE" &&

                !event.repeat

            ) {

                room.interact(
                    camera
                );

            }


            // ------------------------------------------------
            // DEBUG / EMERGENCY RESET
            //
            // Press R to return to safe point.
            // ------------------------------------------------

            if (

                event.code ===
                "KeyR" &&

                !event.repeat

            ) {

                camera.position.copy(
                    SAFE_POSITION
                );


                console.log(
                    "🦊 Player returned to safe position"
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


    // ========================================================
    // RESET KEYS ON FOCUS LOSS
    // ========================================================

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
    // MOVE WITH SLIDING COLLISION
    // ========================================================

    function moveWithCollision(
        dx,
        dz
    ) {

        // ----------------------------------------------------
        // X AXIS
        // ----------------------------------------------------

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


        // ----------------------------------------------------
        // Z AXIS
        // ----------------------------------------------------

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
    // SAFETY RECOVERY
    // ========================================================

    function recoverPlayerIfNeeded() {

        const bounds =
            room.bounds;


        const outsideRoom =

            camera.position.x <
            bounds.minX -

            1 ||

            camera.position.x >
            bounds.maxX +

            1 ||

            camera.position.z <
            bounds.minZ -

            1 ||

            camera.position.z >
            bounds.maxZ +

            1;


        const invalidPosition =

            !Number.isFinite(
                camera.position.x
            ) ||

            !Number.isFinite(
                camera.position.y
            ) ||

            !Number.isFinite(
                camera.position.z
            );


        if (
            outsideRoom ||
            invalidPosition
        ) {

            console.warn(
                "⚠️ Player escaped room. Resetting."
            );


            camera.position.copy(
                SAFE_POSITION
            );

        }

    }


    // ========================================================
    // UPDATE
    // ========================================================

    function update(
        delta
    ) {

        recoverPlayerIfNeeded();


        // ----------------------------------------------------
        // CAMERA ROTATION
        // ----------------------------------------------------

        camera.rotation.y =
            yaw;


        camera.rotation.x =
            pitch;


        // ----------------------------------------------------
        // FORWARD VECTOR
        // ----------------------------------------------------

        forward.set(

            -Math.sin(
                yaw
            ),

            0,

            -Math.cos(
                yaw
            )

        );


        // ----------------------------------------------------
        // RIGHT VECTOR
        // ----------------------------------------------------

        right.set(

            Math.cos(
                yaw
            ),

            0,

            -Math.sin(
                yaw
            )

        );


        // ----------------------------------------------------
        // MOVEMENT
        // ----------------------------------------------------

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


        // ----------------------------------------------------
        // LOCK PLAYER HEIGHT
        // ----------------------------------------------------

        camera.position.y =
            PLAYER_HEIGHT;

    }


    // ========================================================
    // API
    // ========================================================

    return {

        update,

        reset() {

            camera.position.copy(
                SAFE_POSITION
            );

        }

    };

}
