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
        this.isDirectionalLight = this.position[3] === 0;

        if (this.isDirectionalLight) {
            this.position[3] = 1;
        }

        shaderProgram.lightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");
        shaderProgram.lightAmbient = gl.getUniformLocation(shaderProgram, "uLightAmbient");
        shaderProgram.lightDiffuse = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
        shaderProgram.lightSpecular = gl.getUniformLocation(shaderProgram, "uLightSpecular");
    }

    updatePosition(mvMatrix) {

        mat4.mul(this.worldposition, mvMatrix, this.position);

        if (this.isDirectionalLight) {
            this.worldposition[3] = 0;
        }
    }

    draw(now) {
        gl.uniform4fv(shaderProgram.lightPosition, this.worldposition);
        gl.uniform4fv(shaderProgram.lightAmbient, this.ambient);
        gl.uniform4fv(shaderProgram.lightDiffuse, this.diffuse);
        gl.uniform4fv(shaderProgram.lightSpecular, this.specular);
    }
}