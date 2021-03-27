const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 80;

window.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', event => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

class Circle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = color;

        this.draw = () => {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = color;
            c.stroke();
            c.fillStyle = color;
            c.fill();
        };

        this.update = () => {
            if (this.x + radius > innerWidth || this.x - radius < 0) {
                this.dx = -this.dx;
            }
            this.x += this.dx;

            if (this.y + radius > innerHeight || this.y - radius < 0) {
                this.dy = -this.dy;
            }
            this.y += this.dy;

            //interactivity
            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
                    mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if (this.radius < maxRadius) {
                    this.radius += 4;
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 0.5;
            }

            this.draw();
        };
    }
}


let circleArray = [];

function init() {
    circleArray = [];
    
    for (let i = 0; i < 500; i++) {
        let radius = Math.random() * 10 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 8;
        let dy = (Math.random() - 0.5) * 8;
        
        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;
        let color = "rgb(" + r + ", " + g + ", " + b + ")"

        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();