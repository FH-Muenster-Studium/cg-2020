import MatrixStack from "../matrix-stack/matrixstack.js";
import * as mat4 from "../gl-matrix/mat4.js";
import {gl, shaderProgram} from "../webglstart.js";

export default class SceneGraph {

    constructor(rootNode) {
        this.root = rootNode;
        this.matrixStack = new MatrixStack();
        this.modelMatrix = mat4.create();
    }

    drawTraversal(node) {
        //node.printNodeData();

        mat4.multiply(this.modelMatrix, this.modelMatrix, node.modelMatrix);
        this.matrixStack.push(this.modelMatrix);

        /* draw the node after leaving it */
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);
        node.draw();

        let children = node.getChildren();
        for (let c = 0; c < children.length; c++) {
            this.drawTraversal(children[c]);
        }
        this.matrixStack.pop();

        /* set the local matrix to the matrix of the parent */
        this.modelMatrix = this.matrixStack.top();
    }

    draw() {
        mat4.identity(this.modelMatrix);
        this.drawTraversal(this.root);
    }
}