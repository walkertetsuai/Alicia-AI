import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

export function createPortals(scene) {

    const frameMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x38251b,
            roughness: 0.55
        });


    // =================================================
    // COSMIC SPACE
    // =================================================

    function createSpace(
        width,
        height,
        x,
        y,
        z
    ) {

        const group =
            new THREE.Group();


        const background =
            new THREE.Mesh(

                new THREE.PlaneGeometry(
                    width,
                    height
                ),

                new THREE.MeshBasicMaterial({
                    color: 0x101b38,
                    side: THREE.DoubleSide
                })

            );


        group.add(background);


        // звёзды

        const positions = [];


        for (
            let i = 0;
            i < 180;
            i++
        ) {

            positions.push(
                (Math.random() - 0.5) * width,
                (Math.random() - 0.5) * height,
                0.05
            );

        }


        const geometry =
            new THREE.BufferGeometry();


        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(
                positions,
                3
            )
        );


        const stars =
            new THREE.Points(

                geometry,

                new THREE.PointsMaterial({
                    color: 0xffffff,
                    size: 0.08
                })

            );


        group.add(stars);


        group.position.set(
            x,
            y,
            z
        );


        scene.add(group);

    }


    // =================================================
    // WINDOW FRAME
    // =================================================

    function createWindow(
        x,
        y,
        z,
        width,
        height,
        rotationY = 0
    ) {

        const thickness = 0.3;


        function frame(
            w,
            h,
            px,
            py
        ) {

            const mesh =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        w,
                        h,
                        0.35
                    ),

                    frameMaterial

                );


            mesh.position.set(
                px,
                py,
                z
            );


            mesh.rotation.y =
                rotationY;


            scene.add(mesh);

        }


        frame(
            width,
            thickness,
            x,
            y + height / 2
        );


        frame(
            width,
            thickness,
            x,
            y - height / 2
        );


        frame(
            thickness,
            height,
            x - width / 2,
            y
        );


        frame(
            thickness,
            height,
            x + width / 2,
            y
        );


        createSpace(
            width,
            height,
            x,
            y,
            z + 0.15
        );

    }


    // =================================================
    // BACK WINDOWS
    // =================================================

    createWindow(
        -9,
        4,
        -19.75,
        7,
        4
    );


    createWindow(
        1,
        4,
        -19.75,
        7,
        4
    );


    // =================================================
    // LONG SIDE WINDOW
    // =================================================

    createWindow(
        -24.75,
        4,
        -2,
        9,
        4,
        Math.PI / 2
    );


    // =================================================
    // ARCH
    // =================================================

    const archX = 0;
    const archY = 3.5;
    const archZ = 19.75;

    const archWidth = 6;
    const archHeight = 7;


    createSpace(
        archWidth,
        archHeight,
        archX,
        archY,
        archZ + 0.2
    );


    // боковые стойки

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
        archX - archWidth / 2,
        archY,
        archZ
    );


    scene.add(left);


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
        archX + archWidth / 2,
        archY,
        archZ
    );


    scene.add(right);


    // верхняя перемычка

    const top =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                archWidth + 0.4,
                0.4,
                0.5
            ),

            frameMaterial

        );


    top.position.set(
        archX,
        archY + archHeight / 2,
        archZ
    );


    scene.add(top);


    console.log(
        "ALICIA AI: PORTALS READY"
    );

}
