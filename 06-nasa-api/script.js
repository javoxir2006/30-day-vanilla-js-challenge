const api = "DEMO_KEY";


const title = document.querySelector(".title");
const image = document.querySelector(".image");
const info = document.querySelector(".explanation");
const author = document.querySelector(".pictureby");
let input = document.querySelector("input");

const url = `https://api.nasa.gov/planetary/apod?api_key=${api}&date=${input.value}`;

fetch(url)
        .then(response => response.json())
        .then(apod => {
         
            title.textContent = apod.title;
            image.innerHTML = `<img src="${apod.url}">`;
            info.textContent = apod.explanation;
            author.textContent = apod.copyright;
        });

input.addEventListener("change", ()=>{
    const value = document.querySelector("input").value;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${api}&date=${value}`;
    fetch(url)
        .then(response => response.json())
        .then(apod => {
         
            title.textContent = apod.title;
            image.innerHTML = `<img src="${apod.url}">`;
            info.textContent = apod.explanation;
            author.textContent = apod.copyright;
        });
})

