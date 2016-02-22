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
var sun;
var planet1;
var planet2;
var planet3;
var planet4;
var planet5;
var moon;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //The sun
    sun = new gameObject(new SphereGeometry(1, 8, 6), new LambertMaterial({ color: 0x000000 }), 0, 0, 0);
    scene.add(sun);
    //Create planets
    planet1 = new gameObject(new SphereGeometry(1, 8, 6), new LambertMaterial({ color: 0x00ff00 }), 25, 0, 0);
    planet2 = new gameObject(new SphereGeometry(2, 8, 6), new LambertMaterial({ color: 0x0000ff }), -15, 0, 0);
    planet3 = new gameObject(new SphereGeometry(6, 8, 6), new LambertMaterial({ color: 0xffb6e6 }), -40, 0, 10);
    planet4 = new gameObject(new SphereGeometry(4, 8, 6), new LambertMaterial({ color: 0x3a3c2d }), 20, 0, 0);
    planet5 = new gameObject(new SphereGeometry(5, 8, 6), new LambertMaterial({ color: 0xffb6c1 }), 0, 5, 10);
    //Create moon
    moon = new gameObject(new SphereGeometry(0.5, 8, 6), new LambertMaterial({ color: 0xff00ff }), 6, 0, 0);
    //Add planets as children to sun object   
    sun.add(planet1);
    sun.add(planet2);
    sun.add(planet3);
    sun.add(planet4);
    sun.add(planet5);
    //Add moon as children to planet5
    planet5.add(moon);
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    //Add a PointLight to the scene
    pointLight = new PointLight(0xffffff);
    pointLight.position.set(0, 0, 0);
    pointLight.castShadow = true;
    pointLight.intensity = 1;
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
    sun.rotation.y += control.rotationSpeed;
    planet5.rotation.y += 0.1;
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xffffff, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 70;
    camera.position.z = -20.5;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}

//# sourceMappingURL=game.js.map
