import * as THREE from 'three';
import Experience from './Experience.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(
      6.199735335717815,
      0.0102627499103431,
      1.6207682661006921
    );

    this.instance.layers.set(0);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minPolarAngle = Math.PI / 3 - 0.1;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1;
    this.controls.minAzimuthAngle = (Math.PI / 2) * 0.75;
    this.controls.maxAzimuthAngle = (Math.PI / 2) * 1;
    this.controls.minDistance = 6.199735335717815;
    this.controls.maxDistance = 8;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
