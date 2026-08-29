import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

export function setupControls(camera, domElement) {

    console.log("ALICIA AI: CONTROLS START");


    // ==================================================
    // СОСТОЯНИЕ КЛАВИШ
    // ==================================================

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


    // ==================================================
    // МЫШЬ
    // ==================================================

    let mouseLocked = false;

    let yaw = 0;
    let pitch = 0;


    domElement.addEventListener(
        "click",
        () => {

            domElement.requestPointerLock();

        }
    );


    document.addEventListener(
        "pointerlockchange",
        () => {

            mouseLocked =
                document.pointerLockElement === domElement;

        }
    );


    document.addEventListener(
        "mousemove",
        (event) => {

            if (!mouseLocked) {
                return;
            }

            yaw -= event.movementX * 0.002;

            pitch -= event.movementY * 0.002;


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


    // ==================================================
    // НАСТРОЙКА КАМЕРЫ
    // ==================================================

    camera.rotation.order =
        "YXZ";


    // ==================================================
    // ДВИЖЕНИЕ
    // ==================================================

    const clock =
        new THREE.Clock();


    function update() {

        requestAnimationFrame(
            update
        );


        const delta =
            Math.min(
                clock.getDelta(),
                0.05
            );


        const speed =
            6 * delta;


        // ------------------------------------------
        // ПОВОРОТ КАМЕРЫ
        // ------------------------------------------

        camera.rotation.y =
            yaw;

        camera.rotation.x =
            pitch;


        // ------------------------------------------
        // НАПРАВЛЕНИЯ
        // ------------------------------------------

        const forward =
            new THREE.Vector3();

        camera.getWorldDirection(
            forward
        );


        forward.y = 0;

        forward.normalize();


        const right =
            new THREE.Vector3();

        right.crossVectors(
            forward,
            camera.up
        );

        right.normalize();


        // ------------------------------------------
        // WASD
        // ------------------------------------------

        if (keys["KeyW"]) {

            camera.position.addScaledVector(
                forward,
                speed
            );

        }

        if (keys["KeyS"]) {

            camera.position.addScaledVector(
                forward,
                -speed
            );

        }

        if (keys["KeyA"]) {

            camera.position.addScaledVector(
                right,
                -speed
            );

        }

        if (keys["KeyD"]) {

            camera.position.addScaledVector(
                right,
                speed
            );

        }


        // ------------------------------------------
        // ВЫСОТА ГЛАЗ
        // ------------------------------------------

        camera.position.y = 2;


    }


    update();


    console.log(
        "ALICIA AI: CONTROLS READY"
    );

}
