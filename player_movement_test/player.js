// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    canvas.width = window.innerWidth - 24;
    canvas.height = window.innerHeight - 24;
}

const backgroundImage = new Image();
backgroundImage.src = 'assets/Game_Level.svg';

const spriteWidth = 518;
const spriteHeight = 455;

const sprite = new Image();
sprite.src = 'assets/walk2.png';

const numberOfWalkFrames = 2;
let currentWalkFrame = 0;

const idleSprite = new Image();
idleSprite.src = 'assets/bounce2.png';

const numberOfIdleFrames = 2;
let currentIdleFrame = 0;
let lastIdleFrameChangeTime = 0;


const sleepSprite = new Image();
sleepSprite.src = 'assets/sleep.png'

const numberOfSleepFrames = 2;
let currentSleepFrame = 0;


const jumpSprite = new Image();
jumpSprite.src = 'assets/jump.png';

const fallSprite = new Image();
fallSprite.src = 'assets/fall.png';

let isJumping = false;
let isFalling = false;

const frameChangeInterval = 240; //Time in milliseconds
let lastFrameChangeTime = 0;

const screenUpdateInterval = 1 //Time in milliseconds
let lastScreenUpdateTime = 0;

let direction = 1;

// Define the player character
const player = {
    x: 50,
    y: canvas.height - 100,
    width: 100,
    height: 100,
    speed: 3,
    jumping: false,
    jumpHeight: 200,
    jumpCount: 0,
};

// Handle keyboard input
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Draw the character using the sprite
function drawCharacter() {
    const now = Date.now();

    // Change frame only if enough time has passed
    if (now - lastFrameChangeTime > frameChangeInterval) {
        // Update the current frame for walking animation
        currentWalkFrame = (currentWalkFrame + 1) % numberOfWalkFrames;

        // Update the last frame change time
        lastFrameChangeTime = now;
    }

    // Update screen every time
    if (now - lastScreenUpdateTime > screenUpdateInterval) {
        // Clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        ctx.save();

        //Draw idle animation if no keys are being pressed.
        if (!keys['ArrowUp'] && !keys['ArrowDown'] && !keys['ArrowLeft'] && !keys['ArrowRight'] && !player.isJumping && !player.isFalling) {
            if (direction === 1) {
                    ctx.drawImage(
                        idleSprite,
                        currentIdleFrame * spriteWidth,
                        0,
                        spriteWidth,
                        spriteHeight,
                        player.x,
                        player.y,
                        player.width,
                        player.height
                    );
            } else {
                    ctx.save();
                    ctx.scale(-1, 1); // Flip horizontally
                    ctx.drawImage(
                        idleSprite,
                        currentIdleFrame * spriteWidth,
                        0,
                        spriteWidth,
                        spriteHeight,
                        -player.x - player.width, // Adjust x position when facing left
                        player.y,
                        player.width,
                        player.height
                    );
                    ctx.restore(); // Restore the canvas state after drawing
                }
                if (now - lastIdleFrameChangeTime > frameChangeInterval) {
                        currentIdleFrame = (currentIdleFrame + 1) % numberOfIdleFrames;
                        lastIdleFrameChangeTime = now;
                }
                
            //Draw sleep sprite
        } else if (keys['ArrowDown']) {
            if (direction === 1) {
                ctx.drawImage(
                    sleepSprite,
                    currentSleepFrame * spriteWidth,
                    0,
                    spriteWidth,
                    spriteHeight,
                    player.x,
                    player.y,
                    player.width,
                    player.height
                );
            } else {
                ctx.save();
                ctx.scale(-1, 1); // Flip horizontally
                ctx.drawImage(
                    sleepSprite,
                    currentSleepFrame * spriteWidth,
                    0,
                    spriteWidth,
                    spriteHeight,
                    -player.x - player.width, // Adjust x position when facing left
                    player.y,
                    player.width,
                    player.height
                );
                ctx.restore(); // Restore the canvas state after drawing
            }
            if (now - lastFrameChangeTime > frameChangeInterval) {
                currentSleepFrame = (currentSleepFrame + 1) % numberOfSleepFrames;
                lastFrameChangeTime = now;
            }
        } else if (player.isJumping) {
            // Draw jump sprite
            if (direction === 1) {
                ctx.drawImage(
                    jumpSprite,
                    player.jumpFrame * spriteWidth,
                    0,
                    spriteWidth,
                    spriteHeight,
                    player.x,
                    player.y,
                    player.width,
                    player.height
                );
            } else {
                // Flip the sprite horizontally if moving left
                ctx.scale(-1, 1); // Flip horizontally
                ctx.drawImage(
                    jumpSprite,
                    player.jumpFrame * spriteWidth,
                    0,
                    spriteWidth,
                    spriteHeight,
                    -player.x - player.width, // Adjust x position when facing left
                    player.y,
                    player.width,
                    player.height
                );
                ctx.restore(); // Restore the canvas state after drawing
            }
        } else if (player.isFalling) {
            // Draw fall sprite
            if (direction === 1) {
                ctx.drawImage(
                    fallSprite,
                    player.jumpFrame * spriteWidth, // You can use the same frame for jump and fall, adjust if needed
                    0,
                    spriteWidth,
                    spriteHeight,
                    player.x,
                    player.y,
                    player.width,
                    player.height
                );
            } else {
                // Flip the sprite horizontally if moving left
                ctx.scale(-1, 1); // Flip horizontally
                ctx.drawImage(
                    fallSprite,
                    player.jumpFrame * spriteWidth,
                    0,
                    spriteWidth,
                    spriteHeight,
                    -player.x - player.width, // Adjust x position when facing left
                    player.y,
                    player.width,
                    player.height
                );
                ctx.restore(); // Restore the canvas state after drawing
            }

        } else {
            // Draw walking sprite
            if (direction === 1) {
                ctx.drawImage(
                    sprite,
                    currentWalkFrame * spriteWidth,
                    0,
                    spriteWidth,
                    spriteHeight,
                    player.x,
                    player.y,
                    player.width,
                    player.height
                );
            } else {
                // Flip the sprite horizontally if moving left
                ctx.scale(-1, 1); // Flip horizontally
                ctx.drawImage(
                    sprite,
                    currentWalkFrame * spriteWidth,
                    0,
                    spriteWidth,
                    spriteHeight,
                    -player.x - player.width, // Adjust x position when facing left
                    player.y,
                    player.width,
                    player.height
                );
                ctx.restore(); // Restore the canvas state after drawing
                
            } 
        }
        }

        // Update the last screen update time
        lastScreenUpdateTime = now;
    }


// Update function
function update() {
    const now = Date.now();

    if (now - lastFrameChangeTime > frameChangeInterval) {
        lastFrameChangeTime = now;

        // Update walking frame only if not jumping or falling
        if (!player.isJumping && !player.isFalling) {
            currentWalkFrame = (currentWalkFrame + 1) % numberOfWalkFrames;
        }
    }

    if (now - lastScreenUpdateTime > screenUpdateInterval) {
        if (player.isJumping) {
            if (player.jumpCount >= player.jumpHeight) {
                player.isJumping = false;
                player.isFalling = true;
                player.jumpFrame = 0; // Reset jump frame when starting to fall
            }
        } else if (player.isFalling) {
            if (player.y >= canvas.height - player.height) {
                player.isFalling = false;
                player.jumpCount = 0; // Reset jump count when landing
                currentWalkFrame = 0; // Reset walking frame when landing
            }
        }

        // Move left
        if (keys['ArrowLeft'] && player.x > 0) {
            player.x -= player.speed;
            direction = -1;
        }

        // Move right
        if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
            player.x += player.speed;
            direction = 1;
        }

        // Jump
        if (keys['ArrowUp'] && !player.isJumping && player.y === canvas.height - player.height) {
            // Allow jumping only when on the floor and not already jumping
            player.isJumping = true;
            player.jumpFrame = 0; // Start jumping animation from the first frame
        }

        // Handle jumping
        if (player.isJumping) {
            if (player.y > canvas.height - player.height - player.jumpHeight) {
                player.y -= player.speed; // Ascend
                player.jumpCount += player.speed;

                // Update jump frame only if enough time has passed
                if (now - lastFrameChangeTime > frameChangeInterval) {
                    player.jumpFrame = (player.jumpFrame + 1) % numberOfWalkFrames;
                }
            } else {
                // Reached max jump height, start descending
                player.isJumping = false;
            }
        } else if (player.y < canvas.height - player.height) {
            // Fall down if not jumping
            player.y += player.speed; // Descend
            currentWalkFrame = 0; // Reset walking frame when falling
        }
    }

    drawCharacter();

    // Request the next animation frame
    requestAnimationFrame(update);
}

// Start the game loop
update();
