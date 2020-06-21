import Triangle from "./triangle.js";
import {vec3} from "./gl-matrix/index.js";
import SGNode from "./scenegraph/sgnode.js";
import {gl, shaderProgram} from "./webglstart.js";

export default class Square extends SGNode {
    constructor(v1, v2, v3) {
        super("Square");
        let v4 = vec3.create();
        let multiply = vec3.create();
        vec3.set(multiply, -1.0, -1.0, -1.0);
        vec3.mul(v4, v2, multiply);
        this.triangle1 = new Triangle(v1, v2, v3);
        this.triangle2 = new Triangle(v1, v3, v4);

        this.uv1 = [
            0, 1,
            1, 1,
            1, 0,
        ];

        this.uv2 = [
            1, 0,
            0, 0,
            0, 1,
        ];
        this.initBuffers();
    }

    initBuffers() {
        this.texturePositionBuffer1 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer1);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv1), gl.STATIC_DRAW);

        this.texturePositionBuffer2 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer2);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv2), gl.STATIC_DRAW);
    }

    draw(now) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer1);
        gl.vertexAttribPointer(shaderProgram.texturePositionAttribute, 2, gl.FLOAT, false, 0, 0);
        this.triangle1.draw();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer2);
        gl.vertexAttribPointer(shaderProgram.texturePositionAttribute, 2, gl.FLOAT, false, 0, 0);
        this.triangle2.draw();
        super.draw(now);
    }
}