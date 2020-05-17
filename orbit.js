import Component from "./scenegraph/component.js";

export default class Orbit extends Component {

    constructor(name, radius, tilt, distance) {
        super(name);
        this.radius = radius;
        this.tilt = tilt;
        this.distance = distance;
        if(this.distance == null){
            this.distance = 0;
        }

        this.setRotation(this.tilt, [0, 0, -1]);
        this.setTranslation([-this.distance, 0, 0]);
    }
}
