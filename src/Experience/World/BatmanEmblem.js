import * as THREE from 'three';
import Experience from '../Experience.js';

export default class BatmanEmblem {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('BatmanEmblem');
      this.debugFolder.close();
    }

    // Resource
    this.resource = this.resources.items.batmanEmblem;

    this.setModel();
    // this.setSpotLight();
    this.setPlane();
    // this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.2, 0.2, 0.2);
    this.model.position.set(-9.9, 2.7, 0);
    this.model.rotation.set(1, 1.5, -1.638);
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.material.color.r = 0;
        child.material.color.g = 0;
        child.material.color.b = 0;
      }
    });
    this.model.rotation.x = Math.PI / 2;
    this.model.castShadow = true;
    // this.model.receiveShadow = true;

    if (this.debug.active) {
      this.debugFolder
        .add(this.model.position, 'x')
        .name('modelX')
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        .add(this.model.position, 'y')
        .name('modelY')
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        .add(this.model.position, 'z')
        .name('modelZ')
        .min(-5)
        .max(5)
        .step(0.001);
      this.debugFolder
        .add(this.model.rotation, 'x')
        .name('modelRotationX')
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        .add(this.model.rotation, 'y')
        .name('modelRotationY')
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        .add(this.model.rotation, 'z')
        .name('modelRotationZ')
        .min(-5)
        .max(5)
        .step(0.001);
    }
  }

  setSpotLight() {
    this.spotLight = new THREE.SpotLight(0xffff00);
    this.spotLight.position.set(0, 3, 0);
    this.spotLight.intensity = 2;
    this.spotLight.distance = 0;
    this.spotLight.angle = 20;
    this.spotLight.penumbra = 0.003;
    this.spotLight.decay = 0;
    this.spotLight.power = 10;

    this.spotLight.map = new THREE.TextureLoader().load('./emblemTexture.jpg');
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024 / 4;
    this.spotLight.shadow.mapSize.height = 1024 / 4;
    this.spotLight.shadow.camera.near = -4;
    this.spotLight.shadow.camera.fov = 30;
    this.spotLight.shadow.camera.far = 10;

    this.targetObject = this.model;
    this.spotLight.target = this.targetObject;

    this.scene.add(this.targetObject);
    this.scene.add(this.spotLight.target);
    this.scene.add(this.spotLight);

    if (this.debug.active) {
      this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
      this.spotLightCameraHelper = new THREE.CameraHelper(
        this.spotLight.shadow.camera
      );
      this.spotLightHelper.cone = true;
      this.spotLightHelper.light = true;

      this.scene.add(this.spotLightHelper);
      // this.scene.add(this.spotLightCameraHelper);

      this.spotLight.updateWorldMatrix();
      this.spotLightCameraHelper.update();

      this.debugFolder
        .add(this.spotLight.position, 'x')
        .name('spotLightX')
        .min(-100)
        .max(100)
        .step(0.001);

      this.debugFolder
        .add(this.spotLight.position, 'y')
        .name('spotLightY')
        .min(-100)
        .max(100)
        .step(0.001);

      this.debugFolder
        .add(this.spotLight.position, 'z')
        .name('spotLightZ')
        .min(-100)
        .max(100)
        .step(0.001);

      this.debugFolder
        .add(this.spotLight, 'intensity')
        .name('intensity')
        .min(0)
        .max(100)
        .step(0.1);

      this.debugFolder
        .add(this.spotLight.shadow.mapSize, 'width')
        .name('shadowWidth')
        .min(2)
        .max(1024)
        .step(2);

      this.debugFolder
        .add(this.spotLight.shadow.mapSize, 'height')
        .name('shadowHeight')
        .min(2)
        .max(1024)
        .step(2);

      this.debugFolder
        .add(this.spotLight.shadow.camera, 'fov')
        .name('cameraFov')
        .min(0)
        .max(180)
        .step(1);
      this.debugFolder
        .add(this.spotLight.shadow.camera, 'near')
        .name('cameraNear')
        .min(-10)
        .max(100)
        .step(1);
      this.debugFolder
        .add(this.spotLight.shadow.camera, 'far')
        .name('cameraFar')
        .min(-10)
        .max(100)
        .step(1);

      this.debugFolder
        .add(this.spotLight, 'distance')
        .name('distance')
        .min(0)
        .max(100)
        .step(0.1);

      this.debugFolder
        .add(this.spotLight, 'angle')
        .name('angle')
        .min(0)
        .max(3)
        .step(1);

      this.debugFolder
        .add(this.spotLight, 'penumbra')
        .name('penumbra')
        .min(0)
        .max(1)
        .step(0.1);

      this.debugFolder
        .add(this.spotLight, 'decay')
        .name('decay')
        .min(0)
        .max(10)
        .step(1);
      this.debugFolder
        .add(this.spotLight, 'power')
        .name('power')
        .min(0)
        .max(100)
        .step(0.1);
    }
  }

  setPlane() {
    this.planeMesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.5, 30),
      new THREE.MeshBasicMaterial({
        color: 0xffff00,
        transparent: true,
        opacity: 0.2,
      })
    );
    this.scene.add(this.planeMesh);
    this.planeMesh.rotation.y = Math.PI * 0.5;
    this.planeMesh.position.y = 3;
    this.planeMesh.position.x = -10;
  }

  update() {
    this.yPos = Math.cos(this.time.elapsed * 0.0003) * 0.4;
    this.xPos = Math.cos(this.time.elapsed * 0.0003) * 0.8;

    this.planeMesh.position.y = this.yPos + 4;
    this.model.position.y = this.yPos + 3.7;
    this.planeMesh.position.z = this.xPos + 2;
    this.model.position.z = this.xPos + 2;

    // this.spotLightHelper.update();
    // this.animation.mixer.update(this.time.delta * 0.001);
  }
}
