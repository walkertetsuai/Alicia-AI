// ==========================================
// ALICIA AI
// CONTROL SYSTEM
// PROTOCOL 3
// ==========================================


export function createControls(player) {

    console.log(
        "CONTROLS: system loaded"
    );


    const keys = {};


    // ======================================
    // KEYBOARD
    // ======================================

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


    // ======================================
    // MOVEMENT
    // ======================================

    function update(delta) {

        let forward = 0;
        let right = 0;


        if (keys["KeyW"])
            forward += 1;


        if (keys["KeyS"])
            forward -= 1;


        if (keys["KeyD"])
            right += 1;


        if (keys["KeyA"])
            right -= 1;


        if (
            forward === 0 &&
            right === 0
        ) {

            return;

        }


        // Нормализация

        const length =
            Math.sqrt(
                forward * forward +
                right * right
            );


        forward /= length;
        right /= length;


        // Направление относительно взгляда

        const sin =
            Math.sin(player.yaw);

        const cos =
            Math.cos(player.yaw);


        const moveX =
            -sin * forward +
            cos * right;


        const moveZ =
            -cos * forward -
            sin * right;


        player.position.x +=
            moveX *
            player.speed *
            delta;


        player.position.z +=
            moveZ *
            player.speed *
            delta;


        // ==================================
        // ROOM LIMITS
        // ==================================

        player.position.x =
            Math.max(
                -6.3,
                Math.min(
                    6.3,
                    player.position.x
                )
            );


        player.position.z =
            Math.max(
                -4.3,
                Math.min(
                    4.3,
                    player.position.z
                )
            );

    }


    return {
        update
    };

}
