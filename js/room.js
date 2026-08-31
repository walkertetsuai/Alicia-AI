import * as THREE
from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ============================================================
// ALICIA ROOM
// PHOTOGRAPH REFERENCE BUILD
// ============================================================

export function createRoom(
    scene
) {

    // ========================================================
    // ROOM DIMENSIONS
    // ========================================================

    const WIDTH =
        10.8;

    const DEPTH =
        8.2;

    const HEIGHT =
        3.25;

    const WALL =
        0.18;


    const room =
        new THREE.Group();

    room.name =
        "AliciaBedroom";

    scene.add(
        room
    );


    // ========================================================
    // COLLIDERS
    // ========================================================

    const colliders = [];


    function collider({

        minX,
        maxX,
        minZ,
        maxZ,

        enabled = true,

        name = ""

    }) {

        const data = {

            minX,
            maxX,
            minZ,
            maxZ,

            enabled,
            name

        };


        colliders.push(
            data
        );


        return data;

    }


    // ========================================================
    // PROCEDURAL WOOD FLOOR
    // ========================================================

    function createWoodTexture() {

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
            "#b28e67";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        const plankHeight =
            96;


        for (
            let y = 0;
            y < 1024;
            y += plankHeight
        ) {

            const base =
                150 +
                Math.random() * 22;


            ctx.fillStyle =
                `rgb(
                    ${base + 18},
                    ${base},
                    ${base - 25}
                )`;


            ctx.fillRect(
                0,
                y + 2,
                1024,
                plankHeight - 4
            );


            ctx.fillStyle =
                "rgba(65,40,20,.17)";

            ctx.fillRect(
                0,
                y,
                1024,
                2
            );


            const offset =
                (
                    Math.floor(
                        y / plankHeight
                    ) %
                    2
                ) *
                260;


            for (
                let x = offset;
                x < 1024;
                x += 520
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
                i < 14;
                i++
            ) {

                const gy =
                    y +
                    Math.random() *
                    plankHeight;


                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(
                        80,
                        50,
                        25,
                        ${0.025 + Math.random() * 0.06}
                    )`;

                ctx.lineWidth =
                    1;


                ctx.moveTo(
                    0,
                    gy
                );


                ctx.bezierCurveTo(

                    280,
                    gy + Math.random() * 7,

                    700,
                    gy - Math.random() * 7,

                    1024,
                    gy

                );


                ctx.stroke();

            }

        }


        const texture =
            new THREE.CanvasTexture(
                canvas
            );


        texture.wrapS =
            THREE.RepeatWrapping;

        texture.wrapT =
            THREE.RepeatWrapping;


        texture.repeat.set(
            3.4,
            4
        );


        texture.colorSpace =
            THREE.SRGBColorSpace;


        return texture;

    }


    // ========================================================
    // FABRIC TEXTURE
    // ========================================================

    function createFabricTexture(
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
            i < 2200;
            i++
        ) {

            const alpha =
                Math.random() *
                0.05;


            ctx.fillStyle =
                `rgba(
                    255,
                    255,
                    255,
                    ${alpha}
                )`;


            ctx.fillRect(

                Math.random() * 256,

                Math.random() * 256,

                1,

                1

            );

        }


        const texture =
            new THREE.CanvasTexture(
                canvas
            );


        texture.wrapS =
            THREE.RepeatWrapping;

        texture.wrapT =
            THREE.RepeatWrapping;


        texture.repeat.set(
            4,
            4
        );


        texture.colorSpace =
            THREE.SRGBColorSpace;


        return texture;

    }


    // ========================================================
    // MATERIALS
    // ========================================================

    const woodFloor =
        createWoodTexture();


    const whiteFabric =
        createFabricTexture(
            "#e5dfd4"
        );


    const grayFabric =
        createFabricTexture(
            "#8e867e"
        );


    const rugFabric =
        createFabricTexture(
            "#c6b8a5"
        );


    const floorMat =
        new THREE.MeshStandardMaterial({

            map:
                woodFloor,

            roughness:
                0.77,

            metalness:
                0

        });


    const wallMat =
        new THREE.MeshStandardMaterial({

            color:
                0xd7d0c6,

            roughness:
                0.93

        });


    const ceilingMat =
        new THREE.MeshStandardMaterial({

            color:
                0xe7e2da,

            roughness:
                0.96

        });


    const whitePaint =
        new THREE.MeshStandardMaterial({

            color:
                0xe9e6df,

            roughness:
                0.78

        });


    const lightWood =
        new THREE.MeshStandardMaterial({

            color:
                0x9a7653,

            roughness:
                0.72

        });


    const darkWood =
        new THREE.MeshStandardMaterial({

            color:
                0x4c392b,

            roughness:
                0.76

        });


    const blackMat =
        new THREE.MeshStandardMaterial({

            color:
                0x171717,

            roughness:
                0.48

        });


    const darkMetal =
        new THREE.MeshStandardMaterial({

            color:
                0x222324,

            roughness:
                0.3,

            metalness:
                0.72

        });


    const brass =
        new THREE.MeshStandardMaterial({

            color:
                0xa77e49,

            roughness:
                0.32,

            metalness:
                0.75

        });


    const bedFabric =
        new THREE.MeshStandardMaterial({

            map:
                whiteFabric,

            roughness:
                0.96

        });


    const blanketMat =
        new THREE.MeshStandardMaterial({

            map:
                grayFabric,

            color:
                0x928a81,

            roughness:
                1

        });


    const rugMat =
        new THREE.MeshStandardMaterial({

            map:
                rugFabric,

            color:
                0xc9bca8,

            roughness:
                1

        });


    const curtainMat =
        new THREE.MeshStandardMaterial({

            color:
                0xb8afa3,

            roughness:
                1,

            side:
                THREE.DoubleSide

        });


    const greenMat =
        new THREE.MeshStandardMaterial({

            color:
                0x416347,

            roughness:
                0.88

        });


    const soilMat =
        new THREE.MeshStandardMaterial({

            color:
                0x39291e,

            roughness:
                1

        });


    const potMat =
        new THREE.MeshStandardMaterial({

            color:
                0xb5aaa0,

            roughness:
                0.9

        });


    const glassMat =
        new THREE.MeshPhysicalMaterial({

            color:
                0xb9d5dc,

            transmission:
                0.5,

            transparent:
                true,

            opacity:
                0.48,

            roughness:
                0.08,

            thickness:
                0.12

        });


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

        cast = true,
        receive = true,

        parent = room

    }) {

        const mesh =
            new THREE.Mesh(

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
            floorMat

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
            ceilingMat

    });


    // ========================================================
    // WALLS
    // ========================================================

    box({

        w:
            WIDTH,

        h:
            HEIGHT,

        d:
            WALL,

        y:
            HEIGHT / 2,

        z:
            -DEPTH / 2,

        material:
            wallMat

    });


    box({

        w:
            WIDTH,

        h:
            HEIGHT,

        d:
            WALL,

        y:
            HEIGHT / 2,

        z:
            DEPTH / 2,

        material:
            wallMat

    });


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
            wallMat

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
            wallMat

    });


    // ========================================================
    // SKIRTING
    // ========================================================

    const skirting =
        0.11;


    box({

        w:
            WIDTH - 0.25,

        h:
            skirting,

        d:
            0.055,

        y:
            skirting / 2,

        z:
            -DEPTH / 2 +
            0.13,

        material:
            whitePaint

    });


    box({

        w:
            WIDTH - 0.25,

        h:
            skirting,

        d:
            0.055,

        y:
            skirting / 2,

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
            skirting,

        d:
            DEPTH,

        x:
            -WIDTH / 2 +
            0.13,

        y:
            skirting / 2,

        material:
            whitePaint

    });


    box({

        w:
            0.055,

        h:
            skirting,

        d:
            DEPTH,

        x:
            WIDTH / 2 -
            0.13,

        y:
            skirting / 2,

        material:
            whitePaint

    });


    // ========================================================
    // WINDOW
    // ========================================================

    const windowX =
        2.55;

    const windowZ =
        -DEPTH / 2 +
        0.12;

    const windowWidth =
        3.15;

    const windowHeight =
        1.75;

    const windowY =
        2.05;


    box({

        w:
            windowWidth,

        h:
            windowHeight,

        d:
            0.045,

        x:
            windowX,

        y:
            windowY,

        z:
            windowZ,

        material:
            glassMat,

        cast:
            false

    });


    const frameSize =
        0.075;


    box({

        w:
            windowWidth +
            0.18,

        h:
            frameSize,

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
            frameSize,

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
            frameSize,

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
            frameSize,

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
    // CURTAIN FOLDS
    // ========================================================

    function curtain(
        startX,
        width
    ) {

        const foldCount =
            9;


        for (
            let i = 0;
            i < foldCount;
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

                    curtainMat

                );


            fold.position.set(

                startX +
                (
                    i /
                    (foldCount - 1)
                ) *
                width,

                1.68,

                -DEPTH / 2 +
                0.36 +
                Math.sin(i * 1.7) *
                0.04

            );


            fold.scale.x =
                0.65;


            room.add(
                fold
            );

        }

    }


    curtain(
        windowX -
        2.12,
        0.65
    );


    curtain(
        windowX +
        1.47,
        0.65
    );


    // ========================================================
    // RADIATOR
    // ========================================================

    const radiator =
        new THREE.Group();


    radiator.position.set(

        windowX,

        0.54,

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

            material:
                whitePaint,

            parent:
                radiator

        });

    }


    // ========================================================
    // WORK DESK
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


    // drawer units

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

            box({

                w:
                    0.48,

                h:
                    0.16,

                d:
                    0.03,

                x,

                y:
                    0.19 +
                    i * 0.205,

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

                y:
                    0.19 +
                    i * 0.205,

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


    collider({

        minX:
            deskX -
            1.57,

        maxX:
            deskX +
            1.57,

        minZ:
            deskZ -
            0.47,

        maxZ:
            deskZ +
            0.47,

        name:
            "desk"

    });


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
                blackMat

        });


    laptopScreen.rotation.x =
        -0.13;


    // screen glow

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
            0.232,

        material:
            new THREE.MeshStandardMaterial({

                color:
                    0x192a34,

                emissive:
                    0x35546a,

                emissiveIntensity:
                    0.6

            })

    });


    // ========================================================
    // DESK LAMP
    // ========================================================

    const lampBase =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.14,
                0.17,
                0.05,
                20
            ),

            darkMetal

        );


    lampBase.position.set(

        deskX -
        0.95,

        0.88,

        deskZ

    );


    room.add(
        lampBase
    );


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


    room.add(
        lampShade
    );


    // ========================================================
    // DESK CHAIR
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
            blackMat,

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
            blackMat,

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

    chair.add(
        chairBase
    );


    collider({

        minX:
            deskX - 0.38,

        maxX:
            deskX + 0.38,

        minZ:
            -2.72,

        maxZ:
            -1.98,

        name:
            "desk-chair"

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


        room.add(
            group
        );


        const pot =
            new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.22,
                    0.18,
                    0.34,
                    18

                ),

                potMat

            );


        pot.position.y =
            0.17;

        group.add(
            pot
        );


        const soil =
            new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.18,
                    0.18,
                    0.025,
                    18

                ),

                soilMat

            );


        soil.position.y =
            0.34;

        group.add(
            soil
        );


        for (
            let i = 0;
            i < 9;
            i++
        ) {

            const stem =
                box({

                    w:
                        0.025,

                    h:
                        0.62 +
                        Math.random() *
                        0.35,

                    d:
                        0.025,

                    y:
                        0.63,

                    material:
                        greenMat,

                    parent:
                        group

                });


            stem.rotation.z =
                (
                    Math.random() -
                    0.5
                ) *
                0.4;


            const leaf =
                new THREE.Mesh(

                    new THREE.SphereGeometry(
                        0.12,
                        10,
                        7
                    ),

                    greenMat

                );


            leaf.scale.set(
                1.8,
                0.45,
                0.7
            );


            leaf.position.set(

                (
                    Math.random() -
                    0.5
                ) *
                0.45,

                0.65 +
                Math.random() *
                0.5,

                (
                    Math.random() -
                    0.5
                ) *
                0.3

            );


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


    collider({

        minX:
            4.25,

        maxX:
            4.9,

        minZ:
            -2.9,

        maxZ:
            -2.2,

        name:
            "plant"

    });


    // ========================================================
    // BED
    // ========================================================

    const bedX =
        -1.65;

    const bedZ =
        0.65;


    // frame

    box({

        w:
            3.0,

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

    const mattress =
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
                bedFabric

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
                    22,
                    14
                ),

                bedFabric

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
        bedX - 0.67,
        bedZ - 1.45,
        0.1
    );


    pillow(
        bedX + 0.62,
        bedZ - 1.47,
        -0.12
    );


    // ========================================================
    // DUVET
    // ========================================================

    const duvetGeometry =
        new THREE.PlaneGeometry(
            2.72,
            2.95,
            26,
            32
        );


    const duvetPositions =
        duvetGeometry
            .attributes
            .position;


    for (
        let i = 0;
        i < duvetPositions.count;
        i++
    ) {

        const x =
            duvetPositions.getX(
                i
            );


        const y =
            duvetPositions.getY(
                i
            );


        const ripple =

            Math.sin(
                x * 6.2 +
                y * 2.1
            ) * 0.035 +

            Math.sin(
                y * 7.7
            ) * 0.022 +

            Math.sin(
                x * 11.3 -
                y * 3
            ) * 0.012;


        duvetPositions.setZ(
            i,
            ripple
        );

    }


    duvetGeometry
        .computeVertexNormals();


    const duvet =
        new THREE.Mesh(

            duvetGeometry,

            bedFabric

        );


    duvet.rotation.x =
        -Math.PI / 2;


    duvet.position.set(

        bedX,

        0.73,

        bedZ +
        0.28

    );


    duvet.castShadow =
        true;

    duvet.receiveShadow =
        true;


    room.add(
        duvet
    );


    // ========================================================
    // CRUMPLED GRAY THROW
    // ========================================================

    const throwGeometry =
        new THREE.PlaneGeometry(
            2.65,
            1.15,
            22,
            12
        );


    const throwPos =
        throwGeometry
            .attributes
            .position;


    for (
        let i = 0;
        i < throwPos.count;
        i++
    ) {

        const x =
            throwPos.getX(i);

        const y =
            throwPos.getY(i);


        throwPos.setZ(

            i,

            Math.sin(
                x * 7 +
                y * 5
            ) *
            0.06 +

            Math.sin(
                x * 15
            ) *
            0.025

        );

    }


    throwGeometry
        .computeVertexNormals();


    const throwBlanket =
        new THREE.Mesh(

            throwGeometry,

            blanketMat

        );


    throwBlanket.rotation.x =
        -Math.PI / 2;


    throwBlanket.rotation.z =
        -0.12;


    throwBlanket.position.set(

        bedX +
        0.1,

        0.79,

        bedZ +
        0.6

    );


    throwBlanket.castShadow =
        true;


    room.add(
        throwBlanket
    );


    collider({

        minX:
            bedX - 1.57,

        maxX:
            bedX + 1.57,

        minZ:
            bedZ - 2.18,

        maxZ:
            bedZ + 2.18,

        name:
            "bed"

    });


    // ========================================================
    // RUG
    // ========================================================

    const rug =
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
                rugMat,

            cast:
                false

        });


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
                i * 0.24,

            z:
                nightZ +
                0.37,

            material:
                darkWood

        });

    }


    collider({

        minX:
            nightX - 0.52,

        maxX:
            nightX + 0.52,

        minZ:
            nightZ - 0.42,

        maxZ:
            nightZ + 0.42,

        name:
            "nightstand"

    });


    // ========================================================
    // NIGHT LAMP
    // ========================================================

    const lampStem =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.035,
                0.045,
                0.3,
                12
            ),

            darkMetal

        );


    lampStem.position.set(
        nightX,
        0.83,
        nightZ
    );


    room.add(
        lampStem
    );


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

            new THREE.MeshStandardMaterial({

                color:
                    0xd8c09d,

                emissive:
                    0xffb45e,

                emissiveIntensity:
                    0.55,

                roughness:
                    0.85,

                side:
                    THREE.DoubleSide

            })

        );


    nightShade.position.set(
        nightX,
        1.07,
        nightZ
    );


    room.add(
        nightShade
    );


    const bedsideLight =
        new THREE.PointLight(

            0xffb66c,

            7,

            4.2,

            2

        );


    bedsideLight.position.set(
        nightX,
        1.15,
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

    const shelfW =
        1.2;

    const shelfH =
        2.62;

    const shelfD =
        0.42;


    box({

        w:
            shelfW,

        h:
            shelfH,

        d:
            shelfD,

        x:
            shelfX,

        y:
            shelfH / 2,

        z:
            shelfZ,

        material:
            lightWood

    });


    // inset dark background

    box({

        w:
            shelfW - 0.16,

        h:
            shelfH - 0.15,

        d:
            0.02,

        x:
            shelfX,

        y:
            shelfH / 2,

        z:
            shelfZ +
            shelfD / 2 +
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
            row * 0.49;


        box({

            w:
                shelfW - 0.08,

            h:
                0.065,

            d:
                shelfD + 0.05,

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
            let b = 0;
            b < 6;
            b++
        ) {

            const bw =
                0.09 +
                Math.random() *
                0.055;


            const bh =
                0.25 +
                Math.random() *
                0.15;


            box({

                w:
                    bw,

                h:
                    bh,

                d:
                    0.24,

                x:
                    cursor,

                y:
                    shelfY +
                    bh / 2 +
                    0.04,

                z:
                    shelfZ +
                    0.19,

                material:
                    new THREE.MeshStandardMaterial({

                        color:
                            bookColors[
                                (
                                    row * 6 +
                                    b
                                ) %
                                bookColors.length
                            ],

                        roughness:
                            0.82

                    })

            });


            cursor +=
                bw +
                0.035;

        }

    }


    collider({

        minX:
            shelfX -
            shelfW / 2 -
            0.08,

        maxX:
            shelfX +
            shelfW / 2 +
            0.08,

        minZ:
            shelfZ -
            shelfD / 2 -
            0.08,

        maxZ:
            shelfZ +
            shelfD / 2 +
            0.08,

        name:
            "bookshelf"

    });


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

            const dx =
                dresserX -
                0.75 +
                column * 0.75;


            const dy =
                0.23 +
                row * 0.34;


            box({

                w:
                    0.66,

                h:
                    0.25,

                d:
                    0.03,

                x:
                    dx,

                y:
                    dy,

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

                x:
                    dx,

                y:
                    dy,

                z:
                    dresserZ -
                    0.365,

                material:
                    darkMetal

            });

        }

    }


    collider({

        minX:
            dresserX -
            1.25,

        maxX:
            dresserX +
            1.25,

        minZ:
            dresserZ -
            0.39,

        maxZ:
            dresserZ +
            0.39,

        name:
            "dresser"

    });


    // ========================================================
    // TV
    // ========================================================

    const tv =
        box({

            w:
                1.75,

            h:
                1.0,

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
                blackMat

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
            new THREE.MeshStandardMaterial({

                color:
                    0x07090a,

                roughness:
                    0.15,

                metalness:
                    0.15

            })

    });


    // low TV unit

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


    collider({

        minX:
            0.3,

        maxX:
            3.1,

        minZ:
            3.31,

        maxZ:
            4.0,

        name:
            "tv-unit"

    });


    // ========================================================
    // BEAN BAG
    // ========================================================

    const beanBag =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.72,
                26,
                18
            ),

            new THREE.MeshStandardMaterial({

                color:
                    0x706c68,

                roughness:
                    1

            })

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


    collider({

        minX:
            3.25,

        maxX:
            4.85,

        minZ:
            0.6,

        maxZ:
            2.1,

        name:
            "beanbag"

    });


    // ========================================================
    // MIRROR
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
            new THREE.MeshStandardMaterial({

                color:
                    0xaab3b5,

                roughness:
                    0.12,

                metalness:
                    0.7

            })

    });


    // ========================================================
    // WALL SHELF + SMALL PLANTS
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
                width + 0.07,

            h:
                height + 0.07,

            d:
                0.035,

            x,
            y,
            z,

            material:
                darkWood

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
            z - 0.025,

            material:
                new THREE.MeshStandardMaterial({

                    color,

                    roughness:
                        0.9

                })

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
        4.0,
        0.6,
        0.82,
        0x808889
    );


    // ========================================================
    // DOOR
    // ========================================================

    const doorX =
        -3.55;

    const doorZ =
        DEPTH / 2 -
        0.13;

    const doorWidth =
        1.05;

    const doorHeight =
        2.3;


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


    // frame

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


    // door slab relative to hinge

    const doorSlab =
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

            z:
                0,

            material:
                whitePaint,

            parent:
                doorHinge

        });


    // decorative panels

    for (
        const py
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
                doorWidth / 2,

            y:
                py,

            z:
                -0.052,

            material:
                new THREE.MeshStandardMaterial({

                    color:
                        0xd5d2cc,

                    roughness:
                        0.82

                }),

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


    doorHinge.add(
        handle
    );


    const doorCollider =
        collider({

            minX:
                doorX -
                doorWidth / 2,

            maxX:
                doorX +
                doorWidth / 2,

            minZ:
                doorZ -
                0.18,

            maxZ:
                doorZ +
                0.18,

            name:
                "door"

        });


    let doorOpen =
        false;

    let doorRotation =
        0;

    let targetDoorRotation =
        0;


    // ========================================================
    // CEILING LIGHT
    // Based on simple round fixture from reference
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


    const ceilingBase =
        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.31,
                0.31,
                0.1,
                32

            ),

            darkMetal

        );


    ceilingFixture.add(
        ceilingBase
    );


    const diffuser =
        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.27,
                0.29,
                0.075,
                32

            ),

            new THREE.MeshStandardMaterial({

                color:
                    0xe8dfce,

                emissive:
                    0xffcc8a,

                emissiveIntensity:
                    0.55,

                roughness:
                    0.45

            })

        );


    diffuser.position.y =
        -0.08;


    ceilingFixture.add(
        diffuser
    );


    // ========================================================
    // LIGHTING
    // ========================================================

    const ambient =
        new THREE.HemisphereLight(

            0xe8eff3,

            0x51443b,

            1.55

        );


    scene.add(
        ambient
    );


    // ceiling lamp

    const ceilingLight =
        new THREE.PointLight(

            0xffd0a0,

            17,

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


    // daylight through window

    const sunlight =
        new THREE.DirectionalLight(

            0xffe3bc,

            2.4

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


    // window fill

    const windowFill =
        new THREE.RectAreaLight(

            0xdceeff,

            5.5,

            3.1,

            1.8

        );


    windowFill.position.set(
        windowX,
        2.0,
        -3.65
    );


    windowFill.lookAt(
        windowX,
        1.3,
        0
    );


    scene.add(
        windowFill
    );


    // ========================================================
    // BOUNDS
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
    // INTERACTION
    // ========================================================

    const raycaster =
        new THREE.Raycaster();


    const interactLabel =
        document.getElementById(
            "interact"
        );


    function lookingAtDoor(
        camera
    ) {

        const doorWorld =
            new THREE.Vector3();


        doorHinge.getWorldPosition(
            doorWorld
        );


        doorWorld.x +=
            0.5;


        doorWorld.y =
            1.15;


        const distance =
            camera.position.distanceTo(
                doorWorld
            );


        if (
            distance >
            2.2
        ) {
            return false;
        }


        const direction =
            new THREE.Vector3();


        camera.getWorldDirection(
            direction
        );


        const targetDirection =
            doorWorld
                .clone()
                .sub(
                    camera.position
                )
                .normalize();


        return (
            direction.dot(
                targetDirection
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
                ? -Math.PI * 0.48
                : 0;


        if (
            doorOpen
        ) {

            // player may walk through
            // once door starts opening

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

        // door animation

        const speed =
            6;


        doorRotation =
            THREE.MathUtils.damp(

                doorRotation,

                targetDoorRotation,

                speed,

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


        // interaction prompt

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
    // PUBLIC API
    // ========================================================

    console.log(
        "✅ Alicia bedroom loaded"
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
