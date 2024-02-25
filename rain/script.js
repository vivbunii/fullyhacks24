function point() {
    this.x = 100;
    this.y = 100;
    this.width = 50;
    this.height = 50;

    this.draw = function(ctx) {
        if (!ctx) {
            console.error('era era');
            return;
        }
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
function Line(x1, y1, x2, y2, color, width) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color || 'black'; // Default color is black
    this.width = width || 1; // Default line width is 1

    // Method to draw the line on a canvas
    this.draw = function(ctx) {
        if (!ctx) {
            console.error('You must provide a valid canvas rendering context');
            return;
        }
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.stroke();
    };
}

function Drop(width, lineWidth = 1) {
    const colors = ['#4fd0ba', '#ff757f', '#ffc777', '#b692f2']
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.x = Math.floor(Math.random() * width);
    this.y = Math.random() * (-100 - (-200)) + -200; // Initial y position
    this.width = lineWidth;
    this.yspeed = Math.random() * (8 - 2) + 2; // Speed of fall


    this.fall = function() {
        this.y += this.yspeed; // Correctly increment y by yspeed
        if (this.y > canvas.height) { // Reset if it goes beyond canvas
            this.y = Math.random() * (-100 - (-200)) + -200;
        }
    }

    this.show = function(ctx) {
        const line = new Line(this.x, this.y, this.x, this.y + 15, this.color, this.width);
        line.draw(ctx);
    }
}

const canvas = document.getElementById('canvas');
const body = document.querySelector('body');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

// Resize canvas on window resize
window.addEventListener('resize', resizeCanvas);

function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    const moveAmount = 50;
    switch (key) {
        case 'w':
            square.y -= moveAmount;
            console.log('w presssed')
            break;
        case 'a':
            square.x -= moveAmount;
            console.log('a presssed')
            break;
        case 's':
            square.y += moveAmount;
            console.log('s presssed')
            break;
        case 'd':
            square.x += moveAmount;
            console.log('d presssed')
            break;
        default:
            return;
    }
}

const square = new point();

square.draw(ctx);

window.addEventListener('keydown', handleKeyDown);

const canvasWidth = canvas.width; // Assuming you have defined your canvas size
// change color of the background
ctx.fillStyle = '#222436';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Create a new Drop instance
var drop = new Drop(canvasWidth, 2);

// check if collided
function rectCollision(player, drop) {
    let dropBottomY = drop.y + 15; // Assuming 15 is the drop's height
    return drop.x >= player.x && drop.x <= player.x + player.width &&
        dropBottomY >= player.y && dropBottomY <= player.y + player.height;
    // return line.x2 > player.x && line.x2 < player.x + player.width && line.y2 > player.y + player.height;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = '#222436'; // Background color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the Background

    let collidedDrops = [];

    for (let i = drops.length - 1; i >= 0; i--) {
        drops[i].show(ctx);
        drops[i].fall();

        if (rectCollision(square, drops[i])) {
            console.log('Collision detected');
            drops.splice(i, 1);
        }
    }

    square.draw(ctx);
    requestAnimationFrame(animate); // Loop the animation
}

let dropAmount = 20;
let drops = Array.apply(null, Array(dropAmount)).map(function() { })

function setup(dropAmount) {
    const canvasWidth = canvas.width;
    for (let i = 0; i < dropAmount; i++) {
        drops[i] = new Drop(canvasWidth, 5);
    }
}

setup(100);
animate();

