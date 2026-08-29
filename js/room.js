import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ==========================================
// ALICIA AI
// ROOM SYSTEM
// PROTOCOL 4
// HOUSE PLAN
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


    // ======================================
    // HELPER
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


        scene.add(
            mesh
        );


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
    // LABEL SYSTEM
    // ======================================

    function createLabel(
        text,
        x,
        y,
        z,
        size = 0.7
    ) {

        const canvas =
            document.createElement(
                "canvas"
            );


        const context =
            canvas.getContext(
                "2d"
            );


        canvas.width = 1024;
        canvas.height = 256;


        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        context.fillStyle =
            "rgba(20, 15, 10, 0.75)";


        context.fillRect(
            20,
            40,
            984,
            176
        );


        context.font =
            "bold 92px Arial";


        context.textAlign =
            "center";


        context.textBaseline =
            "middle";


        context.fillStyle =
            "#ffffff";


        context.fillText(
            text,
            canvas.width / 2,
            canvas.height / 2
        );


        const texture =
            new THREE.CanvasTexture(
                canvas
            );


        texture.needsUpdate =
            true;


        const material =
            new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                depthTest: false
            });


        const sprite =
            new THREE.Sprite(
                material
            );


        sprite.position.set(
            x,
            y,
            z
        );


        sprite.scale.set(
            size * 3.5,
            size,
            1
        );


        scene.add(
            sprite
        );


        return sprite;
    }


    // ======================================
    // ZONE LABELS
    // ======================================

    createLabel(
        "СПАЛЬНЯ",
        0,
        4.2,
        -10,
        1.0
    );


    createLabel(
        "ГОСТИНАЯ",
        8,
        4.2,
        0,
        1.0
    );


    createLabel(
        "КУХНЯ",
        -14,
        4.2,
        10,
        0.9
    );


    createLabel(
        "СТОЛОВАЯ",
        -4,
        4.2,
        8,
        0.75
    );


    createLabel(
        "РАБОЧАЯ ЗОНА",
        14,
        4.2,
        -1,
        0.75
    );


    createLabel(
        "ВАННАЯ",
        15,
        4.2,
        10,
        0.85
    );


    // ======================================
    // CENTRAL LIGHT
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
    // LIVING LIGHT
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


    return houseData;

}
