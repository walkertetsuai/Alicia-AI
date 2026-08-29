import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ==========================================
// ALICIA AI
// ROOM SYSTEM
// PROTOCOL 4.1
// HOUSE PLAN
// ==========================================


export function createRoom(scene) {

    console.log("ROOM: Protocol 4.1 loading");


    // ======================================
    // HOUSE SIZE
    // ======================================

    const ROOM_WIDTH = 42;
    const ROOM_DEPTH = 30;
    const ROOM_HEIGHT = 6;

    const WALL = 0.25;


    // ======================================
    // MATERIALS
    // ======================================

    const floorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x806044,
            roughness: 0.82
        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xb99a76,
            roughness: 0.88
        });


    const innerWallMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xa98763,
            roughness: 0.9
        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd8cbbb,
            roughness: 1
        });


    // ======================================
    // BOX CREATOR
    // ======================================

    function createBox(
        width,
        height,
        depth,
        x,
        y,
        z,
        material,
        shadow = true
    ) {

        const object =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    width,
                    height,
                    depth
                ),
                material
            );


        object.position.set(
            x,
            y,
            z
        );


        object.castShadow =
            shadow;

        object.receiveShadow =
            true;


        scene.add(
            object
        );


        return object;

    }


    // ======================================
    // FLOOR
    // ======================================

    createBox(
        ROOM_WIDTH,
        0.2,
        ROOM_DEPTH,
        0,
        -0.1,
        0,
        floorMaterial,
        false
    );


    // ======================================
    // OUTER WALLS
    // ======================================

    // BACK

    createBox(
        ROOM_WIDTH,
        ROOM_HEIGHT,
        WALL,
        0,
        ROOM_HEIGHT / 2,
        -ROOM_DEPTH / 2,
        wallMaterial
    );


    // FRONT

    createBox(
        ROOM_WIDTH,
        ROOM_HEIGHT,
        WALL,
        0,
        ROOM_HEIGHT / 2,
        ROOM_DEPTH / 2,
        wallMaterial
    );


    // LEFT

    createBox(
        WALL,
        ROOM_HEIGHT,
        ROOM_DEPTH,
        -ROOM_WIDTH / 2,
        ROOM_HEIGHT / 2,
        0,
        wallMaterial
    );


    // RIGHT

    createBox(
        WALL,
        ROOM_HEIGHT,
        ROOM_DEPTH,
        ROOM_WIDTH / 2,
        ROOM_HEIGHT / 2,
        0,
        wallMaterial
    );


    // ======================================
    // CEILING
    // ======================================

    createBox(
        ROOM_WIDTH,
        0.2,
        ROOM_DEPTH,
        0,
        ROOM_HEIGHT,
        0,
        ceilingMaterial,
        false
    );


    // ======================================
    // INTERNAL WALLS
    // ======================================

    // --------------------------------------
    // BEDROOM
    // --------------------------------------

    createBox(
        15,
        ROOM_HEIGHT,
        WALL,
        -13.5,
        ROOM_HEIGHT / 2,
        -5,
        innerWallMaterial
    );


    createBox(
        15,
        ROOM_HEIGHT,
        WALL,
        13.5,
        ROOM_HEIGHT / 2,
        -5,
        innerWallMaterial
    );


    createBox(
        WALL,
        ROOM_HEIGHT,
        10,
        -6,
        ROOM_HEIGHT / 2,
        -10,
        innerWallMaterial
    );


    createBox(
        WALL,
        ROOM_HEIGHT,
        10,
        6,
        ROOM_HEIGHT / 2,
        -10,
        innerWallMaterial
    );


    // --------------------------------------
    // KITCHEN
    // --------------------------------------

    createBox(
        14,
        ROOM_HEIGHT,
        WALL,
        -14,
        ROOM_HEIGHT / 2,
        5,
        innerWallMaterial
    );


    createBox(
        WALL,
        ROOM_HEIGHT,
        10,
        -7,
        ROOM_HEIGHT / 2,
        10,
        innerWallMaterial
    );


    // --------------------------------------
    // BATHROOM
    // --------------------------------------

    createBox(
        12,
        ROOM_HEIGHT,
        WALL,
        15,
        ROOM_HEIGHT / 2,
        5,
        innerWallMaterial
    );


    createBox(
        WALL,
        ROOM_HEIGHT,
        10,
        9,
        ROOM_HEIGHT / 2,
        10,
        innerWallMaterial
    );


    // ======================================
    // ZONE MARKERS
    // ======================================

    function createMarker(
        x,
        z,
        width,
        depth
    ) {

        const geometry =
            new THREE.BoxGeometry(
                width,
                0.025,
                depth
            );


        const material =
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.08
            });


        const marker =
            new THREE.Mesh(
                geometry,
                material
            );


        marker.position.set(
            x,
            0.02,
            z
        );


        scene.add(
            marker
        );


        return marker;

    }


    // Спальня

    createMarker(
        0,
        -10,
        40,
        9
    );


    // Гостиная

    createMarker(
        8,
        0,
        20,
        9
    );


    // Кухня

    createMarker(
        -14,
        10,
        12,
        8
    );


    // Столовая

    createMarker(
        -4,
        8,
        8,
        6
    );


    // Рабочая зона

    createMarker(
        14,
        -1,
        9,
        8
    );


    // Ванная

    createMarker(
        15,
        10,
        10,
        8
    );


    // ======================================
    // LIGHTS
    // ======================================

    const centralLight =
        new THREE.PointLight(
            0xffe6c2,
            45,
            32
        );


    centralLight.position.set(
        0,
        5.3,
        0
    );


    centralLight.castShadow =
        true;


    scene.add(
        centralLight
    );


    const bedroomLight =
        new THREE.PointLight(
            0xffdcb5,
            25,
            20
        );


    bedroomLight.position.set(
        0,
        4.8,
        -10
    );


    scene.add(
        bedroomLight
    );


    const kitchenLight =
        new THREE.PointLight(
            0xffe2bd,
            25,
            18
        );


    kitchenLight.position.set(
        -13,
        4.5,
        10
    );


    scene.add(
        kitchenLight
    );


    const livingLight =
        new THREE.PointLight(
            0xffd8ad,
            20,
            20
        );


    livingLight.position.set(
        8,
        4.5,
        0
    );


    scene.add(
        livingLight
    );


    // ======================================
    // PLAN DATA
    // ======================================

    const houseData = {

        width: ROOM_WIDTH,

        depth: ROOM_DEPTH,

        height: ROOM_HEIGHT,

        zones: {

            bedroom: {
                name: "СПАЛЬНЯ",
                x: 0,
                z: -10
            },

            livingRoom: {
                name: "ГОСТИНАЯ",
                x: 8,
                z: 0
            },

            kitchen: {
                name: "КУХНЯ",
                x: -14,
                z: 10
            },

            dining: {
                name: "СТОЛОВАЯ",
                x: -4,
                z: 8
            },

            workspace: {
                name: "РАБОЧАЯ ЗОНА",
                x: 14,
                z: -1
            },

            bathroom: {
                name: "ВАННАЯ",
                x: 15,
                z: 10
            }

        }

    };


    // ======================================
    // DEBUG
    // ======================================

    console.log(
        "ROOM SIZE:",
        ROOM_WIDTH,
        "x",
        ROOM_DEPTH
    );


    console.log(
        "ROOM ZONES:",
        houseData.zones
    );


    console.log(
        "ROOM: Protocol 4.1 ready"
    );


    return houseData;

}
