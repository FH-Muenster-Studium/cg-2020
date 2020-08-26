import * as mat4 from "../gl-matrix/mat4.js";

export default class MatrixStack {

    constructor() {
        this.stack = [];
    }

    push(mat) {
        this.stack.push(mat4.clone(mat));
    }

    pop() {
        return mat4.clone(this.stack.pop());
    }
}