let canvas;
let ctx;

window.onload = () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
};

class GameObject {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dead = false;
    this.type = "";
    this.width = 0;
    this.height = 0;
    this.img = undefined;
  }

  draw(ctx){
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
  }

  rectFromGameObject(){
    return {
      top: this.y,
      left: this.x,
      bottom: this.y + this.height,
      right: this.x + this.width
    };
  }
}

class Hero extends GameObject {
  constructor(x,y){
    super(x,y);
    this.width = 99;
    this.height = 75;
    this.type = "Hero";
    this.speed = {x:0,y:0};
    this.cooldown = 0;
    this.life = 3;
    this.points = 0;

    fire(){
      gameObjects.push(new Laser(this.x+45,this.y-10));
    }
    
  }
}

let hero;
let gameObjects = [];

function createHero(){
  hero = new Hero(canvas.width/2 - 45, canvas.height - canvas.height/4);
  hero.img = heroImg;
  gameObjects.push(hero);
}

class Enemy extends GameObject {
  constructor(x,y){
    super(x,y);
    this.width = 98;
    this.height = 50;
    this.type = "Enemy";

    let id = setInterval(()=>{
      if(this.y < canvas.height - this.height){
        this.y += 5;
      } else {
        clearInterval(id);
      }
    },300);
  }
}

function createEnemies(){
  const MONSTER_TOTAL = 5;
  const MONSTER_WIDTH = MONSTER_TOTAL * 98;
  const START_X = (canvas.width - MONSTER_WIDTH)/2;
  const STOP_X = START_X + MONSTER_WIDTH;

  for(let x=START_X;x<STOP_X;x+=98){
    for(let y=0;y<50*5;y+=50){
      const enemy = new Enemy(x,y);
      enemy.img = enemyImg;
      gameObjects.push(enemy);
    }
  }
}

class Laser extends GameObject {
  constructor(x,y){
    super(x,y);
    this.width = 9;
    this.height = 33;
    this.type = "Laser";
    this.img = laserImg;

    let id = setInterval(()=>{
      if(this.y > 0){
        this.y -= 15;
      } else {
        this.dead = true;
        clearInterval(id);
      }
    },100);
  }
}

window.addEventListener("keyup",(evt)=>{
  if(evt.key === "ArrowLeft"){
    hero.x -= 20;
  }
  else if(evt.key === "ArrowRight"){
    hero.x += 20;
  }
  else if(evt.keyCode === 32){
    hero.fire();
  }
});

function intersectRect(r1,r2){
  return !(r2.left > r1.right ||
           r2.right < r1.left ||
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}