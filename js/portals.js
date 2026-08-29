import * as THREE
    from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


export function createPortals(scene) {

    // =================================================
    // MATERIALS
    // =================================================

    const frameMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x3b271b,

            roughness: 0.5,

            metalness: 0.15

        });


    const spaceMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x101a38,

            side: THREE.DoubleSide

        });


    // =================================================
    // SPACE
    // =================================================

    function createSpace(
        width,
        height,
        x,
        y,
        z,
        rotationY = 0
    ) {

        const group =
            new THREE.Group();


        // Background

        const background =
            new THREE.Mesh(

                new THREE.PlaneGeometry(
                    width,
                    height
                ),

                spaceMaterial

            );


        background.position.set(
            0,
            0,
            0
        );


        group.add(
            background
        );


        // Stars

        const positions = [];


        for (
            let i = 0;
            i < 220;
            i++
        ) {

            const starX =
                (
                    Math.random() -
                    0.5
                ) * width;


            const starY =
                (
                    Math.random() -
                    0.5
                ) * height;


            const starZ =
                -Math.random() * 5;


            positions.push(
                starX,
                starY,
                starZ
            );

        }


        const starGeometry =
            new THREE.BufferGeometry();


        starGeometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(
                positions,
                3
            )

        );


        const starMaterial =
            new THREE.PointsMaterial({

                color: 0xffffff,

                size: 0.07,

                sizeAttenuation: true

            });


        const stars =
            new THREE.Points(

                starGeometry,

                starMaterial

            );


        group.add(
            stars
        );


        group.position.set(
            x,
            y,
            z
        );


        group.rotation.y =
            rotationY;


        scene.add(
            group
        );

    }


    // =================================================
    // WINDOW
    // =================================================

    function createWindow(
        x,
        y,
        z,
        width,
        height,
        rotationY = 0
    ) {

        const depth =
            0.38;


        // Космос

        createSpace(

            width,
            height,

            x,
            y,
            z - 0.15,

            rotationY

        );


        function frame(
            widthFrame,
            heightFrame,
            px,
            py,
            pz
        ) {

            const mesh =
                new THREE.Mesh(

                    new THREE.BoxGeometry(

                        widthFrame,

                        heightFrame,

                        depth

                    ),

                    frameMaterial

                );


            mesh.position.set(
                px,
                py,
                pz
            );


            mesh.rotation.y =
                rotationY;


            mesh.castShadow =
                true;


            mesh.receiveShadow =
                true;


            scene.add(
                mesh
            );

        }


        // Верх

        frame(

            width +
            0.5,

            0.3,

            x,

            y +
            height / 2,

            z

        );


        // Низ

        frame(

            width +
            0.5,

            0.3,

            x,

            y -
            height / 2,

            z

        );


        // Левая сторона

        frame(

            0.3,

            height,

            x -
            width / 2,

            y,

            z

        );


        // Правая сторона

        frame(

            0.3,

            height,

            x +
            width / 2,

            y,

            z

        );

    }


    // =================================================
    // BACK WINDOWS
    // =================================================

    createWindow(
        -10,
        4,
        -19.72,
        7,
        4
    );


    createWindow(
        2,
        4,
        -19.72,
        7,
        4
    );


    // =================================================
    // LONG LEFT WINDOW
    // =================================================

    createWindow(

        -24.72,

        4,

        -4,

        12,

        4,

        Math.PI / 2

    );


    // =================================================
    // ARCH
    // =================================================

    const archX =
        24.72;

    const archY =
        3.5;

    const archZ =
        5;


    const archWidth =
        6;

    const archHeight =
        7;


    // Космос

    createSpace(

        archWidth,
        archHeight,

        archX,
        archY,
        archZ - 0.2,

        Math.PI / 2

    );


    // Левая стойка

    const left =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.4,
                archHeight,
                0.5
            ),

            frameMaterial

        );


    left.position.set(

        archX,

        archY,

        archZ -
        archWidth / 2

    );


    scene.add(
        left
    );


    // Правая стойка

    const right =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.4,
                archHeight,
                0.5
            ),

            frameMaterial

        );


    right.position.set(

        archX,

        archY,

        archZ +
        archWidth / 2

    );


    scene.add(
        right
    );


    // Верхняя часть

    const top =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.4,
                0.4,
                archWidth + 0.4
            ),

            frameMaterial

        );


    top.position.set(

        archX,

        archY +
        archHeight / 2,

        archZ

    );


    scene.add(
        top
    );


    console.log(
        "ALICIA AI: PORTALS READY"
    );

}
