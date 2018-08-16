// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.dt = dt;

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(x, y) {
    this.x = x;
    this.y = y;
    // console.log(this.sprite);

    ctx.drawImage(Resources.get(this.sprite), 400, 58);  
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let allEnemies = [];

// for (i = 0; i < 5; i ++){
//     let dt = 3;
//     let x = 200;
//     let y = 200;
//     allEnemies.push(new Enemy(dt, x, y));
// }
console.log(allEnemies);

function draw(){
    for(i = 0; i < allEnemies.length; i ++){
        
        allEnemies[i].update();
        allEnemies[i].render();
    }

}




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


let playerStatus = [];
    
playerStatus[0] = {
    x : 2 * playerxBox ,
    y : 4 * playeryBox - 25
}
 
Player.prototype.handleInput = function (d){
    
    this.d = d;
    
    // old player position
    let playerX = playerStatus[0].x;
    let playerY = playerStatus[0].y;


    // player direction
    if(this.d == "left") playerX -= playerxBox;
    if(this.d == "up") playerY -= playeryBox;
    if(this.d == "right") playerX += playerxBox;
    if(this.d == "down") playerY += playeryBox;

    playerStatus.pop();

    let newStatus = {
        x : playerX,
        y : playerY
    }

    this.x = playerX;
    this.y = playerY;


    playerStatus.push(newStatus);
     

};


var player = new Player();




 







// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


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



