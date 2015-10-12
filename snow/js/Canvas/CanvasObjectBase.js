define(function() {

    function CanvasObjectBase() {
        this.lastTimeStamp = null;
        this.startTimeStamp = null;
    }

    CanvasObjectBase.prototype = {
        resetStartTime: function() {
            this.startTimeStamp = null;
        },
        getElapsed: function(timeStamp) {
            if (!this.startTimeStamp) {
                this.startTimeStamp = timeStamp;
            }
            return timeStamp - this.startTimeStamp;
        },
        getTimeDifference: function(timeStamp) {
            if (this.lastTimeStamp) {
                var returnValue = timeStamp - this.lastTimeStamp;
            }
            this.lastTimeStamp = timeStamp;
            return returnValue || 0;
        },
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

