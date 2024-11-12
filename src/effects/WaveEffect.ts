import { Mesh } from "three";
import { BaseEffect } from "./BaseEffect";

export class WaveEffect extends BaseEffect {
    constructor() {
        super();
    }
    public animate(meshes: Mesh[],time: number) {
        const sortedMeshes = meshes.sort((a, b) => {
            return a.position.y - b.position.y
        });
        sortedMeshes.forEach((mesh, index) => {
            mesh.position.z = Math.sin(time * 0.001 + (index* 0.05)) * 2
        })
    }
}