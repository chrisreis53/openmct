define(
    [],
    function () {
        "use strict";
        /**
         *
         * @constructor
         */
        function navballDirective($scope) {
            // Build up a template from example extensions
            var template;
            return {
              restrict: 'EA',
              scope: true,
              bindToController: true,
              template: template,
              link: function($scope, elem, attr){

                console.log($scope.heading);
                console.log("test");

                function dr (deg) {
                  return deg*(Math.PI/180);
                }

                var camera, scene, renderer, container, ball, cyl;
                var previous_hdg = 270,
                    previous_pitch = 0,
                    previous_roll = 0;

                // rotation vectors
                var X = new THREE.Vector3 (1,0,0);
                var Y = new THREE.Vector3 (0,1,0);
                var Z = new THREE.Vector3 (0,0,1);

                setInterval (function () {
                  //var X_val = 0.001 * Math.PI * Math.random();
                  var Y_val = -1 * dr(($scope.heading - previous_hdg));
                  previous_hdg = $scope.heading;
                  //var Y_val = 0.001 * Math.PI * Math.random();
                  var X_val = dr(-1 * ($scope.pitch - previous_pitch));
                  previous_pitch = $scope.pitch;
                  //var Z_val = 0.001 * Math.PI * Math.random();
                  var Z_val = dr(1 * ($scope.roll - previous_roll));
                  previous_roll = $scope.roll;
                  ball.rotateOnAxis(Y, Y_val);
                  ball.rotateOnAxis(X, X_val);
                  ball.rotateOnAxis(Z, Z_val);
                  cyl.rotateOnAxis(Y, Y_val );
                },100);

                function init(){
                  scene = new THREE.Scene();
                  //scene.fog = new THREE.FogExp2(0x000000, 0.0035);
                  var SCREEN_WIDTH = 400, SCREEN_HEIGHT = 400;
                  var VIEW_ANGLE = 45, ASPECT = 1, NEAR = 1, FAR = 2000;
                  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
                  scene.add(camera);
                  camera.position.set(0,0,120);
                  camera.lookAt(scene.position);
                  renderer = new THREE.WebGLRenderer();
                  //renderer = new THREE.CanvasRenderer();
                  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
                  container = document.getElementById( 'navball' );
                  container.appendChild( renderer.domElement );
                  var light = new THREE.PointLight(0xffffff);
                  light.position.set(0,150,100);
                  scene.add(light);
                  // radius, segmentsWidth, segmentsHeight
                  var sphereGeom =  new THREE.SphereGeometry( 30, 58, 58 );
                  THREE.ImageUtils.crossOrigin = '';
                  var moonTexture = THREE.ImageUtils.loadTexture( 'ji80w.png' );
                  moonTexture.anisotropy = 32;
                  var moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );
                  ball = new THREE.Mesh( sphereGeom.clone(), moonMaterial );
                  ball.position.set(0, 0, 0);
                  scene.add( ball );

                  var cylinderGeom = new THREE.CylinderGeometry( 30, 30, 5,40,1);
                  var materialArray = [];
                  var hdgTexture = THREE.ImageUtils.loadTexture( 'HDG.png' );
                  var aFaces = cylinderGeom.faces.length;
                  for(var i=0;i<aFaces;i++) {
                    if(i < 80){
                      cylinderGeom.faces[i].materialIndex = 0;
                    }else{
                      cylinderGeom.faces[i].materialIndex = 2;
                    }
                  }
                  materialArray.push(new THREE.MeshBasicMaterial( { map: hdgTexture, overdraw: false, transparent: true }));
                  materialArray.push(new THREE.MeshBasicMaterial( { color: 0x00FF00 }));
                  materialArray.push(new THREE.MeshBasicMaterial( { color: 0x000000, alpha: true }));
                  var cylMaterial = new THREE.MeshFaceMaterial(materialArray);
                  cyl = new THREE.Mesh( cylinderGeom.clone(), cylMaterial );
                  cyl.position.set(0, 36.5, 0);
                  cyl.rotateOnAxis (X, dr(10));
                  cyl.rotateOnAxis (Y, dr(-270));
                  scene.add( cyl );

                };

                function animate()
                {
                  requestAnimationFrame( animate );
                	renderer.render(scene, camera);
                  //$scope.variables.heading();
                  $scope.variables.info();
                };

                init();
                animate();

              }
            };
        }

        return navballDirective;
    }
);
