import {gl, shaderProgram} from "./webglstart.js";
import SGNode from "./scenegraph/sgnode.js";
import {vec3} from "./gl-matrix/index.js";

export default class Triangle extends SGNode {

    constructor(v1, v2, v3) {
        super("Triangle");
        this.vertices = [
            v1[0], v1[1], v1[2],
            v2[0], v2[1], v2[2],
            v3[0], v3[1], v3[2]
        ];

        // Set the vectors of the triangle
        this.v1v2 = vec3.fromValues(v2[0]-v1[0], v2[1]-v1[1], v2[2]-v1[2]);
        this.v1v3 = vec3.fromValues(v3[0]-v1[0], v3[1]-v1[1], v3[2]-v1[2]);

        // Set the normal of the triangle
        this.n = vec3.create();
        vec3.cross(this.n, this.v1v2, this.v1v3);

        this.normals = [
            this.n[0], this.n[1], this.n[2],
            this.n[0], this.n[1], this.n[2],
            this.n[0], this.n[1], this.n[2]
        ];

        this.initBuffers();
    }

    initBuffers() {
        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        this.normalPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
    }

    draw(now) {
        //bindBuffer() immer vor vertexAttribPointer() ausführen,
        //damit der gebundene Buffer in die zugehörige Shader Variable geladen wird!
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.normalPositionAttribute, 3, gl.FLOAT, false, 0, 0);


        gl.drawArrays(gl.TRIANGLES, 0, 3);
        super.draw(now);
    }
}
