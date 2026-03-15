const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let player = {
    x: 375,
    y: 520,
    width: 50,
    height: 50,
    speed: 6
};

let bullets = [];
let enemies = [];

document.addEventListener("keydown", keyDown);

function keyDown(e){

    if(e.key === "ArrowLeft")
        player.x -= player.speed;

    if(e.key === "ArrowRight")
        player.x += player.speed;

    if(e.key === " ")
        bullets.push({
            x: player.x + 20,
            y: player.y
        });
}

function createEnemy(){

    enemies.push({
        x: Math.random() * 750,
        y: 0,
        width: 40,
        height: 40
    });
}

setInterval(createEnemy,1500);

function update(){

    bullets.forEach(b => b.y -= 10);

    enemies.forEach(e => e.y += 2);
}

function draw(){

    ctx.clearRect(0,0,800,600);

    ctx.fillStyle = "green";
    ctx.fillRect(player.x,player.y,player.width,player.height);

    ctx.fillStyle = "red";

    enemies.forEach(e=>{
        ctx.fillRect(e.x,e.y,e.width,e.height);
    });

    ctx.fillStyle = "yellow";

    bullets.forEach(b=>{
        ctx.fillRect(b.x,b.y,5,10);
    });
}

function gameLoop(){

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();