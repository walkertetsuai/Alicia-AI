// ==========================================
// ALICIA AI
// CONTROL SYSTEM
// PROTOCOL 3.1
// ==========================================


export function createControls(player) {

    console.log(
        "CONTROLS: system loaded"
    );


    const keys = {};


    // ======================================
    // KEY DOWN
    // ======================================

    window.addEventListener(
        "keydown",
        (event) => {

            keys[event.code] = true;


            if (
                event.code === "KeyW" ||
                event.code === "KeyA" ||
                event.code === "KeyS" ||
                event.code === "KeyD"
            ) {

                event.preventDefault();

            }

        }
    );


    // ======================================
    // KEY UP
    // ======================================

    window.addEventListener(
        "keyup",
        (event) => {

            keys[event.code] = false;

        }
    );


    // ======================================
    // UPDATE
    // ======================================

    function update(delta) {

        let forward = 0;
        let strafe = 0;


        if (keys["KeyW"])
            forward += 1;


        if (keys["KeyS"])
            forward -= 1;


        if (keys["KeyA"])
            strafe -= 1;


        if (keys["KeyD"])
            strafe += 1;


        if (
            forward === 0 &&
            strafe === 0
        ) {

            return;

        }


        // ==================================
        // NORMALIZE
        // ==================================

        const length =
            Math.sqrt(
                forward * forward +
                strafe * strafe
            );


        forward /= length;
        strafe /= length;


        // ==================================
        // DIRECTION
        // ==================================

        const yaw =
            player.yaw;


        const forwardX =
            -Math.sin(yaw);


        const forwardZ =
            -Math.cos(yaw);


        const rightX =
            Math.cos(yaw);


        const rightZ =
            -Math.sin(yaw);


        // ==================================
        // MOVEMENT
        // ==================================

        player.position.x +=
            (
                forwardX * forward +
                rightX * strafe
            ) *
            player.speed *
            delta;


        player.position.z +=
            (
                forwardZ * forward +
                rightZ * strafe
            ) *
            player.speed *
            delta;


        // ==================================
        // ROOM BOUNDARIES
        // ==================================

        const limitX = 20.3;
        const limitZ = 14.3;


        player.position.x =
            Math.max(
                -limitX,
                Math.min(
                    limitX,
                    player.position.x
                )
            );


        player.position.z =
            Math.max(
                -limitZ,
                Math.min(
                    limitZ,
                    player.position.z
                )
            );

    }


    return {
        update
    };

}
