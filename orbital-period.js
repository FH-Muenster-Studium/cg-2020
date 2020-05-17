import Component from "./scenegraph/component.js";

export default class OrbitalPeriod extends Component {

    constructor(name, orbitalPeriod) {
        super(name);
        //360° = orbitalPeriod Tage * 24 * 60 * 60 * 1000
        if (orbitalPeriod === 0) {
            this.oneRotationInMilliseconds = null;
        } else {
            this.oneRotationInMilliseconds = orbitalPeriod * 24.0 * 60.0 * 60.0 * 1000.0;
        }
    }

    draw(now) {
        if (this.oneRotationInMilliseconds !== null) {
            const currentMovement = now / this.oneRotationInMilliseconds;
            this.setRotation(currentMovement * 360, [0, 0, -1]);
        }
        return super.draw(now);
    }
}
