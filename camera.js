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

        this.rotationX = 0.0;
        this.rotationY = 0.0;

        this.v = vec3.create();
        this.vNorm = vec3.create();
        vec3.sub(this.v, this.center, this.position);
        vec3.normalize(this.vNorm, this.v);
        //this.vNormSmall = vec3.create();
        //vec3.mul(this.vNormSmall, this.vNorm, [0.01, 0.01, 0.01]);

        if (this.up == null) {
            this.up = vec3.fromValues(0, 1.0, 0);
        }

        // sets the transformation of the projection
        this.transformation = mat4.create();
        mat4.lookAt(this.transformation, this.position, this.center, this.up);

        mat4.identity(projectionMatrix);
    }

    draw(now) {
        mat4.identity(viewMatrix);
        mat4.mul(viewMatrix, viewMatrix, this.transformation);
        mat4.perspective(projectionMatrix, glMatrix.toRadian(this.fieldOfView), this.aspectRatio, this.near, this.far);
        super.draw(now);
    }

    forward(scale = 1) {
        const out = vec3.create();
        vec3.mul(out, this.vNorm,[scale, scale, scale])
        vec3.add(this.position, this.position, out);
        vec3.add(this.center, this.center, out);
        mat4.lookAt(this.transformation, this.position, this.center, this.up);
    }

    backward() {
        vec3.sub(this.position, this.position, this.vNorm);
        vec3.sub(this.center, this.center, this.vNorm);
        mat4.lookAt(this.transformation, this.position, this.center, this.up);
    }

    left() {
        const m = vec3.create();
        vec3.cross(m, this.up, this.vNorm);
        vec3.add(this.position, this.position, m);
        vec3.add(this.center, this.center, m);
        mat4.lookAt(this.transformation, this.position, this.center, this.up);
    }

    right() {
        const m = vec3.create();
        vec3.cross(m, this.up, this.vNorm);
        vec3.sub(this.position, this.position, m);
        vec3.sub(this.center, this.center, m);
        mat4.lookAt(this.transformation, this.position, this.center, this.up);
    }

    lookUp() {
        if (this.rotationX < 0.5) {
            vec3.rotateY(this.center, this.center, this.position, -this.rotationY);
            vec3.rotateX(this.center, this.center, this.position, 0.05);
            vec3.rotateY(this.center, this.center, this.position, this.rotationY);
            this.rotationX += 0.05;
            vec3.sub(this.v, this.center, this.position);
            vec3.normalize(this.vNorm, this.v);
            mat4.lookAt(this.transformation, this.position, this.center, this.up);
        }
    }

    lookLeft() {
        vec3.rotateY(this.center, this.center, this.position, 0.05);
        this.rotationY += 0.05;
        vec3.sub(this.v, this.center, this.position);
        vec3.normalize(this.vNorm, this.v);
        mat4.lookAt(this.transformation, this.position, this.center, this.up);
    }

    lookDown() {
        if (this.rotationX > -0.5) {
            vec3.rotateY(this.center, this.center, this.position, -this.rotationY);
            vec3.rotateX(this.center, this.center, this.position, -0.05);
            vec3.rotateY(this.center, this.center, this.position, this.rotationY);
            this.rotationX -= 0.05;
            vec3.sub(this.v, this.center, this.position);
            vec3.normalize(this.vNorm, this.v);
            mat4.lookAt(this.transformation, this.position, this.center, this.up);
        }
    }

    lookRight() {
        vec3.rotateY(this.center, this.center, this.position, -0.05);
        this.rotationY -= 0.05;
        vec3.sub(this.v, this.center, this.position);
        vec3.normalize(this.vNorm, this.v);
        mat4.lookAt(this.transformation, this.position, this.center, this.up);
    }
}