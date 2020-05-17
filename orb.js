import Component from "./scenegraph/component.js";
import Cube from "./cube.js";
import Sphere from "./sphere.js";
import OrbitalPeriod from "./orbital-period.js";

export default class Orb extends Component {

    constructor(name, diameter, distance, rotationPeriod, color) {
        super(name);
        this.diameter = diameter;
        this.distance = distance;
        this.color = color;
        this.z = 0;
        if (this.distance == null) {
            this.distance = 0;
        }
        this.scale = this.diameter / 20000;

        this.setTranslation([-this.distance, 0, this.z]);

        const rotationPeriodChild = new OrbitalPeriod(this.name + "-Orbital-Period", rotationPeriod, [0, 1, 0]);
        this.addChild(rotationPeriodChild);
        if (name === "Moon") {
            rotationPeriodChild.addChild(new Cube(this.name + "-Cube", this.scale, this.color));
        } else {
            rotationPeriodChild.addChild(new Sphere(this.name + "-Sphere", this.scale));
        }
    }
}
