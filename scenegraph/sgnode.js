import * as mat4 from "../gl-matrix/mat4.js";
import {glMatrix} from "../gl-matrix/index.js";

export default class SGNode {

    constructor(name) {
        this.children = [];
        this.name = name;
        this.modelMatrix = mat4.create();
        mat4.identity(this.modelMatrix);
    }

    getChildren() {
        return this.children;
    }

    addChild(node) {
        this.children.push(node);
    }

    draw(now) {
    }

    setRotation(degree, vec) {
        mat4.rotate(this.modelMatrix, this.modelMatrix, glMatrix.toRadian(degree), vec);
    }

    setTranslation(vec) {
        mat4.translate(this.modelMatrix, this.modelMatrix, vec);
    }
}
