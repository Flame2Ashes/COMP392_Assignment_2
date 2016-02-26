/// <reference path="../../typings/tsd.d.ts"/>
//Source file: control.ts
//Author: Angelina Gutierrez
//Last Modified by: Angelina Gutierrez
//Date last modified: 02/26/2016
//Description: Contains public methods for the GUI controls
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        function Control() {
        }
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        //Switch camera to view planet3
        Control.prototype.switchToPlanet = function () {
            planet3.add(camera);
            camera.fov = 45 * 0.1;
            camera.updateProjectionMatrix();
        };
        //Switch camera to view system
        Control.prototype.switchToSystem = function () {
            sun.add(camera);
            camera.position.x = -1500;
            camera.position.y = 1400;
            camera.position.z = 1500;
            camera.lookAt(new Vector3(0, 0, 0));
            camera.fov = 40;
            camera.updateProjectionMatrix();
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
