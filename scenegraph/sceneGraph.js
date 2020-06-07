import MatrixStack from "../matrix-stack/matrixstack.js";
import * as mat4 from "../gl-matrix/mat4.js";
import {mat3} from "../gl-matrix/index.js";
import {gl, shaderProgram, viewMatrix} from "../webglstart.js";
import Light from "../light.js";

export default class SceneGraph {

    constructor(rootNode) {
        this.root = rootNode;
        this.matrixStack = new MatrixStack();
        this.modelMatrix = mat4.create();
        this.logString = "";
        this.lastLogString = null;
    }

    drawTraversal(node, now) {
        mat4.multiply(this.modelMatrix, this.modelMatrix, node.modelMatrix);
        this.matrixStack.push(this.modelMatrix);

        this.logString += "{"

        this.logString += node.name;

        this.logString += "[";

        let nMatrix = mat3.create();
        let mvMatrix = mat4.create();

        mat4.multiply(mvMatrix, viewMatrix, this.modelMatrix);
        mat3.normalFromMat4(nMatrix, mvMatrix);
        gl.uniformMatrix3fv(shaderProgram.uNormalMatrixUniform, false, nMatrix);
        /* draw the node after leaving it */
        gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, this.modelMatrix);

        if (node instanceof Light) {
            node.updatePosition(mvMatrix);
        }
        node.draw(now);

        let children = node.getChildren();
        for (let c = 0; c < children.length; c++) {
            this.drawTraversal(children[c], now);
        }
        this.matrixStack.pop();

        this.logString += "]";

        this.logString += "}";

        /* set the local matrix to the matrix of the parent */
        this.modelMatrix = this.matrixStack.top();
    }

    draw(now) {
        this.logString = "";
        mat4.identity(this.modelMatrix);
        this.drawTraversal(this.root, now);
        if (this.lastLogString !== this.logString) {
            console.log(this.logString);
            this.lastLogString = this.logString;
        }
    }
}