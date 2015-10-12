define(function() {

    function CanvasController(canvasId) {
        
        var self = this;
        
        //TODO - write this so we can pass in the current context into these objects here so we can just use it.
        
        var canvasElement = document.getElementById(canvasId);
        self.canvasContext = canvasElement.getContext('2d');
        
        self.width = canvasElement.width = canvasElement.offsetWidth;
        self.height = canvasElement.height = canvasElement.offsetHeight;

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        
        //TODO calculate the canvas width and height so we can use that.  Though I will want to use that in later objects... hrm
        //How to make these properties more global... honestly maybe I should have clear methods in the object/hitregion collections
        //and bring them up here.  (IE clear at the start of "render")
        
        var isRunning = false;
        var objectKeyCollection = [];
        var objectCollection = [];

        var frameLoop = function(timeStamp) {         
            if (isRunning) {
                self.clearDrawing();
                self.renderObjects(timeStamp);
                requestAnimationFrame(frameLoop);
            }
        };
        

        self.renderObjects = function(timeStamp) {
            for (var i = 0, olength = objectCollection.length; i < olength; i++) {
                objectCollection[i].step(timeStamp);
            }
        };

        // registers an object that can be referenced later by key
        self.addObject = function(key, object) {
            objectKeyCollection.push(key);
            objectCollection.push(object);
        };
        
        //remove takes an array of keys and removes them from the registry
        //this is rather slow, if removing multiple objects at once it is usually best to use self.removeAllObjects instead
        self.removeObject = function(key) {
            for (var i = 0, olength = objectCollection.length; i < olength; i++) {
                if (objectKeyCollection[i] === key) {
                    objectKeyCollection.splice(i, 1);
                    objectCollection.splice(i, 1);
                    return;
                }
            }
        };

        self.removeAllObjects = function() {
            objectKeyCollection = [];
            objectCollection = [];
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
        
    }

    return CanvasController;

});


