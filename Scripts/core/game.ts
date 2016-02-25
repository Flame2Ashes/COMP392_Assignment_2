/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import DirectionalLight = THREE.DirectionalLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var sphere: Mesh;
var ambientLight: AmbientLight;
var pointLight: PointLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;

//Solar system objects
//Sun components
var sun: Mesh;
var sunGeometry: SphereGeometry;
var sunMaterial: LambertMaterial;
//Planet components
var planet1: Mesh;
var planet2: Mesh;
var planet3: Mesh;
var planet4: Mesh;
var planet5: Mesh;
var moon: Mesh;

//Empty objects
//Rotation objects
var moonRotationObject = new Object3D();
var planet1RotationObject = new Object3D();
var planet2RotationObject = new Object3D();
var planet3RotationObject = new Object3D();
var planet4RotationObject = new Object3D();
var planet5RotationObject = new Object3D();


function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(500);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
     //The sun
     sunGeometry = new SphereGeometry(100, 32, 32);
     sunMaterial = new LambertMaterial({color: 0xFFFFFF});
     sun = new Mesh(sunGeometry, sunMaterial);
     
    scene.add(sun);
    
    //Create planets
    
    //Green planet
    planet1 = new gameObject(
        new SphereGeometry(10, 32, 32),
        new LambertMaterial({color: 0x5fb43c}),
         150, 0, 200);
    planet1.name = "Green planet";
        
    //Blue planet            
    planet2 = new gameObject(
        new SphereGeometry(20, 32, 32),
        new LambertMaterial({color: 0x3d45a9}),
        250, 0, 350);
    planet2.name = "Blue planet";
    
    
    //Violet planet
    planet3 = new gameObject(
        new SphereGeometry(30, 32, 32),
        new LambertMaterial({color: 0x9671e0}),
        350, 0, 600);
    planet3.name = "Violet planet";
    
    //Pink planet    
    planet4 = new gameObject(
        new SphereGeometry(40, 32, 32),
        new LambertMaterial({color: 0xffb6e6}),
        500, 0, 700);
    planet4.name = "Pink planet";
    
    //Brown planet    
    planet5 = new gameObject(
        new SphereGeometry(50, 32, 32),
        new LambertMaterial({color: 0xf4a460}),
       650, 0, 800);
    planet5.name = "Brown planet";
    

     
     //Create moon
     moon = new gameObject(
         new SphereGeometry(5, 32, 32),
         new LambertMaterial({color: 0xff00ff}),
         50, 0, 0);
     moon.name = "moon";
     
     
     //Add rotation objects as children to sun object 
     sun.add(planet1RotationObject);
     sun.add(planet2RotationObject);
     sun.add(planet3RotationObject);
     sun.add(planet4RotationObject);
     sun.add(planet5RotationObject);
     //Add planets as children to rotation objects
     planet1RotationObject.add(planet1);
     planet2RotationObject.add(planet2);
     planet3RotationObject.add(planet3);
     planet4RotationObject.add(planet4);
     planet5RotationObject.add(planet5);  
     
     //Add moon rotation object to planet3
     
     planet3.add(moonRotationObject);
     moonRotationObject.add(moon);
     
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    //Add a PointLight to the scene
    //(Represents the sun's light)
    pointLight = new PointLight(0xffffff);
    pointLight.position.set(0, 100, 0)
    pointLight.castShadow = true;
    pointLight.intensity = 2;
    pointLight.shadowMapHeight = 2048;
    pointLight.shadowMapWidth = 2048;
    scene.add(pointLight);
    console.log("Added a PointLight to the scene");
    
   
    // add controls
    gui = new GUI();
    control = new Control();
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'switchToPlanet');
    gui.add(controlObject, 'switchToSystem');
            
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}


// Setup main game loop
function gameLoop(): void {
    stats.update();
    // render using requestAnimationFrame

    //rotation speeds
    moonRotationObject.rotation.y += 0.05;
    planet1RotationObject.rotation.y += 0.03;
    planet2RotationObject.rotation.y += 0.025;
    planet3RotationObject.rotation.y += 0.02;
    planet4RotationObject.rotation.y += 0.015;
    planet5RotationObject.rotation.y += 0.01;    
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x080808, 1.0);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, CScreen.RATIO, 0.1, 5000);
    camera.position.x = -1800;
    camera.position.y = 1700;
    camera.position.z = 1800;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
