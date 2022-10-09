document.addEventListener("DOMContentLoaded", () => {
    let highscoreToMenu = document.getElementById("highscoreToMenu");
    let questionsToMenu = document.getElementById("questionsToMenu");
    let QuestionEditToQuestions = document.getElementById("QuestionEditToQuestions");
    let gameNameToMenu = document.getElementById("gameNameToMenu");

    highscoreToMenu.addEventListener("click", () => {
        highScoresList.classList.add("d-none");
        menu.classList.remove("d-none");
    });

    questionsToMenu.addEventListener("click", () => {
        document.getElementById("questions").classList.add("d-none");
        menu.classList.remove("d-none");
    });

    QuestionEditToQuestions.addEventListener("click", () => {
        document.getElementById("questions").classList.remove("d-none");
        document.getElementById("editQuestion").classList.add("d-none");
    });

    gameNameToMenu.addEventListener("click", () => {
        document.getElementById("gameName").classList.add("d-none");
        menu.classList.remove("d-none");
    });

});