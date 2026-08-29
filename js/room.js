import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

export function createRoom(scene) {

    console.log("ALICIA AI: ROOM GRAPHICS");

    // ==================================================
    // РАЗМЕР КОМНАТЫ
    // ==================================================

    const WIDTH = 50;
    const DEPTH = 40;
    const HEIGHT = 10;

    const WALL = 0.4;


    // ==================================================
    // СОЗДАНИЕ ПРОЦЕДУРНОЙ ТЕКСТУРЫ
    // ==================================================

    function createTexture(
        baseColor,
        lineColor,
        size = 512,
        grid = 32
    ) {

        const canvas =
            document.createElement("canvas");

        canvas.width = size;
        canvas.height = size;

        const ctx =
            canvas.getContext("2d");


        // Основной цвет

        ctx.fillStyle =
            baseColor;

        ctx.fillRect(
            0,
            0,
            size,
            size
        );


        // Текстурные линии

        ctx.strokeStyle =
            lineColor;

        ctx.lineWidth = 2;


        for (
            let i = 0;
            i <= size;
            i += grid
        ) {

            ctx.beginPath();

            ctx.moveTo(
                i,
                0
            );

            ctx.lineTo(
                i,
                size
            );

            ctx.stroke();


            ctx.beginPath();

            ctx.moveTo(
                0,
                i
            );

            ctx.lineTo(
                size,
                i
            );

            ctx.stroke();

        }


        // Небольшие случайные волокна

        ctx.globalAlpha = 0.18;

        ctx.strokeStyle = "#3b2417";

        for (
            let i = 0;
            i < 120;
            i++
        ) {

            const x =
                Math.random() * size;

            const y =
                Math.random() * size;

            const length =
                20 + Math.random() * 80;


            ctx.beginPath();

            ctx.moveTo(
                x,
                y
            );

            ctx.lineTo(
                x + length,
                y + (Math.random() - 0.5) * 8
            );

            ctx.stroke();

        }

        ctx.globalAlpha = 1;


        const texture =
            new THREE.CanvasTexture(
                canvas
            );


        texture.wrapS =
            THREE.RepeatWrapping;

        texture.wrapT =
            THREE.RepeatWrapping;

        texture.colorSpace =
            THREE.SRGBColorSpace;


        return texture;

    }


    // ==================================================
    // ТЕКСТУРЫ
    // ==================================================

    const floorTexture =
        createTexture(
            "#765238",
            "#513621",
            512,
            64
        );


    floorTexture.repeat.set(
        12,
        10
    );


    const wallTexture =
        createTexture(
            "#b78c64",
            "#8c684a",
            512,
            48
        );


    wallTexture.repeat.set(
        5,
        2
    );


    const ceilingTexture =
        createTexture(
            "#d8c8b5",
            "#c4b39f",
            512,
            128
        );


    ceilingTexture.repeat.set(
        5,
        4
    );


    // ==================================================
    // МАТЕРИАЛЫ
    // ==================================================

    const floorMaterial =
        new THREE.MeshStandardMaterial({

            map: floorTexture,

            roughness: 0.72

        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({

            map: wallTexture,

            roughness: 0.82

        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({

            map: ceilingTexture,

            roughness: 0.95

        });


    const frameMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x4b3020,

            roughness: 0.65

        });


    const glassMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x9ed6e8,

            transparent: true,

            opacity: 0.28,

            roughness: 0.08,

            metalness: 0.05,

            transmission: 0.2

        });


    // ==================================================
    // BOX
    // ==================================================

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


    // ==================================================
    // ПОЛ
    // ==================================================

    createBox(
        WIDTH,
        0.3,
        DEPTH,
        0,
        -0.15,
        0,
        floorMaterial
    );


    // ==================================================
    // ПОТОЛОК
    // ==================================================

    createBox(
        WIDTH,
        0.3,
        DEPTH,
        0,
        HEIGHT,
        0,
        ceilingMaterial
    );


    // ==================================================
    // СТЕНЫ
    // ==================================================

    // BACK

    createBox(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        -DEPTH / 2,
        wallMaterial
    );


    // FRONT

    createBox(
        WIDTH,
        HEIGHT,
        WALL,
        0,
        HEIGHT / 2,
        DEPTH / 2,
        wallMaterial
    );


    // LEFT

    createBox(
        WALL,
        HEIGHT,
        DEPTH,
        -WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );


    // RIGHT

    createBox(
        WALL,
        HEIGHT,
        DEPTH,
        WIDTH / 2,
        HEIGHT / 2,
        0,
        wallMaterial
    );


    // ==================================================
    // ОКНО
    // ==================================================

    function createWindow(
        width,
        height,
        x,
        y,
        z,
        rotationY = 0
    ) {

        const group =
            new THREE.Group();


        // Стекло

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


        // Рама слева

        const left =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.18,
                    height + 0.3,
                    0.28
                ),

                frameMaterial

            );


        left.position.x =
            -width / 2;


        group.add(left);


        // Рама справа

        const right =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.18,
                    height + 0.3,
                    0.28
                ),

                frameMaterial

            );


        right.position.x =
            width / 2;


        group.add(right);


        // Верх

        const top =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width + 0.36,
                    0.18,
                    0.28
                ),

                frameMaterial

            );


        top.position.y =
            height / 2;


        group.add(top);


        // Низ

        const bottom =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    width + 0.36,
                    0.18,
                    0.28
                ),

                frameMaterial

            );


        bottom.position.y =
            -height / 2;


        group.add(bottom);


        // Центральная перемычка

        const middle =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.12,
                    height,
                    0.3
                ),

                frameMaterial

            );


        group.add(middle);


        // Положение

        group.position.set(
            x,
            y,
            z
        );


        group.rotation.y =
            rotationY;


        scene.add(group);


        return group;

    }


    // ==================================================
    // ОКНА НА ЗАДНЕЙ СТЕНЕ
    // ==================================================

    createWindow(
        8,
        4,
        -14,
        4.3,
        -14.72
    );


    createWindow(
        8,
        4,
        0,
        4.3,
        -14.72
    );


    createWindow(
        8,
        4,
        14,
        4.3,
        -14.72
    );


    // ==================================================
    // ОКНА НА ЛЕВОЙ СТЕНЕ
    // ==================================================

    createWindow(
        8,
        4,
        -24.72,
        4.3,
        -8,
        Math.PI / 2
    );


    createWindow(
        8,
        4,
        -24.72,
        4.3,
        5,
        Math.PI / 2
    );


    // ==================================================
    // ОКНА НА ПРАВОЙ СТЕНЕ
    // ==================================================

    createWindow(
        8,
        4,
        24.72,
        4.3,
        -8,
        -Math.PI / 2
    );


    createWindow(
        8,
        4,
        24.72,
        4.3,
        5,
        -Math.PI / 2
    );


    // ==================================================
    // ДЕРЕВЯННЫЕ БАЛКИ
    // ==================================================

    const beamMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x4a2e1d,

            roughness: 0.7

        });


    createBox(
        WIDTH,
        0.3,
        0.3,
        0,
        5.7,
        -10,
        beamMaterial
    );


    createBox(
        WIDTH,
        0.3,
        0.3,
        0,
        5.7,
        0,
        beamMaterial
    );


    createBox(
        WIDTH,
        0.3,
        0.3,
        0,
        5.7,
        10,
        beamMaterial
    );


    // ==================================================
    // ОСВЕЩЕНИЕ
    // ==================================================

    const mainLight =
        new THREE.PointLight(
            0xffdfbd,
            90,
            60
        );


    mainLight.position.set(
        0,
        8,
        0
    );


    mainLight.castShadow =
        true;


    scene.add(
        mainLight
    );


    // ==================================================
    // МЯГКОЕ ОСВЕЩЕНИЕ
    // ==================================================

    const ambient =
        new THREE.HemisphereLight(
            0xffead5,
            0x30251f,
            1.7
        );


    scene.add(
        ambient
    );


    // ==================================================
    // ДАННЫЕ КОМНАТЫ
    // ==================================================

    return {

        width: WIDTH,

        depth: DEPTH,

        height: HEIGHT

    };

}
