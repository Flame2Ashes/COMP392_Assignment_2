/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var sphere;
var ambientLight;
var pointLight;
var control;
var gui;
var stats;
var step = 0;
//Solar system objects
//Sun components
var sun;
var sunGeometry;
var sunMaterial;
//Planet components
var planet1;
var planet2;
var planet3;
var planet4;
var planet5;
var moon;
//Empty objects
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
    axes = new AxisHelper(100);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //The sun
    sunGeometry = new SphereGeometry(1, 32, 32);
    sunMaterial = new LambertMaterial({ color: 0xffff00 });
    sunMaterial.transparent = true;
    sun = new Mesh(sunGeometry, sunMaterial);
    /*
     sun = new gameObject(
         new SphereGeometry(1, 32, 32),
         new LambertMaterial({ color: 0x000000}),
         0, 0, 0);
         
         */
    scene.add(sun);
    //Create planets
    //Green planet
    planet1 = new gameObject(new SphereGeometry(10, 32, 32), new LambertMaterial({ color: 0x00ff00 }), 50, 0, 100);
    planet1.name = "Green planet";
    //Blue planet            
    planet2 = new gameObject(new SphereGeometry(20, 32, 32), new LambertMaterial({ color: 0x0000ff }), -150, 0, -50);
    planet2.name = "Blue planet";
    //Pink planet    
    planet3 = new gameObject(new SphereGeometry(60, 32, 32), new LambertMaterial({ color: 0xffb6e6 }), -300, 0, 100);
    planet3.name = "Pink planet";
    //Planet of indeterminant colour
    planet4 = new gameObject(new SphereGeometry(35, 32, 32), new LambertMaterial({ color: 0x3a3c2d }), 225, 0, 0);
    planet4.name = "Planet of indeterminant colour";
    //Brown planet    
    planet5 = new gameObject(new SphereGeometry(50, 32, 32), new LambertMaterial({ color: 0xf4a460 }), 400, 0, -200);
    planet5.name = "Brown planet";
    //Create moon
    moon = new gameObject(new SphereGeometry(5, 32, 32), new LambertMaterial({ color: 0xff00ff }), 80, 0, 0);
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
    //Add moon rotation object to planet5
    planet5.add(moonRotationObject);
    moonRotationObject.add(moon);
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    //Add a PointLight to the scene
    //(Represents the sun's light)
    pointLight = new PointLight(0xffffff);
    pointLight.position.set(0, 0, 0);
    pointLight.castShadow = true;
    pointLight.intensity = 2;
    pointLight.distance = 1000;
    scene.add(pointLight);
    console.log("Added a PointLight to the scene");
    // add controls
    gui = new GUI();
    control = new Control(0.01);
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
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
function gameLoop() {
    stats.update();
    // render using requestAnimationFrame
    //rotation speeds
    moonRotationObject.rotation.y += 0.05;
    planet1RotationObject.rotation.y += 0.02;
    planet2RotationObject.rotation.y += 0.015;
    planet3RotationObject.rotation.y += 0.025;
    planet4RotationObject.rotation.y += 0.01;
    planet5RotationObject.rotation.y += 0.019;
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x080808, 1.0);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, CScreen.RATIO, 0.1, 2000);
    camera.position.x = -500;
    camera.position.y = 250;
    camera.position.z = 500;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}

//# sourceMappingURL=game.js.map
