import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Rain {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.time = this.experience.time;

    this.setGeometry();
    // this.setTextures();

    this.setMaterial();
    this.setMesh();
    // this.setBackgroundLight();

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Moon');
      this.debugFolder.close();
      this.setDebug();
    }
  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry();
    this.particlesCount = 4000;
    this.resetHeight = 2; // Höhe, bei der die Partikel zurückgesetzt werden
    this.positions = new Float32Array(this.particlesCount * 3);

    for (let i = 0; i < this.particlesCount; i++) {
      this.i3 = i * 3;

      this.positions[this.i3] = (Math.random() - 0.5) * 20;
      this.positions[this.i3 + 1] = (Math.random() - 0.5) * 20;
      this.positions[this.i3 + 2] = (Math.random() - 0.5) * 20;
    }

    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(this.positions, 3)
    );
    // this.geometry.center();
  }

  setTextures() {
    this.textures = {};

    this.textures.color = this.resources.items.moonColorTexture;
    this.textures.elevationMap = this.resources.items.moonElevationMapTexture;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;
  }

  setMaterial() {
    this.material = new THREE.PointsMaterial({
      color: 0x4a6583,
      size: 0.01,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,

      // transparent: true,
    });
  }

  setMesh() {
    this.mesh = new THREE.Points(this.geometry, this.material);

    this.scene.add(this.mesh);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder
        .add(this.mesh.position, 'x')
        .name('positionX')
        .min(-30)
        .max(30)
        .step(0.01);
      this.debugFolder
        .add(this.mesh.position, 'y')
        .name('positionY')
        .min(-30)
        .max(30)
        .step(0.01);
      this.debugFolder
        .add(this.mesh.position, 'z')
        .name('positionY')
        .min(-30)
        .max(30)
        .step(0.01);
    }
  }

  update() {
    for (let i = 0; i < this.particlesCount; i++) {
      this.i3 = i * 3;

      this.positions[this.i3 + 1] -= 0.1 * Math.random();

      if (this.positions[this.i3 + 1] < -this.resetHeight) {
        this.positions[this.i3 + 1] = 10;
      }
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
}
