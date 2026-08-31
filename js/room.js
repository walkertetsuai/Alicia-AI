import * as THREE
from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ============================================================
// ALICIA ROOM
// v5.1
//
// Interior based on Alicia room references.
// Stable single-scene implementation.
// ============================================================

export function createRoom(
    scene
) {

    // ========================================================
    // ROOM SIZE
    // ========================================================

    const WIDTH =
        10.8;

    const DEPTH =
        8.2;

    const HEIGHT =
        3.25;

    const WALL =
        0.18;


    // ========================================================
    // ARCHITECTURAL OPENINGS
    // ========================================================

    const windowX =
        2.55;

    const windowWidth =
        3.15;

    const windowHeight =
        1.75;

    const windowY =
        2.05;

    const windowZ =
        -DEPTH / 2 +
        0.12;


    const doorX =
        -3.55;

    const doorWidth =
        1.05;

    const doorHeight =
        2.3;

    const doorZ =
        DEPTH / 2 -
        0.13;


    // ========================================================
    // ROOM GROUP
    // ========================================================

    const room =
        new THREE.Group();

    room.name =
        "AliciaBedroom";

    scene.add(
        room
    );


    // ========================================================
    // COLLISION STORAGE
    // ========================================================

    const colliders =
        [];


    function addCollider(
        name,
        minX,
        maxX,
        minZ,
        maxZ,
        enabled = true
    ) {

        const data = {

            name,

            minX,
            maxX,

            minZ,
            maxZ,

            enabled

        };


        colliders.push(
            data
        );


        return data;

    }


    // ========================================================
    // BOX HELPER
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

        const geometry =
            new THREE.BoxGeometry(
                w,
                h,
                d
            );


        const mesh =
            new THREE.Mesh(
                geometry,
                material
            );


        mesh.position.set(
            x,
            y,
            z
        );


        mesh.castShadow =
            cast;


        mesh.receiveShadow =
            receive;


        parent.add(
            mesh
        );


        return mesh;

    }


    // ========================================================
    // CYLINDER HELPER
    // ========================================================

    function cylinder({

        rt,
        rb,
        h,

        x = 0,
        y = 0,
        z = 0,

        segments = 20,

        material,

        parent = room,

        cast = true,
        receive = true

    }) {

        const mesh =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    rt,
                    rb,
                    h,
                    segments
                ),

                material

            );


        mesh.position.set(
            x,
            y,
            z
        );


        mesh.castShadow =
            cast;


        mesh.receiveShadow =
            receive;


        parent.add(
            mesh
        );


        return mesh;

    }


    // ========================================================
    // PROCEDURAL FLOOR TEXTURE
    // ========================================================

    function makeWoodTexture() {

        const canvas =
            document.createElement(
                "canvas"
            );


        canvas.width =
            1024;

        canvas.height =
            1024;


        const ctx =
            canvas.getContext(
                "2d"
            );


        ctx.fillStyle =
            "#b18d67";


        ctx.fillRect(
            0,
            0,
            1024,
            1024
        );


        const plankHeight =
            96;


        for (
            let y = 0;
            y < 1024;
            y += plankHeight
        ) {

            const tone =
                145 +
                Math.random() *
                22;


            ctx.fillStyle =
                `rgb(
                    ${tone + 25},
                    ${tone + 5},
                    ${tone - 20}
                )`;


            ctx.fillRect(
                0,
                y + 2,
                1024,
                plankHeight - 4
            );


            ctx.fillStyle =
                "rgba(66,42,24,0.18)";


            ctx.fillRect(
                0,
                y,
                1024,
                2
            );


            const row =
                Math.floor(
                    y /
                    plankHeight
                );


            const offset =
                row % 2
                    ? 270
                    : 0;


            for (
                let x = offset;
                x < 1024;
                x += 540
            ) {

                ctx.fillRect(
                    x,
                    y,
                    2,
                    plankHeight
                );

            }


            for (
                let i = 0;
                i < 12;
                i++
            ) {

                const grainY =
                    y +
                    Math.random() *
                    plankHeight;


                ctx.beginPath();


                ctx.strokeStyle =
                    `rgba(
                        70,
                        43,
                        22,
                        ${
                            0.03 +
                            Math.random() *
                            0.05
                        }
                    )`;


                ctx.lineWidth =
                    1;


                ctx.moveTo(
                    0,
                    grainY
                );


                ctx.bezierCurveTo(

                    260,

                    grainY +
                    Math.random() *
                    8 -
                    4,

                    760,

                    grainY +
                    Math.random() *
                    8 -
                    4,

                    1024,

                    grainY

                );


                ctx.stroke();

            }

        }


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
            3.2,
            4
        );


        return texture;

    }


    // ========================================================
    // PROCEDURAL FABRIC TEXTURE
    // ========================================================

    function makeFabricTexture(
        baseColor
    ) {

        const canvas =
            document.createElement(
                "canvas"
            );


        canvas.width =
            256;

        canvas.height =
            256;


        const ctx =
            canvas.getContext(
                "2d"
            );


        ctx.fillStyle =
            baseColor;


        ctx.fillRect(
            0,
            0,
            256,
            256
        );


        for (
            let i = 0;
            i < 1800;
            i++
        ) {

            const alpha =
                Math.random() *
                0.045;


            ctx.fillStyle =
                `rgba(
                    255,
                    255,
                    255,
                    ${alpha}
                )`;


            ctx.fillRect(

                Math.random() *
                256,

                Math.random() *
                256,

                1,
                1

            );

        }


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
            4,
            4
        );


        return texture;

    }


    // ========================================================
    // MATERIALS
    // ========================================================

    const floorMaterial =
        new THREE.MeshStandardMaterial({

            map:
                makeWoodTexture(),

            roughness:
                0.78,

            metalness:
                0

        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xd8d0c5,

            roughness:
                0.94

        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xe8e2da,

            roughness:
                0.96

        });


    const whitePaint =
        new THREE.MeshStandardMaterial({

            color:
                0xe9e6df,

            roughness:
                0.8

        });


    const lightWood =
        new THREE.MeshStandardMaterial({

            color:
                0xa17c58,

            roughness:
                0.72

        });


    const darkWood =
        new THREE.MeshStandardMaterial({

            color:
                0x4d392c,

            roughness:
                0.76

        });


    const blackMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x171717,

            roughness:
                0.48

        });


    const darkMetal =
        new THREE.MeshStandardMaterial({

            color:
                0x222426,

            roughness:
                0.32,

            metalness:
                0.72

        });


    const beddingMaterial =
        new THREE.MeshStandardMaterial({

            map:
                makeFabricTexture(
                    "#e6dfd5"
                ),

            roughness:
                0.98

        });


    const blanketMaterial =
        new THREE.MeshStandardMaterial({

            map:
                makeFabricTexture(
                    "#8e867f"
                ),

            color:
                0x928a82,

            roughness:
                1

        });


    const rugMaterial =
        new THREE.MeshStandardMaterial({

            map:
                makeFabricTexture(
                    "#c9baa7"
                ),

            color:
                0xcabdaa,

            roughness:
                1

        });


    const curtainMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xb7aea3,

            roughness:
                1,

            side:
                THREE.DoubleSide

        });


    const greenMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x45684a,

            roughness:
                0.9

        });


    const potMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xb7aca2,

            roughness:
                0.9

        });


    const soilMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x3b2b20,

            roughness:
                1

        });


    const glassMaterial =
        new THREE.MeshPhysicalMaterial({

            color:
                0xbad4dd,

            transparent:
                true,

            opacity:
                0.42,

            transmission:
                0.35,

            roughness:
                0.08,

            thickness:
                0.08

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
    // BACK WALL
    // REAL WINDOW OPENING
    // ========================================================

    const backLeftEdge =
        -WIDTH / 2;


    const backRightEdge =
        WIDTH / 2;


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
            windowLeft -
            backLeftEdge,

        h:
            HEIGHT,

        d:
            WALL,

        x:
            (
                backLeftEdge +
                windowLeft
            ) /
            2,

        y:
            HEIGHT / 2,

        z:
            -DEPTH / 2,

        material:
            wallMaterial

    });


    box({

        w:
            backRightEdge -
            windowRight,

        h:
            HEIGHT,

        d:
            WALL,

        x:
            (
                windowRight +
                backRightEdge
            ) /
            2,

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
            windowBottom /
            2,

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
            ) /
            2,

        z:
            -DEPTH / 2,

        material:
            wallMaterial

    });


    // ========================================================
    // FRONT WALL
    // REAL DOOR OPENING
    // ========================================================

    const frontLeftEdge =
        -WIDTH / 2;


    const frontRightEdge =
        WIDTH / 2;


    const doorLeft =
        doorX -
        doorWidth / 2;


    const doorRight =
        doorX +
        doorWidth / 2;


    box({

        w:
            doorLeft -
            frontLeftEdge,

        h:
            HEIGHT,

        d:
            WALL,

        x:
            (
                frontLeftEdge +
                doorLeft
            ) /
            2,

        y:
            HEIGHT / 2,

        z:
            DEPTH / 2,

        material:
            wallMaterial

    });


    box({

        w:
            frontRightEdge -
            doorRight,

        h:
            HEIGHT,

        d:
            WALL,

        x:
            (
                doorRight +
                frontRightEdge
            ) /
            2,

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
            ) /
            2,

        z:
            DEPTH / 2,

        material:
            wallMaterial

    });


    // ========================================================
    // DARK HALLWAY RECESS
    // ========================================================

    const hallwayMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x4f4b47,

            roughness:
                0.95

        });


    box({

        w:
            doorWidth +
            0.18,

        h:
            0.12,

        d:
            0.75,

        x:
            doorX,

        y:
            -0.04,

        z:
            DEPTH / 2 +
            0.38,

        material:
            floorMaterial

    });


    box({

        w:
            doorWidth +
            0.12,

        h:
            doorHeight,

        d:
            0.05,

        x:
            doorX,

        y:
            doorHeight /
            2,

        z:
            DEPTH / 2 +
            0.76,

        material:
            hallwayMaterial,

        cast:
            false

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


    box({

        w:
            0.055,

        h:
            0.11,

        d:
            DEPTH,

        x:
            -WIDTH / 2 +
            0.13,

        y:
            0.055,

        material:
            whitePaint

    });


    box({

        w:
            0.055,

        h:
            0.11,

        d:
            DEPTH,

        x:
            WIDTH / 2 -
            0.13,

        y:
            0.055,

        material:
            whitePaint

    });


    // ========================================================
    // WINDOW GLASS
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


    // ========================================================
    // WINDOW FRAME
    // ========================================================

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


    // ========================================================
    // WINDOW SILL
    // ========================================================

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
            windowY -
            windowHeight / 2 -
            0.02,

        z:
            windowZ +
            0.16,

        material:
            whitePaint

    });


    // ========================================================
    // CURTAIN RAIL
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


    // ========================================================
    // CURTAINS
    // ========================================================

    function addCurtainCluster(
        startX
    ) {

        for (
            let i = 0;
            i < 9;
            i++
        ) {

            const fold =
                new THREE.Mesh(

                    new THREE.CylinderGeometry(

                        0.055,
                        0.085,
                        2.55,
                        8,
                        1,
                        true

                    ),

                    curtainMaterial

                );


            fold.position.set(

                startX +
                i *
                0.08,

                1.68,

                -DEPTH / 2 +
                0.36 +
                Math.sin(
                    i *
                    1.7
                ) *
                0.035

            );


            fold.scale.x =
                0.65;


            fold.castShadow =
                true;


            room.add(
                fold
            );

        }

    }


    addCurtainCluster(
        windowX -
        2.12
    );


    addCurtainCluster(
        windowX +
        1.48
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
                i *
                0.155,

            y:
                0.4,

            material:
                whitePaint,

            parent:
                radiator

        });

    }


    // ========================================================
    // DESK
    // ========================================================

    const deskX =
        2.55;

    const deskZ =
        -3.15;


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


    function drawerUnit(
        x
    ) {

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

            const y =
                0.19 +
                i *
                0.205;


            box({

                w:
                    0.48,

                h:
                    0.16,

                d:
                    0.03,

                x,

                y,

                z:
                    deskZ +
                    0.355,

                material:
                    darkWood

            });


            box({

                w:
                    0.15,

                h:
                    0.025,

                d:
                    0.035,

                x,

                y,

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
                blackMaterial

        });


    laptopScreen.rotation.x =
        -0.13;


    const screenGlowMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x162a35,

            emissive:
                0x355b70,

            emissiveIntensity:
                0.75,

            roughness:
                0.35

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
            screenGlowMaterial,

        cast:
            false

    });


    // ========================================================
    // DESK LAMP
    // ========================================================

    cylinder({

        rt:
            0.14,

        rb:
            0.17,

        h:
            0.05,

        x:
            deskX -
            0.95,

        y:
            0.88,

        z:
            deskZ,

        material:
            darkMetal

    });


    const lampArm =
        box({

            w:
                0.04,

            h:
                0.55,

            d:
                0.04,

            x:
                deskX -
                0.95,

            y:
                1.16,

            z:
                deskZ,

            material:
                darkMetal

        });


    lampArm.rotation.z =
        -0.18;


    const lampShade =
        new THREE.Mesh(

            new THREE.ConeGeometry(

                0.17,
                0.25,
                20,
                1,
                true

            ),

            darkMetal

        );


    lampShade.position.set(

        deskX -
        0.82,

        1.48,

        deskZ

    );


    lampShade.rotation.z =
        Math.PI / 2;


    lampShade.castShadow =
        true;


    room.add(
        lampShade
    );


    // cup

    cylinder({

        rt:
            0.07,

        rb:
            0.08,

        h:
            0.16,

        x:
            deskX +
            0.72,

        y:
            0.89,

        z:
            deskZ +
            0.18,

        material:
            whitePaint

    });


    // notebook

    box({

        w:
            0.28,

        h:
            0.035,

        d:
            0.2,

        x:
            deskX +
            0.38,

        y:
            0.87,

        z:
            deskZ +
            0.2,

        material:
            darkWood

    });


    // ========================================================
    // OFFICE CHAIR
    // ========================================================

    const chair =
        new THREE.Group();


    chair.position.set(

        deskX,

        0,

        -2.35

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
            0.85,

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


    box({

        w:
            0.075,

        h:
            0.48,

        d:
            0.075,

        y:
            0.27,

        material:
            darkMetal,

        parent:
            chair

    });


    const chairBase =
        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.31,
                0.31,
                0.04,
                5

            ),

            darkMetal

        );


    chairBase.position.y =
        0.05;


    chairBase.castShadow =
        true;


    chair.add(
        chairBase
    );


    addCollider(

        "desk-chair",

        deskX -
        0.38,

        deskX +
        0.38,

        -2.72,

        -1.98

    );


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


        room.add(
            group
        );


        cylinder({

            rt:
                0.22,

            rb:
                0.18,

            h:
                0.34,

            y:
                0.17,

            material:
                potMaterial,

            parent:
                group

        });


        cylinder({

            rt:
                0.18,

            rb:
                0.18,

            h:
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

            const stemHeight =
                0.58 +
                Math.random() *
                0.35;


            const stem =
                box({

                    w:
                        0.025,

                    h:
                        stemHeight,

                    d:
                        0.025,

                    y:
                        0.36 +
                        stemHeight /
                        2,

                    material:
                        greenMaterial,

                    parent:
                        group

                });


            stem.rotation.z =
                (
                    Math.random() -
                    0.5
                ) *
                0.42;


            const leaf =
                new THREE.Mesh(

                    new THREE.SphereGeometry(

                        0.12,
                        10,
                        7

                    ),

                    greenMaterial

                );


            leaf.scale.set(

                1.75,
                0.42,
                0.72

            );


            leaf.position.set(

                (
                    Math.random() -
                    0.5
                ) *
                0.45,

                0.58 +
                Math.random() *
                0.5,

                (
                    Math.random() -
                    0.5
                ) *
                0.28

            );


            leaf.castShadow =
                true;


            group.add(
                leaf
            );

        }


        return group;

    }


    plant(

        windowX +
        1.15,

        0.85,

        deskZ -
        0.05,

        0.38

    );


    plant(

        4.58,

        0,

        -2.55,

        1.05

    );


    addCollider(

        "floor-plant",

        4.25,
        4.9,

        -2.9,
        -2.2

    );


    // ========================================================
    // BED
    // ========================================================

    const bedX =
        -1.65;

    const bedZ =
        0.65;


    // rug

    box({

        w:
            4.1,

        h:
            0.026,

        d:
            5.05,

        x:
            bedX,

        y:
            0.024,

        z:
            bedZ +
            0.32,

        material:
            rugMaterial,

        cast:
            false

    });


    // frame

    box({

        w:
            3,

        h:
            0.32,

        d:
            4.25,

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
            3.94,

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
            1.05,

        d:
            0.13,

        x:
            bedX,

        y:
            0.94,

        z:
            bedZ -
            2.05,

        material:
            lightWood

    });


    // ========================================================
    // PILLOWS
    // ========================================================

    function pillow(
        x,
        z,
        rotation = 0
    ) {

        const mesh =
            new THREE.Mesh(

                new THREE.SphereGeometry(

                    0.55,
                    24,
                    16

                ),

                beddingMaterial

            );


        mesh.scale.set(

            1,
            0.28,
            0.65

        );


        mesh.position.set(
            x,
            0.87,
            z
        );


        mesh.rotation.y =
            rotation;


        mesh.castShadow =
            true;


        mesh.receiveShadow =
            true;


        room.add(
            mesh
        );

    }


    pillow(

        bedX -
        0.67,

        bedZ -
        1.45,

        0.08

    );


    pillow(

        bedX +
        0.62,

        bedZ -
        1.47,

        -0.1

    );


    // ========================================================
    // CRUMPLED FABRIC
    // ========================================================

    function crumpledPlane(

        width,
        depth,

        material,

        x,
        y,
        z,

        amplitude,

        rotationZ = 0

    ) {

        const geometry =
            new THREE.PlaneGeometry(

                width,
                depth,

                28,
                30

            );


        const position =
            geometry
                .attributes
                .position;


        for (
            let i = 0;
            i < position.count;
            i++
        ) {

            const px =
                position.getX(
                    i
                );


            const py =
                position.getY(
                    i
                );


            const wave =

                Math.sin(
                    px *
                    6.2 +
                    py *
                    2.1
                ) *
                amplitude +

                Math.sin(
                    py *
                    7.7
                ) *
                amplitude *
                0.65 +

                Math.sin(
                    px *
                    11.3 -
                    py *
                    3
                ) *
                amplitude *
                0.35;


            position.setZ(
                i,
                wave
            );

        }


        geometry
            .computeVertexNormals();


        const mesh =
            new THREE.Mesh(
                geometry,
                material
            );


        mesh.rotation.x =
            -Math.PI / 2;


        mesh.rotation.z =
            rotationZ;


        mesh.position.set(
            x,
            y,
            z
        );


        mesh.castShadow =
            true;


        mesh.receiveShadow =
            true;


        room.add(
            mesh
        );


        return mesh;

    }


    // duvet

    crumpledPlane(

        2.72,
        2.95,

        beddingMaterial,

        bedX,

        0.73,

        bedZ +
        0.28,

        0.035

    );


    // gray blanket

    crumpledPlane(

        2.65,
        1.15,

        blanketMaterial,

        bedX +
        0.1,

        0.79,

        bedZ +
        0.6,

        0.06,

        -0.12

    );


    addCollider(

        "bed",

        bedX -
        1.57,

        bedX +
        1.57,

        bedZ -
        2.18,

        bedZ +
        2.18

    );


    // ========================================================
    // NIGHT STAND
    // ========================================================

    const nightX =
        -4.05;

    const nightZ =
        -1.05;


    box({

        w:
            0.92,

        h:
            0.66,

        d:
            0.72,

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
                0.72,

            h:
                0.18,

            d:
                0.025,

            x:
                nightX,

            y:
                0.27 +
                i *
                0.24,

            z:
                nightZ +
                0.37,

            material:
                darkWood

        });

    }


    addCollider(

        "nightstand",

        nightX -
        0.52,

        nightX +
        0.52,

        nightZ -
        0.42,

        nightZ +
        0.42

    );


    // ========================================================
    // NIGHT LAMP
    // ========================================================

    cylinder({

        rt:
            0.035,

        rb:
            0.045,

        h:
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


    const nightShadeMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xd8c09d,

            emissive:
                0xffb45e,

            emissiveIntensity:
                0.5,

            roughness:
                0.85,

            side:
                THREE.DoubleSide

        });


    const nightShade =
        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.17,
                0.25,
                0.32,

                20,
                1,
                true

            ),

            nightShadeMaterial

        );


    nightShade.position.set(

        nightX,

        1.07,

        nightZ

    );


    nightShade.castShadow =
        true;


    room.add(
        nightShade
    );


    const bedsideLight =
        new THREE.PointLight(

            0xffb66c,

            6.5,

            4,

            2

        );


    bedsideLight.position.set(

        nightX,

        1.12,

        nightZ

    );


    room.add(
        bedsideLight
    );


    // ========================================================
    // BOOKSHELF
    // ========================================================

    const shelfX =
        -4.78;

    const shelfZ =
        1.75;

    const shelfWidth =
        1.2;

    const shelfHeight =
        2.62;

    const shelfDepth =
        0.42;


    box({

        w:
            shelfWidth,

        h:
            shelfHeight,

        d:
            shelfDepth,

        x:
            shelfX,

        y:
            shelfHeight /
            2,

        z:
            shelfZ,

        material:
            lightWood

    });


    box({

        w:
            shelfWidth -
            0.16,

        h:
            shelfHeight -
            0.15,

        d:
            0.02,

        x:
            shelfX,

        y:
            shelfHeight /
            2,

        z:
            shelfZ +
            shelfDepth /
            2 +
            0.011,

        material:
            darkWood

    });


    const bookColors = [

        0x6f473d,
        0x42546a,
        0x6b6b55,
        0x7a6545,
        0x45443e,
        0x844f43,
        0x52624e

    ];


    for (
        let row = 0;
        row < 5;
        row++
    ) {

        const shelfY =
            0.25 +
            row *
            0.49;


        box({

            w:
                shelfWidth -
                0.08,

            h:
                0.065,

            d:
                shelfDepth +
                0.05,

            x:
                shelfX,

            y:
                shelfY,

            z:
                shelfZ,

            material:
                lightWood

        });


        let cursor =
            shelfX -
            0.46;


        for (
            let book = 0;
            book < 6;
            book++
        ) {

            const width =
                0.09 +
                Math.random() *
                0.055;


            const height =
                0.25 +
                Math.random() *
                0.15;


            const bookMaterial =
                new THREE.MeshStandardMaterial({

                    color:
                        bookColors[
                            (
                                row *
                                6 +
                                book
                            ) %
                            bookColors.length
                        ],

                    roughness:
                        0.82

                });


            box({

                w:
                    width,

                h:
                    height,

                d:
                    0.24,

                x:
                    cursor,

                y:
                    shelfY +
                    height /
                    2 +
                    0.04,

                z:
                    shelfZ +
                    0.19,

                material:
                    bookMaterial

            });


            cursor +=
                width +
                0.035;

        }

    }


    addCollider(

        "bookshelf",

        shelfX -
        shelfWidth /
        2 -
        0.08,

        shelfX +
        shelfWidth /
        2 +
        0.08,

        shelfZ -
        shelfDepth /
        2 -
        0.08,

        shelfZ +
        shelfDepth /
        2 +
        0.08

    );


    // ========================================================
    // DRESSER
    // ========================================================

    const dresserX =
        3.9;

    const dresserZ =
        3.48;


    box({

        w:
            2.35,

        h:
            0.8,

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
        let column = 0;
        column < 3;
        column++
    ) {

        for (
            let row = 0;
            row < 2;
            row++
        ) {

            const x =
                dresserX -
                0.75 +
                column *
                0.75;


            const y =
                0.23 +
                row *
                0.34;


            box({

                w:
                    0.66,

                h:
                    0.25,

                d:
                    0.03,

                x,

                y,

                z:
                    dresserZ -
                    0.326,

                material:
                    darkWood

            });


            box({

                w:
                    0.13,

                h:
                    0.025,

                d:
                    0.045,

                x,

                y,

                z:
                    dresserZ -
                    0.365,

                material:
                    darkMetal

            });

        }

    }


    addCollider(

        "dresser",

        dresserX -
        1.25,

        dresserX +
        1.25,

        dresserZ -
        0.39,

        dresserZ +
        0.39

    );


    // ========================================================
    // TELEVISION
    // ========================================================

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
            blackMaterial

    });


    const tvScreenMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x07090a,

            roughness:
                0.15,

            metalness:
                0.15

        });


    box({

        w:
            1.63,

        h:
            0.88,

        d:
            0.015,

        x:
            1.7,

        y:
            1.75,

        z:
            DEPTH / 2 -
            0.1,

        material:
            tvScreenMaterial,

        cast:
            false

    });


    // TV cabinet

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

        "tv-unit",

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

            color:
                0x706c68,

            roughness:
                1

        });


    const beanBag =
        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.72,
                26,
                18

            ),

            beanMaterial

        );


    beanBag.scale.set(

        1.15,
        0.75,
        1.05

    );


    beanBag.position.set(

        4.05,

        0.53,

        1.35

    );


    beanBag.castShadow =
        true;


    beanBag.receiveShadow =
        true;


    room.add(
        beanBag
    );


    addCollider(

        "beanbag",

        3.25,
        4.85,

        0.6,
        2.1

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
        new THREE.MeshStandardMaterial({

            color:
                0xaab4b7,

            roughness:
                0.12,

            metalness:
                0.7

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
    // WALL SHELF
    // ========================================================

    box({

        w:
            1.45,

        h:
            0.075,

        d:
            0.26,

        x:
            -4.45,

        y:
            2.45,

        z:
            -3.92,

        material:
            lightWood

    });


    plant(

        -4.75,

        2.48,

        -3.85,

        0.34

    );


    // ========================================================
    // WALL ART
    // ========================================================

    function picture(

        x,
        y,
        z,

        width,
        height,

        color

    ) {

        box({

            w:
                width +
                0.07,

            h:
                height +
                0.07,

            d:
                0.035,

            x,
            y,
            z,

            material:
                darkWood,

            cast:
                false

        });


        const artworkMaterial =
            new THREE.MeshStandardMaterial({

                color,

                roughness:
                    0.9

            });


        box({

            w:
                width,

            h:
                height,

            d:
                0.012,

            x,
            y,

            z:
                z -
                0.025,

            material:
                artworkMaterial,

            cast:
                false

        });

    }


    picture(

        -4.3,
        1.85,
        -3.92,

        0.42,
        0.58,

        0x87938b

    );


    picture(

        -3.72,
        1.7,
        -3.92,

        0.27,
        0.35,

        0xb1a38d

    );


    picture(

        4.1,
        1.8,
        4,

        0.6,
        0.82,

        0x808889

    );


    // ========================================================
    // DOOR FRAME
    // ========================================================

    box({

        w:
            doorWidth +
            0.19,

        h:
            0.1,

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
            0.1,

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
            0.1,

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


    // ========================================================
    // DOOR HINGE GROUP
    // ========================================================

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
            doorWidth /
            2,

        y:
            doorHeight /
            2,

        z:
            0,

        material:
            whitePaint,

        parent:
            doorHinge

    });


    const panelMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xd5d2cc,

            roughness:
                0.82

        });


    for (
        const panelY
        of [
            0.48,
            1.1,
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
                doorWidth /
                2,

            y:
                panelY,

            z:
                -0.052,

            material:
                panelMaterial,

            parent:
                doorHinge

        });

    }


    const handle =
        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.045,
                14,
                10

            ),

            darkMetal

        );


    handle.position.set(

        doorWidth -
        0.16,

        1.08,

        -0.075

    );


    handle.castShadow =
        true;


    doorHinge.add(
        handle
    );


    // ========================================================
    // DOOR COLLISION
    // ========================================================

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


    let doorOpen =
        false;


    let doorRotation =
        0;


    let targetDoorRotation =
        0;


    // ========================================================
    // CEILING LIGHT FIXTURE
    // ========================================================

    const ceilingFixture =
        new THREE.Group();


    ceilingFixture.position.set(

        0,

        HEIGHT -
        0.1,

        0

    );


    room.add(
        ceilingFixture
    );


    cylinder({

        rt:
            0.31,

        rb:
            0.31,

        h:
            0.1,

        material:
            darkMetal,

        parent:
            ceilingFixture

    });


    const diffuserMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xe8dfce,

            emissive:
                0xffcc8a,

            emissiveIntensity:
                0.55,

            roughness:
                0.45

        });


    cylinder({

        rt:
            0.27,

        rb:
            0.29,

        h:
            0.075,

        y:
            -0.08,

        material:
            diffuserMaterial,

        parent:
            ceilingFixture

    });


    // ========================================================
    // LIGHTING
    // ========================================================

    const hemisphere =
        new THREE.HemisphereLight(

            0xe8eff3,

            0x51443b,

            1.45

        );


    scene.add(
        hemisphere
    );


    const ceilingLight =
        new THREE.PointLight(

            0xffd0a0,

            16,

            12,

            1.8

        );


    ceilingLight.position.set(

        0,

        2.82,

        0

    );


    ceilingLight.castShadow =
        true;


    ceilingLight.shadow.mapSize.set(

        1024,
        1024

    );


    ceilingLight.shadow.bias =
        -0.0007;


    scene.add(
        ceilingLight
    );


    // ========================================================
    // SUNLIGHT
    // ========================================================

    const sunlight =
        new THREE.DirectionalLight(

            0xffe3bc,

            2.2

        );


    sunlight.position.set(

        5,

        5.5,

        -8

    );


    sunlight.target.position.set(

        -1.2,

        0.5,

        1.2

    );


    sunlight.castShadow =
        true;


    sunlight.shadow.mapSize.set(

        1024,
        1024

    );


    sunlight.shadow.camera.left =
        -7;


    sunlight.shadow.camera.right =
        7;


    sunlight.shadow.camera.top =
        7;


    sunlight.shadow.camera.bottom =
        -7;


    scene.add(
        sunlight
    );


    scene.add(
        sunlight.target
    );


    // ========================================================
    // WINDOW FILL LIGHT
    // ========================================================

    const windowFill =
        new THREE.PointLight(

            0xdceeff,

            8.5,

            8.5,

            1.8

        );


    windowFill.position.set(

        windowX,

        2,

        -3.45

    );


    scene.add(
        windowFill
    );


    // ========================================================
    // INTERACTION
    // ========================================================

    const interactLabel =
        document.getElementById(
            "interact"
        );


    function lookingAtDoor(
        camera
    ) {

        const target =
            new THREE.Vector3(

                doorX,

                1.15,

                doorZ

            );


        const distance =
            camera
                .position
                .distanceTo(
                    target
                );


        if (
            distance >
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


    function interact(
        camera
    ) {

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

                ? -Math.PI *
                    0.48

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
    // ROOM BOUNDS
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


    // ========================================================
    // API
    // ========================================================

    console.log(
        "✅ Alicia Room v5.1 loaded"
    );


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
