import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

export function createScene() {

    const scene = new THREE.Scene();

    scene.background =
        new THREE.Color(0x202832);


    // Тестовый пол
    const floor = new THREE.Mesh(

        new THREE.BoxGeometry(
            10,
            0.2,
            10
        ),

        new THREE.MeshStandardMaterial({
            color: 0x60452f,
            roughness: 0.8
        })
    );

    floor.position.y = -1;

    floor.receiveShadow = true;

    scene.add(floor);


    // Тестовый куб
    const cube = new THREE.Mesh(

        new THREE.BoxGeometry(
            2,
            2,
            2
        ),

        new THREE.MeshStandardMaterial({
            color: 0xb87333,
            roughness: 0.45,
            metalness: 0.15
        })
    );

    cube.position.set(
        0,
        0,
        0
    );

    cube.castShadow = true;

    cube.receiveShadow = true;

    scene.add(cube);


    // Маленький вращающийся объект
    scene.userData.testCube = cube;


    return scene;
}
