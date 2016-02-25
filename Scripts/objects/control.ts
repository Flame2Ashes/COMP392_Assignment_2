/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++

        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
      
        public switchToPlanet(): void {
            planet3.add(camera);
            camera.fov = 45 * 0.1;  
            camera.updateProjectionMatrix();
     }
        
        public switchToSystem(): void {
            sun.add(camera);
            camera.position.x = -1800;
            camera.position.y = 1700;
            camera.position.z = 1800;
            camera.lookAt(new Vector3(0, 0, 0));
            camera.fov = 45;
            camera.updateProjectionMatrix();
        }
    }
}
