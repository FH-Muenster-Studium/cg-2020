import Cuboid from "./cuboid.js";
import {vec3} from "./gl-matrix";

export default class Cube extends Cuboid {

    constructor(diameter) {
        const extent = diameter / 2;
        let ver1 = vec3.create();
        let ver2 = vec3.create();
        let ver3 = vec3.create();
        let ver4 = vec3.create();
        let ver5 = vec3.create();
        let ver6 = vec3.create();
        let ver7 = vec3.create();
        let ver8 = vec3.create();

        vec3.set(ver1, -extent, extent, extent);
        vec3.set(ver2, -extent, -extent, extent);
        vec3.set(ver3, extent, -extent, extent);
        vec3.set(ver4, extent, extent, extent);
        vec3.set(ver5, -extent, extent, -extent);
        vec3.set(ver6, -extent, -extent, -extent);
        vec3.set(ver7, extent, extent, -extent);
        vec3.set(ver8, extent, -extent, -extent);

        super(ver1, ver2, ver3, ver4, ver5, ver6, ver7, ver8);
    }
}
