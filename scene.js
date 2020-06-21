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
import Texture from "./texture.js";

export default class Scene {

    constructor() {
        this.then = 0;
        // Sun
        this.sunOrbit = new Orbit("Sun-Orbit", 0, 0, 0);
        this.sun = new Orb("Sun", 25000, 7.25, 0, 25.38, this.createSunMaterial(), new Texture("sun-texture", "./textures/sun.jpg"));
        this.sunOrbit.addChild(this.sun);

        // Sun Light
        const position = vec4.fromValues(0.0, 0.0, 0.0, 1.0);
        const ambient = vec4.fromValues(0.5, 0.5, 0.5, 1);
        const diffuse = vec4.fromValues(0.5, 0.5, 0.5, 1);
        const specular = vec4.fromValues(1, 1, 1, 1);
        const sunLight = new Light("Sun-Light", position, ambient, diffuse, specular);
        this.sunOrbit.addChild(sunLight);

        // Earth
        this.earthOrbit = new Orbit("Earth-Orbit", 150, 0, 0);
        this.earthOrbitOrbitalPeriod = new OrbitalPeriod("Earth-Orbit-Orbital-Period", 365);
        this.earth = new Orb("Earth", 12800, 23.45, 6, 1.0, this.createEarthMaterial(), new Texture("Earth-texture", "./textures/earth.jpg"));
        this.earthOrbitOrbitalPeriod.addChild(this.earth);
        this.earthOrbit.addChild(this.earthOrbitOrbitalPeriod);
        this.sunOrbit.addChild(this.earthOrbit);

        // Mars
        this.marsOrbit = new Orbit("Mars-Orbit", 230, 1.85, 0);
        this.marsOrbitOrbitalPeriod = new OrbitalPeriod("Mars-Orbit-Orbital-Period", 687);
        this.mars = new Orb("Mars", 6800, 25.19, 8, 1.03, this.createMarsMaterial(), new Texture("Mars-texture", "./textures/mars.jpg"));
        this.marsOrbitOrbitalPeriod.addChild(this.mars);
        this.marsOrbit.addChild(this.marsOrbitOrbitalPeriod);
        this.sunOrbit.addChild(this.marsOrbit);

        // Moon
        this.moonOrbit = new Orbit("Moon-Orbit", 0.384, 5.15, 0);
        this.moonOrbitOrbitalPeriod = new OrbitalPeriod("Moon-Orbit-Orbital-Period", 27.32);
        this.moon = new Orb("Moon", 3476, 1.54, 1, 27.32, this.createMoonMaterial(), new Texture("Moon-texture", "./textures/borg-cube.jpg"));
        this.moonOrbitOrbitalPeriod.addChild(this.moon);
        this.moonOrbit.addChild(this.moonOrbitOrbitalPeriod);
        this.earth.addChild(this.moonOrbit);

        // Merkur
        this.merkurOrbit = new Orbit("Merkur-Orbit", 60, 7.00, 0);
        this.merkurOrbitOrbitalPeriod = new OrbitalPeriod("Merkur-Orbit-Orbital-Period", 88);
        this.merkur = new Orb("Merkur", 4900, 0, 2.5, 58.65, this.createMarsMaterial(), new Texture("Merkur-texture", "./textures/mercury.jpg"));
        this.merkurOrbitOrbitalPeriod.addChild(this.merkur);
        this.merkurOrbit.addChild(this.merkurOrbitOrbitalPeriod);
        this.sunOrbit.addChild(this.merkurOrbit);

        // Venus
        this.venusOrbit = new Orbit("Venus-Orbit", 110, 3.40, 0);
        this.venusOrbitOrbitalPeriod = new OrbitalPeriod("Venus-Orbit-Orbital-Period", 226);
        this.venus = new Orb("Venus", 12100, 177.36, 4.2, 243, this.createMarsMaterial(), new Texture("Venus-texture", "./textures/venus.jpg"));
        this.venusOrbitOrbitalPeriod.addChild(this.venus);
        this.venusOrbit.addChild(this.venusOrbitOrbitalPeriod);
        this.sunOrbit.addChild(this.venusOrbit);

        // Jupiter
        this.jupiterOrbit = new Orbit("Jupiter-Orbit", 800, 1.04, 0);
        this.jupiterOrbitOrbitalPeriod = new OrbitalPeriod("Jupiter-Orbit-Orbital-Period", 4329);
        this.jupiter = new Orb("Jupiter", 143000, 3.12, 20, 0.41 , this.createMarsMaterial(), new Texture("Jupiter-texture", "./textures/jupiter.jpg"));
        this.jupiterOrbitOrbitalPeriod.addChild(this.jupiter);
        this.jupiterOrbit.addChild(this.jupiterOrbitOrbitalPeriod);
        this.sunOrbit.addChild(this.jupiterOrbit);

        // Saturn
        this.saturnOrbit = new Orbit("Saturn-Orbit", 1400, 2.48, 0);
        this.saturnOrbitOrbitalPeriod = new OrbitalPeriod("Saturn-Orbit-Orbital-Period", 10753);
        this.saturn = new Orb("Saturn", 120500, 26.73, 80, 0.43 , this.createMarsMaterial(), new Texture("Saturn-texture", "./textures/saturn.jpg"));
        this.saturnOrbitOrbitalPeriod.addChild(this.saturn);
        this.saturnOrbit.addChild(this.saturnOrbitOrbitalPeriod);
        this.sunOrbit.addChild(this.saturnOrbit);

        // Uranus
        this.uranusOrbit = new Orbit("Uranus-Orbit", 2800, 0.77, 0);
        this.uranusOrbitOrbitalPeriod = new OrbitalPeriod("Uranus-Orbit-Orbital-Period", 30664);
        this.uranus = new Orb("Uranus", 51100, 97.86, 160, 0.75, this.createMarsMaterial(), new Texture("Uranus-texture", "./textures/uranus.jpg"));
        this.uranusOrbitOrbitalPeriod.addChild(this.uranus);
        this.uranusOrbit.addChild(this.uranusOrbitOrbitalPeriod);
        this.sunOrbit.addChild(this.uranusOrbit);

        // Neptun
        this.neptunOrbit = new Orbit("Neptun-Orbit", 4500, 1.77, 0);
        this.neptunOrbitOrbitalPeriod = new OrbitalPeriod("Neptun-Orbit-Orbital-Period", 60152);
        this.neptun = new Orb("Neptun", 49500, 29.58, 200, 0.80, this.createMarsMaterial(), new Texture("Neptun-texture", "./textures/neptune.jpg"));
        this.neptunOrbitOrbitalPeriod.addChild(this.neptun);
        this.neptunOrbit.addChild(this.neptunOrbitOrbitalPeriod);
        this.sunOrbit.addChild(this.neptunOrbit);

        this.scene = new Component("Scene");

        this.position = vec3.fromValues(0.0, 0.0, 0.0);
        this.camera = new Camera("Camera", this.position, -15);
        this.keyboardControl = new KeyboardControl("Keyboard");

        this.scene.addChild(this.camera);
        this.scene.addChild(this.keyboardControl);
        this.scene.addChild(this.sunOrbit);

        this.scenegraph = new SceneGraph(this.scene);
    }

    //http://devernay.free.fr/cours/opengl/materials.html

    createSunMaterial() {
        let emission = vec4.fromValues(1.0, 1.0, 0, 1);
        let ambient = vec4.fromValues(0.24725, 0.1995, 0.0745, 1);
        let diffuse = vec4.fromValues(0.75164, 0.60648, 0.22648, 1);
        let specular = vec4.fromValues(0.628281, 0.555802, 0.366065, 1);
        let shininess = 1;

        return new Material("Sun-Material", emission, ambient, diffuse, specular, shininess);
    }

    createEarthMaterial() {
        let emission = vec4.fromValues(0, 0, 0, 10);
        let ambient = vec4.fromValues(0.135, 0.2225, 0.1575, 10);
        let diffuse = vec4.fromValues(0.54, 0.89, 0.63, 10);
        let specular = vec4.fromValues(0.316228, 0.316228, 0.316228, 10);
        let shininess = 0.6;

        return new Material("Earth-Material", emission, ambient, diffuse, specular, shininess);
    }

    createMarsMaterial() {
        let emission = vec4.fromValues(0, 0, 0, 10);
        let ambient = vec4.fromValues(0.1745, 0.01175, 0.01175, 10);
        let diffuse = vec4.fromValues(0.61424, 0.04136, 0.04136, 10);
        let specular = vec4.fromValues(0.727811, 0.626959, 0.626959, 10);
        let shininess = 0.6;

        return new Material("Mars-Material", emission, ambient, diffuse, specular, shininess);
    }

    createMoonMaterial() {
        let emission = vec4.fromValues(0, 0, 0, 10);
        let ambient = vec4.fromValues(0.19225, 0.19225, 0.19225, 10);
        let diffuse = vec4.fromValues(0.50754, 0.50754, 0.50754, 10);
        let specular = vec4.fromValues(0.508273, 0.508273, 0.508273, 10);
        let shininess = 0.4;

        return new Material("Moon-Material", emission, ambient, diffuse, specular, shininess);
    }

    draw(now) {
        if (isNaN(now)) return;
        const deltaTime = now - this.then;
        this.then = now;
        this.scenegraph.draw(deltaTime * 1000000);
    }
}