import { Mesh } from "three";

export abstract class BaseEffect {
    protected constructor() {
    }
    public abstract animate(meshes: Mesh[], time: number): void;
}