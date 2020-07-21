function Game(){
    
}

Game.prototype.init = function(){
    this.gameWorld = new GameWorld();
}

Game.prototype.start = function(){
    PoolGame.init();
    PoolGame.mainLoop();
}

//everything happens here, "main" function
Game.prototype.mainLoop = function(){
    Canvas.clear();
    PoolGame.gameWorld.update();
    PoolGame.gameWorld.draw();

    requestAnimationFrame(PoolGame.mainLoop);
}

let PoolGame = new Game();