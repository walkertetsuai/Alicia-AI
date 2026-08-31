import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

export function createRoom(scene) {
  const WIDTH = 10.8;
  const DEPTH = 8.2;
  const HEIGHT = 3.25;
  const WALL = 0.18;

  const windowX = 2.55;
  const windowWidth = 3.15;
  const windowHeight = 1.75;
  const windowY = 2.05;
  const windowZ = -DEPTH / 2 + 0.12;

  const doorX = -3.55;
  const doorWidth = 1.05;
  const doorHeight = 2.30;
  const doorZ = DEPTH / 2 - 0.13;

  const room = new THREE.Group();
  room.name = "AliciaBedroom";
  scene.add(room);

  const colliders = [];

  const addCollider = (
    name,
    minX,
    maxX,
    minZ,
    maxZ,
    enabled = true
  ) => {
    const item = {
      name,
      minX,
      maxX,
      minZ,
      maxZ,
      enabled
    };

    colliders.push(item);
    return item;
  };

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
      new THREE.BoxGeometry(w, h, d),
      material
    );

    mesh.position.set(x, y, z);

    mesh.castShadow = cast;
    mesh.receiveShadow = receive;

    parent.add(mesh);

    return mesh;
  }

  function cylinder({
    rt,
    rb,
    h,
    x = 0,
    y = 0,
    z = 0,
    segments = 24,
    material,
    parent = room,
    cast = true,
    receive = true
  }) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(
        rt,
        rb,
        h,
        segments
      ),
      material
    );

    mesh.position.set(x, y, z);

    mesh.castShadow = cast;
    mesh.receiveShadow = receive;

    parent.add(mesh);

    return mesh;
  }

  // ==========================================================
  // PROCEDURAL FALLBACK WOOD
  // ==========================================================

  function makeWoodFallback(size = 1536) {
    const canvas =
      document.createElement("canvas");

    canvas.width = size;
    canvas.height = size;

    const ctx =
      canvas.getContext("2d");

    ctx.fillStyle = "#aa8057";

    ctx.fillRect(
      0,
      0,
      size,
      size
    );

    const plankH =
      Math.round(size / 11);

    for (
      let y = 0;
      y < size;
      y += plankH
    ) {
      const row =
        Math.floor(y / plankH);

      const base =
        138 +
        Math.random() * 25;

      ctx.fillStyle =
        `rgb(
          ${base + 34},
          ${base + 9},
          ${base - 19}
        )`;

      ctx.fillRect(
        0,
        y + 2,
        size,
        plankH - 4
      );

      ctx.fillStyle =
        "rgba(50,29,15,.28)";

      ctx.fillRect(
        0,
        y,
        size,
        2
      );

      const offset =
        row % 2
          ? size * 0.28
          : 0;

      for (
        let x = offset;
        x < size;
        x += size * 0.52
      ) {
        ctx.fillRect(
          x,
          y,
          2,
          plankH
        );
      }

      for (
        let i = 0;
        i < 30;
        i++
      ) {
        const gy =
          y +
          Math.random() *
          plankH;

        ctx.beginPath();

        ctx.strokeStyle =
          `rgba(
            67,
            38,
            20,
            ${0.025 + Math.random() * 0.07}
          )`;

        ctx.lineWidth =
          0.6 +
          Math.random() * 1.4;

        ctx.moveTo(
          0,
          gy
        );

        ctx.bezierCurveTo(
          size * 0.25,
          gy +
            (Math.random() - 0.5) *
            14,

          size * 0.70,
          gy +
            (Math.random() - 0.5) *
            14,

          size,
          gy
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
      3.3,
      4.1
    );

    texture.anisotropy = 8;

    return texture;
  }

  // ==========================================================
  // NOISE TEXTURE
  // ==========================================================

  function makeNoiseTexture(
    base = 128,
    contrast = 18,
    size = 1024,
    repeatX = 4,
    repeatY = 4
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
      const n =
        Math.max(
          0,
          Math.min(
            255,
            base +
              (Math.random() - 0.5) *
              contrast
          )
        );

      image.data[i] = n;
      image.data[i + 1] = n;
      image.data[i + 2] = n;
      image.data[i + 3] = 255;
    }

    ctx.putImageData(
      image,
      0,
      0
    );

    const texture =
      new THREE.CanvasTexture(
        canvas
      );

    texture.wrapS =
      THREE.RepeatWrapping;

    texture.wrapT =
      THREE.RepeatWrapping;

    texture.repeat.set(
      repeatX,
      repeatY
    );

    texture.anisotropy = 8;

    return texture;
  }

  // ==========================================================
  // FABRIC
  // ==========================================================

  function makeFabricMap(
    baseColor,
    size = 1024
  ) {
    const canvas =
      document.createElement("canvas");

    canvas.width = size;
    canvas.height = size;

    const ctx =
      canvas.getContext("2d");

    ctx.fillStyle =
      baseColor;

    ctx.fillRect(
      0,
      0,
      size,
      size
    );

    ctx.lineWidth = 1;

    for (
      let i = 0;
      i < size;
      i += 4
    ) {
      ctx.strokeStyle =
        "rgba(255,255,255,.025)";

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

      ctx.strokeStyle =
        "rgba(40,30,20,.025)";

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
      5,
      5
    );

    texture.anisotropy = 8;

    return texture;
  }

  // ==========================================================
  // TEXTURES
  // ==========================================================

  const floorFallback =
    makeWoodFallback();

  const wallBump =
    makeNoiseTexture(
      128,
      24,
      1024,
      5,
      4
    );

  const woodBump =
    makeNoiseTexture(
      128,
      16,
      1024,
      6,
      6
    );

  const fabricBump =
    makeNoiseTexture(
      128,
      34,
      1024,
      7,
      7
    );

  // ==========================================================
  // FLOOR MATERIAL
  // ==========================================================

  const floorMaterial =
    new THREE.MeshStandardMaterial({
      map:
        floorFallback,

      roughness:
        0.66,

      metalness:
        0.02,

      bumpMap:
        woodBump,

      bumpScale:
        0.012
    });

  // ==========================================================
  // EXTERNAL PBR WOOD
  // ==========================================================

  const textureLoader =
    new THREE.TextureLoader();

  const TEX =
    "https://cdn.jsdelivr.net/npm/three@0.185.1/examples/textures/";

  function applyFloorPBR() {
    textureLoader.load(
      `${TEX}hardwood2_diffuse.jpg`,

      tex => {
        tex.colorSpace =
          THREE.SRGBColorSpace;

        tex.wrapS =
          THREE.RepeatWrapping;

        tex.wrapT =
          THREE.RepeatWrapping;

        tex.repeat.set(
          5.2,
          7.5
        );

        tex.anisotropy = 8;

        floorMaterial.map =
          tex;

        floorMaterial.needsUpdate =
          true;
      },

      undefined,

      () => {
        console.warn(
          "Alicia Room: hardwood diffuse unavailable, using fallback."
        );
      }
    );

    textureLoader.load(
      `${TEX}hardwood2_bump.jpg`,

      tex => {
        tex.wrapS =
          THREE.RepeatWrapping;

        tex.wrapT =
          THREE.RepeatWrapping;

        tex.repeat.set(
          5.2,
          7.5
        );

        tex.anisotropy = 8;

        floorMaterial.bumpMap =
          tex;

        floorMaterial.bumpScale =
          0.018;

        floorMaterial.needsUpdate =
          true;
      }
    );

    textureLoader.load(
      `${TEX}hardwood2_roughness.jpg`,

      tex => {
        tex.wrapS =
          THREE.RepeatWrapping;

        tex.wrapT =
          THREE.RepeatWrapping;

        tex.repeat.set(
          5.2,
          7.5
        );

        tex.anisotropy = 8;

        floorMaterial.roughnessMap =
          tex;

        floorMaterial.needsUpdate =
          true;
      }
    );
  }

  applyFloorPBR();

  // ==========================================================
  // MATERIALS
  // ==========================================================

  const wallMaterial =
    new THREE.MeshStandardMaterial({
      color:
        0xd8d0c5,

      roughness:
        0.92,

      bumpMap:
        wallBump,

      bumpScale:
        0.006
    });

  const ceilingMaterial =
    new THREE.MeshStandardMaterial({
      color:
        0xe9e3da,

      roughness:
        0.95,

      bumpMap:
        wallBump,

      bumpScale:
        0.003
    });

  const whitePaint =
    new THREE.MeshStandardMaterial({
      color:
        0xeeeae3,

      roughness:
        0.72,

      bumpMap:
        wallBump,

      bumpScale:
        0.002
    });

  const lightWood =
    new THREE.MeshStandardMaterial({
      color:
        0xa47d57,

      roughness:
        0.62,

      bumpMap:
        woodBump,

      bumpScale:
        0.008
    });

  const darkWood =
    new THREE.MeshStandardMaterial({
      color:
        0x49362b,

      roughness:
        0.68,

      bumpMap:
        woodBump,

      bumpScale:
        0.007
    });

  const blackMaterial =
    new THREE.MeshStandardMaterial({
      color:
        0x161616,

      roughness:
        0.42
    });

  const darkMetal =
    new THREE.MeshStandardMaterial({
      color:
        0x25272a,

      roughness:
        0.28,

      metalness:
        0.78
    });

  const beddingMaterial =
    new THREE.MeshStandardMaterial({
      map:
        makeFabricMap(
          "#e4ddd3"
        ),

      roughness:
        0.97,

      bumpMap:
        fabricBump,

      bumpScale:
        0.008
    });

  const blanketMaterial =
    new THREE.MeshStandardMaterial({
      map:
        makeFabricMap(
          "#807a74"
        ),

      color:
        0x8e8780,

      roughness:
        1,

      bumpMap:
        fabricBump,

      bumpScale:
        0.012
    });

  const rugMaterial =
    new THREE.MeshStandardMaterial({
      map:
        makeFabricMap(
          "#c0b09d"
        ),

      color:
        0xc6b7a4,

      roughness:
        1,

      bumpMap:
        fabricBump,

      bumpScale:
        0.016
    });

  const curtainMaterial =
    new THREE.MeshStandardMaterial({
      color:
        0xb4aba0,

      roughness:
        1,

      bumpMap:
        fabricBump,

      bumpScale:
        0.009,

      side:
        THREE.DoubleSide
    });

  const greenMaterial =
    new THREE.MeshStandardMaterial({
      color:
        0x43644a,

      roughness:
        0.88
    });

  const potMaterial =
    new THREE.MeshStandardMaterial({
      color:
        0xb5aaa0,

      roughness:
        0.88,

      bumpMap:
        wallBump,

      bumpScale:
        0.004
    });

  const soilMaterial =
    new THREE.MeshStandardMaterial({
      color:
        0x39291e,

      roughness:
        1
    });

  const glassMaterial =
    new THREE.MeshPhysicalMaterial({
      color:
        0xc8e1e8,

      transmission:
        0.42,

      transparent:
        true,

      opacity:
        0.46,

      roughness:
        0.08,

      thickness:
        0.08
    });

  // ==========================================================
  // ARCHITECTURE
  // ==========================================================

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

  // ==========================================================
  // WINDOW WALL
  // ==========================================================

  const wl =
    windowX -
    windowWidth / 2;

  const wr =
    windowX +
    windowWidth / 2;

  const wb =
    windowY -
    windowHeight / 2;

  const wt =
    windowY +
    windowHeight / 2;

  box({
    w:
      wl +
      WIDTH / 2,

    h:
      HEIGHT,

    d:
      WALL,

    x:
      (
        -WIDTH / 2 +
        wl
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
      wr,

    h:
      HEIGHT,

    d:
      WALL,

    x:
      (
        wr +
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
      wb,

    d:
      WALL,

    x:
      windowX,

    y:
      wb / 2,

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
      wt,

    d:
      WALL,

    x:
      windowX,

    y:
      wt +
      (
        HEIGHT -
        wt
      ) / 2,

    z:
      -DEPTH / 2,

    material:
      wallMaterial
  });

  // ==========================================================
  // DOOR WALL
  // ==========================================================

  const dl =
    doorX -
    doorWidth / 2;

  const dr =
    doorX +
    doorWidth / 2;

  box({
    w:
      dl +
      WIDTH / 2,

    h:
      HEIGHT,

    d:
      WALL,

    x:
      (
        -WIDTH / 2 +
        dl
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
      dr,

    h:
      HEIGHT,

    d:
      WALL,

    x:
      (
        dr +
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

  // ==========================================================
  // HALLWAY HINT
  // ==========================================================

  const hallwayMaterial =
    new THREE.MeshStandardMaterial({
      color:
        0x4c4945,

      roughness:
        0.95
    });

  box({
    w:
      doorWidth +
      0.22,

    h:
      0.12,

    d:
      0.82,

    x:
      doorX,

    y:
      -0.04,

    z:
      DEPTH / 2 +
      0.40,

    material:
      floorMaterial
  });

  box({
    w:
      doorWidth +
      0.15,

    h:
      doorHeight,

    d:
      0.05,

    x:
      doorX,

    y:
      doorHeight / 2,

    z:
      DEPTH / 2 +
      0.82,

    material:
      hallwayMaterial,

    cast:
      false
  });

  // ==========================================================
  // BASEBOARDS
  // ==========================================================

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

  // ==========================================================
  // WINDOW
  // ==========================================================

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

  // curtain rail

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

  // ==========================================================
  // CURTAINS
  // ==========================================================

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
          i * 0.08,

        1.68,

        -DEPTH / 2 +
          0.36 +
          Math.sin(
            i * 1.7
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

  // ==========================================================
  // RADIATOR
  // ==========================================================

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

  // ==========================================================
  // DESK
  // ==========================================================

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
          0.03,

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
          0.15,

        h:
          0.025,

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

  // ==========================================================
  // LAPTOP
  // ==========================================================

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

  // ==========================================================
  // DESK LAMP
  // ==========================================================

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

  // ==========================================================
  // OFFICE CHAIR
  // ==========================================================

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
      1.0,

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

  // ==========================================================
  // PLANTS
  // ==========================================================

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
            stemHeight / 2,

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

  // ==========================================================
  // BED
  // moved to wall
  // ==========================================================

  const bedX =
    -3.62;

  const bedZ =
    0.25;

  const bedWidth =
    3.0;

  const bedDepth =
    4.25;

  // rug

  box({
    w:
      3.7,

    h:
      0.026,

    d:
      5.05,

    x:
      bedX +
      0.35,

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

  // ==========================================================
  // PILLOWS
  // ==========================================================

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
    0.66,

    bedZ -
    1.45,

    0.08
  );

  pillow(
    bedX +
    0.62,

    bedZ -
    1.47,

    -0.10
  );

  // ==========================================================
  // CRUMPLED BED FABRIC
  // ==========================================================

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
        30,
        34
      );

    const p =
      geometry
        .attributes
        .position;

    for (
      let i = 0;
      i < p.count;
      i++
    ) {
      const px =
        p.getX(i);

      const py =
        p.getY(i);

      const wave =
        Math.sin(
          px * 6.2 +
          py * 2.1
        ) *
        amplitude +

        Math.sin(
          py * 7.7
        ) *
        amplitude *
        0.65 +

        Math.sin(
          px * 11.3 -
          py * 3
        ) *
        amplitude *
        0.35;

      p.setZ(
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

  // ==========================================================
  // NIGHTSTAND
  // moved to free side of bed
  // ==========================================================

  const nightX =
    -1.38;

  const nightZ =
    -1.30;

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

  // lamp

  cylinder({
    rt:
      0.035,

    rb:
      0.045,

    h:
      0.30,

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

  // ==========================================================
  // BOOKSHELF
  // rotated 90 degrees
  // ==========================================================

  const shelf =
    new THREE.Group();

  const shelfX =
    -WIDTH / 2 +
    0.32;

  const shelfZ =
    3.25;

  const shelfWidth =
    1.30;

  const shelfHeight =
    2.62;

  const shelfDepth =
    0.42;

  shelf.position.set(
    shelfX,
    0,
    shelfZ
  );

  shelf.rotation.y =
    Math.PI / 2;

  room.add(
    shelf
  );

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
      shelf
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

    y:
      shelfHeight / 2,

    z:
      shelfDepth / 2 +
      0.011,

    material:
      darkWood,

    parent:
      shelf
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
    const sy =
      0.25 +
      row * 0.49;

    box({
      w:
        shelfWidth -
        0.08,

      h:
        0.065,

      d:
        shelfDepth +
        0.05,

      y:
        sy,

      material:
        lightWood,

      parent:
        shelf
    });

    let cursor =
      -0.50;

    for (
      let book = 0;
      book < 7;
      book++
    ) {
      const bw =
        0.08 +
        Math.random() *
        0.05;

      const bh =
        0.25 +
        Math.random() *
        0.15;

      const bookMaterial =
        new THREE.MeshStandardMaterial({
          color:
            bookColors[
              (
                row * 7 +
                book
              ) %
              bookColors.length
            ],

          roughness:
            0.82
        });

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
          sy +
          bh / 2 +
          0.04,

        z:
          shelfDepth / 2 +
          0.02,

        material:
          bookMaterial,

        parent:
          shelf
      });

      cursor +=
        bw +
        0.03;
    }
  }

  // after 90° rotation:
  // local depth => world X
  // local width => world Z

  addCollider(
    "bookshelf",

    shelfX -
    shelfDepth / 2 -
    0.10,

    shelfX +
    shelfDepth / 2 +
    0.10,

    shelfZ -
    shelfWidth / 2 -
    0.10,

    shelfZ +
    shelfWidth / 2 +
    0.10
  );

  // ==========================================================
  // DRESSER
  // ==========================================================

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
    let c = 0;
    c < 3;
    c++
  ) {
    for (
      let r = 0;
      r < 2;
      r++
    ) {
      const x =
        dresserX -
        0.75 +
        c * 0.75;

      const y =
        0.23 +
        r * 0.34;

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

  // ==========================================================
  // TV
  // ==========================================================

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
      0.10,

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
      0.50,

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

    0.30,
    3.10,

    3.31,
    4.00
  );

  // ==========================================================
  // BEAN BAG
  // ==========================================================

  const beanMaterial =
    new THREE.MeshStandardMaterial({
      color:
        0x706c68,

      roughness:
        1,

      bumpMap:
        fabricBump,

      bumpScale:
        0.014
    });

  const beanBag =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        0.72,
        30,
        20
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

    0.60,
    2.10
  );

  // ==========================================================
  // MIRROR
  // ==========================================================

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
        0.08,

      metalness:
        0.78
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

  // ==========================================================
  // WALL SHELF
  // ==========================================================

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

  // ==========================================================
  // WALL ART
  // ==========================================================

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

    const art =
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
        art,

      cast:
        false
    });
  }

  picture(
    -4.30,
    1.85,
    -3.92,
    0.42,
    0.58,
    0x87938b
  );

  picture(
    -3.72,
    1.70,
    -3.92,
    0.27,
    0.35,
    0xb1a38d
  );

  picture(
    4.10,
    1.80,
    4.00,
    0.60,
    0.82,
    0x808889
  );

  // ==========================================================
  // DOOR
  // ==========================================================

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

  const panelMaterial =
    new THREE.MeshStandardMaterial({
      color:
        0xd6d2cb,

      roughness:
        0.80,

      bumpMap:
        wallBump,

      bumpScale:
        0.002
    });

  for (
    const py of [
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
        py,

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
        16,
        12
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

  // ==========================================================
  // CEILING FIXTURE
  // ==========================================================

  const ceilingFixture =
    new THREE.Group();

  ceilingFixture.position.set(
    0,
    HEIGHT -
    0.10,
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
      0.10,

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

  // ==========================================================
  // LIGHTING
  // ==========================================================

  const hemisphere =
    new THREE.HemisphereLight(
      0xe8eff3,
      0x51443b,
      1.34
    );

  scene.add(
    hemisphere
  );

  const ceilingLight =
    new THREE.PointLight(
      0xffd0a0,
      15.5,
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

  // sunlight

  const sunlight =
    new THREE.DirectionalLight(
      0xffe3bc,
      2.25
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
    1536,
    1536
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
    new THREE.PointLight(
      0xdceeff,
      8.2,
      8.5,
      1.8
    );

  windowFill.position.set(
    windowX,
    2.0,
    -3.45
  );

  scene.add(
    windowFill
  );

  // ==========================================================
  // INTERACTION
  // ==========================================================

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

  // ==========================================================
  // UPDATE
  // ==========================================================

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
      } else {
        interactLabel
          .classList
          .remove(
            "visible"
          );
      }
    }
  }

  // ==========================================================
  // ROOM BOUNDS
  // ==========================================================

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
    "✅ Alicia Room v5.3 loaded — bed at wall, shelf rotated, PBR textures enabled"
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
