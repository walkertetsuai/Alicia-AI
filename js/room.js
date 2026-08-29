import * as THREE
    from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


export function createRoom(scene) {

    // =================================================
    // ROOM
    // =================================================

    const WIDTH = 50;

    const DEPTH = 40;

    const HEIGHT = 10;

    const WALL = 0.4;


    // =================================================
    // MATERIALS
    // =================================================

    const floorMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x765238,

            roughness: 0.78,

            metalness: 0.05

        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xb58a63,

            roughness: 0.82,

            metalness: 0.02

        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xd7c9b9,

            roughness: 0.92,

            metalness: 0

        });


    // =================================================
    // BOX
    // =================================================

    function createBox(
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


        mesh.castShadow =
            true;

        mesh.receiveShadow =
            true;


        scene.add(
            mesh
        );


        return mesh;

    }


    // =================================================
    // FLOOR
    // =================================================

    createBox(

        WIDTH,
        0.3,
        DEPTH,

        0,
        -0.15,
        0,

        floorMaterial

    );


    // =================================================
    // CEILING
    // =================================================

    createBox(

        WIDTH,
        0.3,
        DEPTH,

        0,
        HEIGHT,
        0,

        ceilingMaterial

    );


    // =================================================
    // BACK WALL
    //
    // TWO WINDOWS
    // =================================================

    const windowWidth =
        7;

    const windowHeight =
        4;

    const windowBottom =
        2;

    const windowTop =
        windowBottom +
        windowHeight;


    const window1 =
        -10;

    const window2 =
        2;


    // Нижняя часть

    createBox(

        WIDTH,
        windowBottom,
        WALL,

        0,
        windowBottom / 2,
        -DEPTH / 2,

        wallMaterial

    );


    // Верхняя часть

    createBox(

        WIDTH,
        HEIGHT - windowTop,
        WALL,

        0,
        windowTop +
        (HEIGHT - windowTop) / 2,
        -DEPTH / 2,

        wallMaterial

    );


    // Между окнами

    createBox(

        window2 -
        windowWidth / 2 -
        (
            window1 +
            windowWidth / 2
        ),

        windowHeight,
        WALL,

        (
            window1 +
            windowWidth / 2 +
            window2 -
            windowWidth / 2
        ) / 2,

        windowBottom +
        windowHeight / 2,

        -DEPTH / 2,

        wallMaterial

    );


    // Слева

    createBox(

        window1 -
        windowWidth / 2 +
        WIDTH / 2,

        windowHeight,
        WALL,

        (
            -WIDTH / 2 +
            window1 -
            windowWidth / 2
        ) / 2,

        windowBottom +
        windowHeight / 2,

        -DEPTH / 2,

        wallMaterial

    );


    // Справа

    createBox(

        WIDTH / 2 -
        (
            window2 +
            windowWidth / 2
        ),

        windowHeight,
        WALL,

        (
            window2 +
            windowWidth / 2 +
            WIDTH / 2
        ) / 2,

        windowBottom +
        windowHeight / 2,

        -DEPTH / 2,

        wallMaterial

    );


    // =================================================
    // LEFT WALL
    //
    // LONG WINDOW
    // =================================================

    const sideWindowWidth =
        12;

    const sideWindowHeight =
        4;

    const sideWindowBottom =
        2;

    const sideWindowZ =
        -4;


    // Перед окном

    const sideFront =
        sideWindowZ +
        sideWindowWidth / 2;


    createBox(

        WALL,
        HEIGHT,
        DEPTH / 2 -
        sideWindowWidth / 2 +
        sideWindowZ,

        -WIDTH / 2,
        HEIGHT / 2,
        (
            DEPTH / 2 +
            sideWindowZ +
            sideWindowWidth / 2
        ) / 2,

        wallMaterial

    );


    // Задняя часть

    createBox(

        WALL,
        HEIGHT,
        DEPTH / 2 -
        sideWindowWidth / 2 -
        sideWindowZ,

        -WIDTH / 2,
        HEIGHT / 2,
        (
            sideWindowZ -
            sideWindowWidth / 2 -
            DEPTH / 2
        ) / 2,

        wallMaterial

    );


    // Низ окна

    createBox(

        WALL,
        sideWindowBottom,
        sideWindowWidth,

        -WIDTH / 2,
        sideWindowBottom / 2,
        sideWindowZ,

        wallMaterial

    );


    // Верх окна

    createBox(

        WALL,
        HEIGHT -
        (
            sideWindowBottom +
            sideWindowHeight
        ),
        sideWindowWidth,

        -WIDTH / 2,

        sideWindowBottom +
        sideWindowHeight +
        (
            HEIGHT -
            sideWindowBottom -
            sideWindowHeight
        ) / 2,

        sideWindowZ,

        wallMaterial

    );


    // =================================================
    // RIGHT WALL
    //
    // LARGE ARCH
    // =================================================

    const archWidth =
        6;

    const archHeight =
        7;

    const archCenterZ =
        5;


    // Левая часть стены

    createBox(

        WALL,
        HEIGHT,

        archCenterZ -
        archWidth / 2 +
        DEPTH / 2,

        WIDTH / 2,

        HEIGHT / 2,

        (
            -DEPTH / 2 +
            archCenterZ -
            archWidth / 2
        ) / 2,

        wallMaterial

    );


    // Правая часть стены

    createBox(

        WALL,
        HEIGHT,

        DEPTH / 2 -
        (
            archCenterZ +
            archWidth / 2
        ),

        WIDTH / 2,

        HEIGHT / 2,

        (
            archCenterZ +
            archWidth / 2 +
            DEPTH / 2
        ) / 2,

        wallMaterial

    );


    // Верх арки

    createBox(

        WALL,

        HEIGHT -
        archHeight,

        archWidth,

        WIDTH / 2,

        archHeight +
        (
            HEIGHT -
            archHeight
        ) / 2,

        archCenterZ,

        wallMaterial

    );


    // =================================================
    // LIGHTING
    // =================================================

    const mainLight =
        new THREE.PointLight(
            0xffdfbd,
            120,
            100
        );

    mainLight.position.set(
        0,
        8,
        0
    );

    mainLight.castShadow =
        true;

    scene.add(
        mainLight
    );


    const ambient =
        new THREE.HemisphereLight(
            0xffead5,
            0x30251f,
            1.4
        );

    scene.add(
        ambient
    );


    // Дополнительный мягкий свет

    const fillLight =
        new THREE.PointLight(
            0xaecbff,
            35,
            70
        );

    fillLight.position.set(
        -15,
        5,
        -10
    );

    scene.add(
        fillLight
    );


    console.log(
        "ALICIA AI: ROOM READY"
    );


    return {

        width: WIDTH,

        depth: DEPTH,

        height: HEIGHT

    };

}
