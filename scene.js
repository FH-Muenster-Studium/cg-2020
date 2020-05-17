import Orbit from "./orbit.js";
import Orb from "./orb.js";
import Component from "./scenegraph/component.js";
import SceneGraph from "./scenegraph/sceneGraph.js";
import Camera from "./camera.js";
import * as vec3 from "./gl-matrix/vec3.js";
import KeyboardControl from "./keyboard-control.js";

export default class Scene {

    constructor() {
        // Sun
        this.sunOrbit = new Orbit("Sun-Orbit", 0, 0, 0);
        this.sun = new Orb("Sun", 25000, 7.25, 0);
        this.sunOrbit.addChild(this.sun);

        // Earth
        this.earthOrbit = new Orbit("Earth-Orbit", 150, 0, 0);
        this.earth = new Orb("Earth", 12800, 23.45, 2.5);
        this.earthOrbit.addChild(this.earth);
        this.sunOrbit.addChild(this.earthOrbit);

        // Mars
        this.marsOrbit = new Orbit("Mars-Orbit", 230, 1.85, 0);
        this.mars = new Orb("Mars", 6800, 25.19, 4.3);
        this.marsOrbit.addChild(this.mars);
        this.sunOrbit.addChild(this.marsOrbit);

        // Moon
        this.moonOrbit = new Orbit("Moon-Orbit", 0.384, 5.15, 0);
        this.moon = new Orb("Moon", 3476, 1.54, 1);
        this.moonOrbit.addChild(this.moon);
        this.earth.addChild(this.moonOrbit);

        this.scene = new Component("Scene");

        this.position = vec3.fromValues(0.0, 0.0, 0.0);
        this.camera = new Camera("Camera", this.position, -5);
        this.keyboardControl = new KeyboardControl("Keyboard");

        this.scene.addChild(this.camera);
        this.scene.addChild(this.keyboardControl);
        this.scene.addChild(this.sunOrbit);

        this.scenegraph = new SceneGraph(this.scene);
    }

    draw(now) {
        const deltaTime = now - this.then;
        this.then = now;
        this.scenegraph.draw(deltaTime);
    }
}