const deathSpriteImage = new Image();
deathSpriteImage.src = 'Death.png';

function deathAnimate(ctx, currentTime, frameDuration) {
    drawFrame(ctx, deathSpriteImage, Math.floor(currentTime / frameDuration) % 8, spriteWidth + 64);
}
