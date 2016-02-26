/// <reference path="../../typings/tsd.d.ts"/>
//Source file: control.ts
//Author: Angelina Gutierrez
//Last Modified by: Angelina Gutierrez
//Date last modified: 02/26/2016
//Description: Contains public methods for the GUI controls
module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++

        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
      //Switch camera to view planet3
        public switchToPlanet(): void {
            planet3.add(camera);
            camera.fov = 45 * 0.1;  
            camera.updateProjectionMatrix();
     }
        //Switch camera to view system
        public switchToSystem(): void {
            sun.add(camera);
            camera.position.x = -1500;
            camera.position.y = 1400;
            camera.position.z = 1500;
            camera.lookAt(new Vector3(0, 0, 0));
            camera.fov = 40;
            camera.updateProjectionMatrix();
        }
    }
}
