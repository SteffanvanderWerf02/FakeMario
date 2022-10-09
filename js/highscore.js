document.addEventListener("DOMContentLoaded", () => {
    let highScoresList = document.getElementById("highScoresList");
    let highScoresBtn = document.getElementById("HighscoresBtn");
    let menu = document.getElementById("menu");

    highScoresBtn.addEventListener("click", () => {
        highScoresList.classList.remove("d-none");
        menu.classList.add("d-none");

        loadScores();
    });

    function loadScores() {
        document.getElementById("HighscoreTable").innerHTML = "";
        let http = new XMLHttpRequest()
        http.open("GET", "./PHP/questions.php?f=getHighscoreBoard", true);
        http.send();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.response);
                if (data != null) {
                    console.log(data);
                    var table = document.createElement('table');
                    table.classList.add("table", "table-striped", "table-hover");
                    var thead = document.createElement('thead');

                    var tr = document.createElement('tr');
                    var thNr = document.createElement('th');
                    var thName = document.createElement('th');
                    var thScore = document.createElement('th');

                    var text1 = document.createTextNode("ID");
                    var text2 = document.createTextNode("Name");
                    var text3 = document.createTextNode("Score");

                    thNr.appendChild(text1);
                    thName.appendChild(text2);
                    thScore.appendChild(text3);


                    tr.appendChild(thNr);
                    tr.appendChild(thName);
                    tr.appendChild(thScore);

                    thead.appendChild(tr);
                    table.appendChild(thead);
                    var tbody = document.createElement('tbody');
                    for (var i = 0; i < Object.keys(data).length; i++) {
                        var tr = document.createElement('tr');
                        var tdNr = document.createElement('td');
                        var thName = document.createElement('td');
                        var thScore = document.createElement('td');

                        tdNr.classList.add("align-middle");
                        thName.classList.add("align-middle");
                        thScore.classList.add("align-middle");

                        var text1 = document.createTextNode(data[i].id);
                        var text2 = document.createTextNode(data[i].name);
                        var text3 = document.createTextNode(data[i].score);

                        tdNr.appendChild(text1);
                        thName.appendChild(text2);
                        thScore.appendChild(text3);

                        tr.appendChild(tdNr);
                        tr.appendChild(thName);
                        tr.appendChild(thScore);

                        tbody.appendChild(tr);
                        table.appendChild(tbody);
                        document.getElementById("questionTable").appendChild(table);
                    }
                }
            }

        }
    }
})