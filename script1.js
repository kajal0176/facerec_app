const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const singin = document.getElementById('singin');

canvas.width = 1000;
canvas.height = 650;

window.addEventListener('resize',function () {
    canvas.width =1000;
    canvas.height = 650; 
});

let ball = [];

class Ball{
    constructor(){
        this.x = Math.random()*(canvas.width-300)+200;
        this.y = Math.random()*(canvas.height-200)+100;
        this.size = 10;
        this.theta =  Math.random()*5;
        this.speedY = 1;
        this.speedX = 1;

    }
    draw(){
        ctx.fillStyle = 'red'
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.closePath();
        ctx.fill(); 
    }
    update(){
        this.y += 0.2*Math.sin(this.theta)*this.speedY;
        this.x += 0.2*Math.cos(this.theta)*this.speedX;
        this.theta += 0.005;
        if (this.y < 150 || this.y > canvas.height-150) {
            this.speedY = -1;
        }
        if (this.x < 150 || this.x > canvas.width-150) {
            this.speedX = -1;
        }
    }
}

for (let i = 0; i < 30; i++) {
   ball.push(new Ball())
}
function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
function handleBall() {
    for (let i = 0; i < ball.length; i++) {
        ball[i].draw();
        ball[i].update();
    }
}

function connectLine() {
    clear();
    let opacity = 1;

    for (let i = 0; i < ball.length; i++) {
        for (let j = i; j < ball.length; j++) {
            let disx = ball[i].x - ball[j].x;
            let disy = ball[i].y - ball[j].y;
            let distance = Math.sqrt(disx*disx + disy*disy);
            opacity = 1 - (distance/300);
            ctx.strokeStyle = 'rgba(255,255,255,'+opacity+')';
            if (distance < 350) {
                //ctx.strokeStyle = 'white';
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.moveTo(ball[i].x,ball[i].y);
                ctx.lineTo(ball[j].x,ball[j].y);
                ctx.closePath();
                ctx.stroke();  
            }         
        }       
    }
}
setInterval(()=>{
    connectLine();
    handleBall();
},1000/60)