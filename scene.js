import Orbit from "./orbit.js";
import Orb from "./orb.js";
import Component from "./scenegraph/component.js";
import SceneGraph from "./scenegraph/sceneGraph.js";
import Camera from "./camera.js";
import * as vec3 from "./gl-matrix/vec3.js";
import KeyboardControl from "./keyboard-control.js";
import OrbitalPeriod from "./orbital-period.js";
import Light from "./light.js";
import Material from "./material.js";
import {vec4} from "./gl-matrix/index.js";

export default class Scene {

    constructor() {
        this.then = 0;

        // Sun Material
        const emissionSun = vec4.create();
        vec4.set(emissionSun, 1.0, 1.0, 1.0, 1.0);
        const ambientSun = vec4.create();
        vec4.set(ambientSun, 0.24725, 0.1995, 0.0745, 1.0);
        const diffuseSun = vec4.create();
        vec4.set(diffuseSun, 0.75164, 0.60648, 0.22648, 1.0);
        const specularSun = vec4.create();
        vec4.set(specularSun, 0.628281, 0.555802, 0.366065, 1.0);
        const shininessSun = 0.4;
        const sunMaterial = new Material(emissionSun, ambientSun, diffuseSun, specularSun, shininessSun * 128.0);

        // Sun
        this.sunOrbit = new Orbit("Sun-Orbit", 0, 0, 0);
        this.sun = new Orb("Sun", 25000, 7.25, 0, 25.38, undefined, sunMaterial);
        this.sunOrbit.addChild(this.sun);

        // Sun Light
        const position = vec4.create();
        vec4.set(position, 0.0, 0.0, 0.0, 1.0);
        const ambient = vec4.create();
        vec4.set(ambient, 1.0, 1.0, 1.0, 1.0);
        const diffuse = vec4.create();
        vec4.set(diffuse, 1.0, 1.0, 1.0, 1.0);
        const specular = vec4.create();
        vec4.set(specular, 1.0, 1.0, 1.0, 1.0);
        const sunLight = new Light(position, ambient, diffuse, specular);
        this.sun.addChild(sunLight);

        // Earth
        this.earthOrbit = new Orbit("Earth-Orbit", 150, 0, 0);
        this.earthOrbitOrbitalPeriod = new OrbitalPeriod("Earth-Orbit-Orbital-Period", 365);
        this.earth = new Orb("Earth", 12800, 23.45, 2.5, 1.0);
        this.earthOrbitOrbitalPeriod.addChild(this.earth);
        this.earthOrbit.addChild(this.earthOrbitOrbitalPeriod);
        //this.sunOrbit.addChild(this.earthOrbit);

        // Mars
        this.marsOrbit = new Orbit("Mars-Orbit", 230, 1.85, 0);
        this.marsOrbitOrbitalPeriod = new OrbitalPeriod("Mars-Orbit-Orbital-Period", 687);
        this.mars = new Orb("Mars", 6800, 25.19, 4.3, 1.03);
        this.marsOrbitOrbitalPeriod.addChild(this.mars);
        this.marsOrbit.addChild(this.marsOrbitOrbitalPeriod);
        //this.sunOrbit.addChild(this.marsOrbit);

        // Moon
        this.moonOrbit = new Orbit("Moon-Orbit", 0.384, 5.15, 0);
        this.moonOrbitOrbitalPeriod = new OrbitalPeriod("Moon-Orbit-Orbital-Period", 27.32);
        this.moon = new Orb("Moon", 3476, 1.54, 1, 27.32);
        this.moonOrbitOrbitalPeriod.addChild(this.moon);
        this.moonOrbit.addChild(this.moonOrbitOrbitalPeriod);
        this.earth.addChild(this.moonOrbit);

        this.scene = new Component("Scene");

        this.position = vec3.fromValues(0.0, 0.0, 0.0);
        this.camera = new Camera("Camera", this.position, -15);
        this.keyboardControl = new KeyboardControl("Keyboard");

        this.scene.addChild(this.camera);
        this.scene.addChild(this.keyboardControl);
        this.scene.addChild(this.sunOrbit);

        this.scenegraph = new SceneGraph(this.scene);
    }

    draw(now) {
        if (isNaN(now)) return;
        const deltaTime = now - this.then;
        this.then = now;
        this.scenegraph.draw(deltaTime * 1000000);
    }
}