const BALL_ORIGIN = new Vector2(25, 25);
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER/2;

function Ball(position, color){
    this.position = position;
    this.velocity = new Vector2();
    this.moving = false;
    this.sprite = getBallSpriteByColor(color);
}

Ball.prototype.update = function(delta){
    this.position.addTo(this.velocity.mult(delta));

    this.velocity = this.velocity.mult(0.984); //represents friction... updates velocity and when update called here again, addTo is different
    if(this.velocity.len() < 5){
        this.velocity = new Vector2();
        this.moving = false;
    }
}

Ball.prototype.draw = function(){
    Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
}

Ball.prototype.shoot = function(power, rotation){ //this is called bc passing function pointer to stick object, and calling shoot 
    this.velocity = new Vector2(power * Math.cos(rotation), power* Math.sin(rotation));
    this.moving = true;
}

//collision physics
Ball.prototype.collideWith = function(object){
    if(object instanceof Ball){
        this.collideWithBall(object);
    } else{
        this.collideWithTable(object);
    }
   
}

Ball.prototype.collideWithBall = function(ball){
     
    //normal vector
    const n = this.position.subtract(ball.position);

    //find distance
    const dist = n.len();

    if(dist > BALL_DIAMETER){
        return;
    }

    //minimum translation distance
    const mtd = n.mult((BALL_DIAMETER - dist) / dist);

    //push-pull balls
    this.position = this.position.add(mtd.mult(1/2));
    ball.position = ball.position.subtract(mtd.mult(1/2));
    //makes balls not overlap

    const unit = n.mult(1/n.len());
    const unit_tangent = new Vector2(-unit.y, unit.x);

    const v1n = unit.dot(this.velocity);
    const v1t = unit_tangent.dot(this.velocity);
    const v2n = unit.dot(ball.velocity);
    const v2t = unit_tangent.dot(ball.velocity);

    //normal velocities are opposite
    let v1n_prime = v2n;
    let v2n_prime = v1n;

    //convert to new vectors
    v1n_prime = unit.mult(v1n_prime);
    const v1t_prime = unit.mult(v1t);
    v2n_prime = unit.mult(v2n_prime);
    const v2t_prime = unit.mult(v2t);

    //update velocities
    this.velocity = v1n_prime.add(v1t_prime);
    ball.velocity = v2n_prime.add(v2t_prime);

    this.moving = true;
    ball.moving = true;
}

Ball.prototype.collideWithTable = function(table){
    if(!this.moving){
        return;
    }

    let collided = false;

    if(this.position.y <= table.TopY + BALL_RADIUS){
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    if(this.position.x >= table.RightX - BALL_RADIUS){
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    if(this.position.y >= table.BottomY - BALL_RADIUS){
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    if(this.position.x <= table.LeftX + BALL_RADIUS){
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    if(collided){
        this.velocity = this.velocity.mult(0.98);
    }
}