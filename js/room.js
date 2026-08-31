import * as THREE
from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ============================================================
// ALICIA ROOM v5.4
//
// • Bed against wall opposite the door
// • 3 bookcases along left wall
// • Detailed procedural PBR texture pack
// • Real window opening
// • Interactive door
// • Furniture collisions
// ============================================================

export function createRoom(scene) {

    // ========================================================
    // ROOM
    // ========================================================

    const WIDTH = 10.8;
    const DEPTH = 8.2;
    const HEIGHT = 3.25;
    const WALL = 0.18;


    // ========================================================
    // WINDOW
    // ========================================================

    const windowX = 2.55;
    const windowWidth = 3.15;
    const windowHeight = 1.75;
    const windowY = 2.05;
    const windowZ = -DEPTH / 2 + 0.12;


    // ========================================================
    // DOOR
    // ========================================================

    const doorX = -3.55;
    const doorWidth = 1.05;
    const doorHeight = 2.30;
    const doorZ = DEPTH / 2 - 0.13;


    // ========================================================
    // ROOT
    // ========================================================

    const room = new THREE.Group();

    room.name = "AliciaBedroom";

    scene.add(room);


    // ========================================================
    // COLLIDERS
    // ========================================================

    const colliders = [];


    function addCollider(
        name,
        minX,
        maxX,
        minZ,
        maxZ,
        enabled = true
    ) {

        const c = {

            name,

            minX,
            maxX,

            minZ,
            maxZ,

            enabled

        };


        colliders.push(c);

        return c;

    }


    // ========================================================
    // GEOMETRY HELPERS
    // ========================================================

    function box({

        w,
        h,
        d,

        x = 0,
        y = 0,
        z = 0,

        material,

        parent = room,

        cast = true,
        receive = true

    }) {

        const mesh = new THREE.Mesh(

            new THREE.BoxGeometry(
                w,
                h,
                d
            ),

            material

        );


        mesh.position.set(
            x,
            y,
            z
        );


        mesh.castShadow = cast;
        mesh.receiveShadow = receive;


        parent.add(mesh);

        return mesh;

    }


    function cylinder({

        top,
        bottom,
        height,

        x = 0,
        y = 0,
        z = 0,

        segments = 24,

        material,

        parent = room

    }) {

        const mesh = new THREE.Mesh(

            new THREE.CylinderGeometry(

                top,
                bottom,
                height,
                segments

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


        parent.add(mesh);

        return mesh;

    }


    // ========================================================
    // TEXTURE HELPER
    // ========================================================

    function canvasTexture(
        canvas,
        repeatX = 1,
        repeatY = 1
    ) {

        const texture =
            new THREE.CanvasTexture(
                canvas
            );


        texture.colorSpace =
            THREE.SRGBColorSpace;


        texture.wrapS =
            THREE.RepeatWrapping;


        texture.wrapT =
            THREE.RepeatWrapping;


        texture.repeat.set(
            repeatX,
            repeatY
        );


        texture.anisotropy = 16;


        return texture;

    }


    // ========================================================
    // OAK FLOOR
    // ========================================================

    function createFloorTexture() {

        const canvas =
            document.createElement("canvas");


        canvas.width = 2048;
        canvas.height = 2048;


        const ctx =
            canvas.getContext("2d");


        ctx.fillStyle = "#a77e53";

        ctx.fillRect(
            0,
            0,
            2048,
            2048
        );


        const plankHeight = 150;


        for (
            let y = 0;
            y < 2048;
            y += plankHeight
        ) {

            const row =
                Math.floor(
                    y / plankHeight
                );


            const base =
                145 +
                Math.random() * 24;


            ctx.fillStyle =
                `rgb(
                    ${base + 38},
                    ${base + 12},
                    ${base - 22}
                )`;


            ctx.fillRect(

                0,

                y + 3,

                2048,

                plankHeight - 6

            );


            // dark seam

            ctx.fillStyle =
                "rgba(45,25,12,0.36)";


            ctx.fillRect(
                0,
                y,
                2048,
                3
            );


            // alternating joints

            const offset =
                row % 2 === 0
                    ? 0
                    : 520;


            for (
                let x = offset;
                x < 2048;
                x += 980
            ) {

                ctx.fillRect(
                    x,
                    y,
                    3,
                    plankHeight
                );

            }


            // fine grain

            for (
                let i = 0;
                i < 48;
                i++
            ) {

                const yy =
                    y +
                    Math.random() *
                    plankHeight;


                ctx.beginPath();


                ctx.strokeStyle =
                    `rgba(
                        61,
                        36,
                        18,
                        ${
                            0.025 +
                            Math.random() *
                            0.075
                        }
                    )`;


                ctx.lineWidth =
                    0.8 +
                    Math.random() *
                    1.4;


                ctx.moveTo(
                    0,
                    yy
                );


                ctx.bezierCurveTo(

                    450,

                    yy +
                    (
                        Math.random() -
                        0.5
                    ) * 14,

                    1400,

                    yy +
                    (
                        Math.random() -
                        0.5
                    ) * 16,

                    2048,

                    yy

                );


                ctx.stroke();

            }


            // knots

            if (
                Math.random() >
                0.45
            ) {

                const knotX =
                    250 +
                    Math.random() *
                    1500;


                const knotY =
                    y +
                    30 +
                    Math.random() *
                    80;


                ctx.strokeStyle =
                    "rgba(55,30,15,0.15)";


                for (
                    let k = 0;
                    k < 4;
                    k++
                ) {

                    ctx.beginPath();


                    ctx.ellipse(

                        knotX,

                        knotY,

                        20 + k * 8,

                        7 + k * 3,

                        0,

                        0,

                        Math.PI * 2

                    );


                    ctx.stroke();

                }

            }

        }


        return canvasTexture(
            canvas,
            3.7,
            4.7
        );

    }


    // ========================================================
    // WOOD FURNITURE
    // ========================================================

    function createFurnitureWood(
        baseColor,
        grainColor
    ) {

        const canvas =
            document.createElement("canvas");


        canvas.width = 1024;
        canvas.height = 1024;


        const ctx =
            canvas.getContext("2d");


        ctx.fillStyle =
            baseColor;


        ctx.fillRect(
            0,
            0,
            1024,
            1024
        );


        for (
            let i = 0;
            i < 180;
            i++
        ) {

            const y =
                Math.random() *
                1024;


            ctx.beginPath();


            ctx.strokeStyle =
                grainColor;


            ctx.globalAlpha =
                0.03 +
                Math.random() *
                0.07;


            ctx.lineWidth =
                0.5 +
                Math.random() *
                1.5;


            ctx.moveTo(
                0,
                y
            );


            ctx.bezierCurveTo(

                250,

                y +
                (
                    Math.random() -
                    0.5
                ) * 18,

                750,

                y +
                (
                    Math.random() -
                    0.5
                ) * 20,

                1024,

                y

            );


            ctx.stroke();

        }


        ctx.globalAlpha = 1;


        return canvasTexture(
            canvas,
            2,
            2
        );

    }


    // ========================================================
    // WALL PLASTER
    // ========================================================

    function createWallTexture() {

        const canvas =
            document.createElement("canvas");


        canvas.width = 1024;
        canvas.height = 1024;


        const ctx =
            canvas.getContext("2d");


        ctx.fillStyle =
            "#d8d0c5";


        ctx.fillRect(
            0,
            0,
            1024,
            1024
        );


        for (
            let i = 0;
            i < 4500;
            i++
        ) {

            const gray =
                Math.random() >
                0.5
                    ? 255
                    : 70;


            ctx.fillStyle =
                `rgba(
                    ${gray},
                    ${gray},
                    ${gray},
                    ${0.008 + Math.random() * 0.018}
                )`;


            const size =
                0.5 +
                Math.random() *
                2;


            ctx.fillRect(

                Math.random() *
                1024,

                Math.random() *
                1024,

                size,

                size

            );

        }


        return canvasTexture(
            canvas,
            4,
            4
        );

    }


    // ========================================================
    // FABRIC TEXTURE
    // ========================================================

    function createFabricTexture(
        background,
        lightLine,
        darkLine
    ) {

        const canvas =
            document.createElement("canvas");


        canvas.width = 1024;
        canvas.height = 1024;


        const ctx =
            canvas.getContext("2d");


        ctx.fillStyle =
            background;


        ctx.fillRect(
            0,
            0,
            1024,
            1024
        );


        for (
            let i = 0;
            i < 1024;
            i += 5
        ) {

            ctx.strokeStyle =
                lightLine;


            ctx.globalAlpha =
                0.075;


            ctx.beginPath();

            ctx.moveTo(
                i,
                0
            );

            ctx.lineTo(
                i,
                1024
            );

            ctx.stroke();


            ctx.strokeStyle =
                darkLine;


            ctx.globalAlpha =
                0.055;


            ctx.beginPath();

            ctx.moveTo(
                0,
                i
            );

            ctx.lineTo(
                1024,
                i
            );

            ctx.stroke();

        }


        ctx.globalAlpha = 1;


        return canvasTexture(
            canvas,
            6,
            6
        );

    }


    // ========================================================
    // ROUGH / BUMP NOISE
    // ========================================================

    function createNoiseMap(
        size = 512,
        contrast = 35
    ) {

        const canvas =
            document.createElement("canvas");


        canvas.width = size;
        canvas.height = size;


        const ctx =
            canvas.getContext("2d");


        const image =
            ctx.createImageData(
                size,
                size
            );


        for (
            let i = 0;
            i < image.data.length;
            i += 4
        ) {

            const v =
                128 +
                (
                    Math.random() -
                    0.5
                ) *
                contrast;


            image.data[i] = v;
            image.data[i + 1] = v;
            image.data[i + 2] = v;
            image.data[i + 3] = 255;

        }


        ctx.putImageData(
            image,
            0,
            0
        );


        return canvasTexture(
            canvas,
            7,
            7
        );

    }


    // ========================================================
    // TEXTURE PACK
    // ========================================================

    const floorTexture =
        createFloorTexture();


    const oakTexture =
        createFurnitureWood(

            "#9f7752",

            "#432817"

        );


    const walnutTexture =
        createFurnitureWood(

            "#49372b",

            "#1f1510"

        );


    const wallTexture =
        createWallTexture();


    const whiteFabricTexture =
        createFabricTexture(

            "#e5ded5",

            "#ffffff",

            "#766d65"

        );


    const grayFabricTexture =
        createFabricTexture(

            "#817a73",

            "#ffffff",

            "#292624"

        );


    const curtainTexture =
        createFabricTexture(

            "#b5aca1",

            "#ffffff",

            "#58514b"

        );


    const rugTexture =
        createFabricTexture(

            "#c5b7a4",

            "#ffffff",

            "#716455"

        );


    const fineBump =
        createNoiseMap(
            512,
            26
        );


    const fabricBump =
        createNoiseMap(
            512,
            55
        );


    // ========================================================
    // MATERIALS
    // ========================================================

    const floorMaterial =
        new THREE.MeshPhysicalMaterial({

            map:
                floorTexture,

            roughness:
                0.62,

            metalness:
                0,

            bumpMap:
                fineBump,

            bumpScale:
                0.012,

            clearcoat:
                0.14,

            clearcoatRoughness:
                0.72

        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({

            map:
                wallTexture,

            roughness:
                0.94,

            bumpMap:
                fineBump,

            bumpScale:
                0.005

        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xe7e1d9,

            roughness:
                0.96,

            bumpMap:
                fineBump,

            bumpScale:
                0.003

        });


    const whitePaint =
        new THREE.MeshStandardMaterial({

            color:
                0xeeeae3,

            roughness:
                0.75,

            bumpMap:
                fineBump,

            bumpScale:
                0.0015

        });


    const lightWood =
        new THREE.MeshPhysicalMaterial({

            map:
                oakTexture,

            roughness:
                0.58,

            bumpMap:
                fineBump,

            bumpScale:
                0.007,

            clearcoat:
                0.08,

            clearcoatRoughness:
                0.8

        });


    const darkWood =
        new THREE.MeshPhysicalMaterial({

            map:
                walnutTexture,

            roughness:
                0.64,

            bumpMap:
                fineBump,

            bumpScale:
                0.007,

            clearcoat:
                0.06,

            clearcoatRoughness:
                0.85

        });


    const darkMetal =
        new THREE.MeshStandardMaterial({

            color:
                0x242629,

            roughness:
                0.28,

            metalness:
                0.82

        });


    const blackMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x171719,

            roughness:
                0.48,

            bumpMap:
                fabricBump,

            bumpScale:
                0.005

        });


    const beddingMaterial =
        new THREE.MeshStandardMaterial({

            map:
                whiteFabricTexture,

            roughness:
                0.96,

            bumpMap:
                fabricBump,

            bumpScale:
                0.012

        });


    const blanketMaterial =
        new THREE.MeshStandardMaterial({

            map:
                grayFabricTexture,

            roughness:
                1,

            bumpMap:
                fabricBump,

            bumpScale:
                0.025

        });


    const curtainMaterial =
        new THREE.MeshStandardMaterial({

            map:
                curtainTexture,

            roughness:
                1,

            bumpMap:
                fabricBump,

            bumpScale:
                0.016,

            side:
                THREE.DoubleSide

        });


    const rugMaterial =
        new THREE.MeshStandardMaterial({

            map:
                rugTexture,

            roughness:
                1,

            bumpMap:
                fabricBump,

            bumpScale:
                0.025

        });


    const glassMaterial =
        new THREE.MeshPhysicalMaterial({

            color:
                0xd8edf1,

            transmission:
                0.42,

            transparent:
                true,

            opacity:
                0.48,

            roughness:
                0.08,

            thickness:
                0.12

        });


    const plantMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x41654a,

            roughness:
                0.88

        });


    const soilMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x33241b,

            roughness:
                1

        });


    const potMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xb3aaa0,

            roughness:
                0.88,

            bumpMap:
                fineBump,

            bumpScale:
                0.006

        });


    // ========================================================
    // FLOOR
    // ========================================================

    box({

        w:
            WIDTH,

        h:
            0.18,

        d:
            DEPTH,

        y:
            -0.09,

        material:
            floorMaterial

    });


    // ========================================================
    // CEILING
    // ========================================================

    box({

        w:
            WIDTH,

        h:
            0.14,

        d:
            DEPTH,

        y:
            HEIGHT +
            0.07,

        material:
            ceilingMaterial

    });


    // ========================================================
    // SIDE WALLS
    // ========================================================

    box({

        w:
            WALL,

        h:
            HEIGHT,

        d:
            DEPTH,

        x:
            -WIDTH / 2,

        y:
            HEIGHT / 2,

        material:
            wallMaterial

    });


    box({

        w:
            WALL,

        h:
            HEIGHT,

        d:
            DEPTH,

        x:
            WIDTH / 2,

        y:
            HEIGHT / 2,

        material:
            wallMaterial

    });


    // ========================================================
    // BACK WALL WITH WINDOW
    // ========================================================

    const windowLeft =
        windowX -
        windowWidth / 2;


    const windowRight =
        windowX +
        windowWidth / 2;


    const windowBottom =
        windowY -
        windowHeight / 2;


    const windowTop =
        windowY +
        windowHeight / 2;


    box({

        w:
            windowLeft +
            WIDTH / 2,

        h:
            HEIGHT,

        d:
            WALL,

        x:
            (
                -WIDTH / 2 +
                windowLeft
            ) / 2,

        y:
            HEIGHT / 2,

        z:
            -DEPTH / 2,

        material:
            wallMaterial

    });


    box({

        w:
            WIDTH / 2 -
            windowRight,

        h:
            HEIGHT,

        d:
            WALL,

        x:
            (
                windowRight +
                WIDTH / 2
            ) / 2,

        y:
            HEIGHT / 2,

        z:
            -DEPTH / 2,

        material:
            wallMaterial

    });


    box({

        w:
            windowWidth,

        h:
            windowBottom,

        d:
            WALL,

        x:
            windowX,

        y:
            windowBottom / 2,

        z:
            -DEPTH / 2,

        material:
            wallMaterial

    });


    box({

        w:
            windowWidth,

        h:
            HEIGHT -
            windowTop,

        d:
            WALL,

        x:
            windowX,

        y:
            windowTop +
            (
                HEIGHT -
                windowTop
            ) / 2,

        z:
            -DEPTH / 2,

        material:
            wallMaterial

    });


    // ========================================================
    // FRONT WALL WITH DOOR
    // ========================================================

    const doorLeft =
        doorX -
        doorWidth / 2;


    const doorRight =
        doorX +
        doorWidth / 2;


    box({

        w:
            doorLeft +
            WIDTH / 2,

        h:
            HEIGHT,

        d:
            WALL,

        x:
            (
                -WIDTH / 2 +
                doorLeft
            ) / 2,

        y:
            HEIGHT / 2,

        z:
            DEPTH / 2,

        material:
            wallMaterial

    });


    box({

        w:
            WIDTH / 2 -
            doorRight,

        h:
            HEIGHT,

        d:
            WALL,

        x:
            (
                doorRight +
                WIDTH / 2
            ) / 2,

        y:
            HEIGHT / 2,

        z:
            DEPTH / 2,

        material:
            wallMaterial

    });


    box({

        w:
            doorWidth,

        h:
            HEIGHT -
            doorHeight,

        d:
            WALL,

        x:
            doorX,

        y:
            doorHeight +
            (
                HEIGHT -
                doorHeight
            ) / 2,

        z:
            DEPTH / 2,

        material:
            wallMaterial

    });


    // ========================================================
    // BASEBOARDS
    // ========================================================

    box({

        w:
            WIDTH -
            0.25,

        h:
            0.11,

        d:
            0.055,

        y:
            0.055,

        z:
            -DEPTH / 2 +
            0.13,

        material:
            whitePaint

    });


    box({

        w:
            WIDTH -
            0.25,

        h:
            0.11,

        d:
            0.055,

        y:
            0.055,

        z:
            DEPTH / 2 -
            0.13,

        material:
            whitePaint

    });


    // ========================================================
    // WINDOW
    // ========================================================

    box({

        w:
            windowWidth,

        h:
            windowHeight,

        d:
            0.04,

        x:
            windowX,

        y:
            windowY,

        z:
            windowZ,

        material:
            glassMaterial,

        cast:
            false

    });


    // frame

    box({

        w:
            windowWidth +
            0.18,

        h:
            0.075,

        d:
            0.11,

        x:
            windowX,

        y:
            windowY +
            windowHeight / 2,

        z:
            windowZ +
            0.04,

        material:
            whitePaint

    });


    box({

        w:
            windowWidth +
            0.18,

        h:
            0.075,

        d:
            0.11,

        x:
            windowX,

        y:
            windowY -
            windowHeight / 2,

        z:
            windowZ +
            0.04,

        material:
            whitePaint

    });


    box({

        w:
            0.075,

        h:
            windowHeight,

        d:
            0.11,

        x:
            windowX -
            windowWidth / 2,

        y:
            windowY,

        z:
            windowZ +
            0.04,

        material:
            whitePaint

    });


    box({

        w:
            0.075,

        h:
            windowHeight,

        d:
            0.11,

        x:
            windowX +
            windowWidth / 2,

        y:
            windowY,

        z:
            windowZ +
            0.04,

        material:
            whitePaint

    });


    box({

        w:
            0.055,

        h:
            windowHeight,

        d:
            0.12,

        x:
            windowX,

        y:
            windowY,

        z:
            windowZ +
            0.05,

        material:
            whitePaint

    });


    // sill

    box({

        w:
            windowWidth +
            0.36,

        h:
            0.09,

        d:
            0.38,

        x:
            windowX,

        y:
            windowBottom -
            0.02,

        z:
            windowZ +
            0.16,

        material:
            whitePaint

    });


    // ========================================================
    // CURTAINS
    // ========================================================

    box({

        w:
            windowWidth +
            1.25,

        h:
            0.045,

        d:
            0.045,

        x:
            windowX,

        y:
            3.03,

        z:
            -DEPTH / 2 +
            0.42,

        material:
            darkMetal

    });


    function curtainCluster(
        startX
    ) {

        for (
            let i = 0;
            i < 10;
            i++
        ) {

            const fold =
                new THREE.Mesh(

                    new THREE.CylinderGeometry(

                        0.052,

                        0.078,

                        2.55,

                        10,

                        1,

                        true

                    ),

                    curtainMaterial

                );


            fold.position.set(

                startX +
                i * 0.075,

                1.68,

                -DEPTH / 2 +
                0.36 +
                Math.sin(
                    i * 1.5
                ) *
                0.035

            );


            fold.scale.x = 0.7;


            fold.castShadow = true;


            room.add(
                fold
            );

        }

    }


    curtainCluster(
        windowX -
        2.14
    );


    curtainCluster(
        windowX +
        1.45
    );


    // ========================================================
    // RADIATOR
    // ========================================================

    const radiator =
        new THREE.Group();


    radiator.position.set(

        windowX,

        0.12,

        -DEPTH / 2 +
        0.29

    );


    room.add(
        radiator
    );


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        box({

            w:
                0.13,

            h:
                0.8,

            d:
                0.14,

            x:
                -0.86 +
                i * 0.155,

            y:
                0.4,

            material:
                whitePaint,

            parent:
                radiator

        });

    }


    // ========================================================
    // DESK UNDER WINDOW
    // ========================================================

    const deskX = 2.55;
    const deskZ = -3.15;


    box({

        w:
            3.05,

        h:
            0.095,

        d:
            0.82,

        x:
            deskX,

        y:
            0.79,

        z:
            deskZ,

        material:
            lightWood

    });


    function drawerUnit(x) {

        box({

            w:
                0.58,

            h:
                0.68,

            d:
                0.68,

            x,

            y:
                0.35,

            z:
                deskZ,

            material:
                lightWood

        });


        for (
            let i = 0;
            i < 3;
            i++
        ) {

            const yy =
                0.19 +
                i * 0.205;


            box({

                w:
                    0.48,

                h:
                    0.16,

                d:
                    0.025,

                x,

                y:
                    yy,

                z:
                    deskZ +
                    0.355,

                material:
                    darkWood

            });


            box({

                w:
                    0.16,

                h:
                    0.022,

                d:
                    0.035,

                x,

                y:
                    yy,

                z:
                    deskZ +
                    0.385,

                material:
                    darkMetal

            });

        }

    }


    drawerUnit(
        deskX -
        1.18
    );


    drawerUnit(
        deskX +
        1.18
    );


    addCollider(

        "desk",

        deskX -
        1.57,

        deskX +
        1.57,

        deskZ -
        0.47,

        deskZ +
        0.47

    );


    // ========================================================
    // LAPTOP
    // ========================================================

    box({

        w:
            0.75,

        h:
            0.035,

        d:
            0.48,

        x:
            deskX,

        y:
            0.87,

        z:
            deskZ,

        material:
            darkMetal

    });


    const laptopScreen =
        box({

            w:
                0.75,

            h:
                0.46,

            d:
                0.035,

            x:
                deskX,

            y:
                1.12,

            z:
                deskZ -
                0.21,

            material:
                darkMetal

        });


    laptopScreen.rotation.x =
        -0.13;


    const screenMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x14212b,

            emissive:
                0x29506b,

            emissiveIntensity:
                0.85,

            roughness:
                0.3

        });


    box({

        w:
            0.67,

        h:
            0.38,

        d:
            0.012,

        x:
            deskX,

        y:
            1.12,

        z:
            deskZ -
            0.235,

        material:
            screenMaterial,

        cast:
            false

    });


    // ========================================================
    // OFFICE CHAIR
    // ========================================================

    const chair =
        new THREE.Group();


    chair.position.set(
        deskX,
        0,
        -2.28
    );


    room.add(
        chair
    );


    box({

        w:
            0.62,

        h:
            0.11,

        d:
            0.58,

        y:
            0.54,

        material:
            blackMaterial,

        parent:
            chair

    });


    box({

        w:
            0.62,

        h:
            0.84,

        d:
            0.095,

        y:
            1,

        z:
            0.25,

        material:
            blackMaterial,

        parent:
            chair

    });


    addCollider(

        "desk-chair",

        deskX -
        0.38,

        deskX +
        0.38,

        -2.68,

        -1.92

    );


    // ========================================================
    // BED
    // HEADBOARD AGAINST WALL OPPOSITE DOOR
    // ========================================================

    const bedX = -2.60;

    // Headboard becomes approximately z = -3.95
    const bedZ = -1.88;


    const bedWidth = 3;
    const bedDepth = 4.05;


    // rug under bed

    box({

        w:
            3.75,

        h:
            0.028,

        d:
            4.95,

        x:
            bedX,

        y:
            0.026,

        z:
            bedZ +
            0.35,

        material:
            rugMaterial,

        cast:
            false

    });


    // wooden base

    box({

        w:
            bedWidth,

        h:
            0.32,

        d:
            bedDepth,

        x:
            bedX,

        y:
            0.31,

        z:
            bedZ,

        material:
            lightWood

    });


    // mattress

    box({

        w:
            2.84,

        h:
            0.28,

        d:
            3.82,

        x:
            bedX,

        y:
            0.57,

        z:
            bedZ,

        material:
            beddingMaterial

    });


    // headboard

    box({

        w:
            3.05,

        h:
            1.08,

        d:
            0.14,

        x:
            bedX,

        y:
            0.96,

        z:
            -3.91,

        material:
            lightWood

    });


    // ========================================================
    // PILLOWS
    // ========================================================

    function pillow(
        x,
        z,
        rotation
    ) {

        const mesh =
            new THREE.Mesh(

                new THREE.SphereGeometry(

                    0.56,

                    28,

                    18

                ),

                beddingMaterial

            );


        mesh.scale.set(

            1,

            0.28,

            0.64

        );


        mesh.position.set(

            x,

            0.87,

            z

        );


        mesh.rotation.y =
            rotation;


        mesh.castShadow = true;
        mesh.receiveShadow = true;


        room.add(mesh);

    }


    pillow(

        bedX -
        0.67,

        -3.35,

        0.08

    );


    pillow(

        bedX +
        0.65,

        -3.36,

        -0.09

    );


    // ========================================================
    // CRUMPLED FABRIC
    // ========================================================

    function crumpledFabric({

        width,

        length,

        x,

        y,

        z,

        material,

        amplitude = 0.04,

        rotation = 0

    }) {

        const geometry =
            new THREE.PlaneGeometry(

                width,

                length,

                34,

                40

            );


        const positions =
            geometry
                .attributes
                .position;


        for (
            let i = 0;
            i < positions.count;
            i++
        ) {

            const px =
                positions.getX(i);


            const py =
                positions.getY(i);


            const wave =

                Math.sin(
                    px * 5.4 +
                    py * 2.2
                ) *
                amplitude +

                Math.sin(
                    py * 8.3
                ) *
                amplitude *
                0.48 +

                Math.sin(
                    px * 11.7 -
                    py * 3.1
                ) *
                amplitude *
                0.32;


            positions.setZ(
                i,
                wave
            );

        }


        geometry.computeVertexNormals();


        const mesh =
            new THREE.Mesh(

                geometry,

                material

            );


        mesh.rotation.x =
            -Math.PI / 2;


        mesh.rotation.z =
            rotation;


        mesh.position.set(
            x,
            y,
            z
        );


        mesh.castShadow = true;
        mesh.receiveShadow = true;


        room.add(mesh);

        return mesh;

    }


    // white duvet

    crumpledFabric({

        width:
            2.72,

        length:
            2.95,

        x:
            bedX,

        y:
            0.74,

        z:
            bedZ +
            0.18,

        material:
            beddingMaterial,

        amplitude:
            0.045

    });


    // gray throw

    crumpledFabric({

        width:
            2.65,

        length:
            1.22,

        x:
            bedX,

        y:
            0.80,

        z:
            bedZ +
            0.65,

        material:
            blanketMaterial,

        amplitude:
            0.07,

        rotation:
            -0.08

    });


    addCollider(

        "bed",

        bedX -
        1.57,

        bedX +
        1.57,

        bedZ -
        2.10,

        bedZ +
        2.10

    );


    // ========================================================
    // BEDSIDE TABLE
    // ========================================================

    const nightX =
        -0.62;


    const nightZ =
        -3.20;


    box({

        w:
            0.86,

        h:
            0.66,

        d:
            0.68,

        x:
            nightX,

        y:
            0.34,

        z:
            nightZ,

        material:
            lightWood

    });


    for (
        let i = 0;
        i < 2;
        i++
    ) {

        box({

            w:
                0.68,

            h:
                0.17,

            d:
                0.025,

            x:
                nightX,

            y:
                0.27 +
                i * 0.24,

            z:
                nightZ +
                0.35,

            material:
                darkWood

        });

    }


    addCollider(

        "nightstand",

        nightX -
        0.48,

        nightX +
        0.48,

        nightZ -
        0.4,

        nightZ +
        0.4

    );


    // bedside lamp

    cylinder({

        top:
            0.035,

        bottom:
            0.045,

        height:
            0.3,

        x:
            nightX,

        y:
            0.83,

        z:
            nightZ,

        material:
            darkMetal

    });


    const lampShadeMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xd7c4a5,

            emissive:
                0xffbd72,

            emissiveIntensity:
                0.48,

            roughness:
                0.86,

            side:
                THREE.DoubleSide

        });


    const lampShade =
        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.16,

                0.23,

                0.31,

                24,

                1,

                true

            ),

            lampShadeMaterial

        );


    lampShade.position.set(

        nightX,

        1.07,

        nightZ

    );


    room.add(lampShade);


    const bedLight =
        new THREE.PointLight(

            0xffb36b,

            7,

            4,

            2

        );


    bedLight.position.set(

        nightX,

        1.12,

        nightZ

    );


    scene.add(bedLight);


    // ========================================================
    // BOOKCASES
    // ========================================================

    function createBookcase(
        worldZ
    ) {

        const group =
            new THREE.Group();


        // Against LEFT wall.
        // Rotated 90 degrees.

        group.position.set(

            -WIDTH / 2 +
            0.30,

            0,

            worldZ

        );


        group.rotation.y =
            Math.PI / 2;


        room.add(group);


        const shelfWidth = 1.30;
        const shelfHeight = 2.60;
        const shelfDepth = 0.42;


        // body

        box({

            w:
                shelfWidth,

            h:
                shelfHeight,

            d:
                shelfDepth,

            y:
                shelfHeight / 2,

            material:
                lightWood,

            parent:
                group

        });


        // darker inner back

        box({

            w:
                shelfWidth -
                0.15,

            h:
                shelfHeight -
                0.14,

            d:
                0.025,

            y:
                shelfHeight / 2,

            z:
                shelfDepth / 2 +
                0.012,

            material:
                darkWood,

            parent:
                group

        });


        const bookColors = [

            0x724b3f,
            0x384b62,
            0x77755e,
            0x816548,
            0x3e413d,
            0x864c44,
            0x4e6250,
            0x6d586d,
            0x796f58

        ];


        for (
            let row = 0;
            row < 5;
            row++
        ) {

            const shelfY =
                0.24 +
                row * 0.49;


            box({

                w:
                    shelfWidth -
                    0.07,

                h:
                    0.06,

                d:
                    shelfDepth +
                    0.04,

                y:
                    shelfY,

                material:
                    lightWood,

                parent:
                    group

            });


            let cursor =
                -0.52;


            for (
                let b = 0;
                b < 8;
                b++
            ) {

                const bookWidth =
                    0.07 +
                    Math.random() *
                    0.045;


                const bookHeight =
                    0.24 +
                    Math.random() *
                    0.16;


                const bookMaterial =
                    new THREE.MeshStandardMaterial({

                        color:
                            bookColors[
                                (
                                    row * 8 +
                                    b
                                ) %
                                bookColors.length
                            ],

                        roughness:
                            0.82

                    });


                const book =
                    box({

                        w:
                            bookWidth,

                        h:
                            bookHeight,

                        d:
                            0.24,

                        x:
                            cursor,

                        y:
                            shelfY +
                            bookHeight / 2 +
                            0.04,

                        z:
                            shelfDepth / 2 +
                            0.015,

                        material:
                            bookMaterial,

                        parent:
                            group

                    });


                book.rotation.z =
                    (
                        Math.random() -
                        0.5
                    ) *
                    0.05;


                cursor +=
                    bookWidth +
                    0.025;

            }

        }


        addCollider(

            `bookshelf-${worldZ}`,

            -WIDTH / 2 +
            0.02,

            -WIDTH / 2 +
            0.62,

            worldZ -
            0.72,

            worldZ +
            0.72

        );

    }


    // Three cabinets together

    createBookcase(
        3.15
    );


    createBookcase(
        1.72
    );


    createBookcase(
        0.29
    );


    // ========================================================
    // DRESSER
    // ========================================================

    const dresserX =
        4.08;


    const dresserZ =
        3.46;


    box({

        w:
            2.15,

        h:
            0.80,

        d:
            0.62,

        x:
            dresserX,

        y:
            0.4,

        z:
            dresserZ,

        material:
            lightWood

    });


    for (
        let col = 0;
        col < 3;
        col++
    ) {

        for (
            let row = 0;
            row < 2;
            row++
        ) {

            const xx =
                dresserX -
                0.68 +
                col * 0.68;


            const yy =
                0.23 +
                row * 0.34;


            box({

                w:
                    0.59,

                h:
                    0.25,

                d:
                    0.025,

                x:
                    xx,

                y:
                    yy,

                z:
                    dresserZ -
                    0.325,

                material:
                    darkWood

            });


            box({

                w:
                    0.13,

                h:
                    0.022,

                d:
                    0.04,

                x:
                    xx,

                y:
                    yy,

                z:
                    dresserZ -
                    0.36,

                material:
                    darkMetal

            });

        }

    }


    addCollider(

        "dresser",

        dresserX -
        1.15,

        dresserX +
        1.15,

        dresserZ -
        0.38,

        dresserZ +
        0.38

    );


    // ========================================================
    // TV
    // ========================================================

    const tvMaterial =
        new THREE.MeshPhysicalMaterial({

            color:
                0x060708,

            roughness:
                0.1,

            metalness:
                0.2,

            clearcoat:
                0.7,

            clearcoatRoughness:
                0.15

        });


    box({

        w:
            1.75,

        h:
            1,

        d:
            0.065,

        x:
            1.7,

        y:
            1.75,

        z:
            DEPTH / 2 -
            0.14,

        material:
            darkMetal

    });


    box({

        w:
            1.63,

        h:
            0.88,

        d:
            0.012,

        x:
            1.7,

        y:
            1.75,

        z:
            DEPTH / 2 -
            0.095,

        material:
            tvMaterial,

        cast:
            false

    });


    // TV console

    box({

        w:
            2.65,

        h:
            0.5,

        d:
            0.52,

        x:
            1.7,

        y:
            0.25,

        z:
            3.66,

        material:
            lightWood

    });


    addCollider(

        "tv-console",

        0.3,

        3.1,

        3.31,

        4

    );


    // ========================================================
    // BEAN BAG
    // ========================================================

    const beanMaterial =
        new THREE.MeshStandardMaterial({

            map:
                grayFabricTexture,

            roughness:
                1,

            bumpMap:
                fabricBump,

            bumpScale:
                0.018

        });


    const bean =
        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.72,

                34,

                24

            ),

            beanMaterial

        );


    bean.scale.set(

        1.15,

        0.75,

        1.05

    );


    bean.position.set(

        4.05,

        0.53,

        1.25

    );


    bean.castShadow = true;
    bean.receiveShadow = true;


    room.add(bean);


    addCollider(

        "beanbag",

        3.25,

        4.85,

        0.52,

        2.0

    );


    // ========================================================
    // FLOOR MIRROR
    // ========================================================

    box({

        w:
            0.82,

        h:
            2.05,

        d:
            0.075,

        x:
            0.55,

        y:
            1.15,

        z:
            -3.92,

        material:
            darkWood

    });


    const mirrorMaterial =
        new THREE.MeshPhysicalMaterial({

            color:
                0xaeb7ba,

            roughness:
                0.06,

            metalness:
                0.85,

            clearcoat:
                0.45

        });


    box({

        w:
            0.71,

        h:
            1.92,

        d:
            0.015,

        x:
            0.55,

        y:
            1.15,

        z:
            -3.87,

        material:
            mirrorMaterial,

        cast:
            false

    });


    // ========================================================
    // PLANTS
    // ========================================================

    function plant(
        x,
        y,
        z,
        scale = 1
    ) {

        const group =
            new THREE.Group();


        group.position.set(
            x,
            y,
            z
        );


        group.scale.setScalar(
            scale
        );


        room.add(group);


        cylinder({

            top:
                0.21,

            bottom:
                0.18,

            height:
                0.33,

            y:
                0.165,

            material:
                potMaterial,

            parent:
                group

        });


        cylinder({

            top:
                0.17,

            bottom:
                0.17,

            height:
                0.025,

            y:
                0.34,

            material:
                soilMaterial,

            parent:
                group

        });


        for (
            let i = 0;
            i < 10;
            i++
        ) {

            const leaf =
                new THREE.Mesh(

                    new THREE.SphereGeometry(

                        0.12,

                        12,

                        8

                    ),

                    plantMaterial

                );


            leaf.scale.set(

                1.8,

                0.42,

                0.70

            );


            const angle =
                (
                    i /
                    10
                ) *
                Math.PI *
                2;


            leaf.position.set(

                Math.cos(angle) *
                (
                    0.13 +
                    Math.random() *
                    0.20
                ),

                0.55 +
                Math.random() *
                0.50,

                Math.sin(angle) *
                (
                    0.13 +
                    Math.random() *
                    0.18
                )

            );


            leaf.rotation.z =
                (
                    Math.random() -
                    0.5
                ) *
                0.8;


            leaf.castShadow = true;


            group.add(leaf);

        }


        return group;

    }


    plant(

        windowX +
        1.18,

        0.85,

        deskZ -
        0.02,

        0.38

    );


    plant(

        4.65,

        0,

        -2.45,

        1

    );


    addCollider(

        "plant",

        4.3,

        5,

        -2.85,

        -2.05

    );


    // ========================================================
    // DOOR
    // ========================================================

    box({

        w:
            doorWidth +
            0.19,

        h:
            0.10,

        d:
            0.12,

        x:
            doorX,

        y:
            doorHeight +
            0.05,

        z:
            doorZ,

        material:
            whitePaint

    });


    box({

        w:
            0.10,

        h:
            doorHeight,

        d:
            0.12,

        x:
            doorX -
            doorWidth / 2 -
            0.05,

        y:
            doorHeight / 2,

        z:
            doorZ,

        material:
            whitePaint

    });


    box({

        w:
            0.10,

        h:
            doorHeight,

        d:
            0.12,

        x:
            doorX +
            doorWidth / 2 +
            0.05,

        y:
            doorHeight / 2,

        z:
            doorZ,

        material:
            whitePaint

    });


    const doorHinge =
        new THREE.Group();


    doorHinge.position.set(

        doorX -
        doorWidth / 2,

        0,

        doorZ

    );


    room.add(
        doorHinge
    );


    box({

        w:
            doorWidth,

        h:
            doorHeight,

        d:
            0.08,

        x:
            doorWidth / 2,

        y:
            doorHeight / 2,

        material:
            whitePaint,

        parent:
            doorHinge

    });


    const doorPanelMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xd9d5ce,

            roughness:
                0.76,

            bumpMap:
                fineBump,

            bumpScale:
                0.002

        });


    for (
        const yy
        of [
            0.48,
            1.10,
            1.72
        ]
    ) {

        box({

            w:
                0.75,

            h:
                0.46,

            d:
                0.025,

            x:
                doorWidth / 2,

            y:
                yy,

            z:
                -0.052,

            material:
                doorPanelMaterial,

            parent:
                doorHinge

        });

    }


    const handle =
        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.045,

                18,

                14

            ),

            darkMetal

        );


    handle.position.set(

        doorWidth -
        0.16,

        1.08,

        -0.075

    );


    doorHinge.add(handle);


    const doorCollider =
        addCollider(

            "door",

            doorX -
            doorWidth / 2,

            doorX +
            doorWidth / 2,

            doorZ -
            0.18,

            doorZ +
            0.18

        );


    let doorOpen = false;

    let doorRotation = 0;

    let targetDoorRotation = 0;


    // ========================================================
    // CEILING LIGHT
    // ========================================================

    const fixture =
        new THREE.Group();


    fixture.position.set(

        0,

        HEIGHT -
        0.10,

        0

    );


    room.add(fixture);


    cylinder({

        top:
            0.31,

        bottom:
            0.31,

        height:
            0.10,

        material:
            darkMetal,

        parent:
            fixture

    });


    const diffuser =
        new THREE.MeshStandardMaterial({

            color:
                0xeee5d5,

            emissive:
                0xffc77d,

            emissiveIntensity:
                0.55,

            roughness:
                0.45

        });


    cylinder({

        top:
            0.27,

        bottom:
            0.29,

        height:
            0.075,

        y:
            -0.08,

        material:
            diffuser,

        parent:
            fixture

    });


    // ========================================================
    // LIGHT
    // ========================================================

    const hemisphere =
        new THREE.HemisphereLight(

            0xe6eef2,

            0x4a3e35,

            1.30

        );


    scene.add(hemisphere);


    const ceilingLight =
        new THREE.PointLight(

            0xffd1a1,

            15,

            12,

            1.8

        );


    ceilingLight.position.set(

        0,

        2.82,

        0

    );


    ceilingLight.castShadow = true;


    ceilingLight.shadow.mapSize.set(

        1024,

        1024

    );


    ceilingLight.shadow.bias =
        -0.0007;


    scene.add(
        ceilingLight
    );


    // sunlight

    const sunlight =
        new THREE.DirectionalLight(

            0xffdfb4,

            2.35

        );


    sunlight.position.set(

        5.2,

        5.6,

        -8

    );


    sunlight.target.position.set(

        -1.5,

        0.55,

        0.6

    );


    sunlight.castShadow = true;


    sunlight.shadow.mapSize.set(

        1536,

        1536

    );


    sunlight.shadow.camera.left = -7;
    sunlight.shadow.camera.right = 7;
    sunlight.shadow.camera.top = 7;
    sunlight.shadow.camera.bottom = -7;


    scene.add(sunlight);
    scene.add(sunlight.target);


    const windowFill =
        new THREE.PointLight(

            0xd9edff,

            7.5,

            8.5,

            1.8

        );


    windowFill.position.set(

        windowX,

        2,

        -3.45

    );


    scene.add(windowFill);


    // ========================================================
    // DOOR INTERACTION
    // ========================================================

    const interactLabel =
        document.getElementById(
            "interact"
        );


    function lookingAtDoor(camera) {

        const target =
            new THREE.Vector3(

                doorX,

                1.15,

                doorZ

            );


        if (
            camera.position.distanceTo(
                target
            ) >
            2.25
        ) {

            return false;

        }


        const forward =
            new THREE.Vector3();


        camera.getWorldDirection(
            forward
        );


        const toDoor =
            target
                .clone()
                .sub(
                    camera.position
                )
                .normalize();


        return (
            forward.dot(
                toDoor
            ) >
            0.72
        );

    }


    function interact(camera) {

        if (
            !lookingAtDoor(
                camera
            )
        ) {

            return;

        }


        doorOpen =
            !doorOpen;


        targetDoorRotation =
            doorOpen
                ? -Math.PI * 0.48
                : 0;


        if (
            doorOpen
        ) {

            doorCollider.enabled =
                false;

        }

    }


    // ========================================================
    // UPDATE
    // ========================================================

    function update(
        delta,
        camera
    ) {

        doorRotation =
            THREE.MathUtils.damp(

                doorRotation,

                targetDoorRotation,

                6,

                delta

            );


        doorHinge.rotation.y =
            doorRotation;


        if (
            !doorOpen &&
            Math.abs(
                doorRotation
            ) <
            0.04
        ) {

            doorCollider.enabled =
                true;

        }


        if (
            interactLabel
        ) {

            if (
                lookingAtDoor(
                    camera
                )
            ) {

                interactLabel.textContent =
                    doorOpen
                        ? "E — закрыть дверь"
                        : "E — открыть дверь";


                interactLabel
                    .classList
                    .add(
                        "visible"
                    );

            }

            else {

                interactLabel
                    .classList
                    .remove(
                        "visible"
                    );

            }

        }

    }


    // ========================================================
    // WORLD BOUNDS
    // ========================================================

    const bounds = {

        minX:
            -WIDTH / 2 +
            0.24,

        maxX:
            WIDTH / 2 -
            0.24,

        minZ:
            -DEPTH / 2 +
            0.24,

        maxZ:
            DEPTH / 2 -
            0.24

    };


    console.log(
        "✅ Alicia Room v5.4 — PBR texture pack loaded"
    );


    // ========================================================
    // API
    // ========================================================

    return {

        width:
            WIDTH,

        depth:
            DEPTH,

        height:
            HEIGHT,

        bounds,


        getColliders() {

            return colliders;

        },


        interact,

        update

    };

}
