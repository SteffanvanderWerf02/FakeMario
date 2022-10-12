// instance for the title screen typer
new Typed('.typedJS',
    {
        strings: ["NHL Stenden Emmen", "Fake Mario Deluxe.", "Phaser 3", "3EC's please "],
        typeSpeed: 60,
        shuffle: true,
        backSpeed: 40,
        backDelay: 2000,
        startDelay: 0,
        loop: true,
        smartBackspace: true
    }
);

document.addEventListener("DOMContentLoaded", () => {
    //selectors
    let begin = document.getElementById("StartGameSettings");
    let StartGame = document.getElementById("StartGame");

    //show the name field of game
    begin.addEventListener("click", () => {
        document.getElementById("gameName").classList.remove("d-none");
        menu.classList.add("d-none");
    })

    //start the game screen
    StartGame.addEventListener("click", () => {
        document.getElementById("gameName").classList.add("d-none");
        document.getElementById("game").classList.remove("d-none");
        document.body.classList.remove("titleScreen");

    })
})