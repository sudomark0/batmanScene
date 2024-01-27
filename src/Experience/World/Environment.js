import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.axesHelper = new THREE.AxesHelper(5);
      this.axesHelper.setColors('red', 'green', 'blue');
      this.scene.add(this.axesHelper);
      this.debugFolder = this.debug.ui.addFolder('environment');
      this.debugFolder.close();
    }

    this.setSunLight();
    this.setPointLight();

    this.setFog();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#c2c5cc', 4);
    this.sunLight.castShadow = true;

    this.sunLight.shadow.camera.near = -5;
    this.sunLight.shadow.camera.far = 8;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(-1.14, 1.0, 0.083);
    this.sunLight.intensity = 0.15;
    this.scene.add(this.sunLight);

    // Debug
    if (this.debug.active) {
      this.directionalLightCameraHelper = new THREE.CameraHelper(
        this.sunLight.shadow.camera
      );
      //   this.scene.add(this.directionalLightCameraHelper);

      this.debugFolder
        .add(this.sunLight, 'intensity')
        .name('sunLightIntensity')
        .min(0)
        .max(10)
        .step(0.001);

      this.debugFolder
        .add(this.sunLight.position, 'x')
        .name('sunLightX')
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        .add(this.sunLight.position, 'y')
        .name('sunLightY')
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        .add(this.sunLight.position, 'z')
        .name('sunLightZ')
        .min(-5)
        .max(5)
        .step(0.001);
    }
  }

  setPointLight() {
    this.pointLight = new THREE.PointLight('#aa4203', 1);
    this.pointLight.intensity = 2;
    this.pointLight.position.set(1, 1, 1);
    this.scene.add(this.pointLight);

    this.pointLight.castShadow = false;
    this.pointLight.shadow.camera.near = -2;
    this.pointLight.shadow.camera.far = 2;
    this.pointLight.position.set(-0.918, 0.55, 1.963);

    if (this.debug.active) {
      this.pointLightHelper = new THREE.PointLightHelper(
        this.pointLight,
        0.1,
        'red'
      );

      this.pointLight.updateWorldMatrix();
      this.pointLightHelper.update();

      this.scene.add(this.pointLightHelper);

      this.debugFolder
        .add(this.pointLight, 'intensity')
        .name('pointLightIntensity')
        .min(0)
        .max(10)
        .step(0.001);

      this.debugFolder
        .add(this.pointLight.position, 'x')
        .name('pointLightX')
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        .add(this.pointLight.position, 'y')
        .name('pointLightY')
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        .add(this.pointLight.position, 'z')
        .name('pointLightZ')
        .min(-5)
        .max(5)
        .step(0.001);
    }
  }

  setFog() {
    this.scene.fog = new THREE.Fog('#211d20', 1, 20);
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.361;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;

    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.environmentMap, 'intensity')
        .name('envMapIntensity')
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(this.environmentMap.updateMaterials);
    }
  }
}
