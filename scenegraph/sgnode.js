import * as mat4 from "../gl-matrix/mat4.js";
import {glMatrix} from "../gl-matrix/index.js";

export default class SGNode {

    constructor(name, material) {
        this.children = [];
        this.name = name;
        this.parent = this;
        this.modelMatrix = mat4.create();
        mat4.identity(this.modelMatrix);
        this.printIt = 1;
        this.material = material;
    }

    getChildren() {
        return this.children;
    }

    getChildrenCount() {
        return this.children.length;
    }

    getLastChild() {
        return this.children[this.children.length - 1];
    }

    getName() {
        return this.name;
    }

    getParent() {
        return this.parent;
    }

    getGrandParent(){
        return this.getParent().getParent();
    }

    getMaterial() {
        return this.material;
    }

    addChild(node) {
        this.children.push(node);
        node.parent = this;
    }

    getModelMatrix() {
        return this.modelMatrix;
    }

    draw(now) {
    }

    printName() {
        return this.name + ",";
    }

    setTransformation(degree, rVec, tVec) {
        this.setTranslation(tVec);
        this.setRotation(degree, rVec);
    }

    setRotation(degree, vec) {
        mat4.rotate(this.modelMatrix, this.modelMatrix, glMatrix.toRadian(degree), vec);
    }

    setTranslation(vec) {
        mat4.translate(this.modelMatrix, this.modelMatrix, vec);
    }

    printNodeData() {
        if (this.printIt == 1 && !(this instanceof Material)) {
            if (this.getMaterial() != null) {
                console.log("Node: '" + this.getName() + "' --- Parent: '" + this.getParent().getName() + "' --- Material: '" + this.material + "'");
            } else {
                console.log("Node: '" + this.getName() + "' --- Parent: '" + this.getParent().getName() + "'");
            }
            this.printIt = 0;
        }
    }
}
