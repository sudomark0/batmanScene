import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Moon {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
    this.setBackgroundLight();

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Moon');
      this.debugFolder.close();
      this.setDebug();
    }
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(0.8, 64, 64);
  }

  setTextures() {
    this.textures = {};

    this.textures.color = this.resources.items.moonColorTexture;
    this.textures.elevationMap = this.resources.items.moonElevationMapTexture;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,

      displacementMap: this.textures.elevationMap,
      displacementScale: 0.1,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(-11, 4, -6);
    // this.mesh.position.set(0, 2, 0);
    this.scene.add(this.mesh);
  }

  setBackgroundLight() {
    this.pointLight = new THREE.PointLight('#ffffff', 5);
    this.pointLight.intensity = 10;
    this.scene.add(this.pointLight);

    this.pointLight.castShadow = false;
    this.pointLight.shadow.camera.near = -2;
    this.pointLight.shadow.camera.far = 2;
    this.pointLight.position.set(-9, 2, -3);
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
      this.debugFolder
        .add(this.pointLight.position, 'x')
        .name('pointLightpositionX')
        .min(-30)
        .max(30)
        .step(0.01);
      this.debugFolder
        .add(this.pointLight.position, 'y')
        .name('pointLightpositionY')
        .min(-30)
        .max(30)
        .step(0.01);
      this.debugFolder
        .add(this.pointLight.position, 'z')
        .name('pointLightpositionY')
        .min(-30)
        .max(30)
        .step(0.01);
    }
  }
}
