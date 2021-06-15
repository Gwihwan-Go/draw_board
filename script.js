const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.querySelector("#jsRange");
const colors = document.querySelectorAll(".jsColor");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");
const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillstyle = INITIAL_COLOR;

const stopPainting = ()=>{
    painting = false;
}
const startPainting = ()=>{
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}

function handleRange(event){
    ctx.lineWidth = event.target.value;
}

function handleMode(event){
    if(filling){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleClick(event){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){
    event.preventDefault();

}

function handleSave(event){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}
if(canvas){
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("contextmenu", handleCM);
    };

colors.forEach(color=> color.addEventListener("click", handleColor));

if (range){
    range.addEventListener("input", handleRange);
}

if(mode){
    mode.addEventListener("click", handleMode);
}

if(save){
    save.addEventListener("click",handleSave);
}