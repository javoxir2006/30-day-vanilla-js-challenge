const inputs = document.querySelectorAll(".controls input");

const tmer = document.querySelector(".textp-mer");
const tven = document.querySelector(".textp-ven");
const tear = document.querySelector(".textp-ear");
const tmar = document.querySelector(".textp-mar");
const tjup = document.querySelector(".textp-jup");

const pmer = document.querySelector(".textop-mer");
const pven = document.querySelector(".textop-ven");
const pear = document.querySelector(".textop-ear");
const pmar = document.querySelector(".textop-mar");
const pjup = document.querySelector(".textop-jup");

function update(){
    const suffix = this.dataset.sizing || this.dataset.percent;
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

    if(this.name === "speedmer"){
        tmer.textContent = this.value;
    }else if(this.name === "speedven"){
        tven.textContent = this.value;
    }else if(this.name === "speedear"){
        tear.textContent = this.value;
    }else if(this.name === "speedmar"){
        tmar.textContent = this.value;
    }
    else if(this.name === "speedjup"){
        tjup.textContent = this.value;
    }
    

    if(this.name === "opacitymer"){
        pmer.textContent = this.value;
    } else if(this.name === "opacityven"){
        pven.textContent = this.value
    } else if(this.name === "opacityear"){
        pear.textContent = this.value
    } else if(this.name === "opacitymar"){
        pmar.textContent = this.value
    } else if(this.name === "opacityjup"){
        pjup.textContent = this.value
    }
}

inputs.forEach(input => input.addEventListener("change", update));
inputs.forEach(input => input.addEventListener("mousemove", update));
