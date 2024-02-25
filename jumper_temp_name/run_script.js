const runSpriteImage = new Image();
runSpriteImage.src = 'Run.png';

function runAnimate(ctx, currentTime, frameDuration) {
    drawFrame(ctx, runSpriteImage, Math.floor(currentTime / frameDuration) % 6, 0);
}
