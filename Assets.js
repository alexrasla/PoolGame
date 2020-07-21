let sprites = {};
let loadingAssets = 0;

function assetsLoadingLoop(callback){
    //if assetsStillLoading is false, callback function
    if(loadingAssets){
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    } else if(callback){
        callback();
    }
}

function loadAssets(callback){
    function loadSprite(fileName){
        loadingAssets++;

        let spriteImage = new Image();
        spriteImage.src = "./assets/sprites/" + fileName;

        spriteImage.onload = function(){
            loadingAssets--;
        }

        return spriteImage;
    }

    //calls function defined above
    sprites.background = loadSprite('spr_background5.png');
    sprites.stick = loadSprite('spr_stick.png');

    assetsLoadingLoop(callback);
}