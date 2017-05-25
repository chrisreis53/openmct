define([
    'openmct'
], function (
    openmct
) {
    openmct.legacyRegistry.register("kerbal/todo", {
        "name": "To-do Plugin",
        "description": "Allows creating and editing to-do lists.",
        "extensions":
        {
          "types": [{
            "key": "example.todo",
            "name": "To-Do List",
            "cssClass": "icon-check",
            "description": "A list of things that need to be done.",
            "features": ["creation"]
          }],
          "views": [{
            "key": "example.todo",
            "type": "example.todo",
            "cssClass": "icon-check",
            "name": "List",
            "templateUrl": "templates/todo.html",
            "editable": true
          }]
        }
    });
});
