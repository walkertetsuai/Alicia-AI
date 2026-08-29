// ==========================================
// ALICIA AI
// CONTROL SYSTEM
// PROTOCOL 3.1
// ==========================================

export function createControls(player) {

    console.log("CONTROLS: system loaded");

    const keys = {};


    // ======================================
    // KEY DOWN
    // ======================================

    window.addEventListener("keydown", (event) => {

        keys[event.code] = true;

        console.log("KEY:", event.code);

        // Не даём браузеру прокручивать страницу
        if (
            event.code === "KeyW" ||
            event.code === "KeyA" ||
            event.code === "KeyS" ||
            event.code === "KeyD"
        ) {
            event.preventDefault();
        }

    });


    // ======================================
    // KEY UP
    // ======================================

    window.addEventListener("keyup", (event) => {

        keys[event.code] = false;

    });


    // ======================================
    // MOVEMENT
    // ======================================

    function update(delta) {

        let forward = 0;
        let strafe = 0;


        // W / S

        if (keys["KeyW"]) {
            forward += 1;
        }

        if (keys["KeyS"]) {
            forward -= 1;
        }


        // A / D

        if (keys["KeyA"]) {
            strafe -= 1;
        }

        if (keys["KeyD"]) {
            strafe += 1;
        }


        // Нет движения

        if (
            forward === 0 &&
            strafe === 0
        ) {
            return;
        }


        // ==================================
        // НОРМАЛИЗАЦИЯ
        // ==================================

        const length =
            Math.sqrt(
                forward * forward +
                strafe * strafe
            );

        forward /= length;
        strafe /= length;


        // ==================================
        // НАПРАВЛЕНИЕ ВЗГЛЯДА
        // ==================================

        const yaw = player.yaw;


        // Вектор вперёд

        const forwardX =
            -Math.sin(yaw);

        const forwardZ =
            -Math.cos(yaw);


        // Вектор вправо

        const rightX =
            Math.cos(yaw);

        const rightZ =
            -Math.sin(yaw);


        // ==================================
        // ДВИЖЕНИЕ
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
        // ГРАНИЦЫ КОМНАТЫ
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


    // ======================================
    // RETURN
    // ======================================

    return {
        update
    };

}
