define(['Canvas/CanvasObjectBase'], function(CanvasObjectBase) {

    return {
        runAnimation: function(mainCanvas) {

            function SnowFlake(canvas) {
                var self = this;
                var ctx = canvas.canvasContext;
                var maxWidth = canvas.width;
                var maxHeight = canvas.height;

                self.creationTime = new Date();
                self.animationKey = "snowflake_" + self.creationTime;

                self.x = Math.random() * (maxWidth + maxHeight / 2) - maxHeight / 2;
                self.y = 0;
                self.radius = 1;

                self.xVelocity = 50;
                self.yVelocty = 100;

                self.step = function(timeStamp) {

                    if (self.y > maxHeight) {
                        return;
                    }

                    var dt = self.getTimeDifference(timeStamp) / 1000;

                    self.xVelocity += Math.random() * 10 - 5;
                    if (self.xVelocity < 25) {
                        self.xVelocity = 25;
                    }
                    if (self.xVelocity > 75) {
                        self.xVelocity = 75;
                    }

                    var dx = self.xVelocity * dt;
                    var dy = self.yVelocty * dt;

                    self.x += dx;
                    self.y += dy;

                    ctx.beginPath();
                    ctx.arc(self.x, self.y, self.radius, Math.PI * 2, false);
                    ctx.fillStyle = 'blue';
                    ctx.fill();
                    ctx.strokeStyle = 'blue';
                    ctx.stroke();

                };
            }

            SnowFlake.prototype = new CanvasObjectBase();



            var localSnowFlakes = [];

            // Function to add snowflakes

            var numSnowFlakes = 0;
            function addSnowFlake() {
                numSnowFlakes++;
                var newSnowFlake = new SnowFlake(mainCanvas);
                localSnowFlakes.push(newSnowFlake);
                mainCanvas.addObject(newSnowFlake.animationKey, newSnowFlake);
            }

            var snowKey = setInterval(addSnowFlake, 15);


// Object cleaning try number one.  This is not a very good way to go about it since it jitters, but it does work technically
            /*
             function cleanUpSnowFlakes() {
             var expirationTime = new Date(new Date().getTime() - 10000);
             
             localSnowFlakeCopy.forEach(function(snowflake) {
             if (snowflake.creationTime < expirationTime) {
             mainCanvas.removeObject(snowflake.animationKey);
             }
             });
             
             }
             
             var cleanSnowKey = setInterval(cleanUpSnowFlakes, 4000);
             */

// Object cleaning try number two, lets just remove all of the snowflakes and add thema all back into the loop occasionally.  
// This is a much better way to clean the objects from the loop

            function cleanUpSnowFlakes() {
                var expirationTime = new Date(new Date().getTime() - 10000);
                var snowflakesToKeep = [];

                localSnowFlakes.forEach(function(snowflake) {
                    if (snowflake.creationTime >= expirationTime) {
                        snowflakesToKeep.push(snowflake);
                    }
                });

                localSnowFlakes = snowflakesToKeep;

                mainCanvas.removeAllObjects();

                localSnowFlakes.forEach(function(snowflake) {
                    mainCanvas.addObject(snowflake.animationKey, snowflake);
                });
            }

            var cleanSnowKey = setInterval(cleanUpSnowFlakes, 10000);

            mainCanvas.start();


        }
    };

});


