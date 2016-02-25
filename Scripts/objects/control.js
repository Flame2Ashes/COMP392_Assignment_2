/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        function Control() {
        }
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.switchToPlanet = function () {
            planet3.add(camera);
            camera.fov = 45 * 0.1;
            camera.updateProjectionMatrix();
        };
        Control.prototype.switchToSystem = function () {
            sun.add(camera);
            camera.position.x = -1800;
            camera.position.y = 1700;
            camera.position.z = 1800;
            camera.lookAt(new Vector3(0, 0, 0));
            camera.fov = 45;
            camera.updateProjectionMatrix();
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
