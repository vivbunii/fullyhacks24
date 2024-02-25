const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
}

const floorCollisions2d = []
for (let i = 0; i < floorCollisions2d.length; i+= 36) {
    floorCollisions2d.push(floorCollisions2d.slice(i, i + 36));
}



let y = 100;
let y2 = 100;

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = 'red';
    c.fillRect(200, y, 100, 100);
    y++;

    c.fillStyle = 'red';
    c.fillRect(400, y2, 100, 100);
    y2++;
}

animate();