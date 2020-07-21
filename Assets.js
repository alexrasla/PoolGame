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
    sprites.whiteBall = loadSprite('spr_ball2.png');
    sprites.redBall = loadSprite('spr_redBall2.png');
    sprites.yellowBall = loadSprite('spr_yellowBall2.png');
    sprites.blackBall = loadSprite('spr_blackBall2.png');

    assetsLoadingLoop(callback);
}

function getBallSpriteByColor(color){
    switch(color){
        case COLOR.RED:
            return sprites.redBall;
        case COLOR.YELLOW:
            return sprites.yellowBall;
        case COLOR.BLACK:
            return sprites.blackBall;
        case COLOR.WHITE:
            return sprites.whiteBall;
    }
}