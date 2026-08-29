import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ==========================================
// ALICIA AI
// ROOM SYSTEM
// PROTOCOL 4
//
// HOUSE LAYOUT
// SAO INSPIRED
// ==========================================


export function createRoom(scene) {

    console.log(
        "ROOM: Protocol 4 loading"
    );


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


    const woodMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x684a32,
            roughness: 0.78
        });


    const glassMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x9fc5d6,
            transparent: true,
            opacity: 0.35,
            roughness: 0.15,
            metalness: 0.05
        });


    // ======================================
    // HELPER: BOX
    // ======================================

    function createBox(
        width,
        height,
        depth,
        x,
        y,
        z,
        material,
        castShadow = true
    ) {

        const mesh =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    width,
                    height,
                    depth
                ),
                material
            );


        mesh.position.set(
            x,
            y,
            z
        );


        mesh.castShadow =
            castShadow;

        mesh.receiveShadow =
            true;


        scene.add(mesh);


        return mesh;
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

    // BACK WALL

    createBox(
        ROOM_WIDTH,
        ROOM_HEIGHT,
        WALL,
        0,
        ROOM_HEIGHT / 2,
        -ROOM_DEPTH / 2,
        wallMaterial
    );


    // FRONT WALL

    createBox(
        ROOM_WIDTH,
        ROOM_HEIGHT,
        WALL,
        0,
        ROOM_HEIGHT / 2,
        ROOM_DEPTH / 2,
        wallMaterial
    );


    // LEFT WALL

    createBox(
        WALL,
        ROOM_HEIGHT,
        ROOM_DEPTH,
        -ROOM_WIDTH / 2,
        ROOM_HEIGHT / 2,
        0,
        wallMaterial
    );


    // RIGHT WALL

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
    // INTERNAL LAYOUT
    //
    //      BACK
    //
    //   BEDROOM
    //   ────────────────
    //
    //   LIVING | WORK
    //
    //   KITCHEN | BATH
    //
    //      FRONT
    // ======================================


    // ======================================
    // BEDROOM WALL
    // ======================================

    // Bedroom occupies:
    // X: -21 ... 21
    // Z: -15 ... -5


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


    // Центральный проход в спальню
    // остаётся между -6 и +6


    // ======================================
    // BEDROOM SIDE DIVIDERS
    // ======================================

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


    // ======================================
    // KITCHEN / DINING ZONE
    // ======================================

    // Левая часть передней зоны
    // отделяется от гостиной


    createBox(
        14,
        ROOM_HEIGHT,
        WALL,
        -14,
        ROOM_HEIGHT / 2,
        5,
        innerWallMaterial
    );


    // ======================================
    // KITCHEN WALL
    // ======================================

    createBox(
        WALL,
        ROOM_HEIGHT,
        10,
        -7,
        ROOM_HEIGHT / 2,
        10,
        innerWallMaterial
    );


    // ======================================
    // BATHROOM
    // ======================================

    // Ванная находится
    // в переднем правом углу


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
    // WOODEN ARCHES / VISUAL DIVIDERS
    // ======================================

    function createBeam(
        width,
        height,
        depth,
        x,
        y,
        z
    ) {

        return createBox(
            width,
            height,
            depth,
            x,
            y,
            z,
            woodMaterial
        );

    }


    // Арка между гостиной и кухней

    createBeam(
        0.35,
        4.5,
        0.35,
        -7,
        2.25,
        5
    );


    createBeam(
        0.35,
        4.5,
        0.35,
        7,
        2.25,
        5
    );


    createBeam(
        14.35,
        0.35,
        0.35,
        0,
        4.5,
        5
    );


    // ======================================
    // WINDOWS
    // ======================================

    function createWindow(
        width,
        height,
        x,
        y,
        z,
        rotationY = 0
    ) {

        const frame =
            new THREE.Group();


        const glass =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    width,
                    height,
                    0.08
                ),
                glassMaterial
            );


        glass.position.set(
            0,
            0,
            0
        );


        frame.add(
            glass
        );


        // Vertical frame

        const left =
            createBox(
                0.12,
                height,
                0.15,
                -width / 2,
                0,
                0,
                woodMaterial
            );


        const right =
            createBox(
                0.12,
                height,
                0.15,
                width / 2,
                0,
                0,
                woodMaterial
            );


        // We created these in scene,
        // so remove them from direct
        // placement and use local objects.

        scene.remove(left);
        scene.remove(right);

        frame.add(left);
        frame.add(right);


        frame.position.set(
            x,
            y,
            z
        );


        frame.rotation.y =
            rotationY;


        scene.add(
            frame
        );


        return frame;
    }


    // ======================================
    // LARGE LIVING ROOM WINDOW
    // ======================================

    createWindow(
        8,
        3.2,
        0,
        3.2,
        -14.82,
        0
    );


    // ======================================
    // BEDROOM WINDOWS
    // ======================================

    createWindow(
        5,
        2.8,
        -12,
        3.1,
        -14.82,
        0
    );


    createWindow(
        5,
        2.8,
        12,
        3.1,
        -14.82,
        0
    );


    // ======================================
    // KITCHEN WINDOW
    // ======================================

    createWindow(
        5,
        2.5,
        -14,
        3,
        14.82,
        Math.PI
    );


    // ======================================
    // DOOR FRAMES
    // ======================================

    function createDoorFrame(
        x,
        y,
        z,
        width = 2.4,
        height = 3
    ) {

        createBox(
            0.18,
            height,
            0.18,
            x - width / 2,
            y,
            z,
            woodMaterial
        );


        createBox(
            0.18,
            height,
            0.18,
            x + width / 2,
            y,
            z,
            woodMaterial
        );


        createBox(
            width + 0.36,
            0.18,
            0.18,
            x,
            y + height,
            z,
            woodMaterial
        );

    }


    // Вход в спальню

    createDoorFrame(
        0,
        1.5,
        -5.15,
        5,
        3
    );


    // Вход в ванную

    createDoorFrame(
        15,
        1.5,
        9.9,
        2.2,
        3
    );


    // Вход в кухонную зону

    createDoorFrame(
        -7,
        1.5,
        5,
        3,
        3
    );


    // ======================================
    // CENTRAL LAMP
    // ======================================

    const lampLight =
        new THREE.PointLight(
            0xffe6c2,
            45,
            32
        );


    lampLight.position.set(
        0,
        5.3,
        0
    );


    lampLight.castShadow =
        true;


    scene.add(
        lampLight
    );


    // ======================================
    // BEDROOM LIGHT
    // ======================================

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


    // ======================================
    // KITCHEN LIGHT
    // ======================================

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


    // ======================================
    // LIVING AREA WARM LIGHT
    // ======================================

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
    // HOUSE DATA
    // ======================================

    const houseData = {

        width: ROOM_WIDTH,

        depth: ROOM_DEPTH,

        height: ROOM_HEIGHT,

        zones: {

            bedroom: {
                x: 0,
                z: -10,
                width: 42,
                depth: 10
            },

            livingRoom: {
                x: 8,
                z: 0,
                width: 20,
                depth: 20
            },

            kitchen: {
                x: -14,
                z: 10,
                width: 14,
                depth: 10
            },

            dining: {
                x: -4,
                z: 8,
                width: 12,
                depth: 10
            },

            workspace: {
                x: 14,
                z: -1,
                width: 10,
                depth: 10
            },

            bathroom: {
                x: 15,
                z: 10,
                width: 12,
                depth: 10
            }

        }

    };


    console.log(
        "ROOM: Protocol 4 ready"
    );


    console.log(
        "ROOM SIZE:",
        ROOM_WIDTH,
        "x",
        ROOM_DEPTH
    );


    return houseData;

}
