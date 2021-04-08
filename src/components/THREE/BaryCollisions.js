import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as OIMO from "oimo";
//import * as dat from "dat.gui";

// shader code

import { vshader } from "./shaders/baryvertex";
import { fshader } from "./shaders/baryfragment";

class BaryShapeCollisions {
  constructor() {
    // clock
    this.clock = new THREE.Clock();

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      depth: true,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight); // +200 customised for portfolio page
    document
      .querySelector("#barycollisionscontainer")
      .appendChild(this.renderer.domElement);

    // camera
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.z = 5;

    // raycaster
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.point = new THREE.Vector3(0, 0, 0);

    // scene
    this.scene = new THREE.Scene();
    const fogColor = new THREE.Color(0x000000);
    const Fog = new THREE.FogExp2(fogColor, 5);
    this.scene.background = fogColor;
    this.scene.fog = Fog;

    // controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.uniforms = {};

    // init
    this.mousemove();
    this.physics();
    this.addObjects();
    this.animate();
    //this.onWindowResize();
    this.initListeners();
    this.settings();
  }

  settings() {
    //let that = this;
    // this.settings = {
    //   createBody: function () {
    //     that.createBody();
    //   },
    // };
    // this.gui = new dat.GUI();
    // this.gui.add(this.settings, "createBody");
    this.controls.enableZoom = false;
    this.controls.enableRotate = false;
  }

  mousemove() {
    let that = this;
    this.testPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    if ("ontouchstart" in window) {
      window.addEventListener(
        "touchmove",
        (event) => {
          this.mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
          this.mouse.y =
            (event.touches[0].clientY / window.innerHeight) * 2 - 1;

          this.raycaster.setFromCamera(this.mouse, this.camera);

          let intersects = this.raycaster.intersectObjects([this.testPlane]);
          if (intersects.length > 0) {
            //console.log(-intersects[0].point.y);
            that.point = intersects[0].point;
            that.point.y = -that.point.y; // need to invert y for some reason
          }
        },
        false
      );
    } else {
      window.addEventListener(
        "mousemove",
        (event) => {
          this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          this.mouse.y = (event.clientY / window.innerHeight) * 2 - 1;

          this.raycaster.setFromCamera(this.mouse, this.camera);

          let intersects = this.raycaster.intersectObjects([this.testPlane]);
          if (intersects.length > 0) {
            //console.log(-intersects[0].point.y);
            that.point = intersects[0].point;
            that.point.y = -that.point.y; // need to invert y for some reason
          }
        },
        false
      );
    }
  }

  initListeners() {
    window.addEventListener("resize", (event) => {
      this.onWindowResize.bind(this);
    });
    // if ("ontouchstart" in window)
    //   document.addEventListener("touchmove", move.bind(this));
    // else {
    //   window.addEventListener("resize", this.onWindowResize.bind(this), false);
    //   document.addEventListener("mousemove", move.bind(this));
    // }
    // function move(evt) {
    //   this.uniforms.u_mouse.value.x = evt.touches
    //     ? evt.touches[0].clientX
    //     : evt.clientX;
    //   this.uniforms.u_mouse.value.y = evt.touches
    //     ? evt.touches[0].clientY
    //     : evt.clientY;
    // }
  }

  addObjects() {
    // this.geometry1 = new THREE.TetrahedronBufferGeometry(0.7);
    // this.geometry2 = new THREE.TetrahedronBufferGeometry(0.7);
    // this.geometry3 = new THREE.TetrahedronGeometry(0.7);
    let count;
    if (window.innerWidth > 1000) count = 20;
    else if (window.innerWidth > 800) count = 10;
    else count = 3;
    const geometries = [];
    for (let i = 0; i < count; i++) {
      geometries.push(new THREE.TetrahedronBufferGeometry(0.7));
    }

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
      //wireframe: true,
    });

    //this.mesh = new THREE.Mesh(this.geometry, this.material);

    // this.createBody(this.geometry1);
    // this.createBody(this.geometry2);
    // this.createBody(this.geometry3);
    geometries.forEach((g) => {
      this.createBody(g);
    });
  }

  physics() {
    this.bodies = [];
    this.world = new OIMO.World({
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
      worldscale: 1, // scale full world
      random: true, // randomize sample
      info: false, // calculate statistic or not
      gravity: [0, 0, 0],
    });

    // the mouse body (to interpret an object at the mouse position)
    this.body = this.world.add({
      type: "box", // type of shape : sphere, box, cylinder
      size: [1, 1, 1], // size of shape
      pos: [0, 0, 0], // start position in degree
      rot: [0, 0, 90], // start rotation in degree
      move: true, // dynamic or statique
      density: 1,
      noSleep: true,
      friction: 0.2,
      restitution: 0.2,
      belongsTo: 1, // The bits of the collision groups to which the shape belongs.
      collidesWith: 0xffffffff, // The bits of the collision groups with which the shape collides.
    });
    this.ground = this.world.add({ size: [40, 1, 40], pos: [0, -3.2, 0] }); // -3.2
    this.ground1 = this.world.add({ size: [40, 1, 40], pos: [0, 3.2, 0] });

    this.left = this.world.add({
      size: [1, 40, 40],
      pos: [-((window.innerWidth / 1000) * 3), 0, 0],
    });
    this.right = this.world.add({
      size: [1, 40, 40],
      pos: [(window.innerWidth / 1000) * 3, 0, 0],
    });

    this.front = this.world.add({ size: [40, 40, 1], pos: [0, 0, 1] });
    this.back = this.world.add({ size: [40, 40, 1], pos: [0, 0, -1] });
    // this.left.position.x = -((window.innerWidth / 1000) * 3);
    // this.right.position.x = (window.innerWidth / 1000) * 3;
  }

  createBody(geometryToAdd) {
    let object = {};
    let body = this.world.add({
      type: "box", // type of shape : sphere, box, cylinder
      size: [1, 1, 1], // size of shape
      pos: [0, 0, 0], // start position in degree
      rot: [0, 0, 90], // start rotation in degree
      move: true, // dynamic or statique
      density: 1,
      friction: 0.2,
      restitution: 0.2,
      belongsTo: 1, // The bits of the collision groups to which the shape belongs.
      collidesWith: 0xffffffff, // The bits of the collision groups with which the shape collides.
    });
    // let mesh = new THREE.Mesh(
    //   new THREE.BoxBufferGeometry(1),
    //   new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    // );

    let pos = geometryToAdd.attributes.position;
    let count = pos.count / 3;
    let barycentricCoords = [];
    for (let i = 0; i < count; i++) {
      barycentricCoords.push(0, 0, 1, 0, 1, 0, 1, 0, 0);
    }
    barycentricCoords = new Float32Array(barycentricCoords);
    geometryToAdd.setAttribute(
      "barycentric",
      new THREE.BufferAttribute(barycentricCoords, 3)
    );

    let mesh = new THREE.Mesh(geometryToAdd, this.material);
    object.body = body;
    object.mesh = mesh;

    this.scene.add(mesh);

    this.bodies.push(object);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.controls.update();

    // physics oimo
    this.world.step();
    this.body.awake();

    this.body.setPosition(this.point);
    // this.mesh.position.copy(this.body.getPosition());
    // this.mesh.quaternion.copy(this.body.getQuaternion());

    this.bodies.forEach((b) => {
      b.mesh.position.copy(b.body.getPosition());
      b.mesh.quaternion.copy(b.body.getQuaternion());
    });
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
    if (this.left && this.right) {
      this.left.position.x = -((window.innerWidth / 1000) * 3);
      this.right.position.x = (window.innerWidth / 1000) * 3;
    }
  }
}
export default BaryShapeCollisions;
