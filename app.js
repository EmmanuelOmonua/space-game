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
  }
}

let hero;
let gameObjects = [];

function createHero(){
  hero = new Hero(canvas.width/2 - 45, canvas.height - canvas.height/4);
  hero.img = heroImg;
  gameObjects.push(hero);
}