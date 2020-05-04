import Orbit from "./orbit.js";
import Orb from "./orb.js";
import Component from "./scenegraph/component.js";
import SceneGraph from "./scenegraph/sceneGraph.js";
import Camera from "./camera.js";
import * as vec3 from "./gl-matrix/vec3.js";
import KeyboardControl from "./keyboard-control.js";

export default class Scene {

    constructor() {
        this.sunOrbit = new Orbit("Sun-Orbit", 0, 0, 0);
        this.sun = new Orb("Sun", 25000, 7.25, 0, this.getYellowColorMatrix());
        this.earthOrbit = new Orbit("Earth-Orbit", 150, 0, 0);
        this.marsOrbit = new Orbit("Mars-Orbit", 230, 1.85, 0);
        this.sunOrbit.addChild(this.sun);
        this.sunOrbit.addChild(this.earthOrbit);
        this.sunOrbit.addChild(this.marsOrbit);
        this.earth = new Orb("Earth", 12800, 23.45, 2.5, this.getGreenColorMatrix());
        this.moonOrbit = new Orbit("Moon-Orbit", 0.384, 5.15, 0);
        this.moon = new Orb("Moon", 3476, 1.54, 1, this.getGreyColorMatrix());
        this.moonOrbit.addChild(this.moon);
        this.earth.addChild(this.moonOrbit);
        this.earthOrbit.addChild(this.earth);
        this.mars = new Orb("Mars", 6800, 25.19, 4.3, this.getRedColorMatrix());
        this.marsOrbit.addChild(this.mars);
        this.scene = new Component("Scene");

        this.position = vec3.fromValues(0.0, 0.0, 0.0);
        this.camera = new Camera("Camera", this.position, -5);
        this.keyboardControl = new KeyboardControl();

        this.scene.addChild(this.camera);
        this.scene.addChild(this.keyboardControl);
        this.scene.addChild(this.sunOrbit);

        this.scenegraph = new SceneGraph(this.scene);
    }

    draw() {
        this.scenegraph.draw();
    }

    rotateScene() {
        this.orbitRotationScale = 1;
        this.orbRotationScale = 50;

        this.rotateOrb(this.sun, 25.38);
        this.rotateOrb(this.earth, 1.01);
        this.rotateOrb(this.moon, 27.32);
        this.rotateOrb(this.mars, 1.03);
        this.rotateOrbit(this.earthOrbit, 365);
        this.rotateOrbit(this.moonOrbit, 27.32);
        this.rotateOrbit(this.marsOrbit, 687);
    }

    rotateOrb(node, degree) {
        node.setRotation(360 / (degree * this.orbRotationScale), [0, 1, 0]);
    }

    rotateOrbit(node, degree) {
        node.setRotation(-360 / (degree * this.orbitRotationScale), [0, 1, 0]);
    }

    getYellowColorMatrix() {
        return [
            1.0, 1.0, 0.2, 1.0,
            1.0, 1.0, 0.4, 1.0,
            1.0, 1.0, 0.3, 1.0
        ];
    }

    getRedColorMatrix() {
        return [
            0.8, 0.1, 0.1, 1.0,
            0.8, 0.1, 0.1, 1.0,
            0.8, 0.1, 0.1, 1.0
        ];
    }

    getGreenColorMatrix() {
        return [
            0.1, 1.0, 0.1, 1.0,
            0.1, 1.0, 0.1, 1.0,
            0.1, 1.0, 0.1, 1.0
        ];
    }

    getGreyColorMatrix() {
        return [
            0.8, 0.8, 0.8, 1.0,
            0.8, 0.8, 0.8, 1.0,
            0.8, 0.8, 0.8, 1.0
        ];
    }
}
