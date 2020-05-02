import Triangle from "./triangle.js";

export default class Rectangle {

    constructor(v1, v2, v3, v4) {
        this.triangle1 = new Triangle(v1, v2, v3);
        this.triangle2 = new Triangle(v1, v3, v4);
    }

    draw() {
        this.triangle1.draw();
        this.triangle2.draw();
    }
}
