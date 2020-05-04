import SGNode from "./scenegraph/sgnode.js";
import Rectangle from "./rectangle.js";
import {vec3} from "./gl-matrix/index.js";

export default class Cube extends SGNode {

    constructor(name, diameter, color) {
        super();
        const extent = diameter / 2;
        this.name = name;

        var ver1 = vec3.fromValues(-extent, extent, extent);
        var ver2 = vec3.fromValues(-extent, -extent, extent);
        var ver3 = vec3.fromValues(extent, -extent, extent);
        var ver4 = vec3.fromValues(extent, extent, extent);
        var ver5 = vec3.fromValues(-extent, extent, -extent);
        var ver6 = vec3.fromValues(-extent, -extent, -extent);
        var ver7 = vec3.fromValues(extent, extent, -extent);
        var ver8 = vec3.fromValues(extent, -extent, -extent);

        this.rec1 = new Rectangle(ver1, ver2, ver3, ver4, color);
        this.rec2 = new Rectangle(ver5, ver6, ver2, ver1, color);
        this.rec3 = new Rectangle(ver7, ver8, ver6, ver5, color);
        this.rec4 = new Rectangle(ver4, ver3, ver8, ver7, color);
        this.rec5 = new Rectangle(ver5, ver1, ver4, ver7, color);
        this.rec6 = new Rectangle(ver2, ver6, ver8, ver3, color);
    }

    draw() {
        this.rec1.draw();
        this.rec2.draw();
        this.rec3.draw();
        this.rec4.draw();
        this.rec5.draw();
        this.rec6.draw();
        return this.name;
    }
}
