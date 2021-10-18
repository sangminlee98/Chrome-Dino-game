const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const img2 = new Image();
img2.src = 'dinosaur.png';


const dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw() {
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img2,this.x,this.y,this.width,this.height);
    }
}

const img1 = new Image();
img1.src = 'cactus.png';

class Cactus {
    constructor() {
        this.x = 600;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img1,this.x,this.y,this.width,this.height);
    }
}

let timer = 0;
let jumptimer = 0;
let cactuses = [];
var animation;

function frame() {
    animation = requestAnimationFrame(frame);
    timer++;
    
    ctx.clearRect(0,0,canvas.width,canvas.height);


    if(timer%80 === 0){
    let cactus = new Cactus();
    cactuses.push(cactus);
    }

    cactuses.forEach((a,i,o)=>{
        if(a.x < 0){
            o.splice(i,1);
        }
        a.x -= 5;
        crush(dino,a);
        a.draw();
    })

    if(점프중 == true){
        dino.y -= 4;
        jumptimer++;
    }

    if(점프중 == false){
        if(dino.y<200){
            dino.y += 4;
        }
    }

    if(jumptimer>30){
        점프중 = false;
        jumptimer= 0;
    }
    
    dino.draw()
}

frame();

var 점프중 = false;
document.addEventListener('keydown',(e)=>{
    if (e.code === 'Space')  {
        점프중 = true;
    }
})

function crush (dino,a) {
    var xdif = a.x - (dino.x+dino.width);
    var ydif = a.y - (dino.y+dino.height);
    if(xdif<0 && ydif<0){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(animation);
    }
}