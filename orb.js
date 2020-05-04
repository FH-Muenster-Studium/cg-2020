import Component from "./scenegraph/component.js";
import Cube from "./cube.js";
import Sphere from "./sphere.js";

export default class Orb extends Component {

    constructor(name, diameter, tilt, distance, color) {
        super(name);
        this.diameter = diameter;
        this.tilt = tilt;
        this.distance = distance;
        this.color = color;
        this.z = 0;
        if (this.distance == null) {
            this.distance = 0;
        }
        this.scale = this.diameter / 20000;

        this.addChild(new Cube(this.name + "-Cube", this.scale, this.color));
        //this.addChild(new Sphere(this.name + "-Sphere", this.scale));

        this.setRotation(this.tilt, [0, 0, -1]);
        this.setTranslation([-this.distance, 0, this.z]);
    }
}
