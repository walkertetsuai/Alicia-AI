import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ==========================================
// ALICIA AI
// ROOM SYSTEM
// PROTOCOL 1
// ==========================================


export function createRoom(scene) {

    console.log(
        "ALICIA AI: создание комнаты"
    );


    // ======================================
    // ROOM SIZE
    // ======================================

    const ROOM_WIDTH = 14;
    const ROOM_DEPTH = 10;
    const ROOM_HEIGHT = 5;


    // ======================================
    // MATERIALS
    // ======================================

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


    // ======================================
    // FLOOR
    // ======================================

    const floor =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                ROOM_WIDTH,
                0.2,
                ROOM_DEPTH
            ),

            floorMaterial
        );

    floor.position.y = -0.1;

    floor.receiveShadow = true;

    scene.add(floor);


    // ======================================
    // BACK WALL
    // ======================================

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


    // ======================================
    // LEFT WALL
    // ======================================

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


    // ======================================
    // RIGHT WALL
    // ======================================

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


    // ======================================
    // CEILING
    // ======================================

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


    // ======================================
    // ROOM LIGHT
    // ======================================

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


    console.log(
        "ALICIA AI: комната создана"
    );


    return {
        width: ROOM_WIDTH,
        depth: ROOM_DEPTH,
        height: ROOM_HEIGHT
    };
}
