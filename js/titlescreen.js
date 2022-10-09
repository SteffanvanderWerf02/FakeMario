new Typed('.typedJS',
    {
        strings: ["NHL Stenden Emmen", "Fake Mario", "Phaser 3", "3EC's please "],
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
    let begin = document.getElementById("StartGameSettings");
    let StartGame = document.getElementById("StartGame");


    begin.addEventListener("click", () => {
        document.getElementById("gameName").classList.remove("d-none");
        menu.classList.add("d-none");
    })

    StartGame.addEventListener("click", () => {
        setCookie("name", document.getElementById("nameInput").value, 0.5);

        document.getElementById("gameName").classList.add("d-none");
        document.getElementById("game").classList.remove("d-none");
        document.body.classList.remove("titleScreen");

    })



    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
})