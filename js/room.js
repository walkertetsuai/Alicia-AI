import * as THREE
from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";


// ============================================================
// ALICIA ROOM
// STABLE BASE
// ============================================================

export function createRoom(
    scene
) {

    const WIDTH =
        18;

    const DEPTH =
        15;

    const HEIGHT =
        4.8;

    const WALL =
        0.25;


    // ========================================================
    // GROUP
    // ========================================================

    const room =
        new THREE.Group();

    room.name =
        "AliciaRoom";

    scene.add(
        room
    );


    // ========================================================
    // MATERIALS
    // ========================================================

    const floorMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x6b4d38,

            roughness:
                0.72,

            metalness:
                0.02

        });


    const wallMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xc9b79f,

            roughness:
                0.9,

            metalness:
                0

        });


    const ceilingMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xe1d8cc,

            roughness:
                0.95,

            metalness:
                0

        });


    const trimMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x4b3628,

            roughness:
                0.72

        });


    // ========================================================
    // HELPER
    // ========================================================

    function box({

        width,
        height,
        depth,

        x = 0,
        y = 0,
        z = 0,

        material

    }) {

        const geometry =
            new THREE.BoxGeometry(

                width,
                height,
                depth

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
            true;

        mesh.receiveShadow =
            true;


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
            0.25,

        depth:
            DEPTH,

        y:
            -0.125,

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
            0.2,

        depth:
            DEPTH,

        y:
            HEIGHT + 0.1,

        material:
            ceilingMaterial

    });


    // ========================================================
    // BACK WALL
    // ========================================================

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


    // ========================================================
    // FRONT WALL
    // ========================================================

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


    // ========================================================
    // LEFT WALL
    // ========================================================

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


    // ========================================================
    // RIGHT WALL
    // ========================================================

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
    // BASEBOARD
    // ========================================================

    const trimHeight =
        0.16;


    box({

        width:
            WIDTH - WALL,

        height:
            trimHeight,

        depth:
            0.08,

        y:
            trimHeight / 2,

        z:
            -DEPTH / 2 +
            WALL,

        material:
            trimMaterial

    });


    box({

        width:
            WIDTH - WALL,

        height:
            trimHeight,

        depth:
            0.08,

        y:
            trimHeight / 2,

        z:
            DEPTH / 2 -
            WALL,

        material:
            trimMaterial

    });


    box({

        width:
            0.08,

        height:
            trimHeight,

        depth:
            DEPTH,

        x:
            -WIDTH / 2 +
            WALL,

        y:
            trimHeight / 2,

        material:
            trimMaterial

    });


    box({

        width:
            0.08,

        height:
            trimHeight,

        depth:
            DEPTH,

        x:
            WIDTH / 2 -
            WALL,

        y:
            trimHeight / 2,

        material:
            trimMaterial

    });


    // ========================================================
    // SIMPLE WINDOW DECORATION
    // ========================================================

    const glassMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x7397a8,

            roughness:
                0.18,

            metalness:
                0.08,

            emissive:
                0x172b34,

            emissiveIntensity:
                0.25

        });


    box({

        width:
            4.8,

        height:
            2.4,

        depth:
            0.05,

        x:
            -2.5,

        y:
            2.55,

        z:
            -DEPTH / 2 +
            WALL +
            0.04,

        material:
            glassMaterial

    });


    // window frame

    box({

        width:
            5.1,

        height:
            0.12,

        depth:
            0.12,

        x:
            -2.5,

        y:
            3.78,

        z:
            -DEPTH / 2 +
            0.31,

        material:
            trimMaterial

    });


    box({

        width:
            5.1,

        height:
            0.12,

        depth:
            0.12,

        x:
            -2.5,

        y:
            1.32,

        z:
            -DEPTH / 2 +
            0.31,

        material:
            trimMaterial

    });


    box({

        width:
            0.12,

        height:
            2.58,

        depth:
            0.12,

        x:
            -5.05,

        y:
            2.55,

        z:
            -DEPTH / 2 +
            0.31,

        material:
            trimMaterial

    });


    box({

        width:
            0.12,

        height:
            2.58,

        depth:
            0.12,

        x:
            0.05,

        y:
            2.55,

        z:
            -DEPTH / 2 +
            0.31,

        material:
            trimMaterial

    });


    // middle frame

    box({

        width:
            0.08,

        height:
            2.4,

        depth:
            0.1,

        x:
            -2.5,

        y:
            2.55,

        z:
            -DEPTH / 2 +
            0.34,

        material:
            trimMaterial

    });


    // ========================================================
    // LIGHT
    // ========================================================

    const hemisphere =
        new THREE.HemisphereLight(

            0xe8f0ff,

            0x493528,

            1.55

        );

    scene.add(
        hemisphere
    );


    const ceilingLight =
        new THREE.PointLight(

            0xffddb8,

            75,

            22,

            1.7

        );


    ceilingLight.position.set(
        0,
        HEIGHT - 0.6,
        0
    );


    ceilingLight.castShadow =
        true;


    ceilingLight.shadow.mapSize.set(
        1024,
        1024
    );


    ceilingLight.shadow.bias =
        -0.0005;


    scene.add(
        ceilingLight
    );


    const windowLight =
        new THREE.DirectionalLight(

            0xb9d9ff,

            1.1

        );


    windowLight.position.set(
        -4,
        5,
        -8
    );


    windowLight.target.position.set(
        0,
        1,
        0
    );


    scene.add(
        windowLight
    );

    scene.add(
        windowLight.target
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
        "✅ Alicia AI: room ready"
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
