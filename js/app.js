// Enemies our player must avoid
var Enemy = function(yCoord) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = (Math.floor(Math.random() * 300));
    this.y = yCoord;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x >= 700) {
        this.x = 0; //Reset xCoord to 0
    }
    this.x += dt + Math.floor(Math.random() * 8); //Random whole number to set speed
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Check for enemy collision
    allEnemies.forEach(function(enemy) {
        if ((player.y >= enemy.y - 20 && player.y <= enemy.y + 20) &&
            (player.x >= enemy.x && player.x <= enemy.x + 50)) {
            Player.prototype.reset();
            alert("You lost!"); //Window alert that they lost
        }
    });

    //Winning alert
    if (player.y === -15) {
        Player.prototype.reset();
        alert("You won!"); //Window alert that they won
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200; //Sets start position x
    this.y = 400; //Sets start position y
    this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function() {
    this.x = 200; //Original this.x
    this.y = 400; //Original this.y
};

Player.prototype.update = function() {
    if (this.y < -10) {
        this.x = 200; //Original this.x
        this.y = 400; //Original this.y
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x > 0) {
        this.x -= 101; //Moves player left 101
    }
    if (key == 'up' && this.y > 0) {
        this.y -= 83; //Moves player up 83
    }
    if (key == 'right' && this.x < 400) {
        this.x += 101; //Moves player right 101
    }
    if (key == 'down' && this.y < 400) {
        this.y += 83; //Moves player down 83
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(60), new Enemy(145), new Enemy(225)];
var player = new Player();

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