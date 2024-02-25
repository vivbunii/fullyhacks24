const idleSpriteImage = new Image();
idleSpriteImage.src = 'Idle.png';

function idleAnimate(ctx, currentTime, frameDuration) {
    drawFrame(ctx, idleSpriteImage, Math.floor(currentTime / frameDuration) % 4, 2 * (spriteWidth + 64));
}
