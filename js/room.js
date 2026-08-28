import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


// ======================================================
// ALICIA AI
// ROOM SYSTEM
// ======================================================


export function createRoom(scene) {

    // --------------------------------------------------
    // Размеры комнаты
    // --------------------------------------------------

    const ROOM_WIDTH = 14;
    const ROOM_DEPTH = 10;
    const ROOM_HEIGHT = 5;


    // --------------------------------------------------
    // Материалы
    // --------------------------------------------------

    const floorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x8b6b4a,
            roughness: 0.85
        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xc8b79f,
            roughness: 0.9
        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd8d0c5,
            roughness: 1
        });


    // --------------------------------------------------
    // Пол
    // --------------------------------------------------

    const floorGeometry =
        new THREE.BoxGeometry(
            ROOM_WIDTH,
            0.2,
            ROOM_DEPTH
        );

    const floor =
        new THREE.Mesh(
            floorGeometry,
            floorMaterial
        );

    floor.position.y = -0.1;

    floor.receiveShadow = true;

    scene.add(floor);


    // --------------------------------------------------
    // Задняя стена
    // --------------------------------------------------

    const backWall =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                ROOM_WIDTH,
                ROOM_HEIGHT,
                0.2
            ),
            wallMaterial
        );

    backWall.position.set(
        0,
        ROOM_HEIGHT / 2,
        -ROOM_DEPTH / 2
    );

    backWall.receiveShadow = true;

    scene.add(backWall);


    // --------------------------------------------------
    // Левая стена
    // --------------------------------------------------

    const leftWall =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.2,
                ROOM_HEIGHT,
                ROOM_DEPTH
            ),
            wallMaterial
        );

    leftWall.position.set(
        -ROOM_WIDTH / 2,
        ROOM_HEIGHT / 2,
        0
    );

    leftWall.receiveShadow = true;

    scene.add(leftWall);


    // --------------------------------------------------
    // Правая стена
    // --------------------------------------------------

    const rightWall =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.2,
                ROOM_HEIGHT,
                ROOM_DEPTH
            ),
            wallMaterial
        );

    rightWall.position.set(
        ROOM_WIDTH / 2,
        ROOM_HEIGHT / 2,
        0
    );

    rightWall.receiveShadow = true;

    scene.add(rightWall);


    // --------------------------------------------------
    // Потолок
    // --------------------------------------------------

    const ceiling =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                ROOM_WIDTH,
                0.2,
                ROOM_DEPTH
            ),
            ceilingMaterial
        );

    ceiling.position.y =
        ROOM_HEIGHT;

    scene.add(ceiling);


    // --------------------------------------------------
    // Тестовый светильник
    // --------------------------------------------------

    const lampLight =
        new THREE.PointLight(
            0xffe8c7,
            15,
            15
        );

    lampLight.position.set(
        0,
        ROOM_HEIGHT - 0.5,
        0
    );

    lampLight.castShadow = true;

    scene.add(lampLight);


    // --------------------------------------------------
    // Возвращаем данные комнаты
    // --------------------------------------------------

    return {
        width: ROOM_WIDTH,
        depth: ROOM_DEPTH,
        height: ROOM_HEIGHT
    };
}
