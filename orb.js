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

        if (name === "Moon") {
            this.addChild(new Cube(this.name + "-Cube", this.scale, this.color));
        } else {
            this.addChild(new Sphere(this.name + "-Sphere", this.scale));
        }

        this.setRotation(this.tilt, [0, 0, -1]);
        this.setTranslation([-this.distance, 0, this.z]);
        //360° = 27,32 * 24 * 60 * 60 * 1000
        this.oneRotationInMilliseconds = 27.32 * 24.0 * 60.0 * 60.0 * 1000.0;
    }

    draw(now) {
        const currentMovement = now / this.oneRotationInMilliseconds;
        console.log(currentMovement * 360);
        this.setRotation(currentMovement, [0, 0, -1]);
        return super.draw(now);
    }
}
