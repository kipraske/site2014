(function SuperDemoSpinner(window, document, Kinetic, $) {
    "use strict";

    //Global Kinetic Object Variables

    var numberOfSubcircles = 5;
    var regularArcSpacing = 2 * Math.PI / numberOfSubcircles;
    var regularArcSpacingDeg = 360 / numberOfSubcircles;
    var outerRotationGroupObjects = {};
    var innerRotationGroupObjects = {};
    var currentSelectedIndex = 0;
    var isAnimating = false;

    //DOM Access
    var demoContainerName = "superDemoSpinner";
    var demoWidgetContainerName = "superDemoSpinner-sidebar";
    var demoContainer = document.getElementById(demoContainerName);
    var themeUri = "wp-content/themes/kipsdemotheme/";
    
    var $demoWidgetContainer = $('#' + demoWidgetContainerName);
    var $widgetElements = [];
    for (var i = 0; i < numberOfSubcircles; i++)
    {
        $widgetElements.push($demoWidgetContainer.find('aside').eq(i));
    }
    
    // Set the initial index on the contact form postback initialization
    // It is a silly idea to have a form inside dynamic content for this reason
    if ($('.fscf-div-error').length > 0){
        currentSelectedIndex = 4;
    };
    
    //Initialize selected wiget so the sizing can be set correctly;
    $widgetElements[currentSelectedIndex].addClass('selected');
 
    //Asset Parameters
    var imageAssets = [];
    var imageOffset = 50 //we are using 100x100 images - use half width
    var imageSources = [
        "images/superdemospinner assets/icon-About.png",
        "images/superdemospinner assets/icon-Phone.png",
        "images/superdemospinner assets/icon-Book.png",
        "images/superdemospinner assets/icon-Config.png",
        "images/superdemospinner assets/icon-Email.png"
    ];
    var centerCircleText = [
        "Start",
        "Adapt",
        "Explore",
        "Options",
        "Contact"
    ];
    var centerCircleTextOffsets = [ //Adjust initial text position manually
        -16, -6,
        -11, 16,
         15, 19,
         23, -9,
          1, -26
    ];
    var centerCircleFont = "Arial";
    var centerCircleFontSize = 14;

    //Responsive Design Scaling Parameters

    var pixelWidth = 300;
    var pixelHeight = 300;
    var subcircleRadius = 35;
    var innerCircleRadius = 1.5 * subcircleRadius
    var spinnerHalfWidth = pixelWidth / 2;
    var spinnerPadding = 0.15 * pixelWidth;
    var spinnerRadius = spinnerHalfWidth - spinnerPadding;
    var hiddenSpinnerRadius = 0.75 * spinnerRadius;
    var hiddenSpinnerYCenter = spinnerHalfWidth - hiddenSpinnerRadius;

    var connectionCircleStrokeWidthFactor = 2.5;
    var subcircleStrokeWidthFactor = 2.5;
    var defaultStrokeWidth = 2;


    //TODO: lets make the size of the spinner a more complicated function based on the size of the view port (superDemoSpinner-container)
    // Basically our display table is mucking things up a bit in terms of correct sizing

    var canvasRightPadding = 25; //needs to match CSS padding
    var responsiveScaleFactor = (demoContainer.clientWidth - canvasRightPadding) / pixelWidth;
    var canvasWidth = responsiveScaleFactor * pixelWidth;
    var canvasHeight = responsiveScaleFactor * pixelHeight;

    //Colors
    var spinnerInsetColor = '#4B4B4B'; 
    var centerInsetColor = '#4B4B4B';
    var strokeBorderColor = '#000000';
    var textColor = '#DDDDDD';
    var textBackgroundColor = '#000000';
    var hoverColor = "#3DEEEE";
    var centerHoverColor = "#3DCACA";
    //var iconNoHoverColor = "#133F3F";
    var selectedColor = "#00BFBF";

    //Kinetic Object Initialization =====================================
    var stage = new Kinetic.Stage({
        container: demoContainerName,
        width: canvasWidth,
        height: canvasHeight,
        scaleX: responsiveScaleFactor,
        scaleY: responsiveScaleFactor
    });

    var centerClipLayer = new Kinetic.Layer();
    stage.add(centerClipLayer);
    var spinnerLayer = new Kinetic.Layer();
    stage.add(spinnerLayer);

    function buildRotationGroup() {
        var rotationGroup = new Kinetic.Group();

        //Offset must be defined before x and y can be set
        rotationGroup.setOffsetX(spinnerHalfWidth);
        rotationGroup.setOffsetY(spinnerHalfWidth);
        rotationGroup.setX(spinnerHalfWidth);
        rotationGroup.setY(spinnerHalfWidth);

        var connectionCircle = new Kinetic.Circle({
            x: spinnerHalfWidth,
            y: spinnerHalfWidth,
            radius: spinnerRadius,
            strokeWidth: 2 * connectionCircleStrokeWidthFactor,
            stroke: spinnerInsetColor
        });
        rotationGroup.add(connectionCircle);
        var connectionCircleOuterStroke = new Kinetic.Circle({
            x: spinnerHalfWidth,
            y: spinnerHalfWidth,
            radius: spinnerRadius + connectionCircleStrokeWidthFactor,
            strokeWidth: defaultStrokeWidth,
            stroke: strokeBorderColor
        });
        rotationGroup.add(connectionCircleOuterStroke);
        var connectionCircleInnerStroke = new Kinetic.Circle({
            x: spinnerHalfWidth,
            y: spinnerHalfWidth,
            radius: spinnerRadius - connectionCircleStrokeWidthFactor,
            strokeWidth: defaultStrokeWidth,
            stroke: strokeBorderColor
        });
        rotationGroup.add(connectionCircleInnerStroke);

        var imageBorderCircles = new Array(numberOfSubcircles);
        var imageCircles = new Array(numberOfSubcircles);
        var regularArcSpacing = 2 * Math.PI / numberOfSubcircles;
        var subCircleXCoord;
        var subCircleYCoord;
        for (var i = 0; i < numberOfSubcircles; i++) {
            subCircleXCoord = spinnerHalfWidth + spinnerRadius * Math.cos(regularArcSpacing * i);
            subCircleYCoord = spinnerHalfWidth + spinnerRadius * Math.sin(regularArcSpacing * i);

            imageBorderCircles[i] = new Kinetic.Circle({
                x: subCircleXCoord,
                y: subCircleYCoord,
                radius: subcircleRadius,
                fill: spinnerInsetColor,
                strokeWidth: defaultStrokeWidth,
                stroke: strokeBorderColor
            });
            rotationGroup.add(imageBorderCircles[i]);

            imageCircles[i] = new Kinetic.Circle({
                x: subCircleXCoord,
                y: subCircleYCoord,
                radius: subcircleRadius - 2 * subcircleStrokeWidthFactor,
                fillPatternImage: imageAssets[i],
                fillPatternRepeat: 'no-repeat',
                fillPatternOffset: {
                    x: imageOffset,
                    y: imageOffset
                },
                fillPatternScale: 0.75,
                strokeWidth: defaultStrokeWidth,
                stroke: strokeBorderColor
            });
            rotationGroup.add(imageCircles[i]);
        }

        var innerCircle = new Kinetic.Circle({
            x: spinnerHalfWidth,
            y: spinnerHalfWidth,
            radius: innerCircleRadius,
            strokeWidth: 2 * subcircleStrokeWidthFactor,
            stroke: centerInsetColor
        });
        rotationGroup.add(innerCircle);
        var innerCircleInnerBorder = new Kinetic.Circle({
            x: spinnerHalfWidth,
            y: spinnerHalfWidth,
            radius: innerCircleRadius - subcircleStrokeWidthFactor - 1,
            strokeWidth: defaultStrokeWidth,
            stroke: strokeBorderColor
        });
        rotationGroup.add(innerCircleInnerBorder);
        var innerCircleOuterBorder = new Kinetic.Circle({
            x: spinnerHalfWidth,
            y: spinnerHalfWidth,
            radius: innerCircleRadius + subcircleStrokeWidthFactor - 1,
            strokeWidth: defaultStrokeWidth,
            stroke: strokeBorderColor
        });
        rotationGroup.add(innerCircleOuterBorder);

        return {
            fullGroup: rotationGroup,
            images: imageCircles,
            selectionCircles: imageBorderCircles,
            centerHitCircle: innerCircleOuterBorder, //use top circle in stack for events
            centerStrokeCircle: innerCircle
        };
    }

    function defineCenterClip(scaleFactor) {
        var ctx = centerClipLayer.getContext();
        //we want to use this function to redefine the clipping size later if we need to
        ctx.restore();
        ctx.save();

        ctx.beginPath();
        ctx.arc(spinnerHalfWidth * scaleFactor, spinnerHalfWidth * scaleFactor, (innerCircleRadius + subcircleStrokeWidthFactor) * scaleFactor, 2 * Math.PI, false);
        ctx.closePath();
        ctx.clip();
    }

    function buildCenterGroup() {
        var centerGroup = new Kinetic.Group();

        //Group X and Y not defined unless offset is defined first
        centerGroup.setOffsetX(spinnerHalfWidth);
        centerGroup.setOffsetY(hiddenSpinnerYCenter);
        centerGroup.setX(spinnerHalfWidth);
        centerGroup.setY(hiddenSpinnerYCenter);

        var hiddenInnerCircle = new Kinetic.Circle({
            x: spinnerHalfWidth,
            y: hiddenSpinnerYCenter,
            radius: hiddenSpinnerRadius,
            strokeWidth: 2 * connectionCircleStrokeWidthFactor,
            stroke: spinnerInsetColor
        });
        centerGroup.add(hiddenInnerCircle);
        var hiddenInnerCircleOuterStroke = new Kinetic.Circle({
            x: spinnerHalfWidth,
            y: hiddenSpinnerYCenter,
            radius: hiddenSpinnerRadius + connectionCircleStrokeWidthFactor,
            strokeWidth: defaultStrokeWidth,
            stroke: strokeBorderColor
        });
        centerGroup.add(hiddenInnerCircleOuterStroke);
        var hiddenInnerCircleOuterStroke = new Kinetic.Circle({
            x: spinnerHalfWidth,
            y: hiddenSpinnerYCenter,
            radius: hiddenSpinnerRadius - connectionCircleStrokeWidthFactor,
            strokeWidth: defaultStrokeWidth,
            stroke: strokeBorderColor
        });
        centerGroup.add(hiddenInnerCircleOuterStroke);

        var textBorderCircles = new Array(numberOfSubcircles);
        var textInnerCircles = new Array(numberOfSubcircles);
        var text = new Array(numberOfSubcircles);
        var arcOffset = Math.PI / 2;
        var subCircleXCoord;
        var subCircleYCoord;
        for (var i = 0; i < numberOfSubcircles; i++) {
            //create inner circles in opposite direction as outer circles
            subCircleXCoord = spinnerHalfWidth + hiddenSpinnerRadius * Math.cos(-regularArcSpacing * i + arcOffset);
            subCircleYCoord = hiddenSpinnerYCenter + hiddenSpinnerRadius * Math.sin(-regularArcSpacing * i + arcOffset);

            textBorderCircles[i] = new Kinetic.Circle({
                x: subCircleXCoord,
                y: subCircleYCoord,
                radius: subcircleRadius,
                fill: spinnerInsetColor,
                strokeWidth: defaultStrokeWidth,
                stroke: strokeBorderColor
            });
            centerGroup.add(textBorderCircles[i]);

            textInnerCircles[i] = new Kinetic.Circle({
                x: subCircleXCoord,
                y: subCircleYCoord,
                radius: subcircleRadius - 2 * subcircleStrokeWidthFactor,
                fill: textBackgroundColor,
                strokeWidth: defaultStrokeWidth,
                stroke: strokeBorderColor
            });
            centerGroup.add(textInnerCircles[i]);

            text[i] = new Kinetic.Text({
                x: subCircleXCoord + centerCircleTextOffsets[2 * i],
                y: subCircleYCoord + centerCircleTextOffsets[2 * i + 1],
                text: centerCircleText[i],
                fontSize: centerCircleFontSize,
                fontFamily: centerCircleFont,
                rotation: -regularArcSpacingDeg * i,
                fill: textColor
            });
            centerGroup.add(text[i]);
        }

        var centerDoor = new Kinetic.Rect({
            x: spinnerHalfWidth - innerCircleRadius,
            y: spinnerHalfWidth + innerCircleRadius, //initially open
            width: innerCircleRadius * 2,
            height: innerCircleRadius * 2,
            fill: centerInsetColor,
            opacity: 0.75,
            stroke: strokeBorderColor,
            strokeWidth: defaultStrokeWidth
        });

        return {
            fullGroup: centerGroup,
            centerDoor: centerDoor
        };
    }

    // ANIMATIONS **********************************************

    function animateCenterClose() {
        var doorForwardTween = new Kinetic.Tween({
            node: innerRotationGroupObjects.centerDoor,
            duration: 0.6,
            x: spinnerHalfWidth - innerCircleRadius,
            y: spinnerHalfWidth - innerCircleRadius
        });
        doorForwardTween.play();
        //This is for when the center is clicked on and held
    }

    function animateCenterOpen() {
        var doorBackwardTween = new Kinetic.Tween({
            node: innerRotationGroupObjects.centerDoor,
            duration: 0.6,
            x: spinnerHalfWidth - innerCircleRadius,
            y: spinnerHalfWidth + innerCircleRadius
        });
        doorBackwardTween.play();
    }

    function animateSpinNoSelection() {
        isAnimating = true;
        var currentVelocity = 4;
        var maximumVelocity = 500;
        var animation = new Kinetic.Animation(function (frame) {
            if (currentVelocity <= maximumVelocity) {
                currentVelocity += 0.1 * currentVelocity;
            }
            outerRotationGroupObjects.fullGroup.rotate(currentVelocity * frame.timeDiff / 1000);
        }, spinnerLayer);
        animation.start();
        return {
            animation: animation,
            velocity: currentVelocity
        };
    }

    function spinDownNoSelectionAnimation(velocity) {
        var currentRotation;
        var frameFactor = 1000;
        var easingFactor = 1;
        var differenceFactor;
        var deceleration = 2;
        var currentImageRotation = outerRotationGroupObjects.images[0].getRotation() % 360;
        var spinDown = new Kinetic.Animation(function (frame) {
            if (velocity >= 0.1) {
                differenceFactor = frame.timeDiff / frameFactor;
                outerRotationGroupObjects.fullGroup.rotate(velocity * differenceFactor);

                currentRotation = outerRotationGroupObjects.fullGroup.getRotation() % 360 + 360;

                for (var i = 0; i < numberOfSubcircles; i++) {
                    outerRotationGroupObjects.images[i].setRotation(-currentRotation * (1 - easingFactor));
                }
                velocity -= deceleration * velocity * differenceFactor;
                easingFactor -= deceleration * easingFactor * differenceFactor;
            }
            else {
                spinDown.stop();
                velocity = 0;
            }
        }, spinnerLayer);
        spinDown.start();
    }

    function animateHoverEffect(indexHovered) {
        outerRotationGroupObjects.selectionCircles[indexHovered].setFill(hoverColor);
        spinnerLayer.draw();
    }

    function clearOuterHoverEffects(indexSelected) {
        for (var i = 0; i < numberOfSubcircles; i++) {
            if (i !== indexSelected) {
                outerRotationGroupObjects.selectionCircles[i].setFill(spinnerInsetColor);
            }
        }
        outerRotationGroupObjects.selectionCircles[indexSelected].setFill(selectedColor);
        spinnerLayer.draw();
    }

    function animateCenterHoverEffect() {
        outerRotationGroupObjects.centerStrokeCircle.setStroke(centerHoverColor);
        spinnerLayer.draw();
    }

    function clearCenterHoverEffect() {
        outerRotationGroupObjects.centerStrokeCircle.setStroke(centerInsetColor);
        spinnerLayer.draw();
    }

    function animateToSelectedCircle(indexSelected) {
        currentSelectedIndex = indexSelected;

        animateCenterOpen();

        clearOuterHoverEffects(indexSelected);
        outerRotationGroupObjects.selectionCircles[indexSelected].setFill(selectedColor);

        isAnimating = true;
        var rotationArcFactor = regularArcSpacingDeg * indexSelected;
        var currentRotationArc = -outerRotationGroupObjects.fullGroup.getRotation() % 360;
        var animationDuration = 3000;
        var easingFactor;

        //Easing factor is a float which will ease from 0 to 1 in each of these animations based on the time
        function animateOuterRotation(easingFactor) {
            outerRotationGroupObjects.fullGroup.setRotation(-rotationArcFactor * easingFactor - currentRotationArc * (1 - easingFactor));
        }

        function animateInnerRotation(easingFactor) {
            innerRotationGroupObjects.fullGroup.setRotation(rotationArcFactor * easingFactor + currentRotationArc * (1 - easingFactor));
        }

        function animateImageCounterRotation(easingFactor) {
            for (var i = 0; i < numberOfSubcircles; i++) {
                outerRotationGroupObjects.images[i].setRotation(rotationArcFactor * easingFactor + currentRotationArc * (1 - easingFactor));
            }
        }

        function cleanUpAnimationEnd() {
            animation.stop();
            isAnimating = false;
        }

        var animation = new Kinetic.Animation(function (frame) {
            easingFactor = Kinetic.Easings.EaseOut(frame.time, 0, 1, animationDuration);
            animateOuterRotation(easingFactor);
            animateInnerRotation(easingFactor);
            animateImageCounterRotation(easingFactor);
        }, [spinnerLayer, centerClipLayer]);
        animation.start();
        setTimeout(cleanUpAnimationEnd, animationDuration);
    }

    function initialAnimation() {
        //numbers from trial and error
        var initialKickSpeed = 200;
        outerRotationGroupObjects.fullGroup.setRotation(-100);
        spinDownNoSelectionAnimation(initialKickSpeed);
    }


    //Initialization and Events ***********************************************

    function buildEvents() {
        var eventCommunicationState = {};

        var registerImageEvents = function (imageIndex) {
            outerRotationGroupObjects.images[imageIndex].on("click touchstart tap", function () {
                if (!isAnimating){
                animateToSelectedCircle(imageIndex);
                $demoWidgetContainer.find('.selected').removeClass('selected');
                $widgetElements[imageIndex].addClass("selected");
            }
            });

            outerRotationGroupObjects.images[imageIndex].on("mouseover", function () {
                animateHoverEffect(imageIndex);
            });

            outerRotationGroupObjects.images[imageIndex].on("mouseout touchend", function () {
                clearOuterHoverEffects(currentSelectedIndex);
            });
        };

        for (var i = 0; i < numberOfSubcircles; i++) {
            registerImageEvents(i);  //need closure to save state of i inside event          
        }

        eventCommunicationState.noSelectAnimation = {};
        eventCommunicationState.noSelectAnimation.animation;
        eventCommunicationState.noSelectAnimation.velocity;
        outerRotationGroupObjects.centerHitCircle.on("mousedown touchstart", function () {
            animateCenterClose();
            if (!isAnimating) {
                eventCommunicationState.noSelectAnimation = animateSpinNoSelection();
            }
        });

        outerRotationGroupObjects.centerHitCircle.on("mouseup touchend", function () {
            var fromMouseDown = eventCommunicationState.noSelectAnimation;
            fromMouseDown.animation.stop();
            spinDownNoSelectionAnimation(fromMouseDown.velocity);
            spinDownNoSelectionAnimation(100);
            isAnimating = false;
        });

        outerRotationGroupObjects.centerHitCircle.on("mouseover touchstart", animateCenterHoverEffect);

        outerRotationGroupObjects.centerHitCircle.on("mouseout touchend", clearCenterHoverEffect);


        window.addEventListener("resize", function () {
            responsiveScaleFactor = (demoContainer.clientWidth - canvasRightPadding)/ pixelWidth;
            canvasWidth = responsiveScaleFactor * pixelWidth;
            canvasHeight = responsiveScaleFactor * pixelHeight;

            stage.setScaleX(responsiveScaleFactor);
            stage.setScaleY(responsiveScaleFactor);
            stage.setWidth(canvasWidth);
            stage.setHeight(canvasHeight);

            centerClipLayer.clear();
            defineCenterClip(responsiveScaleFactor);

            stage.draw();
        });
    }

    function initializeSpinner() {
        outerRotationGroupObjects = buildRotationGroup();
        innerRotationGroupObjects = buildCenterGroup();
        defineCenterClip(responsiveScaleFactor);
        buildEvents();

        outerRotationGroupObjects.selectionCircles[currentSelectedIndex].setFill(selectedColor);
        
        spinnerLayer.add(outerRotationGroupObjects.fullGroup);
        centerClipLayer.add(innerRotationGroupObjects.fullGroup);
        centerClipLayer.add(innerRotationGroupObjects.centerDoor);

        stage.draw();
        initialAnimation();
    }

    function loadAssets(sources, callback) {
        var loadedImages = 0;
        var numberOfImages = sources.length;
        for (var i = 0; i < numberOfImages; i++) {
            imageAssets[i] = new Image();
            imageAssets[i].onload = function () {
                if (++loadedImages >= numberOfImages) {
                    callback();
                }
            };
            imageAssets[i].src = themeUri + sources[i];
        }
    }

    loadAssets(imageSources, initializeSpinner);

})(this, this.document, Kinetic, jQuery);

