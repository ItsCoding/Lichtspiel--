import { AmbientLight, Color, Light, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { makeCamera, makeRenderer } from "../lib/generators";
import { BaseGenerator } from "../generators/BaseGenerator";
import { CubeGenerator } from "../generators/CubeGenerator";
import { BaseEffect } from "../effects/BaseEffect";
import { WaveEffect } from "../effects/WaveEffect";

export class MainScene extends Scene {
    private renderer!: WebGLRenderer;
    private camera!: PerspectiveCamera;
    private ambientLight!: Light;
    private generator: BaseGenerator;
    private effect: BaseEffect;

    constructor(uiEl: HTMLElement) {
        super();
        this.setupBasics(uiEl);
        this.setupLights();

        this.generator = new CubeGenerator(this);
        this.effect = new WaveEffect();
        requestAnimationFrame(this.animate);
    }

    static create(uiEl: HTMLElement) {
        return new MainScene(uiEl);
    }

    private update = (time: number) => {
        this.effect.animate(this.generator.meshes, time);
    }

    private setupBasics = (uiEl: HTMLElement) => {
        this.renderer = makeRenderer();
        this.camera = makeCamera();
        uiEl.appendChild(this.renderer.domElement);
        this.renderer.render(this, this.camera);
        this.background = new Color("#000000")
    }


    private setupLights = () => {
        this.ambientLight = new AmbientLight(new Color("#fffff"), 10);
        this.add(this.ambientLight);
    }

    private animate = (time: number) => {
        this.update(time)
        this.renderer.render(this, this.camera);
        requestAnimationFrame(this.animate);
    }

}