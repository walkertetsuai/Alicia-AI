import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// =====================================================
// ALICIA AI
// ROOM SYSTEM
// PROTOCOL 7
//
// OPEN SPACE HOUSE
// ONE ROOM / MULTIPLE ZONES
// =====================================================


export function createRoom(scene) {

    console.log("ALICIA AI: ROOM PROTOCOL 7");


    // =================================================
    // DIMENSIONS
    // =================================================

    const W = 42;
    const D = 30;
    const H = 6;

    const WALL = 0.3;


    // =================================================
    // MATERIALS
    // =================================================

    const floorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x704b32,
            roughness: 0.68
        });


    const floorDarkMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x523622,
            roughness: 0.72
        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xb98b62,
            roughness: 0.8
        });


    const wallPanelMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x936b49,
            roughness: 0.82
        });


    const beamMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x4b2f1e,
            roughness: 0.7
        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd9c9b5,
            roughness: 0.95
        });


    const glassMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x8ec4d8,

            transparent: true,

            opacity: 0.28,

            roughness: 0.05,

            metalness: 0,

            transmission: 0.25

        });


    const metalMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x3b3b3b,
            metalness: 0.75,
            roughness: 0.3
        });


    // =================================================
    // BASIC BOX
    // =================================================

    function box(
        width,
        height,
        depth,
        x,
        y,
        z,
        material,
        shadows = true
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
            shadows;

        object.receiveShadow =
            true;


        scene.add(object);


        return object;
    }


    // =================================================
    // FLOOR
    // =================================================

    box(
        W,
        0.25,
        D,
        0,
        -0.125,
        0,
        floorMaterial,
        false
    );


    // =================================================
    // CEILING
    // =================================================

    box(
        W,
        0.25,
        D,
        0,
        H,
        0,
        ceilingMaterial,
        false
    );


    // =================================================
    // OUTER WALLS
    //
    // FRONT WALL HAS OPEN ENTRY
    // =================================================


    // BACK WALL

    box(
        W,
        H,
        WALL,
        0,
        H / 2,
        -14.85,
        wallMaterial
    );


    // LEFT WALL

    box(
        WALL,
        H,
        D,
        -20.85,
        H / 2,
        0,
        wallMaterial
    );


    // RIGHT WALL

    box(
        WALL,
        H,
        D,
        20.85,
        H / 2,
        0,
        wallMaterial
    );


    // FRONT LEFT

    box(
        13,
        H,
        WALL,
        -14.5,
        H / 2,
        14.85,
        wallMaterial
    );


    // FRONT RIGHT

    box(
        13,
        H,
        WALL,
        14.5,
        H / 2,
        14.85,
        wallMaterial
    );


    // =================================================
    // ENTRANCE FRAME
    // =================================================

    box(
        0.35,
        4.5,
        0.4,
        -6.5,
        2.25,
        14.65,
        beamMaterial
    );


    box(
        0.35,
        4.5,
        0.4,
        6.5,
        2.25,
        14.65,
        beamMaterial
    );


    box(
        13.4,
        0.35,
        0.4,
        0,
        4.5,
        14.65,
        beamMaterial
    );


    // =================================================
    // FLOOR DESIGN
    //
    // Decorative wooden strips
    // =================================================

    for (
        let x = -19;
        x <= 19;
        x += 2
    ) {

        box(
            0.045,
            0.02,
            29,
            x,
            0.02,
            0,
            floorDarkMaterial,
            false
        );

    }


    // =================================================
    // CENTRAL FLOOR BORDER
    // =================================================

    box(
        30,
        0.035,
        0.18,
        0,
        0.04,
        4.8,
        beamMaterial,
        false
    );


    box(
        30,
        0.035,
        0.18,
        0,
        0.04,
        -4.8,
        beamMaterial,
        false
    );


    box(
        0.18,
        0.035,
        10,
        -15,
        0.04,
        0,
        beamMaterial,
        false
    );


    box(
        0.18,
        0.035,
        10,
        15,
        0.04,
        0,
        beamMaterial,
        false
    );


    // =================================================
    // WALL DECORATIVE PANELS
    // =================================================

    function wallPanel(
        x,
        y,
        z,
        width,
        height
    ) {

        box(
            width,
            height,
            0.08,
            x,
            y,
            z,
            wallPanelMaterial,
            false
        );

    }


    // BACK WALL PANELS

    wallPanel(
        -15,
        2.8,
        -14.65,
        8,
        4.8
    );


    wallPanel(
        -5,
        2.8,
        -14.65,
        8,
        4.8
    );


    wallPanel(
        5,
        2.8,
        -14.65,
        8,
        4.8
    );


    wallPanel(
        15,
        2.8,
        -14.65,
        8,
        4.8
    );


    // =================================================
    // WINDOWS
    // =================================================

    function createWindow(
        width,
        height,
        x,
        y,
        z,
        rotationY = 0
    ) {

        const group =
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


        group.add(glass);


        // vertical frames

        const left =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.16,
                    height + 0.25,
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
                    0.16,
                    height + 0.25,
                    0.22
                ),

                beamMaterial

            );


        right.position.x =
            width / 2;


        group.add(right);


        // horizontal frames

        const top =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width + 0.32,
                    0.16,
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
                    width + 0.32,
                    0.16,
                    0.22
                ),

                beamMaterial

            );


        bottom.position.y =
            -height / 2;


        group.add(bottom);


        // center frame

        const center =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.12,
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


    // =================================================
    // LARGE LIVING WINDOW
    // =================================================

    createWindow(
        10,
        3.5,
        0,
        3.3,
        -14.65
    );


    // =================================================
    // BEDROOM SIDE WINDOWS
    // =================================================

    createWindow(
        6,
        3,
        -14,
        3.1,
        -14.65
    );


    createWindow(
        6,
        3,
        14,
        3.1,
        -14.65
    );


    // =================================================
    // LEFT WALL WINDOWS
    // =================================================

    createWindow(
        6,
        3,
        -20.65,
        3.2,
        -7,
        Math.PI / 2
    );


    createWindow(
        6,
        3,
        -20.65,
        3.2,
        6,
        Math.PI / 2
    );


    // =================================================
    // RIGHT WALL WINDOWS
    // =================================================

    createWindow(
        6,
        3,
        20.65,
        3.2,
        -7,
        -Math.PI / 2
    );


    createWindow(
        6,
        3,
        20.65,
        3.2,
        6,
        -Math.PI / 2
    );


    // =================================================
    // CEILING BEAMS
    // =================================================

    box(
        W,
        0.35,
        0.35,
        0,
        5.55,
        -10,
        beamMaterial
    );


    box(
        W,
        0.35,
        0.35,
        0,
        5.55,
        0,
        beamMaterial
    );


    box(
        W,
        0.35,
        0.35,
        0,
        5.55,
        10,
        beamMaterial
    );


    // =================================================
    // DECORATIVE CEILING PANELS
    // =================================================

    box(
        30,
        0.08,
        0.08,
        0,
        5.35,
        0,
        beamMaterial,
        false
    );


    // =================================================
    // LIGHTING
    // =================================================

    function addLight(
        x,
        y,
        z,
        intensity,
        distance
    ) {

        const lamp =
            new THREE.PointLight(
                0xffdcb5,
                intensity,
                distance
            );


        lamp.position.set(
            x,
            y,
            z
        );


        lamp.castShadow =
            true;


        scene.add(lamp);

    }


    // Living

    addLight(
        0,
        5,
        0,
        55,
        30
    );


    // Bedroom zone

    addLight(
        0,
        4.8,
        -10,
        35,
        20
    );


    // Kitchen

    addLight(
        -13,
        4.8,
        9,
        32,
        18
    );


    // Dining

    addLight(
        -5,
        4.8,
        8,
        28,
        18
    );


    // Workspace

    addLight(
        14,
        4.8,
        0,
        32,
        20
    );


    // =================================================
    // SOFT AMBIENT LIGHT
    // =================================================

    const ambient =
        new THREE.HemisphereLight(
            0xffead5,
            0x33261c,
            1.4
        );


    scene.add(
        ambient
    );


    // =================================================
    // HOUSE DATA
    // =================================================

    const houseData = {

        width: W,

        depth: D,

        height: H,

        type: "open-space",

        zones: {

            bedroom: {
                name: "Спальная зона",
                x: 0,
                z: -10
            },

            living: {
                name: "Гостиная",
                x: 3,
                z: -1
            },

            kitchen: {
                name: "Кухня",
                x: -14,
                z: 9
            },

            dining: {
                name: "Столовая",
                x: -5,
                z: 8
            },

            workspace: {
                name: "Рабочая зона",
                x: 14,
                z: -1
            },

            bathroom: {
                name: "Ванная",
                x: 14,
                z: 9
            }

        }

    };


    console.log(
        "ALICIA AI: OPEN SPACE HOUSE READY"
    );


    console.log(
        "SIZE:",
        W,
        "x",
        D
    );


    return houseData;

}
