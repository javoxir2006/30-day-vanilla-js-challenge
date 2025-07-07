const colors = document.querySelectorAll(".color");
const lines = document.querySelectorAll(".line");
const special = document.querySelector(".special");
const eraser = document.querySelector(".eraser");

const canvas = document.querySelector("#draw");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = 'black';
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = "2";

let isDrawing = false;
let isSpecial = false;
let useEraser = false;

let lineX = 0;
let lineY = 0;
let hue = 0;

function draw(e){
    if(!isDrawing) return;

    ctx.beginPath();
    ctx.moveTo(lineX, lineY);
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke();

    lineX = e.offsetX;
    lineY = e.offsetY;

    if(isSpecial){
        hue++;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    }

    if(useEraser){
        ctx.strokeStyle = "#fbfbfb";
    }
}

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lineX = e.offsetX;
    lineY = e.offsetY;

});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

colors.forEach(color => color.addEventListener("click", () => {
    ctx.strokeStyle = `${color.dataset.color}`;
    isSpecial = false;
    useEraser = false;
}))

lines.forEach(line => line.addEventListener("click", () => {
    ctx.lineWidth = `${line.dataset.width}`;
}))

function check(using){
    lines.forEach(line => {
        line.classList.remove("line-active");
    });
    using.classList.add("line-active");
}

function checkColor(using){
    colors.forEach(color => {
        color.classList.remove("color-active");
    });
    special.classList.remove("color-active");
    eraser.classList.remove("color-active");
    using.classList.add("color-active");
}

special.addEventListener("click", () => {
    isSpecial = true;
})

eraser.addEventListener("click", () => {
    useEraser = true;
})
