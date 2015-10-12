define(['Canvas/CanvasObjectBase'], function(CanvasObjectBase) {

    return {
        runAnimation: function(mainCanvas) {

            function HitCircleDisplay(options) {

                var self = this;

                self.key = options.key || "Test Circle";
                self.initialColorIndex = options.initialColorIndex || 0;
                self.savedOptions = {
                    key: self.key,
                    initialColorIndex: self.initialColorIndex
                };

                self.waiting = true;

                self.radius = mainCanvas.width / 15;
                self.colors = ["red", "orange", "yellow", "green", "blue", "purple", "black"];
                self.colorIndex = self.initialColorIndex;
                self.color = self.colors[self.colorIndex];

                self.pathStartX = 2 * mainCanvas.width / 4;
                self.pathStartY = mainCanvas.height / 2;
                self.pathVelocity = 0.525;
                self.pathRadius = mainCanvas.width / 6;

                self.step = function(timeStamp) {
                    var ctx = mainCanvas.canvasContext;
                    var t = self.getElapsedTime(timeStamp) / 1000;


                    //Draw
                    self.x = self.pathStartX + self.pathRadius * Math.cos(self.pathVelocity * t);
                    self.y = self.pathStartY + self.pathRadius * Math.sin(self.pathVelocity * t);

                    ctx.beginPath();
                    ctx.arc(self.x, self.y, self.radius, 2 * Math.PI, false);
                    ctx.fillStyle = self.color;
                    ctx.fill();

                    ctx.lineWidth = 2;
                    ctx.stroke();
                };

                self.mousedown = {
                    hitArea: function(x, y) {
                        if (self.x === null || self.y === null) {
                            return;
                        }

                        var xOffset = x - self.x;
                        var yOffset = y - self.y;
                        if (xOffset * xOffset + yOffset * yOffset < self.radius * self.radius) {
                            return true;
                        }

                        return false;
                    },
                    handler: function() {
                        //rotate the color
                        var newColorIndex = self.colorIndex++ % self.colors.length;
                        self.color = self.colors[newColorIndex];
                        self.savedOptions.initialColorIndex = newColorIndex;
                    }
                };

            }

            HitCircleDisplay.prototype = new CanvasObjectBase();
            HitCircleDisplay.prototype.constructor = HitCircleDisplay;

            for (var i = 0, ci = 0; i < 6; i++) {
                setTimeout(function() {
                    mainCanvas.addObject(new HitCircleDisplay({
                        key: "Circle Number " + ci,
                        initialColorIndex: ci++
                    }));
                }, 2000 * i);
            }

        }
    };

});


