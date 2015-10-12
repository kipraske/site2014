define({
    run: function(canvas) {

        var testAnimationObject_1 = {
            startTime: 0,
            x: 75,
            y: 75,
            radius: 40,
            step: function(ctx, time) {
                if (this.startTime === 0) {
                    this.startTime = time;
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
                ctx.stroke();

                this.x += time / 1000;
            }
        };

        var testAnimationObject_2 = {
            startTime: 0,
            x: 75,
            y: 75,
            radius: 40,
            step: function(ctx, time) {
                if (this.startTime === 0) {
                    this.startTime = time;
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
                ctx.stroke();

                this.y += time / 1000;
            }
        };

        canvas.addObject("testObject_1", testAnimationObject_1);

        canvas.start();

        //setTimeout(canvas.pause, 2000);

        setTimeout(function() {
            canvas.addObject('testObject_2', testAnimationObject_2);
        }, 3000);

        //setTimeout(canvas.start, 5000);

        setTimeout(function(){
            canvas.removeObject('testObject_1');
        }, 4000);

        setTimeout(canvas.pause, 5000);



    }
});

