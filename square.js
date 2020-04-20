import Triangle from "./triangle.js";
import {vec3} from "./gl-matrix";

export default class Square {
    constructor(v1, v2, v3) {
        let v4 = vec3.create();
        let multiply = vec3.create();
        vec3.set(multiply, -1.0, -1.0, -1.0);
        vec3.mul(v4, v2, multiply);
        this.triangle1 = new Triangle(v1, v2, v3);
        this.triangle2 = new Triangle(v1, v3, v4);
    }

    draw() {
        this.triangle1.draw();
        this.triangle2.draw();
    }
}