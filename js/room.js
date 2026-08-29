import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ======================================================
// ALICIA AI
// ROOM SYSTEM
// PROTOCOL 6
//
// CLEAN HOUSE ARCHITECTURE
// SAO INSPIRED
// ======================================================


export function createRoom(scene) {

    console.log("ALICIA ROOM: Protocol 6");


    // ==================================================
    // HOUSE
    // ==================================================

    const HOUSE_W = 42;
    const HOUSE_D = 30;
    const HOUSE_H = 6;

    const WALL = 0.28;


    // ==================================================
    // COLORS
    // ==================================================

    const woodDark = 0x4a3020;
    const wood = 0x8a6040;
    const woodLight = 0xb58a60;

    const floorColor = 0x725036;

    const ceilingColor = 0xd8c8b5;

    const glassColor = 0x9bc9dc;


    // ==================================================
    // MATERIALS
    // ==================================================

    const floorMaterial =
        new THREE.MeshStandardMaterial({
            color: floorColor,
            roughness: 0.82
        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({
            color: woodLight,
            roughness: 0.86
        });


    const wallDarkMaterial =
        new THREE.MeshStandardMaterial({
            color: wood,
            roughness: 0.86
        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({
            color: ceilingColor,
            roughness: 0.95
        });


    const beamMaterial =
        new THREE.MeshStandardMaterial({
            color: woodDark,
            roughness: 0.75
        });


    const glassMaterial =
        new THREE.MeshPhysicalMaterial({

            color: glassColor,

            transparent: true,

            opacity: 0.38,

            roughness: 0.08,

            transmission: 0.15

        });


    // ==================================================
    // BASIC BOX
    // ==================================================

    function makeBox(
        width,
        height,
        depth,
        x,
        y,
        z,
        material,
        shadows = true
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
            shadows;

        mesh.receiveShadow =
            true;


        scene.add(mesh);


        return mesh;
    }


    // ==================================================
    // FLOOR
    // ==================================================

    makeBox(
        HOUSE_W,
        0.3,
        HOUSE_D,
        0,
        -0.15,
        0,
        floorMaterial,
        false
    );


    // ==================================================
    // CEILING
    // ==================================================

    makeBox(
        HOUSE_W,
        0.25,
        HOUSE_D,
        0,
        HOUSE_H,
        0,
        ceilingMaterial,
        false
    );


    // ==================================================
    // OUTER WALLS
    // ==================================================

    // BACK

    makeBox(
        HOUSE_W,
        HOUSE_H,
        WALL,
        0,
        HOUSE_H / 2,
        -14.86,
        wallMaterial
    );


    // FRONT

    makeBox(
        HOUSE_W,
        HOUSE_H,
        WALL,
        0,
        HOUSE_H / 2,
        14.86,
        wallMaterial
    );


    // LEFT

    makeBox(
        WALL,
        HOUSE_H,
        HOUSE_D,
        -20.86,
        HOUSE_H / 2,
        0,
        wallMaterial
    );


    // RIGHT

    makeBox(
        WALL,
        HOUSE_H,
        HOUSE_D,
        20.86,
        HOUSE_H / 2,
        0,
        wallMaterial
    );


    // ==================================================
    // HOUSE PLAN
    //
    //
    //                    BACK
    //
    // ┌──────────────────────────────────────────────┐
    // │                                              │
    // │                  BEDROOM                     │
    // │                                              │
    // │                    🛏                         │
    // │                                              │
    // ├───────────────┐              ┌───────────────┤
    // │               │              │               │
    // │               │    LIVING    │    WORK       │
    // │               │              │               │
    // │   KITCHEN     │              │               │
    // │               │              │               │
    // │   DINING      │              │               │
    // │               │              │               │
    // ├───────────────┘              └───────┬───────┤
    // │                                      │       │
    // │             ENTRY                    │ BATH  │
    // │                                      │       │
    // └──────────────────────────────────────┴───────┘
    //
    //                    FRONT
    //
    // ==================================================


    // ==================================================
    // BEDROOM WALL
    //
    // Back zone:
    // X -20.7 ... 20.7
    // Z -14.7 ... -5
    //
    // OPENING IN CENTER
    // ==================================================

    // Left part

    makeBox(
        16,
        HOUSE_H,
        WALL,
        -12.35,
        HOUSE_H / 2,
        -5,
        wallDarkMaterial
    );


    // Right part

    makeBox(
        16,
        HOUSE_H,
        WALL,
        12.35,
        HOUSE_H / 2,
        -5,
        wallDarkMaterial
    );


    // ==================================================
    // LEFT LIVING / KITCHEN DIVIDER
    //
    // Kitchen is front-left.
    // Living is behind it.
    //
    // Large opening remains.
    // ==================================================

    makeBox(
        WALL,
        HOUSE_H,
        5,
        -7,
        HOUSE_H / 2,
        12,
        wallDarkMaterial
    );


    // ==================================================
    // RIGHT WORK / BATH DIVIDER
    // ==================================================

    makeBox(
        WALL,
        HOUSE_H,
        5,
        9,
        HOUSE_H / 2,
        12,
        wallDarkMaterial
    );


    // ==================================================
    // BATHROOM
    //
    // Front-right corner
    // ==================================================

    // Back wall of bathroom

    makeBox(
        11,
        HOUSE_H,
        WALL,
        15,
        HOUSE_H / 2,
        7,
        wallDarkMaterial
    );


    // Left wall of bathroom

    makeBox(
        WALL,
        HOUSE_H,
        7,
        9.5,
        HOUSE_H / 2,
        10.5,
        wallDarkMaterial
    );


    // ==================================================
    // WOODEN BEAMS
    // ==================================================

    // Main ceiling beams

    makeBox(
        HOUSE_W,
        0.32,
        0.32,
        0,
        5.55,
        -5,
        beamMaterial
    );


    makeBox(
        HOUSE_W,
        0.32,
        0.32,
        0,
        5.55,
        5,
        beamMaterial
    );


    // Side beam

    makeBox(
        0.32,
        0.32,
        HOUSE_D,
        -10,
        5.55,
        0,
        beamMaterial
    );


    makeBox(
        0.32,
        0.32,
        HOUSE_D,
        10,
        5.55,
        0,
        beamMaterial
    );


    // ==================================================
    // WINDOW FUNCTION
    // ==================================================

    function window(
        width,
        height,
        x,
        y,
        z,
        rotationY = 0
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


        // Frames

        const frameThickness = 0.14;


        const left =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    frameThickness,
                    height,
                    0.22
                ),

                beamMaterial

            );


        left.position.x =
            -width / 2;


        group.add(left);


        const right =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    frameThickness,
                    height,
                    0.22
                ),

                beamMaterial

            );


        right.position.x =
            width / 2;


        group.add(right);


        const top =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width + 0.28,
                    frameThickness,
                    0.22
                ),

                beamMaterial

            );


        top.position.y =
            height / 2;


        group.add(top);


        const bottom =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width + 0.28,
                    frameThickness,
                    0.22
                ),

                beamMaterial

            );


        bottom.position.y =
            -height / 2;


        group.add(bottom);


        // Vertical center

        const center =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    frameThickness,
                    height,
                    0.24
                ),

                beamMaterial

            );


        group.add(center);


        group.position.set(
            x,
            y,
            z
        );


        group.rotation.y =
            rotationY;


        scene.add(group);


        return group;
    }


    // ==================================================
    // WINDOWS
    // ==================================================

    // Large living room window

    window(
        9,
        3.2,
        5,
        3.3,
        -14.65
    );


    // Bedroom windows

    window(
        5,
        2.8,
        -13,
        3.2,
        -14.65
    );


    window(
        5,
        2.8,
        13,
        3.2,
        -14.65
    );


    // Kitchen window

    window(
        5,
        2.5,
        -14,
        3.1,
        14.65,
        Math.PI
    );


    // Workspace window

    window(
        5,
        2.8,
        17,
        3.2,
        -2,
        Math.PI / 2
    );


    // Bathroom window

    window(
        2.5,
        1.7,
        15,
        3.5,
        14.65,
        Math.PI
    );


    // ==================================================
    // DOOR / ARCH
    // ==================================================

    function doorway(
        x,
        y,
        z,
        width,
        height,
        rotationY = 0
    ) {

        const group =
            new THREE.Group();


        const left =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.22,
                    height,
                    0.3
                ),

                beamMaterial

            );


        left.position.x =
            -width / 2;


        group.add(left);


        const right =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.22,
                    height,
                    0.3
                ),

                beamMaterial

            );


        right.position.x =
            width / 2;


        group.add(right);


        const top =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width + 0.4,
                    0.22,
                    0.3
                ),

                beamMaterial

            );


        top.position.y =
            height;


        group.add(top);


        group.position.set(
            x,
            y,
            z
        );


        group.rotation.y =
            rotationY;


        scene.add(group);

    }


    // Bedroom

    doorway(
        0,
        0,
        -5.15,
        7,
        3.4
    );


    // Kitchen

    doorway(
        -7,
        0,
        9,
        4,
        3.2
    );


    // Bathroom

    doorway(
        15,
        0,
        7.15,
        2.5,
        3
    );


    // Workspace

    doorway(
        9,
        0,
        -1,
        3.5,
        3.2,
        Math.PI / 2
    );


    // ==================================================
    // LIGHTING
    // ==================================================

    function light(
        x,
        y,
        z,
        intensity,
        distance
    ) {

        const point =
            new THREE.PointLight(
                0xffdfbd,
                intensity,
                distance
            );


        point.position.set(
            x,
            y,
            z
        );


        point.castShadow =
            true;


        scene.add(point);

    }


    // Living room

    light(
        4,
        5,
        0,
        45,
        24
    );


    // Bedroom

    light(
        0,
        5,
        -10,
        32,
        20
    );


    // Kitchen

    light(
        -14,
        5,
        10,
        30,
        18
    );


    // Dining

    light(
        -4,
        5,
        8,
        25,
        16
    );


    // Workspace

    light(
        15,
        5,
        -1,
        30,
        18
    );


    // Bathroom

    light(
        15,
        4.8,
        10,
        20,
        12
    );


    // ==================================================
    // HOUSE DATA
    // ==================================================

    const houseData = {

        width: HOUSE_W,

        depth: HOUSE_D,

        height: HOUSE_H,

        zones: {

            bedroom: {
                name: "Спальня",
                x: 0,
                z: -10
            },

            living: {
                name: "Гостиная",
                x: 4,
                z: 0
            },

            kitchen: {
                name: "Кухня",
                x: -14,
                z: 10
            },

            dining: {
                name: "Столовая",
                x: -4,
                z: 8
            },

            workspace: {
                name: "Рабочая зона",
                x: 15,
                z: -1
            },

            bathroom: {
                name: "Ванная",
                x: 15,
                z: 10
            }

        }

    };


    console.log(
        "ALICIA HOUSE:",
        HOUSE_W,
        "x",
        HOUSE_D
    );


    console.log(
        "ALICIA ROOM: ready"
    );


    return houseData;

}
