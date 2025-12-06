import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Scene = ({ setLoaded }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- SETUP ---
    const scene = new THREE.Scene();
    const sizes = { width: window.innerWidth, height: window.innerHeight };

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(0, 2, 2);
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- GROUP & OBJECTS ---
    const group = new THREE.Group();
    scene.add(group);

    // Torus
    const geometry = new THREE.TorusGeometry(0.2, 0.04, 4, 20);
    const material = new THREE.MeshStandardMaterial({
      color: 0x2555fd,
      emissive: 0x2555fd,
      emissiveIntensity: 5,
      wireframe: true,
    });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.set(0, 1.8, 0);
    group.add(torus);

    // --- LIGHTS ---
    const torusLight = new THREE.PointLight(0xffffff, 0.01, 0.25, 0.0004);
    torusLight.position.set(0, 1.8, -2);
    scene.add(torusLight);

    const spotLight = new THREE.SpotLight(0xffffff, 17, 100, 10, 10);
    spotLight.position.set(0, 3, 0.5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const rimLight = new THREE.PointLight(0xffffff, 20, 1, 1.5);
    rimLight.position.set(1, 1, 1);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x5599ff, 30, 5, 2);
    fillLight.position.set(-2, 2, 2);
    scene.add(fillLight);

    // --- BLOOM ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(sizes.width, sizes.height),
      1,
      1.0,
      0
    );
    composer.addPass(bloomPass);

    // --- MODEL LOADER ---
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "https://raw.githubusercontent.com/Sabur-Ahemad/roman-godess-3d/main/flora/scene.gltf",
      (gltf) => {
        const mesh = gltf.scene;
        mesh.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        // Positions from your main.js
        mesh.position.set(0, 10.8, -15);
        group.add(mesh);

        // Notify Parent Component that loading is done
        setTimeout(() => setLoaded(true), 500);
      }
    );

    // --- ANIMATIONS ---
    // Scroll Triggers
    const rotateAnim = gsap.to(group.rotation, {
      y: "+=6.28",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    const cameraAnim = gsap.to(camera.position, {
      y: 1,
      z: 1.7,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Tick Loop
    const clock = new THREE.Clock();
    let animationId;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Flicker effect
      torusLight.intensity =
        torusLight.intensity + Math.sin(elapsedTime * 10) * 0.1; // simplified math

      // Auto Rotation
      torus.rotation.z += 0.01;

      // Render
      composer.render();
      animationId = window.requestAnimationFrame(tick);
    };
    tick();

    // --- RESIZE ---
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      composer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener("resize", handleResize);

    // --- CLEANUP ---
    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationId);
      // Kill GSAP triggers to prevent memory leaks
      rotateAnim.kill();
      cameraAnim.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());

      // Dispose Three.js objects
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [setLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default Scene;
