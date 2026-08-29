export function setupControls(
    camera,
    domElement
) {

    // ==========================================
    // KEYBOARD
    // ==========================================

    const keys = {};


    window.addEventListener(
        "keydown",
        (event) => {

            keys[event.code] = true;

        }
    );


    window.addEventListener(
        "keyup",
        (event) => {

            keys[event.code] = false;

        }
    );


    // ==========================================
    // MOUSE
    // ==========================================

    let yaw = 0;

    let pitch = 0;


    domElement.addEventListener(
        "click",
        () => {

            domElement.requestPointerLock();

        }
    );


    document.addEventListener(
        "mousemove",
        (event) => {

            if (
                document.pointerLockElement
                !== domElement
            ) {

                return;

            }


            yaw -=
                event.movementX * 0.002;


            pitch -=
                event.movementY * 0.002;


            const limit =
                Math.PI / 2 - 0.05;


            pitch =
                Math.max(
                    -limit,
                    Math.min(
                        limit,
                        pitch
                    )
                );

        }
    );


    // ==========================================
    // UPDATE
    // ==========================================

    return function updateControls(
        delta
    ) {

        const speed =
            6 * delta;


        // --------------------------------------
        // CAMERA ROTATION
        // --------------------------------------

        camera.rotation.order =
            "YXZ";

        camera.rotation.y =
            yaw;

        camera.rotation.x =
            pitch;


        // --------------------------------------
        // MOVEMENT
        // --------------------------------------

        const forwardX =
            -Math.sin(yaw);

        const forwardZ =
            -Math.cos(yaw);


        const rightX =
            Math.cos(yaw);

        const rightZ =
            -Math.sin(yaw);


        // W

        if (keys["KeyW"]) {

            camera.position.x +=
                forwardX * speed;

            camera.position.z +=
                forwardZ * speed;

        }


        // S

        if (keys["KeyS"]) {

            camera.position.x -=
                forwardX * speed;

            camera.position.z -=
                forwardZ * speed;

        }


        // A

        if (keys["KeyA"]) {

            camera.position.x -=
                rightX * speed;

            camera.position.z -=
                rightZ * speed;

        }


        // D

        if (keys["KeyD"]) {

            camera.position.x +=
                rightX * speed;

            camera.position.z +=
                rightZ * speed;

        }


        // --------------------------------------
        // PLAYER HEIGHT
        // --------------------------------------

        camera.position.y = 2;

    };

}
