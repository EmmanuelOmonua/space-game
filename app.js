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