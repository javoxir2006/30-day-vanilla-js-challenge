const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    const parent = button.parentElement.parentElement;
    
    button.addEventListener("click", () =>{
        parent.classList.toggle("show-active");
        parent.classList.toggle("showing");

    })

    button.addEventListener("mouseover", () =>{
        button.style.cursor = "pointer";
    })
})

const arr = [1, 2, 3, 4, 5];
const newarr = arr.map(a => {
    return a*2;
})

const farr = [9, 0, 6, 8, 1, 7];
const fdarr = farr.filter(a => {
    if(a % 2 ===0 ){
        return 1;
    }
})

const sarr = [7, 9, 3, 4, 1];
const sdarr = sarr.sort((a, b) => {
    return a > b ? 1 : -1;
}, 0)

const rarr = [3, 2, 4, 6, 9];
const rdarr = rarr.reduce((total, a) => {
    return total + a;
})

const lower = document.querySelectorAll(".lower");
lower[0].textContent += `[${newarr}]`;
lower[1].textContent += `[${fdarr}]`;
lower[2].textContent += `[${sdarr}]`;
lower[3].textContent += `[${rdarr}]`;


