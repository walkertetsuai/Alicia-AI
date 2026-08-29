import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

export function createRoom(scene) {

    console.log("ALICIA AI: BASIC ROOM");

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
            color: 0xb89068,
            roughness: 0.82
        });

    const ceilingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd8c8b5,
            roughness: 0.95
        });


    // ==========================================
    // СОЗДАНИЕ ОБЪЕКТА
    // ==========================================

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

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

        return mesh;
    }


    // ==========================================
    // ПОЛ
    // ==========================================

    createBox(
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

    createBox(
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

    // Задняя стена

    createBox(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        -DEPTH / 2,
        wallMaterial
    );


    // Передняя стена

    createBox(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        DEPTH / 2,
        wallMaterial
    );


    // Левая стена

    createBox(
        WALL,
        HEIGHT,
        DEPTH,
        -WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );


    // Правая стена

    createBox(
        WALL,
        HEIGHT,
        DEPTH,
        WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );


    // ==========================================
    // СВЕТ
    // ==========================================

    const light =
        new THREE.PointLight(
            0xffe2c0,
            80,
            60
        );

    light.position.set(
        0,
        HEIGHT - 1,
        0
    );

    light.castShadow = true;

    scene.add(light);


    // ==========================================
    // ОБЩЕЕ ОСВЕЩЕНИЕ
    // ==========================================

    const ambient =
        new THREE.HemisphereLight(
            0xffead5,
            0x30251c,
            1.5
        );

    scene.add(ambient);


    // ==========================================
    // ДАННЫЕ КОМНАТЫ
    // ==========================================

    return {

        width: WIDTH,

        depth: DEPTH,

        height: HEIGHT

    };

}
