import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ==================================================
// ALICIA AI
// ROOM SYSTEM
// PROTOCOL 5
//
// HOUSE ARCHITECTURE
// SAO INSPIRED
// ==================================================


export function createRoom(scene) {

    console.log("ROOM: Protocol 5 loading");


    // ==================================================
    // HOUSE DIMENSIONS
    // ==================================================

    const WIDTH = 42;
    const DEPTH = 30;
    const HEIGHT = 6;

    const WALL = 0.25;


    // ==================================================
    // MATERIALS
    // ==================================================

    const floorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x765538,
            roughness: 0.72
        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xb88e64,
            roughness: 0.82
        });


    const wallLightMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xc9a47b,
            roughness: 0.85
        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd9c7b0,
            roughness: 0.95
        });


    const beamMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x543923,
            roughness: 0.72
        });


    const glassMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x9fc8d8,

            transparent: true,

            opacity: 0.32,

            roughness: 0.08,

            metalness: 0,

            transmission: 0.15

        });


    const windowFrameMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x5a3c25,
            roughness: 0.65
        });


    // ==================================================
    // BOX FUNCTION
    // ==================================================

    function box(
        width,
        height,
        depth,
        x,
        y,
        z,
        material,
        shadow = true
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
            shadow;

        mesh.receiveShadow =
            true;


        scene.add(mesh);


        return mesh;
    }


    // ==================================================
    // FLOOR
    // ==================================================

    box(
        WIDTH,
        0.25,
        DEPTH,
        0,
        -0.125,
        0,
        floorMaterial,
        false
    );


    // ==================================================
    // CEILING
    // ==================================================

    box(
        WIDTH,
        0.25,
        DEPTH,
        0,
        HEIGHT,
        0,
        ceilingMaterial,
        false
    );


    // ==================================================
    // OUTER WALLS
    // ==================================================

    // BACK WALL

    box(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        -DEPTH / 2,
        wallMaterial
    );


    // FRONT WALL

    box(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        DEPTH / 2,
        wallMaterial
    );


    // LEFT WALL

    box(
        WALL,
        HEIGHT,
        DEPTH,
        -WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );


    // RIGHT WALL

    box(
        WALL,
        HEIGHT,
        DEPTH,
        WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );


    // ==================================================
    // ARCHITECTURE
    //
    //                    BACK
    //
    //          ┌───────────────────────┐
    //          │       BEDROOM         │
    //          │                       │
    //          │                       │
    //          └───────────┬───────────┘
    //                      │
    //          LIVING      │       WORK
    //                      │
    //       ┌──────────────┴─────────────┐
    //       │                            │
    //       │                            │
    //       │                            │
    //       ├──────────────┬─────────────┤
    //       │   KITCHEN    │   BATHROOM  │
    //       │   DINING     │             │
    //       └──────────────┴─────────────┘
    //
    //                    FRONT
    // ==================================================


    // ==================================================
    // BEDROOM BACK WALL
    // ==================================================

    // Left section

    box(
        16,
        HEIGHT,
        WALL,
        -13,
        HEIGHT / 2,
        -5
    );


    // Right section

    box(
        16,
        HEIGHT,
        WALL,
        13,
        HEIGHT / 2,
        -5
    );


    // Центральный проход в спальню
    // ширина ~10 метров


    // ==================================================
    // BEDROOM SIDE WALLS
    // ==================================================

    box(
        WALL,
        HEIGHT,
        10,
        -8,
        HEIGHT / 2,
        -10
    );


    box(
        WALL,
        HEIGHT,
        10,
        8,
        HEIGHT / 2,
        -10
    );


    // ==================================================
    // KITCHEN / DINING DIVIDER
    // ==================================================

    // Левая граница кухонной зоны

    box(
        WALL,
        HEIGHT,
        8,
        -7,
        HEIGHT / 2,
        11
    );


    // ==================================================
    // BATHROOM
    // ==================================================

    // Левая стена ванной

    box(
        WALL,
        HEIGHT,
        8,
        9,
        HEIGHT / 2,
        11
    );


    // Правая граница ванной

    box(
        12,
        HEIGHT,
        WALL,
        15,
        HEIGHT / 2,
        7
    );


    // ==================================================
    // KITCHEN BACK WALL
    // ==================================================

    box(
        14,
        HEIGHT,
        WALL,
        -14,
        HEIGHT / 2,
        7
    );


    // ==================================================
    // WOODEN BEAMS
    // ==================================================

    function beam(
        width,
        height,
        depth,
        x,
        y,
        z
    ) {

        return box(
            width,
            height,
            depth,
            x,
            y,
            z,
            beamMaterial
        );

    }


    // Главная балка

    beam(
        WIDTH,
        0.3,
        0.3,
        0,
        5.5,
        0
    );


    // Балка спальни

    beam(
        16,
        0.3,
        0.3,
        -13,
        5.5,
        -5
    );


    beam(
        16,
        0.3,
        0.3,
        13,
        5.5,
        -5
    );


    // ==================================================
    // WINDOW SYSTEM
    // ==================================================

    function createWindow(
        width,
        height,
        x,
        y,
        z,
        rotation = 0
    ) {

        const group =
            new THREE.Group();


        // Glass

        const glass =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width,
                    height,
                    0.08
                ),

                glassMaterial

            );


        group.add(glass);


        // Left frame

        const left =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.15,
                    height,
                    0.18
                ),

                windowFrameMaterial

            );


        left.position.x =
            -width / 2;


        group.add(left);


        // Right frame

        const right =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.15,
                    height,
                    0.18
                ),

                windowFrameMaterial

            );


        right.position.x =
            width / 2;


        group.add(right);


        // Top frame

        const top =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width + 0.3,
                    0.15,
                    0.18
                ),

                windowFrameMaterial

            );


        top.position.y =
            height / 2;


        group.add(top);


        // Bottom frame

        const bottom =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width + 0.3,
                    0.15,
                    0.18
                ),

                windowFrameMaterial

            );


        bottom.position.y =
            -height / 2;


        group.add(bottom);


        // Center divider

        const center =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.12,
                    height,
                    0.2
                ),

                windowFrameMaterial

            );


        group.add(center);


        group.position.set(
            x,
            y,
            z
        );


        group.rotation.y =
            rotation;


        scene.add(group);


        return group;

    }


    // ==================================================
    // LIVING ROOM
    // ==================================================

    createWindow(
        9,
        3.2,
        8,
        3.2,
        -14.82
    );


    // ==================================================
    // BEDROOM WINDOWS
    // ==================================================

    createWindow(
        5,
        2.7,
        -13,
        3.1,
        -14.82
    );


    createWindow(
        5,
        2.7,
        13,
        3.1,
        -14.82
    );


    // ==================================================
    // KITCHEN WINDOW
    // ==================================================

    createWindow(
        5,
        2.5,
        -14,
        3,
        14.82,
        Math.PI
    );


    // ==================================================
    // WORKSPACE WINDOW
    // ==================================================

    createWindow(
        5,
        2.7,
        19,
        3.1,
        -2
    );


    // ==================================================
    // BATHROOM SMALL WINDOW
    // ==================================================

    createWindow(
        3,
        1.8,
        15,
        3.5,
        14.82,
        Math.PI
    );


    // ==================================================
    // DOOR / ARCH FUNCTION
    // ==================================================

    function createOpening(
        x,
        z,
        width = 3,
        height = 3
    ) {

        // Left pillar

        box(
            0.2,
            height,
            0.3,
            x - width / 2,
            height / 2,
            z,
            beamMaterial
        );


        // Right pillar

        box(
            0.2,
            height,
            0.3,
            x + width / 2,
            height / 2,
            z,
            beamMaterial
        );


        // Top beam

        box(
            width + 0.4,
            0.2,
            0.3,
            x,
            height,
            z,
            beamMaterial
        );

    }


    // ==================================================
    // OPENINGS
    // ==================================================

    // Bedroom

    createOpening(
        0,
        -5.15,
        6,
        3.4
    );


    // Kitchen

    createOpening(
        -7,
        7,
        3.2,
        3.2
    );


    // Bathroom

    createOpening(
        15,
        7,
        2.4,
        3
    );


    // Workspace

    createOpening(
        8,
        -1,
        3.5,
        3.2
    );


    // ==================================================
    // LIGHTING
    // ==================================================

    const mainLight =
        new THREE.PointLight(
            0xffe5c5,
            55,
            35
        );


    mainLight.position.set(
        5,
        5.2,
        0
    );


    mainLight.castShadow =
        true;


    scene.add(mainLight);


    const bedroomLight =
        new THREE.PointLight(
            0xffdcb5,
            30,
            22
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
            0xffdfb8,
            30,
            20
        );


    kitchenLight.position.set(
        -14,
        4.8,
        10
    );


    scene.add(
        kitchenLight
    );


    const bathroomLight =
        new THREE.PointLight(
            0xffe9d5,
            20,
            14
        );


    bathroomLight.position.set(
        15,
        4.5,
        10
    );


    scene.add(
        bathroomLight
    );


    // ==================================================
    // HOUSE DATA
    // ==================================================

    const houseData = {

        width: WIDTH,

        depth: DEPTH,

        height: HEIGHT,

        zones: {

            bedroom: {
                name: "СПАЛЬНЯ",
                x: 0,
                z: -10
            },

            livingRoom: {
                name: "ГОСТИНАЯ",
                x: 5,
                z: 0
            },

            kitchen: {
                name: "КУХНЯ",
                x: -14,
                z: 10
            },

            dining: {
                name: "СТОЛОВАЯ",
                x: -3,
                z: 9
            },

            workspace: {
                name: "РАБОЧАЯ ЗОНА",
                x: 15,
                z: -1
            },

            bathroom: {
                name: "ВАННАЯ",
                x: 15,
                z: 10
            }

        }

    };


    console.log(
        "ROOM SIZE:",
        WIDTH,
        "x",
        DEPTH,
        "x",
        HEIGHT
    );


    console.log(
        "ROOM: Protocol 5 ready"
    );


    return houseData;

}
