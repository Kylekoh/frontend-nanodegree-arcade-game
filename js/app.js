// Enemies our player must avoid
var Enemy = function(x, y, dx) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = y;
    this.x = x;
    this.dx = dx;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.dt = dt;
	
    this.x = this.x + this.dx * this.dt;
    
	if (this.x > 510) {
        this.x = -50;
        this.dx = 100 + Math.floor(Math.random() * 220);
    };	
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x + 80 > player.x && this.x < player.x + 80 && this.y == player.y){
    	alert("YOU LOSE")

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() { 
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


const playerxBox = 101;
const playeryBox = 83;

var Player = function(x, y) {
    this.sprite = "images/char-boy.png"
    this.x = x;
    this.y = y;  
};

Player.prototype.update = function(dt) {
    this.dt = dt;
};

Player.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (d){
    
    this.d = d;
    
    // old player position
    let playerX = playerStatus[0].x;
    let playerY = playerStatus[0].y;


    // player direction
    if(this.d == "left" && this.x > 0) playerX -= playerxBox;
    if(this.d == "up" && this.y > -25) playerY -= playeryBox;
    if(this.d == "right" && this.x < 404) playerX += playerxBox;
    if(this.d == "down" && this.y < 390) playerY += playeryBox;
    
    playerStatus.pop();

    let newStatus = {
        x : playerX,
        y : playerY
    }
    this.x = playerX;
    this.y = playerY;

    if(this.y < playeryBox - 80){
	    	alert('CONGRATURATIONS!! YOU WON!!');
    }

    playerStatus.push(newStatus);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



let playerStatus = [];
    
playerStatus[0] = {
    x : 2 * playerxBox ,
    y : 4 * playeryBox - 25
}
 
var player = new Player(playerStatus[0].x, playerStatus[0].y);

let allEnemies = [];
let yStartPosition = [58, 141, 224];


for (i = 0; i < yStartPosition.length; i ++){
	allEnemies.push(new Enemy(0, yStartPosition[i], 200));
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});



