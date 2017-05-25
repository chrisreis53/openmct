define([
  'openmct',
  './src/controllers/navballController',
  './src/directives/navballDirective',
  "text!./res/templates/navball.html"
], function(
    openmct,
    navballController,
    navballDirective,
    navballTemplate
) {

  openmct.legacyRegistry.register("kerbal/navball", {

    "name":"Navball",
    "discription":"Dispalys attitude of spacecraft on a Navball",
    "extensions":
    {
      // "types": [{
      //   "key": "kerbal.navball",
      //   "name": "Navigation Ball",
      //   "cssClass": "icon-topic",
      //   "description": "An indicator to determine attitude.",
      //   "features": ["creation"]
      // }],
      "views": [{
        "name": "kerbal-navball",
        "key": "kerbal.navball",
        "cssClass": "icon-topic",
        "needs":[ "telemetry" ],
        "delegation": true,
        "name": "Navball",
        "template": navballTemplate,
        "editable": true
      }],
      "controllers": [{
        "key": "navballController",
        "implementation": navballController,
        "depends": [ "$scope", "telemetryHandler" ]
      }],
      "directives": [{
        "key": "navballDirective",
        "implementation": navballDirective,
        "depends": [ "$scope" ]
      }],
      "gestures": [ "drag","menu" ]
    }

  });

});
