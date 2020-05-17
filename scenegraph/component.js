import SGNode from "./sgnode.js";

export default class Component extends SGNode {

    constructor(name) {
        super();
        this.name = name;
    }

    draw(now) {
        super.draw(now);
        return this.name + ",";
    }
}
