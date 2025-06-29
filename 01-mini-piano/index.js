window.addEventListener("keydown", event =>{
    const audio = document.querySelector(`audio[data-key="${event.key}"]`);
    const key = document.querySelector(`.key[data-key="${event.key}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();

    key.classList.add("playing");
});

window.addEventListener("keyup", event=>{
    const key = document.querySelector(`.key[data-key="${event.key}"]`);
    if(!key) return;
    key.classList.remove("playing");
});