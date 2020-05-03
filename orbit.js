import Component from "./scenegraph/component.js";
import Cube from "./cube.js";

export default class Orbit extends Component {

    constructor(name, radius, tilt, distance, color) {
        super(name);
        this.radius = radius;
        this.tilt = tilt;
        this.distance = distance;
        this.color = color;
        if(this.distance == null){
            this.distance = 0;
        }

        this.setRotation(this.tilt, [0, 0, -1]);
        this.setTranslation([-this.distance, 0, 0]);
    }
}
