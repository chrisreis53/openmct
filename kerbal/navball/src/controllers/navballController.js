define(function () {
    function navballController($scope,telemetryHandler) {
      var handle;
      // Use the telemetryHandler to get telemetry objects here
      handle = telemetryHandler.handle($scope.domainObject, function () {
          $scope.telemetryObjects = handle.getTelemetryObjects();
      });

      // Add min/max defaults
      $scope.heading = 0.001;
      $scope.pitch = 0;
      $scope.roll = 0;

        // Persist changes made to a domain object's model
        function persist() {
            var persistence =
                $scope.domainObject.getCapability('persistence');
            return persistence && persistence.persist();
        }

        // Release subscriptions when scope is destroyed
        $scope.$on('$destroy', handle.unsubscribe);

        // WebGL via THREEJS
        $scope.threejs = {
            width:400,
            height:400,
            scene: null,
            camera: null,
            renderer: null,
            container: null,
            box:null,
            initialize: function()
            {
                this.scene = new THREE.Scene();
                this.camera = new THREE.PerspectiveCamera(75, this.width/this.height, 0.1, 100);
                this.renderer = new THREE.WebGLRenderer();

                this.renderer.setSize(this.width, this.height);
                container = document.getElementById( 'navball' );
                container.appendChild( this.renderer.domElement );
                //document.body.appendChild(this.renderer.domElement);

                // Create a Spinning Cube
                var geom = new THREE.BoxGeometry(1,1,1);
                var material = new THREE.MeshLambertMaterial({color:'blue'});

                this.box = new THREE.Mesh(geom, material);

                this.scene.add(this.box);

                this.camera.position.z = 5;
            },
            render: function()
            {
                requestAnimationFrame(this.render.bind(this));

                this.box.rotation.x += 0.1;
                this.box.rotation.y += 0.1;

                this.renderer.render(this.scene, this.camera);
            }
        };

        $scope.variables = {
          heading: function(){
            if(handle){
              console.log("varialble heading test");
              for(var telemetryObject in handle.getTelemetryObjects()){
                console.log($scope.getValue(telemetryObject));
              };
            }
          },
          info: function(){
            $scope.telemetryObjects.forEach(recordData);
          }
        };
        // Get values
        function recordData(telemetryObject) {
          var id = telemetryObject.getId();
          var name = handle.getDomainValue(telemetryObject);
          var datum = handle.getRangeValue(telemetryObject);
          if(id === "example_tlm:N.HEADING2" && typeof datum !== "undefined"){
            //console.log("HDG: " + id + " " + datum + " " + name);
            $scope.heading = datum;
          }
          if(id === "example_tlm:N.ROLL2" && typeof datum !== "undefined"){
            //console.log("ROL: " + id + " " + datum + " " + name);
            $scope.roll = datum;
          }
          if(id === "example_tlm:N.PITCH2" && typeof datum !== "undefined"){
            //console.log("PTC: " + id + " " + datum + " " + name);
            $scope.pitch = datum;
          }
          return datum;
        }

        // Get values
        $scope.getValue = function (telemetryObject) {
          var id = telemetryObject.getId();
          var name = handle.getDomainValue(telemetryObject);
          var datum = handle.getRangeValue(telemetryObject);
          //console.log(id + " " + datum + " " + name);
          return datum;
        }

    }

    return navballController;
});
