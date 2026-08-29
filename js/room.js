import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

export function createRoom(scene) {

    console.log("ALICIA AI: ROOM v10");

    // ==========================================
    // РАЗМЕР КОРОБКИ
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

    const windowGlass =
        new THREE.MeshBasicMaterial({
            color: 0x7fc9df,
            transparent: true,
            opacity: 0.35,
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
    // СТЕНЫ
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

    box(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        DEPTH / 2,
        wallMaterial
    );

    box(
        WALL,
        HEIGHT,
        DEPTH,
        -WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );

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
    // СТАРЫЙ ПРОВЕРЕННЫЙ ПОДХОД К ОКНУ
    // ==========================================

    function createWindow(
        width,
        height,
        x,
        y,
        z
    ) {

        // ------------------------------
        // СТЕКЛО
        // ------------------------------

        const windowMesh =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width,
                    height,
                    0.08
                ),

                windowGlass

            );

        windowMesh.position.set(
            x,
            y,
            z
        );

        scene.add(
            windowMesh
        );


        // ------------------------------
        // РАМА
        // ------------------------------

        function frame(
            width,
            height,
            x,
            y
        ) {

            const mesh =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        width,
                        height,
                        0.18
                    ),

                    frameMaterial

                );

            mesh.position.set(
                x,
                y,
                z + 0.08
            );

            scene.add(
                mesh
            );

        }


        // верх

        frame(
            width + 0.4,
            0.2,
            x,
            y + height / 2
        );


        // низ

        frame(
            width + 0.4,
            0.2,
            x,
            y - height / 2
        );


        // левая сторона

        frame(
            0.2,
            height,
            x - width / 2,
            y
        );


        // правая сторона

        frame(
            0.2,
            height,
            x + width / 2,
            y
        );


        // центральная вертикальная рама

        frame(
            0.15,
            height,
            x,
            y
        );


        console.log(
            "WINDOW CREATED:",
            x,
            y,
            z
        );

    }


    // ==========================================
    // ОКНА
    //
    // Пока просто ставим их НА стену,
    // как в старом рабочем варианте.
    // ==========================================

    createWindow(
        7,
        3.5,
        -10,
        4,
        -20.05
    );


    createWindow(
        7,
        3.5,
        0,
        4,
        -20.05
    );


    createWindow(
        7,
        3.5,
        10,
        4,
        -20.05
    );


    // ==========================================
    // ПОТОЛОЧНЫЕ БАЛКИ
    // ==========================================

    box(
        WIDTH,
        0.35,
        0.35,
        0,
        5.7,
        -10,
        frameMaterial
    );

    box(
        WIDTH,
        0.35,
        0.35,
        0,
        5.7,
        0,
        frameMaterial
    );

    box(
        WIDTH,
        0.35,
        0.35,
        0,
        5.7,
        10,
        frameMaterial
    );


    // ==========================================
    // ОСВЕЩЕНИЕ
    // ==========================================

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


    // ==========================================
    // RETURN
    // ==========================================

    return {

        width: WIDTH,
        depth: DEPTH,
        height: HEIGHT

    };

}
