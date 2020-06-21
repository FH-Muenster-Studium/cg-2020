import {shaderProgram, gl} from "./webglstart.js";
import {mat4, vec4} from "./gl-matrix/index.js";
import Component from "./scenegraph/component.js";

export default class Light extends Component {

    constructor(name, position, ambient, diffuse, specular) {
        super(name);
        this.position = vec4.set(vec4.create(), position[0], position[1], position[2], position[3]);
        this.worldposition = vec4.clone(this.position);
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;

        shaderProgram.lightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
        shaderProgram.lightAmbient = gl.getUniformLocation(shaderProgram, "uLightAmbient");
        shaderProgram.lightDiffuse = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
        shaderProgram.lightSpecular = gl.getUniformLocation(shaderProgram, "uLightSpecular");
    }

    // Einfallswinkel des Blickwinkels der übergeben wird
    updatePosition(mvMatrix) {
        mat4.mul(this.worldposition, mvMatrix, this.position);
    }

    draw(now) {
        gl.uniform4fv(shaderProgram.lightPosition, this.worldposition);
        gl.uniform4fv(shaderProgram.lightAmbient, this.ambient);
        gl.uniform4fv(shaderProgram.lightDiffuse, this.diffuse);
        gl.uniform4fv(shaderProgram.lightSpecular, this.specular);
    }
}