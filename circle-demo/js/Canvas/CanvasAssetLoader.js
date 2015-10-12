

function loadAssets(sources, callback) {
    var loadedImages = 0;
    var numberOfImages = sources.length;
    for (var i = 0; i < numberOfImages; i++) {
        imageAssets[i] = new Image();
        imageAssets[i].onload = function() {
            if (++loadedImages >= numberOfImages) {
                callback();
            }
        };
        imageAssets[i].src = themeUri + sources[i];
    }
}

loadAssets(imageSources, initializeSpinner);


