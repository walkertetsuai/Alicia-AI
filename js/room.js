import * as THREE
from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ============================================================
// ALICIA ROOM
// VERSION 2
//
// Floor texture
// Window
// Desk
// Door
// Chandelier
// Improved lighting
// ============================================================


export function createRoom(
    scene
) {

    // ========================================================
    // ROOM SIZE
    // ========================================================

    const WIDTH =
        18;


    const DEPTH =
        15;


    const HEIGHT =
        4.8;


    const WALL =
        0.25;


    const room =
        new THREE.Group();


    room.name =
        "AliciaRoom";


    scene.add(
        room
    );


    // ========================================================
    // PROCEDURAL WOOD TEXTURE
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


        // base

        ctx.fillStyle =
            "#745139";


        ctx.fillRect(
            0,
            0,
            1024,
            1024
        );


        const plankHeight =
            128;


        for (
            let y = 0;
            y < 1024;
            y += plankHeight
        ) {

            const brightness =
                95 +
                Math.random() *
                25;


            ctx.fillStyle =
                `rgb(
                    ${brightness + 25},
                    ${brightness},
                    ${brightness - 25}
                )`;


            ctx.fillRect(

                0,

                y + 2,

                1024,

                plankHeight - 4

            );


            // plank seam

            ctx.fillStyle =
                "rgba(30,18,10,0.55)";


            ctx.fillRect(

                0,

                y,

                1024,

                3

            );


            // vertical joints

            const offset =
                (y / plankHeight) % 2 === 0
                ? 0
                : 220;


            for (
                let x = offset;
                x < 1024;
                x += 440
            ) {

                ctx.fillRect(

                    x,

                    y,

                    3,

                    plankHeight

                );

            }


            // wood grain

            for (
                let i = 0;
                i < 20;
                i++
            ) {

                const grainY =
                    y +
                    Math.random() *
                    plankHeight;


                ctx.strokeStyle =
                    `rgba(
                        50,
                        25,
                        12,
                        ${0.06 + Math.random() * 0.10}
                    )`;


                ctx.lineWidth =
                    1 +
                    Math.random() * 2;


                ctx.beginPath();


                ctx.moveTo(
                    0,
                    grainY
                );


                const wave =
                    Math.random() *
                    10;


                ctx.bezierCurveTo(

                    250,
                    grainY + wave,

                    700,
                    grainY - wave,

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
            3,
            3
        );


        texture.anisotropy =
            8;


        return texture;

    }


    const woodTexture =
        createWoodTexture();


    // ========================================================
    // MATERIALS
    // ========================================================

    const floorMaterial =
        new THREE.MeshStandardMaterial({

            map:
                woodTexture,

            roughness:
                0.67,

            metalness:
                0.03

        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xc9bba7,

            roughness:
                0.92,

            metalness:
                0

        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xe7dfd4,

            roughness:
                0.96

        });


    const darkWoodMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x3f2b20,

            roughness:
                0.74

        });


    const deskMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x704a32,

            roughness:
                0.62

        });


    const glassMaterial =
        new THREE.MeshPhysicalMaterial({

            color:
                0x8fb5c7,

            transmission:
                0.35,

            transparent:
                true,

            opacity:
                0.7,

            roughness:
                0.17,

            metalness:
                0,

            thickness:
                0.2

        });


    const metalMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x292727,

            roughness:
                0.3,

            metalness:
                0.82

        });


    const brassMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xa87b39,

            roughness:
                0.3,

            metalness:
                0.75

        });


    // ========================================================
    // BOX HELPER
    // ========================================================

    function box({

        width,
        height,
        depth,

        x = 0,
        y = 0,
        z = 0,

        material,

        castShadow = true,

        receiveShadow = true

    }) {

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


        mesh.castShadow =
            castShadow;


        mesh.receiveShadow =
            receiveShadow;


        room.add(
            mesh
        );


        return mesh;

    }


    // ========================================================
    // FLOOR
    // ========================================================

    box({

        width:
            WIDTH,

        height:
            0.24,

        depth:
            DEPTH,

        y:
            -0.12,

        material:
            floorMaterial

    });


    // ========================================================
    // CEILING
    // ========================================================

    box({

        width:
            WIDTH,

        height:
            0.18,

        depth:
            DEPTH,

        y:
            HEIGHT + 0.09,

        material:
            ceilingMaterial

    });


    // ========================================================
    // WALLS
    // ========================================================

    // back wall

    box({

        width:
            WIDTH,

        height:
            HEIGHT,

        depth:
            WALL,

        y:
            HEIGHT / 2,

        z:
            -DEPTH / 2,

        material:
            wallMaterial

    });


    // front

    box({

        width:
            WIDTH,

        height:
            HEIGHT,

        depth:
            WALL,

        y:
            HEIGHT / 2,

        z:
            DEPTH / 2,

        material:
            wallMaterial

    });


    // left

    box({

        width:
            WALL,

        height:
            HEIGHT,

        depth:
            DEPTH,

        x:
            -WIDTH / 2,

        y:
            HEIGHT / 2,

        material:
            wallMaterial

    });


    // right

    box({

        width:
            WALL,

        height:
            HEIGHT,

        depth:
            DEPTH,

        x:
            WIDTH / 2,

        y:
            HEIGHT / 2,

        material:
            wallMaterial

    });


    // ========================================================
    // BASEBOARDS
    // ========================================================

    const trimHeight =
        0.16;


    box({

        width:
            WIDTH - 0.4,

        height:
            trimHeight,

        depth:
            0.08,

        y:
            trimHeight / 2,

        z:
            -DEPTH / 2 +
            0.2,

        material:
            darkWoodMaterial

    });


    box({

        width:
            WIDTH - 0.4,

        height:
            trimHeight,

        depth:
            0.08,

        y:
            trimHeight / 2,

        z:
            DEPTH / 2 -
            0.2,

        material:
            darkWoodMaterial

    });


    // ========================================================
    // WINDOW
    // ========================================================

    const windowX =
        -2.8;


    const windowY =
        2.75;


    const windowWidth =
        5.4;


    const windowHeight =
        2.25;


    const windowZ =
        -DEPTH / 2 +
        0.17;


    box({

        width:
            windowWidth,

        height:
            windowHeight,

        depth:
            0.05,

        x:
            windowX,

        y:
            windowY,

        z:
            windowZ,

        material:
            glassMaterial

    });


    // frame top

    box({

        width:
            windowWidth + 0.25,

        height:
            0.13,

        depth:
            0.15,

        x:
            windowX,

        y:
            windowY +
            windowHeight / 2,

        z:
            windowZ + 0.08,

        material:
            darkWoodMaterial

    });


    // frame bottom

    box({

        width:
            windowWidth + 0.25,

        height:
            0.13,

        depth:
            0.15,

        x:
            windowX,

        y:
            windowY -
            windowHeight / 2,

        z:
            windowZ + 0.08,

        material:
            darkWoodMaterial

    });


    // side frames

    box({

        width:
            0.13,

        height:
            windowHeight,

        depth:
            0.15,

        x:
            windowX -
            windowWidth / 2,

        y:
            windowY,

        z:
            windowZ + 0.08,

        material:
            darkWoodMaterial

    });


    box({

        width:
            0.13,

        height:
            windowHeight,

        depth:
            0.15,

        x:
            windowX +
            windowWidth / 2,

        y:
            windowY,

        z:
            windowZ + 0.08,

        material:
            darkWoodMaterial

    });


    // middle frame

    box({

        width:
            0.09,

        height:
            windowHeight,

        depth:
            0.14,

        x:
            windowX,

        y:
            windowY,

        z:
            windowZ + 0.09,

        material:
            darkWoodMaterial

    });


    // horizontal middle

    box({

        width:
            windowWidth,

        height:
            0.08,

        depth:
            0.14,

        x:
            windowX,

        y:
            windowY,

        z:
            windowZ + 0.09,

        material:
            darkWoodMaterial

    });


    // window sill

    box({

        width:
            windowWidth + 0.5,

        height:
            0.12,

        depth:
            0.55,

        x:
            windowX,

        y:
            windowY -
            windowHeight / 2 -
            0.05,

        z:
            windowZ + 0.24,

        material:
            darkWoodMaterial

    });


    // ========================================================
    // DESK
    // ========================================================

    const deskX =
        windowX;


    const deskZ =
        -DEPTH / 2 +
        1.3;


    const deskY =
        0.82;


    // desktop

    box({

        width:
            4.7,

        height:
            0.14,

        depth:
            1.25,

        x:
            deskX,

        y:
            deskY,

        z:
            deskZ,

        material:
            deskMaterial

    });


    // legs

    const legHeight =
        0.75;


    const legSize =
        0.14;


    const legX =
        2.05;


    const legZ =
        0.48;


    const legPositions = [

        [
            deskX - legX,
            deskZ - legZ
        ],

        [
            deskX + legX,
            deskZ - legZ
        ],

        [
            deskX - legX,
            deskZ + legZ
        ],

        [
            deskX + legX,
            deskZ + legZ
        ]

    ];


    for (
        const [x, z]
        of legPositions
    ) {

        box({

            width:
                legSize,

            height:
                legHeight,

            depth:
                legSize,

            x,

            y:
                legHeight / 2,

            z,

            material:
                metalMaterial

        });

    }


    // little drawer

    box({

        width:
            1.25,

        height:
            0.38,

        depth:
            0.85,

        x:
            deskX + 1.45,

        y:
            deskY - 0.28,

        z:
            deskZ,

        material:
            deskMaterial

    });


    // drawer handle

    box({

        width:
            0.4,

        height:
            0.04,

        depth:
            0.04,

        x:
            deskX + 1.45,

        y:
            deskY - 0.23,

        z:
            deskZ + 0.45,

        material:
            metalMaterial

    });


    // ========================================================
    // DOOR
    // ========================================================

    const doorWidth =
        1.65;


    const doorHeight =
        2.55;


    const doorX =
        5.8;


    const doorZ =
        DEPTH / 2 -
        0.18;


    // door panel

    box({

        width:
            doorWidth,

        height:
            doorHeight,

        depth:
            0.13,

        x:
            doorX,

        y:
            doorHeight / 2,

        z:
            doorZ,

        material:
            darkWoodMaterial

    });


    // door decorative panels

    box({

        width:
            doorWidth - 0.28,

        height:
            0.65,

        depth:
            0.04,

        x:
            doorX,

        y:
            1.78,

        z:
            doorZ - 0.085,

        material:
            deskMaterial

    });


    box({

        width:
            doorWidth - 0.28,

        height:
            0.85,

        depth:
            0.04,

        x:
            doorX,

        y:
            0.72,

        z:
            doorZ - 0.085,

        material:
            deskMaterial

    });


    // frame

    box({

        width:
            doorWidth + 0.35,

        height:
            0.15,

        depth:
            0.20,

        x:
            doorX,

        y:
            doorHeight + 0.08,

        z:
            doorZ,

        material:
            darkWoodMaterial

    });


    box({

        width:
            0.16,

        height:
            doorHeight + 0.15,

        depth:
            0.20,

        x:
            doorX -
            doorWidth / 2 -
            0.08,

        y:
            doorHeight / 2,

        z:
            doorZ,

        material:
            darkWoodMaterial

    });


    box({

        width:
            0.16,

        height:
            doorHeight + 0.15,

        depth:
            0.20,

        x:
            doorX +
            doorWidth / 2 +
            0.08,

        y:
            doorHeight / 2,

        z:
            doorZ,

        material:
            darkWoodMaterial

    });


    // handle

    const handle =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.07,
                16,
                16
            ),

            brassMaterial

        );


    handle.position.set(

        doorX - 0.55,

        1.18,

        doorZ - 0.12

    );


    handle.castShadow =
        true;


    room.add(
        handle
    );


    // ========================================================
    // CHANDELIER
    // ========================================================

    const chandelier =
        new THREE.Group();


    chandelier.position.set(
        0,
        HEIGHT - 0.15,
        0
    );


    room.add(
        chandelier
    );


    // ceiling mount

    const mount =
        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.34,

                0.42,

                0.16,

                24

            ),

            metalMaterial

        );


    chandelier.add(
        mount
    );


    // vertical chain / stem

    const stem =
        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.035,

                0.035,

                0.8,

                12

            ),

            metalMaterial

        );


    stem.position.y =
        -0.45;


    chandelier.add(
        stem
    );


    // central body

    const body =
        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.18,

                20,

                16

            ),

            brassMaterial

        );


    body.position.y =
        -0.85;


    chandelier.add(
        body
    );


    // ========================================================
    // CHANDELIER ARMS
    // ========================================================

    const bulbMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xffe2ad,

            emissive:
                0xffb45b,

            emissiveIntensity:
                2.3,

            roughness:
                0.15

        });


    const bulbCount =
        5;


    const radius =
        0.85;


    for (
        let i = 0;
        i < bulbCount;
        i++
    ) {

        const angle =
            (
                i /
                bulbCount
            ) *
            Math.PI *
            2;


        const x =
            Math.cos(angle) *
            radius;


        const z =
            Math.sin(angle) *
            radius;


        // arm

        const armLength =
            0.78;


        const arm =
            new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.025,

                    0.025,

                    armLength,

                    10

                ),

                metalMaterial

            );


        arm.position.set(

            x * 0.45,

            -0.88,

            z * 0.45

        );


        arm.rotation.z =
            Math.PI / 2;


        arm.rotation.y =
            -angle;


        chandelier.add(
            arm
        );


        // bulb holder

        const holder =
            new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.07,

                    0.08,

                    0.18,

                    16

                ),

                brassMaterial

            );


        holder.position.set(

            x,

            -0.82,

            z

        );


        chandelier.add(
            holder
        );


        // bulb

        const bulb =
            new THREE.Mesh(

                new THREE.SphereGeometry(

                    0.105,

                    18,

                    14

                ),

                bulbMaterial

            );


        bulb.scale.y =
            1.35;


        bulb.position.set(

            x,

            -1.02,

            z

        );


        chandelier.add(
            bulb
        );

    }


    // ========================================================
    // LIGHTING
    // ========================================================

    const hemisphere =
        new THREE.HemisphereLight(

            0xdceaff,

            0x3f2e23,

            1.25

        );


    scene.add(
        hemisphere
    );


    // main chandelier light

    const chandelierLight =
        new THREE.PointLight(

            0xffc980,

            74,

            21,

            1.8

        );


    chandelierLight.position.set(
        0,
        3.5,
        0
    );


    chandelierLight.castShadow =
        true;


    chandelierLight.shadow.mapSize.set(
        1024,
        1024
    );


    chandelierLight.shadow.bias =
        -0.0005;


    scene.add(
        chandelierLight
    );


    // window daylight

    const windowLight =
        new THREE.DirectionalLight(

            0xb9d8ff,

            1.35

        );


    windowLight.position.set(
        -4,
        5,
        -9
    );


    windowLight.target.position.set(
        -1,
        1,
        2
    );


    scene.add(
        windowLight
    );


    scene.add(
        windowLight.target
    );


    // subtle desk light from window

    const windowFill =
        new THREE.PointLight(

            0xb8dfff,

            10,

            9,

            2

        );


    windowFill.position.set(

        windowX,

        2.4,

        -DEPTH / 2 +
        1

    );


    scene.add(
        windowFill
    );


    // ========================================================
    // COLLISION BOUNDS
    // ========================================================

    const margin =
        WALL / 2;


    const bounds = {

        minX:
            -WIDTH / 2 +
            margin,

        maxX:
            WIDTH / 2 -
            margin,

        minZ:
            -DEPTH / 2 +
            margin,

        maxZ:
            DEPTH / 2 -
            margin

    };


    console.log(
        "✅ Alicia Room v2 загружена"
    );


    return {

        group:
            room,

        width:
            WIDTH,

        depth:
            DEPTH,

        height:
            HEIGHT,

        bounds

    };

}
