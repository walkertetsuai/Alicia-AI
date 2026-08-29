import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

export function createRoom(scene) {

    console.log("ALICIA AI: BASIC ROOM + WINDOWS");

    // ==========================================
    // РАЗМЕР КОМНАТЫ
    // ==========================================

    const WIDTH = 50;
    const DEPTH = 40;
    const HEIGHT = 10;

    const WALL = 0.4;


    // ==========================================
    // МАТЕРИАЛЫ
    // ==========================================

    const floorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x765238,
            roughness: 0.75
        });

    const wallMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xb58a63,
            roughness: 0.82
        });

    const ceilingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd8c8b5,
            roughness: 0.95
        });

    const frameMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x4b2f1e,
            roughness: 0.65
        });

    const glassMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x6ec5e5,
            transparent: true,
            opacity: 0.45,
            side: THREE.DoubleSide
        });


    // ==========================================
    // BOX
    // ==========================================

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


    // ==========================================
    // ПОЛ
    // ==========================================

    box(
        WIDTH,
        0.3,
        DEPTH,
        0,
        -0.15,
        0,
        floorMaterial
    );


    // ==========================================
    // ПОТОЛОК
    // ==========================================

    box(
        WIDTH,
        0.3,
        DEPTH,
        0,
        HEIGHT,
        0,
        ceilingMaterial
    );


    // ==========================================
    // ЛЕВАЯ СТЕНА
    // ==========================================

    box(
        WALL,
        HEIGHT,
        DEPTH,
        -WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );


    // ==========================================
    // ПРАВАЯ СТЕНА
    // ==========================================

    box(
        WALL,
        HEIGHT,
        DEPTH,
        WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );


    // ==========================================
    // ПЕРЕДНЯЯ СТЕНА
    // ==========================================

    box(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        DEPTH / 2,
        wallMaterial
    );


    // ==========================================
    // ЗАДНЯЯ СТЕНА
    // ==========================================

    box(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        -DEPTH / 2,
        wallMaterial
    );


    // =====================================================
    // ОКНО
    //
    // ВАЖНО:
    // задняя стена находится на Z = -20
    //
    // Поэтому окна ставим именно туда.
    // =====================================================

    function createWindow(x) {

        const windowGroup =
            new THREE.Group();


        // -----------------------------------------------
        // СТЕКЛО
        // -----------------------------------------------

        const glass =
            new THREE.Mesh(

                new THREE.PlaneGeometry(
                    7,
                    3.5
                ),

                glassMaterial

            );


        glass.position.set(
            0,
            0,
            0
        );


        windowGroup.add(
            glass
        );


        // -----------------------------------------------
        // РАМЫ
        // -----------------------------------------------

        const frameThickness = 0.18;


        // LEFT

        const left =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    frameThickness,
                    3.8,
                    0.3
                ),

                frameMaterial

            );

        left.position.x =
            -3.5;


        windowGroup.add(
            left
        );


        // RIGHT

        const right =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    frameThickness,
                    3.8,
                    0.3
                ),

                frameMaterial

            );

        right.position.x =
            3.5;


        windowGroup.add(
            right
        );


        // TOP

        const top =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    7.2,
                    frameThickness,
                    0.3
                ),

                frameMaterial

            );

        top.position.y =
            1.75;


        windowGroup.add(
            top
        );


        // BOTTOM

        const bottom =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    7.2,
                    frameThickness,
                    0.3
                ),

                frameMaterial

            );

        bottom.position.y =
            -1.75;


        windowGroup.add(
            bottom
        );


        // CENTER

        const center =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.15,
                    3.5,
                    0.3
                ),

                frameMaterial

            );


        windowGroup.add(
            center
        );


        // -----------------------------------------------
        // ПОЗИЦИЯ ОКНА
        // -----------------------------------------------

        windowGroup.position.set(
            x,
            4,
            -20.25
        );


        // Поворачиваем окно лицом внутрь комнаты

        windowGroup.rotation.y =
            Math.PI;


        scene.add(
            windowGroup
        );


        console.log(
            "WINDOW:",
            x,
            -20.25
        );

    }


    // =====================================================
    // ТРИ ОКНА НА ЗАДНЕЙ СТЕНЕ
    // =====================================================

    createWindow(-10);

    createWindow(0);

    createWindow(10);


    // =====================================================
    // ОСВЕЩЕНИЕ
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


    const ambient =
        new THREE.HemisphereLight(
            0xffead5,
            0x30251f,
            1.5
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
