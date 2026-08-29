import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

export function createRoom(scene) {

    console.log("ALICIA AI: CLEAN ROOM");

    const WIDTH = 50;
    const DEPTH = 40;
    const HEIGHT = 10;
    const WALL = 0.4;

    const floorMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x765238
        });

    const wallMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xb58a63
        });

    const ceilingMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd8c8b5
        });

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

        scene.add(mesh);

        return mesh;
    }

    // ПОЛ

    createBox(
        WIDTH,
        0.3,
        DEPTH,
        0,
        -0.15,
        0,
        floorMaterial
    );

    // ПОТОЛОК

    createBox(
        WIDTH,
        0.3,
        DEPTH,
        0,
        HEIGHT,
        0,
        ceilingMaterial
    );

    // ЗАДНЯЯ СТЕНА

    createBox(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        -DEPTH / 2,
        wallMaterial
    );

    // ПЕРЕДНЯЯ СТЕНА

    createBox(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        DEPTH / 2,
        wallMaterial
    );

    // ЛЕВАЯ СТЕНА

    createBox(
        WALL,
        HEIGHT,
        DEPTH,
        -WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );

    // ПРАВАЯ СТЕНА

    createBox(
        WALL,
        HEIGHT,
        DEPTH,
        WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );

    // СВЕТ

    const light =
        new THREE.PointLight(
            0xffffff,
            100,
            100
        );

    light.position.set(
        0,
        8,
        0
    );

    scene.add(light);

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            1
        );

    scene.add(ambient);

    return {
        width: WIDTH,
        depth: DEPTH,
        height: HEIGHT
    };
}
