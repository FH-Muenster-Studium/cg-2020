import Component from "./scenegraph/component.js";
import Cube from "./cube.js";
import Sphere from "./sphere.js";
import OrbitalPeriod from "./orbital-period.js";

export default class Orb extends Component {

    constructor(name, diameter, tilt, distance, rotationPeriod, material, texture) {
        super(name);
        this.diameter = diameter;
        this.distance = distance;
        this.z = 0;
        if (this.distance == null) {
            this.distance = 0;
        }
        this.scale = this.diameter / 20000;

        this.setTranslation([-this.distance, 0, this.z]);

        const rotationPeriodChild = new OrbitalPeriod(this.name + "-Orbital-Period", rotationPeriod, [0, 1, 0]);
        rotationPeriodChild.setRotation(tilt, [0, 0, -1]);
        this.addChild(rotationPeriodChild);
        rotationPeriodChild.addChild(material);
        material.addChild(texture);
        if (name === "Moon") {
            texture.addChild(new Cube(this.name + "-Cube", this.scale));
        } else {
            texture.addChild(new Sphere(this.name + "-Sphere", this.scale));
        }
    }
}
