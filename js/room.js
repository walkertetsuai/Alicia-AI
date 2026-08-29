import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

export function createRoom(scene) {

    console.log("ALICIA AI: ROOM v9");


    // ==================================================
    // ROOM
    // ==================================================

    const WIDTH = 50;
    const DEPTH = 40;
    const HEIGHT = 10;

    const WALL = 0.4;


    // ==================================================
    // MATERIALS
    // ==================================================

    const floorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x765039,
            roughness: 0.75
        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xb58b67,
            roughness: 0.82
        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd8c9b7,
            roughness: 0.95
        });


    const woodMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x4a2d1b,
            roughness: 0.65
        });


    const glassMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x78c9e5,

            transparent: true,

            opacity: 0.45,

            roughness: 0.05,

            metalness: 0,

            transmission: 0.15

        });


    // ==================================================
    // BOX
    // ==================================================

    function box(
        width,
        height,
        depth,
        x,
        y,
        z,
        material
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


        mesh.castShadow = true;

        mesh.receiveShadow = true;


        scene.add(mesh);


        return mesh;

    }


    // ==================================================
    // FLOOR
    // ==================================================

    box(
        WIDTH,
        0.3,
        DEPTH,
        0,
        -0.15,
        0,
        floorMaterial
    );


    // ==================================================
    // CEILING
    // ==================================================

    box(
        WIDTH,
        0.3,
        DEPTH,
        0,
        HEIGHT,
        0,
        ceilingMaterial
    );


    // ==================================================
    // LEFT WALL
    // ==================================================

    box(
        WALL,
        HEIGHT,
        DEPTH,
        -WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );


    // ==================================================
    // RIGHT WALL
    // ==================================================

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
    // FRONT WALL
    // ==================================================

    box(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        DEPTH / 2,
        wallMaterial
    );


    // ==================================================
    // BACK WALL WITH 3 WINDOWS
    // ==================================================

    const windowWidth = 10;

    const windowHeight = 4;

    const windowBottom = 2;

    const windowTop =
        windowBottom + windowHeight;


    const backZ =
        -DEPTH / 2;


    // ----------------------------------------------
    // нижняя часть стены
    // ----------------------------------------------

    box(
        WIDTH,
        windowBottom,
        WALL,
        0,
        windowBottom / 2,
        backZ,
        wallMaterial
    );


    // ----------------------------------------------
    // верхняя часть стены
    // ----------------------------------------------

    box(
        WIDTH,
        HEIGHT - windowTop,
        WALL,
        0,
        windowTop +
        (HEIGHT - windowTop) / 2,
        backZ,
        wallMaterial
    );


    // ----------------------------------------------
    // простенки
    // ----------------------------------------------

    // край слева

    box(
        5,
        windowHeight,
        WALL,
        -22.5,
        windowBottom +
        windowHeight / 2,
        backZ,
        wallMaterial
    );


    // между окном 1 и 2

    box(
        2.5,
        windowHeight,
        WALL,
        -16.25,
        windowBottom +
        windowHeight / 2,
        backZ,
        wallMaterial
    );


    // между окном 2 и 3

    box(
        2.5,
        windowHeight,
        WALL,
        16.25,
        windowBottom +
        windowHeight / 2,
        backZ,
        wallMaterial
    );


    // край справа

    box(
        5,
        windowHeight,
        WALL,
        22.5,
        windowBottom +
        windowHeight / 2,
        backZ,
        wallMaterial
    );


    // ==================================================
    // WINDOW
    // ==================================================

    function createWindow(
        x,
        y,
        z
    ) {

        const group =
            new THREE.Group();


        // стекло

        const glass =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    windowWidth,
                    windowHeight,
                    0.08
                ),

                glassMaterial

            );


        group.add(glass);


        // ------------------------------------------
        // рамы
        // ------------------------------------------

        const left =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.22,
                    windowHeight + 0.3,
                    0.3
                ),

                woodMaterial

            );


        left.position.x =
            -windowWidth / 2;


        group.add(left);


        const right =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.22,
                    windowHeight + 0.3,
                    0.3
                ),

                woodMaterial

            );


        right.position.x =
            windowWidth / 2;


        group.add(right);


        const top =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    windowWidth + 0.44,
                    0.22,
                    0.3
                ),

                woodMaterial

            );


        top.position.y =
            windowHeight / 2;


        group.add(top);


        const bottom =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    windowWidth + 0.44,
                    0.22,
                    0.3
                ),

                woodMaterial

            );


        bottom.position.y =
            -windowHeight / 2;


        group.add(bottom);


        // центральная рама

        const center =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.15,
                    windowHeight,
                    0.32
                ),

                woodMaterial

            );


        group.add(center);


        // положение окна

        group.position.set(
            x,
            y,
            z
        );


        scene.add(group);

    }


    // ==================================================
    // 3 WINDOWS
    // ==================================================

    createWindow(
        -10,
        4,
        backZ - 0.05
    );


    createWindow(
        0,
        4,
        backZ - 0.05
    );


    createWindow(
        10,
        4,
        backZ - 0.05
    );


    // ==================================================
    // CEILING BEAMS
    // ==================================================

    box(
        WIDTH,
        0.35,
        0.35,
        0,
        5.7,
        -10,
        woodMaterial
    );


    box(
        WIDTH,
        0.35,
        0.35,
        0,
        5.7,
        0,
        woodMaterial
    );


    box(
        WIDTH,
        0.35,
        0.35,
        0,
        5.7,
        10,
        woodMaterial
    );


    // ==================================================
    // LIGHT
    // ==================================================

    const light =
        new THREE.PointLight(
            0xffdfbd,
            100,
            70
        );


    light.position.set(
        0,
        8,
        0
    );


    light.castShadow = true;


    scene.add(light);


    // ==================================================
    // AMBIENT
    // ==================================================

    const ambient =
        new THREE.HemisphereLight(
            0xffead5,
            0x30251f,
            1.5
        );


    scene.add(ambient);


    // ==================================================
    // RETURN
    // ==================================================

    return {

        width: WIDTH,

        depth: DEPTH,

        height: HEIGHT

    };

}
