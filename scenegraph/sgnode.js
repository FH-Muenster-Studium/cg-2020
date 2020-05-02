import * as mat4 from "../gl-matrix/mat4.js";
import {glMatrix} from "../gl-matrix/index.js";

export default class SGNode {

    constructor() {
        this.children = [];
        this.modelViewMatrix = mat4.create();
        mat4.identity(this.modelViewMatrix);
    }

    getChildren() {
        return this.children;
    }

    addChild(node) {
        this.children.push(node);
    }

    setRotation(degree, vec) {
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, glMatrix.toRadian(degree), vec);
    }

    setTranslation(vec) {
        mat4.translate(this.modelViewMatrix, this.modelViewMatrix, vec);
    }

    draw() {
    }
}
