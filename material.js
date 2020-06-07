import {shaderProgram, gl} from "./webglstart.js";
import SGNode from "./scenegraph/sgnode.js";

export default class Material extends SGNode {
    constructor(name, emission, ambient, diffuse, specular, shininess) {
        super(name);
        this.emission = emission;
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.shininess = shininess;

        shaderProgram.materialEmission = gl.getUniformLocation(shaderProgram, "uMaterialEmission");
        shaderProgram.materialAmbient = gl.getUniformLocation(shaderProgram, "uMaterialAmbient");
        shaderProgram.materialDiffuse = gl.getUniformLocation(shaderProgram, "uMaterialDiffuse");
        shaderProgram.materialSpecular = gl.getUniformLocation(shaderProgram, "uMaterialSpecular");
        shaderProgram.materialShininess = gl.getUniformLocation(shaderProgram, "uMaterialShininess");
    }

    draw() {
        gl.uniform4fv(shaderProgram.materialEmission, this.emission);
        gl.uniform4fv(shaderProgram.materialAmbient, this.ambient);
        gl.uniform4fv(shaderProgram.materialDiffuse, this.diffuse);
        gl.uniform4fv(shaderProgram.materialSpecular, this.specular);
        gl.uniform1f(shaderProgram.materialShininess, this.shininess);
    }
}