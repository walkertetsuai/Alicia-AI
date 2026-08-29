import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

export function createRoom(scene) {

    console.log("ALICIA AI: ROOM v8");


    // =====================================================
    // ROOM SIZE
    // =====================================================

    const WIDTH = 50;
    const DEPTH = 40;
    const HEIGHT = 10;

    const WALL = 0.4;


    // =====================================================
    // MATERIALS
    // =====================================================

    const floorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x754d31,
            roughness: 0.72
        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xb78a63,
            roughness: 0.82
        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd7c7b4,
            roughness: 0.95
        });


    const woodMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x4b2e1c,
            roughness: 0.68
        });


    const glassMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x8fd0e5,

            transparent: true,

            opacity: 0.35,

            roughness: 0.05,

            transmission: 0.15

        });


    // =====================================================
    // BOX
    // =====================================================

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


        mesh.castShadow = shadow;
        mesh.receiveShadow = true;


        scene.add(mesh);


        return mesh;
    }


    // =====================================================
    // FLOOR
    // =====================================================

    box(
        WIDTH,
        0.3,
        DEPTH,
        0,
        -0.15,
        0,
        floorMaterial,
        false
    );


    // =====================================================
    // CEILING
    // =====================================================

    box(
        WIDTH,
        0.3,
        DEPTH,
        0,
        HEIGHT,
        0,
        ceilingMaterial,
        false
    );


    // =====================================================
    // BACK WALL
    //
    // THREE LARGE WINDOWS
    //
    // Window size:
    // 10 x 4
    // =====================================================

    function wallWithWindowsBack() {

        const windowWidth = 10;
        const windowHeight = 4;

        const windowBottom = 1.8;
        const windowTop =
            windowBottom + windowHeight;


        // Bottom section

        box(
            WIDTH,
            windowBottom,
            WALL,
            0,
            windowBottom / 2,
            -DEPTH / 2,
            wallMaterial
        );


        // Top section

        box(
            WIDTH,
            HEIGHT - windowTop,
            WALL,
            0,
            windowTop +
            (HEIGHT - windowTop) / 2,
            -DEPTH / 2,
            wallMaterial
        );


        // Side sections

        const sideWidth =
            (WIDTH -
                windowWidth * 3) / 4;


        const centers = [
            -20,
            -10,
            0,
            10,
            20
        ];


        // Spaces between windows

        for (
            let i = 0;
            i < centers.length;
            i++
        ) {

            let width;

            if (
                i === 0 ||
                i === centers.length - 1
            ) {

                width =
                    sideWidth;

            } else {

                width =
                    sideWidth;

            }


            box(
                width,
                windowHeight,
                WALL,
                centers[i] === -20
                    ? -22.5
                    : centers[i] === -10
                    ? -15
                    : centers[i] === 0
                    ? 0
                    : centers[i] === 10
                    ? 15
                    : 22.5,
                windowBottom +
                windowHeight / 2,
                -DEPTH / 2,
                wallMaterial
            );

        }

    }


    // Вместо сложного расчёта выше
    // создаём заднюю стену вручную.


    // Нижняя часть

    box(
        WIDTH,
        1.8,
        WALL,
        0,
        0.9,
        -DEPTH / 2,
        wallMaterial
    );


    // Верхняя часть

    box(
        WIDTH,
        4.2,
        WALL,
        0,
        7.9,
        -DEPTH / 2,
        wallMaterial
    );


    // Вертикальные простенки

    box(
        5,
        4,
        WALL,
        -22.5,
        3.8,
        -DEPTH / 2,
        wallMaterial
    );


    box(
        2,
        4,
        WALL,
        -16,
        3.8,
        -DEPTH / 2,
        wallMaterial
    );


    box(
        2,
        4,
        WALL,
        -5,
        3.8,
        -DEPTH / 2,
        wallMaterial
    );


    box(
        2,
        4,
        WALL,
        5,
        3.8,
        -DEPTH / 2,
        wallMaterial
    );


    box(
        2,
        4,
        WALL,
        16,
        3.8,
        -DEPTH / 2,
        wallMaterial
    );


    box(
        5,
        4,
        WALL,
        22.5,
        3.8,
        -DEPTH / 2,
        wallMaterial
    );


    // =====================================================
    // FRONT WALL
    // =====================================================

    // Пока полностью закрытая.
    // Позже здесь сделаем дверь.


    box(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        DEPTH / 2,
        wallMaterial
    );


    // =====================================================
    // LEFT WALL
    // =====================================================

    box(
        WALL,
        HEIGHT,
        DEPTH,
        -WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );


    // =====================================================
    // RIGHT WALL
    // =====================================================

    box(
        WALL,
        HEIGHT,
        DEPTH,
        WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );


    // =====================================================
    // WINDOW CREATION
    // =====================================================

    function window(
        width,
        height,
        x,
        y,
        z
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
                    0.22,
                    height + 0.35,
                    0.35
                ),

                woodMaterial

            );


        left.position.x =
            -width / 2;


        group.add(left);


        // Right frame

        const right =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.22,
                    height + 0.35,
                    0.35
                ),

                woodMaterial

            );


        right.position.x =
            width / 2;


        group.add(right);


        // Top frame

        const top =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width + 0.44,
                    0.22,
                    0.35
                ),

                woodMaterial

            );


        top.position.y =
            height / 2;


        group.add(top);


        // Bottom frame

        const bottom =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width + 0.44,
                    0.22,
                    0.35
                ),

                woodMaterial

            );


        bottom.position.y =
            -height / 2;


        group.add(bottom);


        // Center frame

        const center =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.16,
                    height,
                    0.38
                ),

                woodMaterial

            );


        group.add(center);


        group.position.set(
            x,
            y,
            z
        );


        scene.add(group);

    }


    // =====================================================
    // WINDOWS
    // =====================================================

    window(
        10,
        4,
        -10,
        3.8,
        -20.25
    );


    window(
        10,
        4,
        0,
        3.8,
        -20.25
    );


    window(
        10,
        4,
        10,
        3.8,
        -20.25
    );


    // =====================================================
    // WOODEN CEILING BEAMS
    // =====================================================

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


    // =====================================================
    // LIGHT
    // =====================================================

    const mainLight =
        new THREE.PointLight(
            0xffdfbd,
            100,
            70
        );


    mainLight.position.set(
        0,
        8,
        0
    );


    mainLight.castShadow = true;


    scene.add(
        mainLight
    );


    // =====================================================
    // AMBIENT
    // =====================================================

    const ambient =
        new THREE.HemisphereLight(
            0xffead5,
            0x30251f,
            1.6
        );


    scene.add(
        ambient
    );


    // =====================================================
    // RETURN
    // =====================================================

    return {

        width: WIDTH,

        depth: DEPTH,

        height: HEIGHT

    };

}
