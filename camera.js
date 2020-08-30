import {projectionMatrix, gl} from "./webglstart.js";
import Component from "./scenegraph/component.js";
import {glMatrix, vec3, mat4} from "./gl-matrix/index.js";

// Transformationen der Kamera müssen invertiert werden da die objekte nicht die kamera sich bewegen
// Kamera schaut nach links = objekte bewegen sich nach rechts

// Alle Objekte in der szene sind Kinder der Kamera
// Kameratransformation T'Kamera = T'Verschiebung * T'Rotation
// T'View = T'Kamera * (-1) (siehe oben Kamera nach links = Objekte nach rechts)
export default class Camera extends Component {
    constructor(name, position, distance, up) {
        super(name);
        this.position = position;
        this.distance = distance;
        this.up = up;

        if (this.up == null) {
            this.up = vec3.fromValues(0.0, 1.0, 0);
        }

        // Set the center as the point the projection is looking at
        this.center = vec3.create();
        this.center[0] = this.position[0];
        this.center[1] = this.position[0];
        this.center[2] = this.position[0] + this.distance;

        // sets the transformation of the projection
        this.transformation = mat4.create();
        mat4.lookAt(this.transformation, this.position, this.center, this.up);

        // Set the parameter for setting/changing the projectionMatrix
        this.fieldOfView = 60;
        this.aspectRatio = gl.viewportWidth / gl.viewportHeight;
        this.near = 0.1;
        this.far = 500;

        this.rotationX = 0.0;
        this.rotationY = 0.0;

        this.v = vec3.create();
        this.vNorm = vec3.create();
        vec3.sub(this.v, this.center, this.position);
        vec3.normalize(this.vNorm, this.v);
        //this.vNormSmall = vec3.create();
        //vec3.mul(this.vNormSmall, this.vNorm, [0.01, 0.01, 0.01]);

        // sets the transformation of the projection
        this.transformation = mat4.create();
        mat4.lookAt(this.transformation, this.position, this.center, this.up);

        mat4.identity(projectionMatrix);
    }

    draw(now) {
        mat4.identity(this.modelMatrix);
        mat4.mul(this.modelMatrix, this.modelMatrix, this.transformation);
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

    // Kamera schaut nach links = objekte bewegen sich nach rechts
    left() {
        const m = vec3.create();
        vec3.cross(m, this.up, this.vNorm);
        vec3.add(this.position, this.position, m);
        vec3.add(this.center, this.center, m);
        mat4.lookAt(this.transformation, this.position, this.center, this.up);
    }

    // Kamera schaut nach rechts = objekte bewegen sich nach links
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

    // Kamera schaut nach rechts = objekte bewegen sich nach links
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

    // Kamera schaut nach rechts = objekte bewegen sich nach links
    lookRight() {
        vec3.rotateY(this.center, this.center, this.position, -0.05);
        this.rotationY -= 0.05;
        vec3.sub(this.v, this.center, this.position);
        vec3.normalize(this.vNorm, this.v);
        mat4.lookAt(this.transformation, this.position, this.center, this.up);
    }
}