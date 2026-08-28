// ==========================================
// ALICIA AI
// CONTROL SYSTEM
// PROTOCOL 2
// ==========================================


export function createControls(player, camera) {

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
    // MOUSE LOOK
    // ======================================

    let mouseLocked = false;


    document.addEventListener(
        "click",
        () => {

            if (!mouseLocked) {

                document.body.requestPointerLock();

            }

        }
    );


    document.addEventListener(
        "pointerlockchange",
        () => {

            mouseLocked =
                document.pointerLockElement ===
                document.body;

        }
    );


    document.addEventListener(
        "mousemove",
        (event) => {

            if (!mouseLocked) return;


            const sensitivity = 0.002;


            player.yaw -=
                event.movementX *
                sensitivity;


            player.pitch -=
                event.movementY *
                sensitivity;


            // Ограничиваем вертикальный взгляд

            const limit =
                Math.PI / 2 - 0.05;


            player.pitch =
                Math.max(
                    -limit,
                    Math.min(
                        limit,
                        player.pitch
                    )
                );


            camera.rotation.order =
                "YXZ";


            camera.rotation.y =
                player.yaw;


            camera.rotation.x =
                player.pitch;

        }
    );


    // ======================================
    // UPDATE
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


        // Нет движения

        if (
            forward === 0 &&
            right === 0
        ) {

            return;

        }


        // Нормализация диагонального движения

        const length =
            Math.sqrt(
                forward * forward +
                right * right
            );


        forward /= length;
        right /= length;


        // Направление камеры

        const direction =
            camera.getWorldDirection(
                _direction
            );


        direction.y = 0;

        direction.normalize();


        // Вектор вправо

        _right.crossVectors(
            direction,
            _up
        );

        _right.normalize();


        // Итоговое движение

        player.position.addScaledVector(
            direction,
            forward *
            player.speed *
            delta
        );


        player.position.addScaledVector(
            _right,
            right *
            player.speed *
            delta
        );


        // Ограничение внутри комнаты

        const limitX = 6.5;
        const limitZ = 4.5;


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


        // Камера следует за игроком

        camera.position.copy(
            player.position
        );

    }


    return {
        update
    };
}


// ==========================================
// TEMP VECTORS
// ==========================================

const _direction =
    new THREE.Vector3();

const _right =
    new THREE.Vector3();

const _up =
    new THREE.Vector3(
        0,
        1,
        0
    );
