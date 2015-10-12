define(function() {

// TODO think about the name of this method.  It is getting closer to a generic "Node" or "Shape"

    function CanvasObjectBase(options) {
        // Key is useful for grouping and removing objects
        this.key = null;
        
        // This object is also used for retaining state information if we need to reinitialize.  Important for resizing object when canvas is resized.
        this.savedOptions = options;
        
        // The position the object is drawn by
        this.x = null;
        this.y = null;
        
        //Timing properties
        this.startTimeStamp = null;
        this.lastTimeStamp = null;
        this.lastTimeElapsed = null;
        this.lastTimeDifference = null;
        
        //Event Definitions
        this.click = {hitArea : null, handler : null};
    }

    CanvasObjectBase.prototype = {
        
        resetStartTime: function() {
            this.startTimeStamp = null;
        },
        
        getElapsedTime: function(timeStamp) {
            if (!this.startTimeStamp) {
                this.startTimeStamp = timeStamp;
            }
            this.lastTimeElapsed = timeStamp - this.startTimeStamp;
            return this.lastTimeElapsed;
        },
        
        getTimeDifference: function(timeStamp) {
            if (this.lastTimeStamp) {
                this.lastTimeDifference = timeStamp - this.lastTimeStamp;
            }
            this.lastTimeStamp = timeStamp;
            return this.lastTimeDifference || 0;
        },
        
        //main animation logic must be implemented to render object
        step: function(timeStamp) {
            throw new Exception({
                message: "Abstract method step must be implemented in CanvasObjectBase",
                data: this,
                timeStamp: timeStamp
            });
        }
    };

    return CanvasObjectBase;
});

