import Component from "./scenegraph/component.js";

export default class OrbitalPeriod extends Component {

    constructor(name, orbitalPeriod, vec) {
        super(name);
        if (!vec) {
            this.vec = [0, -1, 0];
        } else {
            this.vec = vec;
        }
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
            this.setRotation(currentMovement * 360, this.vec);
        }
        return super.draw(now);
    }
}
