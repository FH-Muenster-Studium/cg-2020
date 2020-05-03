import {gl, shaderProgram} from "./webglstart.js";
import SGNode from "./scenegraph/sgnode.js";

export default class Sphere extends SGNode {

    constructor(radius, color) {

        super();

        this.height = 2 * radius;

        this.vertexPositionData = [];

        var latitudeBands = 100;
        var longitudeBands = 100;

        // Erzeuge Punkte, af den Breiten- (latitudeBands) und Längengraden (longitudeBands) einer Kugel
        for (var i = 0; i <= latitudeBands; i++) {
            var theta = i * Math.PI / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);
            for (var j = 0; j <= longitudeBands; j++) {
                var phi = j * 2 * Math.PI / longitudeBands;
                var x = sinTheta * Math.sin(phi);
                var y = cosTheta;
                var z = sinTheta * Math.cos(phi);
                this.vertexPositionData.push(radius * x);
                this.vertexPositionData.push(radius * y);
                this.vertexPositionData.push(radius * z);
            }
        }

        // Erzeuge Reihenfolge, in der die Punkte gezeichnet werden sollen
        this.indexData = [];
        for (var i = 0; i < latitudeBands; i++) {
            for (var j = 0; j < longitudeBands; j++) {
                var idx0 = (i * (longitudeBands + 1)) + j;
                var idx1 = idx0 + longitudeBands + 1;
                var idx2 = idx0 + 1;
                var idx3 = idx1 + 1;;
                this.indexData.push(idx0);
                this.indexData.push(idx1);
                this.indexData.push(idx2);
                this.indexData.push(idx3);
            }
        }

        if (color == null) {
            this.colors = [
                0.0, 1.0, 0.2, 1.0,
                1.0, 1.0, 0.4, 1.0,
                1.0, 1.0, 0.3, 1.0
            ];
        }
        else {
            this.colors = color;
        }


        // Zeichne Kugel mit TRIANGLE_STRIPs
        //
        //  ... * - * - * ...
        //      |  /|  /|
        //      | / | / |
        //  ... * - * - * ...
        //      .
        //      .
        //      0   2   4
        //  ... * - * - * ...
        //      |  /|  /|
        //      | / | / |
        //  ... * - * - * ...
        //      1   3   5
        //      .
        //      .
        //  ... * - * - * ...
        //      |  /|  /|
        //      | / | / |
        //  ... * - * - * ...

        this.initBuffers();
    }

    getHeight() {
        return this.height;
    }

    initBuffers() {
        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexPositionData), gl.STATIC_DRAW);

        this.verticesColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexData), gl.STATIC_DRAW);
    }

    bindBuffers() {
        // Binden des Buffers immer vor vertexAttribPointer() durchführen!
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    }

    draw() {
        this.bindBuffers();

        //Zeichnet Elemente im Array-Buffer gemäß Element-Indices im Index-Buffer
        gl.drawElements(gl.TRIANGLE_STRIP, this.indexData.length, gl.UNSIGNED_SHORT, 0);
    }
}