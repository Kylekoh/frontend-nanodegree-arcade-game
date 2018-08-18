// Enemies our player must avoid
var Enemy = function(x, y, dx) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.dx = dx;
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
Enemy.prototype.render = function() {
    this.x += this.dx;
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
    

    if(this.x < 0 || this.x > 4 * playerxBox || this.y > 5 * playeryBox){
        return ;
    }

    playerStatus.push(newStatus);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
let yStartPosition = [58, 141, 224];

function drawEnemy(){   
    for (i = 0; i < 1; i ++){
        let x = -20;
        let num = Math.floor(Math.random() * yStartPosition.length);
        let dx = Math.floor((Math.random() + 0.65) * 4);
        console.log(allEnemies)
        allEnemies.push(new Enemy(x, yStartPosition[num], dx));

        if (allEnemies.length > 5){
            allEnemies.shift();
        }          
        for (j = 0; j < allEnemies.length; j++){
            // console.log(allEnemies[j])
            // console.log(player.x, player.y, allEnemies[j].x, allEnemies[j].y);
            if(player.x == allEnemies[j].x && player.y == allEnemies[j].y){
                alert('You Lose');
            }
        }
    }

    
}

setInterval(drawEnemy, 1500);



let playerStatus = [];
    
playerStatus[0] = {
    x : 2 * playerxBox ,
    y : 4 * playeryBox - 25
}
 
var player = new Player(playerStatus[0].x, playerStatus[0].y);





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
    // for (i = 0; i < allEnemies.length; i++){
    //     if(player.x == allEnemies[i].x && player.y == allEnemies[i].y){
    //         alert('bobobobo');
    //     }
    //     console.log(player.x, player.y);
    //     console.log(allEnemies[i].x, allEnemies[i].y);
    // }
});



