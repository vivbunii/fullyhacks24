const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const spriteWidth = 64;
const spriteHeight = 64;
const frameDuration = 120; // in milliseconds

let currentTime = 0;

function drawFrame(ctx, image, currentFrame, x) {
    ctx.drawImage(
        image,
        currentFrame * spriteWidth,
        0,
        spriteWidth,
        spriteHeight,
        x,
        0,
        spriteWidth,
        spriteHeight
    );
}

function animate() {
    const now = Date.now();
    const elapsed = now - currentTime;

    if (elapsed > frameDuration) {
        currentTime = now - (elapsed % frameDuration);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        runAnimate(ctx, currentTime, frameDuration);
        deathAnimate(ctx, currentTime, frameDuration);
        idleAnimate(ctx, currentTime, frameDuration);
    }

    requestAnimationFrame(animate);
}

runSpriteImage.onload = () => {
    animate();
};
