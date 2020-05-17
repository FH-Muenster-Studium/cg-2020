import {gl, shaderProgram} from "./webglstart.js";
import SGNode from "./scenegraph/sgnode.js";

export default class Sphere extends SGNode {

    constructor(name, radius) {
        super();
        this.name = name;

        this.height = 2 * radius;

        this.vertexPositionData = [];

        let latitudeBands = 100;
        let longitudeBands = 100;

        for (let i = 0; i <= latitudeBands; i++) {
            let theta = i * Math.PI / latitudeBands;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);
            for (let j = 0; j <= longitudeBands; j++) {
                let phi = j * 2 * Math.PI / longitudeBands;
                let x = sinTheta * Math.sin(phi);
                let y = cosTheta;
                let z = sinTheta * Math.cos(phi);
                this.vertexPositionData.push(radius * x);
                this.vertexPositionData.push(radius * y);
                this.vertexPositionData.push(radius * z);
            }
        }

        this.indexData = [];
        for (let i = 0; i < latitudeBands; i++) {
            for (let j = 0; j < longitudeBands; j++) {
                let idx0 = (i * (longitudeBands + 1)) + j;
                let idx1 = idx0 + longitudeBands + 1;
                let idx2 = idx0 + 1;
                let idx3 = idx1 + 1;
                this.indexData.push(idx0);
                this.indexData.push(idx1);
                this.indexData.push(idx2);
                this.indexData.push(idx3);
            }
        }

        /*if (color == null) {
            this.colors = [
                0.0, 1.0, 0.2, 1.0,
                1.0, 1.0, 0.4, 1.0,
                1.0, 1.0, 0.3, 1.0
            ];
        }
        else {
            this.colors = color;
        }*/

        this.initBuffers();
    }

    initBuffers() {
        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexPositionData), gl.STATIC_DRAW);

        /*this.verticesColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);*/

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexData), gl.STATIC_DRAW);
    }

    bindBuffers() {
        // Binden des Buffers immer vor vertexAttribPointer() durchführen!
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

        /*gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);*/

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    }

    draw(now) {
        this.bindBuffers();

        gl.drawElements(gl.TRIANGLE_STRIP, this.indexData.length, gl.UNSIGNED_SHORT, 0);
        return this.name;
    }
}