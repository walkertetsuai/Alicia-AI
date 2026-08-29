import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

export function createRoom(scene) {

    console.log("ALICIA AI: CLEAN ROOM");

    const WIDTH = 50;
    const DEPTH = 40;
    const HEIGHT = 10;
    const WALL = 0.4;

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

    // FLOOR

    box(
        WIDTH,
        0.3,
        DEPTH,
        0,
        -0.15,
        0,
        floorMaterial
    );

    // CEILING

    box(
        WIDTH,
        0.3,
        DEPTH,
        0,
        HEIGHT,
        0,
        ceilingMaterial
    );

    // LEFT

    box(
        WALL,
        HEIGHT,
        DEPTH,
        -WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );

    // RIGHT

    box(
        WALL,
        HEIGHT,
        DEPTH,
        WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );

    // FRONT

    box(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        DEPTH / 2,
        wallMaterial
    );

    // BACK

    box(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        -DEPTH / 2,
        wallMaterial
    );

    // LIGHT

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
