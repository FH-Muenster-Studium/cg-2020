import Orbit from "./orbit.js";
import Orb from "./orb.js";
import Component from "./scenegraph/component.js";
import SceneGraph from "./scenegraph/sceneGraph.js";
import Camera from "./camera.js";
import * as vec3 from "./gl-matrix/vec3.js";

export default class Scene {

    constructor() {
        this.sunOrbit = new Orbit("Sonnen-Orbit", 0, 0, 0);
        this.sun = new Orb("Sonne", 25000, 7.25, 0, this.getYellowColorMatrix());
        this.earthOrbit = new Orbit("Erd-Orbit", 150, 0, 0);
        this.marsOrbit = new Orbit("Mars-Orbit", 230, 1.85, 0);
        this.sunOrbit.addChild(this.sun);
        this.sunOrbit.addChild(this.earthOrbit);
        this.sunOrbit.addChild(this.marsOrbit);
        this.earth = new Orb("Erde", 12800, 23.45, 2.5, this.getGreenColorMatrix());
        this.moonOrbit = new Orbit("Mond-Orbit", 0.384, 5.15, 0);
        this.moon = new Orb("Mond", 3476, 1.54, 1, this.getGreyColorMatrix());
        this.moonOrbit.addChild(this.moon);
        this.earth.addChild(this.moonOrbit);
        this.earthOrbit.addChild(this.earth);
        this.mars = new Orb("Mars", 6800, 25.19, 4.3, this.getRedColorMatrix());
        this.marsOrbit.addChild(this.mars);
        this.scene = new Component("Scene");

        this.position = vec3.fromValues(0.0, 0.0, 0.0);
        this.camera = new Camera("Camera", this.position, -5);

        this.scene.addChild(this.camera);
        this.scene.addChild(this.sunOrbit);

        this.scenegraph = new SceneGraph(this.scene);
    }

    draw() {
        this.scenegraph.draw();
        //this.rotateScene();
    }

    rotateScene() {
        /* Scale the rotations, because they hurt my eyes (bigger = slower, smaller = faster) */
        this.orbitRotationScale = 1;
        this.planetRotationScale = 50;

        /* Rotate the planets */
        this.rotatePlanet(this.sun, 25.38);
        this.rotatePlanet(this.earth, 1.01);
        this.rotatePlanet(this.moon, 27.32);
        this.rotatePlanet(this.mars, 1.03);
        this.rotateOrbit(this.earthOrbit, 365);
        this.rotateOrbit(this.moonOrbit, 27.32);
        this.rotateOrbit(this.marsOrbit, 687);
    }

    rotatePlanet(node, degree) {
        node.setRotation(360 / (degree * this.planetRotationScale), [0, 1, 0]);
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

    getBlackColorMatrix() {
        return [
            0.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 0.0, 1.0,
        ];
    }
}