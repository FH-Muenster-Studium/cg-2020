import SGNode from "./sgnode";

export class Component extends SGNode {

    constructor(name) {
        super();
        this.name = name;
    }

    draw() {
        return this.name + ",";
    }
}
