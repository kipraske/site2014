define(function() {

// TODO perhaps I should later rename this function "CanvasLayer" since we are really providing layering functionality here

    function CanvasLayer(canvasId) {

        var self = this;

        var canvasElement = document.getElementById(canvasId);
        self.canvasContext = canvasElement.getContext('2d');

        self.width = canvasElement.width = canvasElement.offsetWidth;
        self.height = canvasElement.height = canvasElement.offsetHeight;

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        var isRunning = false;
        var canvasObjectCollection = [];

        var mouseEventTypes = [
            "click",
            "mousedown"
        ];

        //sort objects into a struture so we can easily pull objects which are listening for an event
        var canvasObjectsWithMouseEvents = {
            initialize: function() {
                for (var i = 0, elength = mouseEventTypes.length; i < elength; i++) {
                    canvasObjectsWithMouseEvents[mouseEventTypes[i]] = [];
                }
            }
        };

        var frameLoop = function(timeStamp) {
            if (isRunning) {
                self.clearDrawing();
                self.renderObjects(timeStamp);
                requestAnimationFrame(frameLoop);
            }
        };

        self.renderObjects = function(timeStamp) {
            for (var i = 0, olength = canvasObjectCollection.length; i < olength; i++) {
                canvasObjectCollection[i].step(timeStamp);
            }
        };

        self.getObjects = function() {
            return canvasObjectCollection;
        };

        // registers a single object
        self.addObject = function(object) {
            canvasObjectCollection.push(object);

            for (var i = 0, elength = mouseEventTypes.length; i < elength; i++) {
                if (object[mouseEventTypes[i]].hitArea) {
                    canvasObjectsWithMouseEvents[mouseEventTypes[i]].push(object);
                }
            }
        };

        // registers an array of objects
        self.addObjects = function(objects) {
            for (var i = 0, olength = objects.length; i < olength; i++) {
                self.addObject(objects[i]);
            }
        };

        //removes all objects
        self.removeAllObjects = function() {
            canvasObjectCollection = [];
            canvasObjectsWithMouseEvents.initialize();
        };

        // removes all objects with a given key. Use this pattern for removing objects by other criteria such as position or time elapsed
        self.removeObjectsByKey = function(key) {
            var objectsToKeep = [];
            for (var i = 0, allLength = canvasObjectCollection.length; i < allLength; i++) {
                if (canvasObjectCollection[i].key !== key) {
                    objectsToKeep.push(canvasObjectCollection[i]);
                }
            }
            self.removeAllObjects();
            self.addObjects(objectsToKeep);
        };

        self.clearDrawing = function() {
            //Use default transformation when clearing, but set it back when you are done
            self.canvasContext.save();
            self.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
            self.canvasContext.clearRect(0, 0, self.width, self.height);
            self.canvasContext.restore();
        };

        self.start = function() {
            isRunning = true;
            requestAnimationFrame(frameLoop);
        };

        self.pause = function() {
            isRunning = false;
        };

        self.reset = function() {
            //Reset All variables
        };

        var registerMouseEvent = function(eventType) {
            canvasElement.addEventListener(eventType, function(event) {
                var mousePosition = getMousePosition(event);

                for (var i = 0, clength = canvasObjectsWithMouseEvents[eventType].length; i < clength; i++) {
                    if (canvasObjectsWithMouseEvents[eventType][i][eventType].hitArea(mousePosition.x, mousePosition.y)) {
                        canvasObjectsWithMouseEvents[eventType][i][eventType].handler();
                    }
                }
            });
        };

        var getMousePosition = function(event) {
            var boundingRect = canvasElement.getBoundingClientRect();
            return {
                x: event.clientX - boundingRect.left,
                y: event.clientY - boundingRect.top
            };
        };

        var registerAllMouseEvents = function() {
            for (var i = 0, elength = mouseEventTypes.length; i < elength; i++) {
                registerMouseEvent(mouseEventTypes[i]);
            }
        };

        //TODO - I should get the other events I want too
        canvasObjectsWithMouseEvents.initialize();
        registerAllMouseEvents();

        //This resize event keeps things the same size, but that is not what we want... we need to 
        //propigate the resize down the the objects... should we add a resize event for the elements?
        var isResizing = false;
        window.addEventListener('resize', function(event) {

            if (isResizing) {
                return;
            }

            isResizing = true;
            self.width = canvasElement.width = canvasElement.offsetWidth;
            self.height = canvasElement.height = canvasElement.offsetHeight;

            propigateResizeToObjects();
            isResizing = false;
        });

        var propigateResizeToObjects = function() {

            var resizedObjectCollection = [];

            for (var i = 0, olength = canvasObjectCollection.length; i < olength; i++) {
                // preserve object state variables
                var keyCopy = canvasObjectCollection[i].key;
                var xCopy = canvasObjectCollection[i].x;
                var yCopy = canvasObjectCollection[i].y;
                var startTimeStampCopy = canvasObjectCollection[i].startTimeStamp;
                var lastTimeStampCopy = canvasObjectCollection[i].lastTimeStamp;
                var lastTimeElapsedCopy = canvasObjectCollection[i].lastTimeElapsed;
                var lastTimeDifferenceCopy = canvasObjectCollection[i].lastTimeDifference;

                //reinitialize the object
                resizedObjectCollection[i] = new canvasObjectCollection[i].constructor(canvasObjectCollection[i].savedOptions);

                //apply state variables
                resizedObjectCollection[i].key = keyCopy;
                resizedObjectCollection[i].x = xCopy;
                resizedObjectCollection[i].y = yCopy;
                resizedObjectCollection[i].startTimeStamp = startTimeStampCopy;
                resizedObjectCollection[i].lastTimeStamp = lastTimeStampCopy;
                resizedObjectCollection[i].lastTimeElapsed = lastTimeElapsedCopy;
                resizedObjectCollection[i].lastTimeDifference = lastTimeDifferenceCopy;
            }

            self.removeAllObjects();
            self.addObjects(resizedObjectCollection);
        };
    }


    return CanvasLayer;

});


