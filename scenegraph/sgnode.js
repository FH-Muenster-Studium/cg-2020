export default class SGNode {

    constructor() {
        this.children = [];
    }

    getChildren() {
        return this.children;
    }

    addChild(node) {
        this.children.push(node);
    }

    draw() {
    }
}
