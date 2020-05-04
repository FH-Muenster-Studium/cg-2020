import {projectionMatrix, modelMatrix, viewMatrix, gl} from "./webglstart.js";
import Component from "./scenegraph/component.js";
import {glMatrix, vec3, mat4} from "./gl-matrix/index.js";

export default class Camera extends Component {
    constructor(name, position, distance, upAxis) {
        super(name);
        this.position = position;
        this.distance = distance;
        this.upAxis = upAxis;

        if (this.upAxis == null) {
            this.upAxis = vec3.fromValues(0, 1.0, 0);
        }

        // Set the center as the point the projection is looking at
        this.center = vec3.create();
        this.center[0] = this.position[0];
        this.center[1] = this.position[0];
        this.center[2] = this.position[0] + this.distance;

        // sets the transformation of the projection
        this.transformation = mat4.create();
        mat4.lookAt(this.transformation, this.position, this.center, this.upAxis);

        // Set the parameter for setting/changing the projectionMatrix
        this.fieldOfView = 60;
        this.aspectRatio = gl.viewportWidth / gl.viewportHeight;
        this.near = 0.1;
        this.far = 100;

        mat4.identity(modelMatrix);
        mat4.fromTranslation(viewMatrix, [0, 0, this.distance]);
        mat4.identity(projectionMatrix);
        mat4.mul(modelMatrix, modelMatrix, this.transformation);
    }

    draw() {
        mat4.perspective(projectionMatrix, glMatrix.toRadian(this.fieldOfView), this.aspectRatio, this.near, this.far);
    }

    moveProjection() {
        mat4.perspective(projectionMatrix, glMatrix.toRadian(this.fieldOfView), this.aspectRatio, this.near, this.far);
    }

}
