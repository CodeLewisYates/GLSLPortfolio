import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { fshader } from "./shaders/fragment";
import { vshader } from "./shaders/vertex";
import { particlevertex } from "./shaders/particlevertex";
import { particlefragment } from "./shaders/particlefragment";

class NoiseMorph {
  constructor() {
    this.clock = new THREE.Clock();

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    this.camera.position.z = 2;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document
      .getElementById("noisemorphcontainer")
      .appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // init
    this.settings();
    this.addObjects();
    this.animate();
    this.initListeners();
  }

  settings() {
    // OrbitControls
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.01;
    this.controls.rotateSpeed = 1.5;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;
  }

  addObjects() {
    this.geometry = new THREE.SphereBufferGeometry(1, 400, 400);
    this.uniforms = {
      u_time: { value: 0.0 },
      u_mouse: { value: { x: 0.0, y: 0.0 } },
      u_resolution: { value: { x: 0.0, y: 0.0 } },
      u_color: { value: new THREE.Color(0xff0000) },
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      transparent: true,
      vertexShader: vshader,
      fragmentShader: fshader,
    });

    this.icos = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.icos);

    // points geometry and material
    let N = 10000;
    const positions = new Float32Array(N * 3);
    this.pgeometry = new THREE.BufferGeometry();

    let inc = Math.PI * (3 - Math.sqrt(5));
    let off = 2 / N;
    let radius = 1.6;
    for (let i = 0; i < N; i++) {
      let y = i * off - 1 + off / 2;
      let r = Math.sqrt(1 - y * y);
      let phi = i * inc;

      positions[3 * i] = radius * Math.cos(phi) * r;
      positions[3 * i + 1] = radius * y;
      positions[3 * i + 2] = radius * Math.sin(phi) * r;
    }
    this.pgeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    //const pgeometry = new THREE.SphereBufferGeometry(1.5, 64, 64);

    this.pmaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        //texture: { value: new THREE.TextureLoader().load(landscape) },
      },
      transparent: true,
      vertexShader: particlevertex,
      fragmentShader: particlefragment,
    });

    this.particles = new THREE.Points(this.pgeometry, this.pmaterial);
    this.scene.add(this.particles);
  }

  initListeners() {
    if ("ontouchstart" in window)
      document.addEventListener("touchmove", move.bind(this));
    else {
      window.addEventListener("resize", this.onWindowResize.bind(this), false);
      document.addEventListener("mousemove", move.bind(this));
    }

    function move(evt) {
      this.uniforms.u_mouse.value.x = evt.touches
        ? evt.touches[0].clientX
        : evt.clientX;
      this.uniforms.u_mouse.value.y = evt.touches
        ? evt.touches[0].clientY
        : evt.clientY;
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    let elapsedTime = this.clock.getElapsedTime();
    this.uniforms.u_time.value = elapsedTime + 50;
    this.pmaterial.uniforms.u_time.value = elapsedTime;
    this.particles.rotation.y = elapsedTime / 10;
    this.controls.update();
  }

  onWindowResize() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera.aspect = aspectRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (this.uniforms.u_resolution) {
      this.uniforms.u_resolution.value.x = window.innerWidth;
      this.uniforms.u_resolution.value.y = window.innerHeight;
    }
  }
}
export default NoiseMorph;
