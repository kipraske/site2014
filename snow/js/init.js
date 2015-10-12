require.config({
    baseUrl: 'js/'
});

require([
    'Canvas/CanvasController',
    'Views/snow'], 
function(CanvasController, snow){
    
    var mainCanvas = new CanvasController('main-canvas');
    
    snow.runAnimation(mainCanvas);
    
});


