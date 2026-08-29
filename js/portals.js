import * as THREE
    from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// =====================================================
// ALICIA AI
// PORTALS
//
// Окна + арка + космическое пространство
// =====================================================

export function createPortals(scene) {

    console.log(
        "ALICIA AI: PORTALS START"
    );


    // =================================================
    // МАТЕРИАЛЫ
    // =================================================

    const frameMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x38251b,

            roughness: 0.55

        });


    const portalMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x18284a,

            side: THREE.DoubleSide

        });


    // =================================================
    // КОСМОС
    // =================================================

    function createSpace(
        width,
        height,
        position
    ) {

        const group =
            new THREE.Group();


        // ---------------------------------------------
        // Глубокое пространство
        // ---------------------------------------------

        const space =
            new THREE.Mesh(

                new THREE.PlaneGeometry(
                    width,
                    height
                ),

                portalMaterial

            );


        group.add(
            space
        );


        // ---------------------------------------------
        // ЗВЁЗДЫ
        // ---------------------------------------------

        const starGeometry =
            new THREE.BufferGeometry();


        const stars = [];


        for (
            let i = 0;
            i < 180;
            i++
        ) {

            const x =
                (Math.random() - 0.5)
                * width;

            const y =
                (Math.random() - 0.5)
                * height;


            const z =
                -Math.random() * 8;


            stars.push(
                x,
                y,
                z
            );

        }


        starGeometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(
                stars,
                3
            )

        );


        const starMaterial =
            new THREE.PointsMaterial({

                color: 0xffffff,

                size: 0.08,

                sizeAttenuation: true

            });


        const starField =
            new THREE.Points(

                starGeometry,

                starMaterial

            );


        group.add(
            starField
        );


        group.position.copy(
            position
        );


        scene.add(
            group
        );


        return group;

    }


    // =================================================
    // ОКНО
    // =================================================

    function createWindow(
        x,
        y,
        z
    ) {

        const group =
            new THREE.Group();


        const width = 7;

        const height = 4;


        // ---------------------------------------------
        // КОСМОС
        // ---------------------------------------------

        const space =
            createSpace(

                width,
                height,

                new THREE.Vector3(
                    x,
                    y,
                    z
                )

            );


        // ---------------------------------------------
        // РАМА
        // ---------------------------------------------

        const thickness = 0.25;


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
                z + 0.15
            );


            scene.add(
                mesh
            );

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


        // ---------------------------------------------
        // ЦЕНТРАЛЬНАЯ РАМА
        // ---------------------------------------------

        frame(
            thickness,
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


    // =================================================
    // ТРИ ОКНА
    // =================================================

    createWindow(
        -10,
        4,
        -19.75
    );


    createWindow(
        0,
        4,
        -19.75
    );


    createWindow(
        10,
        4,
        -19.75
    );


    // =================================================
    // ДВЕРНАЯ АРКА
    // =================================================

    function createArch(
        x,
        y,
        z
    ) {

        const group =
            new THREE.Group();


        // ---------------------------------------------
        // ПРОСТРАНСТВО ЗА АРКОЙ
        // ---------------------------------------------

        const portal =
            new THREE.Mesh(

                new THREE.PlaneGeometry(
                    5,
                    7
                ),

                new THREE.MeshBasicMaterial({

                    color: 0x101b38,

                    side: THREE.DoubleSide

                })

            );


        portal.position.set(
            x,
            y,
            z
        );


        scene.add(
            portal
        );


        // ---------------------------------------------
        // БОКОВЫЕ СТОЙКИ
        // ---------------------------------------------

        const left =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.45,
                    7,
                    0.5
                ),

                frameMaterial

            );


        left.position.set(
            x - 2.5,
            y,
            z + 0.2
        );


        scene.add(
            left
        );


        const right =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.45,
                    7,
                    0.5
                ),

                frameMaterial

            );


        right.position.set(
            x + 2.5,
            y,
            z + 0.2
        );


        scene.add(
            right
        );


        // ---------------------------------------------
        // ВЕРХ АРКИ
        // ---------------------------------------------

        const top =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    5.45,
                    0.45,
                    0.5
                ),

                frameMaterial

            );


        top.position.set(
            x,
            y + 3.5,
            z + 0.2
        );


        scene.add(
            top
        );


        // ---------------------------------------------
        // ЗВЁЗДЫ ЗА АРКОЙ
        // ---------------------------------------------

        createSpace(

            5,
            7,

            new THREE.Vector3(
                x,
                y,
                z - 0.1
            )

        );


        console.log(
            "PORTAL ARCH CREATED"
        );

    }


    // =================================================
    // АРКА
    // =================================================

    createArch(
        18,
        3.5,
        -19.7
    );


    console.log(
        "ALICIA AI: PORTALS READY"
    );

}
