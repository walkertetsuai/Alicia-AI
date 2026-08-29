export function setupControls(
    camera,
    domElement
) {

    const keys = {};

    let yaw = 0;
    let pitch = 0;


    window.addEventListener(
        "keydown",
        event => {

            keys[event.code] = true;

        }
    );


    window.addEventListener(
        "keyup",
        event => {

            keys[event.code] = false;

        }
    );


    domElement.addEventListener(
        "click",
        () => {

            domElement.requestPointerLock();

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


    camera.rotation.order =
        "YXZ";


    return function updateControls(
        delta
    ) {

        const speed =
            6 * delta;


        camera.rotation.y =
            yaw;

        camera.rotation.x =
            pitch;


        const forwardX =
            -Math.sin(yaw);

        const forwardZ =
            -Math.cos(yaw);


        const rightX =
            Math.cos(yaw);

        const rightZ =
            -Math.sin(yaw);


        let nextX =
            camera.position.x;

        let nextZ =
            camera.position.z;


        if (keys["KeyW"]) {

            nextX +=
                forwardX * speed;

            nextZ +=
                forwardZ * speed;

        }


        if (keys["KeyS"]) {

            nextX -=
                forwardX * speed;

            nextZ -=
                forwardZ * speed;

        }


        if (keys["KeyA"]) {

            nextX -=
                rightX * speed;

            nextZ -=
                rightZ * speed;

        }


        if (keys["KeyD"]) {

            nextX +=
                rightX * speed;

            nextZ +=
                rightZ * speed;

        }


        // ==========================================
        // ROOM BOUNDS
        // ==========================================

        const limitX = 24;
        const limitZ = 19;


        nextX =
            Math.max(
                -limitX,
                Math.min(
                    limitX,
                    nextX
                )
            );


        nextZ =
            Math.max(
                -limitZ,
                Math.min(
                    limitZ,
                    nextZ
                )
            );


        camera.position.x =
            nextX;

        camera.position.z =
            nextZ;


        camera.position.y =
            2;

    };

}
