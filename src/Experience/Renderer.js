import * as THREE from 'three';
import Experience from './Experience.js';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Renderer');
      this.debugFolder.close();
    }

    this.setInstance();
    this.setRenderPass();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 2.5;
    this.instance.shadowMap.enabled = true;
    //Löschen
    this.instance.outputColorSpace = THREE.SRGBColorSpace;

    // this.instance.shadowMap.autoUpdate = false;
    // this.instance.shadowMap.needsUpdate = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor('#211d20');
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);

    if (this.debug.active) {
      this.debugFolder.add(this.instance, 'toneMapping', {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping,
      });
      this.debugFolder
        .add(this.instance, 'toneMappingExposure')
        .min(0)
        .max(10)
        .step(0.001);
    }
  }

  setRenderPass() {
    this.scene.background = new THREE.Color('#211d20');

    this.renderPass = new RenderPass(this.scene, this.camera.instance);
    this.outputPass = new OutputPass();
    this.composer = new EffectComposer(this.instance);

    this.rgbShift = new ShaderPass(RGBShiftShader);
    // this.composer.addPass(this.rgbShift);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(
        this.experience.sizes.width,
        this.experience.sizes.height
      ),
      0.2,
      0.1,
      0.4
    );
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.outputPass);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.composer.render();

    // this.instance.render(this.scene, this.camera.instance);
  }
}
