define(function () {
    function TodoController($scope, telemetryHandler) {
        var showAll = true,
            showCompleted;
        var camera, scene, renderer, container;
        var initialized = true;

        // Persist changes made to a domain object's model
        function persist() {
            var persistence =
                $scope.domainObject.getCapability('persistence');
            return persistence && persistence.persist();
        }

        $scope.test = function(){
          init();
        }

        $scope.addTask = function(){
          init();
          animate();
        }

        // Use the telemetryHandler to get telemetry objects here
        handle = telemetryHandler.handle($scope.domainObject, function () {
            $scope.telemetryObjects = handle.getTelemetryObjects();
        });

        // Release subscriptions when scope is destroyed
        $scope.$on('$destroy', handle.unsubscribe);

        function init(){
          var SCREEN_WIDTH = 400, SCREEN_HEIGHT = 400;
          scene = new THREE.Scene();
          camera = new THREE.PerspectiveCamera(75,1,0.1,1000);
          //renderer = new THREE.WebGLRenderer();
          renderer = new THREE.CanvasRenderer();
          renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
          container = document.getElementById( 'ThreeJS' );
        	container.appendChild( renderer.domElement );

          var cubeGeometry = new THREE.CubeGeometry( 100, 100, 100 );
        	var cubeMaterial = new THREE.MeshNormalMaterial();
        	var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
        	cube.position.set(0,50.1,0);
        	cube.name = "Cube";
        	scene.add(cube);

          // LIGHT
        	var light = new THREE.PointLight(0xffffff);
        	light.position.set(0,250,0);
        	scene.add(light);
        };

        function animate()
        {
          requestAnimationFrame( animate );
        	renderer.render(scene, camera);
        }

        // Change which tasks are visible
        $scope.setVisibility = function (all, completed) {
            showAll = all;
            showCompleted = completed;
        };

        // Toggle the completion state of a task
        $scope.toggleCompletion = function (taskIndex) {
            $scope.domainObject.useCapability('mutation', function (model) {
                var task = model.tasks[taskIndex];
                task.completed = !task.completed;
            });
            persist();
        };

        // Check whether a task should be visible
        $scope.showTask = function (task) {
            return showAll || (showCompleted === !!(task.completed));
        };

    }

    return TodoController;
});
