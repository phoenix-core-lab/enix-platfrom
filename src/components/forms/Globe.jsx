"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const Globe = () => {
  const globeRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const globeGroupRef = useRef(null);

  useEffect(() => {
    if (!globeRef.current || typeof window === "undefined") return;

    let scene, camera, renderer, globeGroup;

    if (!sceneRef.current) {
      scene = new THREE.Scene();
      sceneRef.current = scene;

      camera = new THREE.PerspectiveCamera(
        45,
        globeRef.current.clientWidth / globeRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 2, 2.5);
      scene.add(camera);
      cameraRef.current = camera;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(
        globeRef.current.clientWidth,
        globeRef.current.clientHeight
      );
      renderer.setPixelRatio(window.devicePixelRatio);
      rendererRef.current = renderer;

      globeRef.current.appendChild(renderer.domElement);

      globeGroup = new THREE.Group();
      scene.add(globeGroup);
      globeGroupRef.current = globeGroup;

      new THREE.TextureLoader().load(
        "https://cdn.prod.website-files.com/635c4eeb78332f7971255095/664dab835db5b61d1fdd0f38_earthMap.png",
        (image) =>
          createGlobeWithPentagons(image.image, 1.5, 0.004, 800, 6, globeGroup)
      );

      function animate() {
        requestAnimationFrame(animate);
        globeGroup.rotation.y -= 0.0003;
        renderer.render(scene, camera);
      }
      animate();
    }

    function onResize() {
      if (!globeRef.current || !cameraRef.current || !rendererRef.current)
        return;
      const width = globeRef.current.clientWidth;
      const height = globeRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    }
    
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <div ref={globeRef} style={{ width: "100vw", height: "100vh" }} />;
};

// Функция генерации пентагонов (вынесена из useEffect)
function createGlobeWithPentagons(
  image,
  radius,
  pentagonSize,
  samples,
  rowSpacingFactor,
  globeGroup
) {
  function createPentagonGeometry(radius) {
    const vertices = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      vertices.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    }
    vertices.push(0, 0, 0);
    const indices = [0, 1, 5, 1, 2, 5, 2, 3, 5, 3, 4, 5, 4, 0, 5];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }

  function latitudinalSphere(samples, radius, rowSpacingFactor) {
    const points = [];
    const rows = Math.ceil(Math.sqrt(samples) * rowSpacingFactor);
    const phiStep = Math.PI / rows;

    for (let i = 0; i <= rows; i++) {
      const phi = i * phiStep;
      const numPointsInRow = Math.ceil(2 * Math.PI * Math.sin(phi) * rows);

      for (let j = 0; j < numPointsInRow; j++) {
        const theta = (j / numPointsInRow) * 2 * Math.PI;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        points.push(new THREE.Vector3(x, y, z));
      }
    }
    return points;
  }

  const vertexShader = `
    attribute float delay;
    varying float vDelay;
    varying vec3 vPosition;
    
    void main() {
      vDelay = delay;
      vPosition = (modelViewMatrix * instanceMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying float vDelay;
    varying vec3 vPosition;
    
    uniform float time;
    
    void main() {
      float depth = length(vPosition);
      float intensity = 1.0 - smoothstep(2.2, 4.5, depth);
    
      float opacity = 0.4 + 0.5 * sin(time + vDelay);
      vec3 color = vec3(1.0, 1.0, 1.0) * intensity;
      
      gl_FragColor = vec4(color, opacity);
    }
  `;

  const pentagonGeometry = createPentagonGeometry(pentagonSize);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: { time: { value: 0.0 } },
    side: THREE.DoubleSide,
    transparent: true,
  });

  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const points = latitudinalSphere(samples, radius, rowSpacingFactor);
  const instanceCount = points.length;
  const instancedMesh = new THREE.InstancedMesh(
    pentagonGeometry,
    material,
    instanceCount
  );

  const dummy = new THREE.Object3D();
  const delays = new Float32Array(instanceCount);
  let visibleInstanceCount = 0;

  points.forEach((point, i) => {
    const lat = Math.asin(point.y / radius) * (180 / Math.PI);
    const lon = Math.atan2(point.z, point.x) * (180 / Math.PI);

    const x = ((-lon + 180) / 360) * image.width;
    const y = ((-lat + 90) / 180) * image.height;
    const index = (Math.floor(y) * image.width + Math.floor(x)) * 4;
    const brightness = data[index];

    if (brightness < 128) {
      dummy.position.copy(point);
      dummy.lookAt(0, 0, 0);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(visibleInstanceCount, dummy.matrix);
      delays[visibleInstanceCount] = Math.random() * 5.0;
      visibleInstanceCount++;
    }
  });

  instancedMesh.instanceMatrix.needsUpdate = true;
  instancedMesh.geometry.setAttribute(
    "delay",
    new THREE.InstancedBufferAttribute(delays.slice(0, visibleInstanceCount), 1)
  );
  instancedMesh.count = visibleInstanceCount;
  globeGroup.add(instancedMesh);
}

export default Globe;
