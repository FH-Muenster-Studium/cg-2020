import MatrixStack from "../matrix-stack/matrixstack.js";
import * as mat4 from "../gl-matrix/mat4.js";
import {gl, shaderProgram} from "../webglstart.js";

export default class SceneGraph {

    constructor(rootNode) {
        this.root = rootNode;
        this.logString = "";
        this.matrixStack = new MatrixStack();
        this.modelViewMatrix = mat4.create();
    }

    drawTraversal(node) {
        mat4.multiply(this.modelViewMatrix, this.modelViewMatrix, node.modelViewMatrix);
        this.matrixStack.push(this.modelViewMatrix);

        this.logString += "{"

        this.logString += node.name;

        this.logString += "[";

        const children = node.getChildren();
        for (let c = 0; c < children.length; c++) {
            this.drawTraversal(children[c]);
        }

        this.matrixStack.pop();
        this.logString += "]";

        this.logString += "}";

        /* draw the node after leaving it */
        gl.uniformMatrix4fv(shaderProgram.vMatrixUniform, false, this.modelViewMatrix);
        node.draw();

        /* set the local matrix to the matrix of the parent */
        this.modelViewMatrix = this.matrixStack.top();
    }

    draw() {

        this.logString = "";

        console.log("Zeichne Szenegraph: ");

        console.log("Bspl: {Knoten,[{Kind,[]}]}");

        mat4.identity(this.modelViewMatrix);
        this.drawTraversal(this.root);

        console.log(this.logString);
        console.log("Zeichnen des Szenegraphen abgeschlossen.");
    }
}
