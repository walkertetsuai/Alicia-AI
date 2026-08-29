import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

export function createRoom(scene) {

    const WIDTH = 50;
    const DEPTH = 40;
    const HEIGHT = 10;
    const WALL = 0.4;

    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x765238,
        roughness: 0.8
    });

    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0xb58a63,
        roughness: 0.85
    });

    const ceilingMaterial = new THREE.MeshStandardMaterial({
        color: 0xd8c8b5,
        roughness: 0.95
    });


    function box(
        width,
        height,
        depth,
        x,
        y,
        z,
        material
    ) {

        const mesh = new THREE.Mesh(
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


    // =================================================
    // FLOOR
    // =================================================

    box(
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

    box(
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
    // ДВА ОКНА
    // =================================================

    const windowWidth = 7;
    const windowHeight = 4;

    const windowY = 4;

    const window1X = -9;
    const window2X = 1;


    // нижняя часть стены

    box(
        WIDTH,
        2,
        WALL,
        0,
        1,
        -DEPTH / 2,
        wallMaterial
    );


    // верхняя часть стены

    box(
        WIDTH,
        HEIGHT - 6,
        WALL,
        0,
        8,
        -DEPTH / 2,
        wallMaterial
    );


    // между окнами

    box(
        3,
        4,
        WALL,
        -5,
        windowY,
        -DEPTH / 2,
        wallMaterial
    );


    // слева от первого окна

    box(
        12.5,
        4,
        WALL,
        -18.75,
        windowY,
        -DEPTH / 2,
        wallMaterial
    );


    // справа от второго окна

    box(
        20.5,
        4,
        WALL,
        15.75,
        windowY,
        -DEPTH / 2,
        wallMaterial
    );


    // =================================================
    // LEFT WALL
    //
    // ОДНО ОКНО
    // =================================================

    const sideWindowWidth = 9;
    const sideWindowHeight = 4;

    const sideWindowZ = -2;


    // перед окном

    box(
        WALL,
        HEIGHT,
        16,
        -WIDTH / 2,
        HEIGHT / 2,
        12,
        wallMaterial
    );


    // за окном

    box(
        WALL,
        HEIGHT,
        20,
        -WIDTH / 2,
        HEIGHT / 2,
        -12,
        wallMaterial
    );


    // нижняя часть окна

    box(
        WALL,
        2,
        sideWindowWidth,
        -WIDTH / 2,
        1,
        sideWindowZ,
        wallMaterial
    );


    // верхняя часть окна

    box(
        WALL,
        HEIGHT - 6,
        sideWindowWidth,
        -WIDTH / 2,
        8,
        sideWindowZ,
        wallMaterial
    );


    // =================================================
    // RIGHT WALL
    //
    // АРКА
    // =================================================

    const archWidth = 6;
    const archHeight = 7;

    const archX = 0;

    const archZ = DEPTH / 2;


    // левая часть стены

    box(
        (WIDTH - archWidth) / 2,
        HEIGHT,
        WALL,

        -((WIDTH - archWidth) / 4),
        HEIGHT / 2,
        archZ,

        wallMaterial
    );


    // правая часть стены

    box(
        (WIDTH - archWidth) / 2,
        HEIGHT,
        WALL,

        ((WIDTH - archWidth) / 4),
        HEIGHT / 2,
        archZ,

        wallMaterial
    );


    // над аркой

    box(
        archWidth,
        HEIGHT - archHeight,
        WALL,

        archX,
        archHeight + (HEIGHT - archHeight) / 2,
        archZ,

        wallMaterial
    );


    // =================================================
    // LIGHT
    // =================================================

    const light = new THREE.PointLight(
        0xffdfbd,
        100,
        100
    );

    light.position.set(
        0,
        8,
        0
    );

    light.castShadow = true;

    scene.add(light);


    const ambient =
        new THREE.HemisphereLight(
            0xffead5,
            0x30251f,
            1.5
        );

    scene.add(ambient);


    return {
        width: WIDTH,
        depth: DEPTH,
        height: HEIGHT
    };
}
