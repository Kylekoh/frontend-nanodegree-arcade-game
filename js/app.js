// Enemies our player must avoid
var Enemy = function(x, y, dx) {
    // Set variables appled to each of our Enemy instance.
    // Initial x, y parameter applied to setting first status of
    // each of Enemies. 
    
    // The dx parameter applied to control the speed of Enemy. 
    this.sprite = 'images/enemy-bug.png';
    this.y = y;
    this.x = x;
    this.dx = dx;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.dt = dt;
	
	// In eveny update, update the x parameter to control the
	// speed of enemies.
    this.x = this.x + this.dx * this.dt;
    
    // If enemy go off the canvas screen set the x parameter
    // to start point and set the dx parameter to random number.
	if (this.x > 505) {
        this.x = -20;
        this.dx = 100 + Math.floor(Math.random() * 220);
    };	

    // This is for collision detection.
    // If player collide with enemies, return player to start point.
    if (this.x + 80 > player.x && this.x < player.x + 80 && this.y == player.y){
    	player.x = 202;
        player.y = 307;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() { 
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Set the Player prototype.
var Player = function(x, y) {
    this.sprite = "images/char-boy.png"
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
};

// Draw the player on the screen, required method for game
Player.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set the player movement using handleInput information.
Player.prototype.handleInput = function (d){
	// The d parameter is infomation from
	// 'keyup' event listener.    
    this.d = d;

    // Set the player direction and
    // constrain player exist only in the canvas area.
    if(this.d == "left" && this.x > 0) this.x -= 101;
    if(this.d == "up" && this.y > -25) this.y -= 83;
    if(this.d == "right" && this.x < 404) this.x += 101;
    if(this.d == "down" && this.y < 390) this.y += 83;
    
    // If player reach the water, set back to start point.
    if(this.y < 30){
	    	this.x = 202;
        	this.y = 307;
    }
};

// Set the initial position of player.
// this position will be also used when player reach the water
// and when collide with enemies. 
var player = new Player(202, 307);

// Set the Enemies y start point.
let yStartPosition = [58, 141, 224];

// Set the initial infomation of enemies.
let allEnemies = [];
for (i = 0; i < yStartPosition.length; i ++){
	allEnemies.push(new Enemy(0, yStartPosition[i], 200));
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});