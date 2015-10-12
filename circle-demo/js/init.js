require.config({
    baseUrl: 'js/'
});

require([
    'Canvas/CanvasLayer',
    'Views/canvasHitAreaTest'],
function(CanvasController, test) {

    var mainCanvas = new CanvasController('main-canvas');

    test.runAnimation(mainCanvas);

    mainCanvas.start();

});


