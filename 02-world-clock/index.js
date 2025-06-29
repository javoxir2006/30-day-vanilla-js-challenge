const sechand = document.querySelectorAll(".second-hand")
const minhand = document.querySelectorAll(".min-hand");
const hourhand = document.querySelectorAll(".hour-hand");

const ftime = document.querySelectorAll(".f");
const stime = document.querySelectorAll(".s");
const ttime = document.querySelectorAll(".t");

function setDate(){
    const time = new Date();

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();
    
    const secondDegrees = ((seconds / 60) * 360) + 90;
    const minDegrees = ((minutes / 60) * 360) + 90;
    const hourDegrees = ((hours / 12 ) * 360) + ((minutes / 720) * 360) + 90;

    // tashkent
    sechand[0].style.transform = `rotate(${secondDegrees}deg)`;
    minhand[0].style.transform = `rotate(${minDegrees}deg)`;
    hourhand[0].style.transform = `rotate(${hourDegrees}deg)`;

    ftime[0].textContent = String(hours).padStart(2, "0");
    stime[0].textContent = String(minutes).padStart(2, "0");
    ttime[0].textContent = String(seconds).padStart(2, "0");


    // madrid
    sechand[1].style.transform = `rotate(${secondDegrees}deg)`;
    minhand[1].style.transform = `rotate(${minDegrees}deg)`;
    hourhand[1].style.transform = `rotate(${hourDegrees - 90}deg)`;

    ftime[1].textContent = String(`${hours - 3}`).padStart(2, "0");
    stime[1].textContent = String(minutes).padStart(2, "0");
    ttime[1].textContent = String(seconds).padStart(2, "0");

    // newyork
    sechand[2].style.transform = `rotate(${secondDegrees}deg)`;
    minhand[2].style.transform = `rotate(${minDegrees}deg)`;
    hourhand[2].style.transform = `rotate(${hourDegrees - 270}deg)`;

    ftime[2].textContent = String(`${hours - 9}`).padStart(2, "0");
    stime[2].textContent = String(minutes).padStart(2, "0");
    ttime[2].textContent = String(seconds).padStart(2, "0");

    // tokio
    sechand[3].style.transform = `rotate(${secondDegrees}deg)`;
    minhand[3].style.transform = `rotate(${minDegrees}deg)`;
    hourhand[3].style.transform = `rotate(${hourDegrees + 120}deg)`;

    ftime[3].textContent = String(`${hours + 4}`).padStart(2, "0");
    stime[3].textContent = String(minutes).padStart(2, "0");
    ttime[3].textContent = String(seconds).padStart(2, "0");

}

setInterval(setDate, 1000);