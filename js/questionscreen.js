document.addEventListener("DOMContentLoaded", () => {
    let question = document.getElementById("newQuestions");
    let questionScreen = document.getElementById("questions");
    let questionEditScreenBtn = document.getElementById("questionEdit");
    let questionEditScreen = document.getElementById("editQuestion");
    let questionList = document.getElementById("qlist")
    let questionEditSaveBtn = document.getElementById("questionEditSave");

    question.addEventListener("click", () => {
        questionScreen.classList.add("d-block");
        questionScreen.classList.remove("d-none");
        document.getElementById("menu").classList.add("d-none");

        loadQuestions();
    })

    questionEditScreenBtn.addEventListener("click", () => {
        questionEditScreen.classList.remove("d-none");
        questionScreen.classList.add("d-none");

        let http = new XMLHttpRequest()
        http.open("GET", "./PHP/questions.php?f=getQuestions", true);
        http.send();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.response);
                for (var i = 0; i < Object.keys(data).length; i++) {
                    var option = document.createElement('option');
                    option.value = data[i].id;
                    option.innerHTML = data[i].question;

                    questionList.appendChild(option);
                }

                document.getElementById("editTitle").innerHTML = "Question " + data[0].id;
                document.getElementById("uniqueId").getAttribute("value");
                document.getElementById("editQuestionInput").setAttribute("value", data[0].question);
                document.getElementById("editAwnserInput").setAttribute("value", data[0].answer);
                document.getElementById("editWrong1Input").setAttribute("value", data[0].wrong1);
                document.getElementById("editWrong2Input").setAttribute("value", data[0].wrong2);
                document.getElementById("editWrong3Input").setAttribute("value", data[0].wrong3);
            }
        }
    });

    questionList.addEventListener("change", (e) => {
        loadQuestiontoInput(e.target.value);
    });

    questionEditSaveBtn.addEventListener("click", () => {
        console.log(document.getElementById("uniqueId").getAttribute("value"),
            document.getElementById("editQuestionInput").getAttribute("value"),
            document.getElementById("editAwnserInput").getAttribute("value"),
            document.getElementById("editWrong1Input").getAttribute("value"),
            document.getElementById("editWrong2Input").getAttribute("value"),
            document.getElementById("editWrong3Input").getAttribute("value"),);
        editQuestion(
            document.getElementById("uniqueId").getAttribute("value"),
            document.getElementById("editQuestionInput").getAttribute("value"),
            document.getElementById("editAwnserInput").getAttribute("value"),
            document.getElementById("editWrong1Input").getAttribute("value"),
            document.getElementById("editWrong2Input").getAttribute("value"),
            document.getElementById("editWrong3Input").getAttribute("value"),
        )
        loadQuestiontoInput(document.getElementById("uniqueId").getAttribute("value"));
    });

    function loadQuestions() {
        let http = new XMLHttpRequest()
        http.open("GET", "./PHP/questions.php?f=getQuestions", true);
        http.send();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.response);

                var table = document.createElement('table');
                table.classList.add("table", "table-striped", "table-hover");
                var thead = document.createElement('thead');

                var tr = document.createElement('tr');
                var thNr = document.createElement('th');
                var thQuest = document.createElement('th');
                var thAwnser = document.createElement('th');
                var thWrong1 = document.createElement('th');
                var thWrong2 = document.createElement('th');
                var thWrong3 = document.createElement('th');

                var text1 = document.createTextNode("ID");
                var text2 = document.createTextNode("Question");
                var text3 = document.createTextNode("Awnser");
                var text4 = document.createTextNode("Wrong 1");
                var text5 = document.createTextNode("Wrong 2");
                var text6 = document.createTextNode("Wrong 3");

                thNr.appendChild(text1);
                thQuest.appendChild(text2);
                thAwnser.appendChild(text3);
                thWrong1.appendChild(text4);
                thWrong2.appendChild(text5);
                thWrong3.appendChild(text6);

                tr.appendChild(thNr);
                tr.appendChild(thQuest);
                tr.appendChild(thAwnser);
                tr.appendChild(thWrong1);
                tr.appendChild(thWrong2);
                tr.appendChild(thWrong3);

                thead.appendChild(tr);
                table.appendChild(thead);

                var tbody = document.createElement('tbody');
                for (var i = 0; i < Object.keys(data).length; i++) {
                    var tr = document.createElement('tr');
                    var tdNr = document.createElement('td');
                    var tdQuest = document.createElement('td');
                    var tdAwnser = document.createElement('td');
                    var tdWrong1 = document.createElement('td');
                    var tdWrong2 = document.createElement('td');
                    var tdWrong3 = document.createElement('td');

                    var text1 = document.createTextNode(data[i].id);
                    var text2 = document.createTextNode(data[i].question);
                    var text3 = document.createTextNode(data[i].answer);
                    var text4 = document.createTextNode(data[i].wrong1);
                    var text5 = document.createTextNode(data[i].wrong2);
                    var text6 = document.createTextNode(data[i].wrong3);

                    tdNr.appendChild(text1);
                    tdQuest.appendChild(text2);
                    tdAwnser.appendChild(text3);
                    tdWrong1.appendChild(text4);
                    tdWrong2.appendChild(text5);
                    tdWrong3.appendChild(text6);

                    tr.appendChild(tdNr);
                    tr.appendChild(tdQuest);
                    tr.appendChild(tdAwnser);
                    tr.appendChild(tdWrong1);
                    tr.appendChild(tdWrong2);
                    tr.appendChild(tdWrong3);

                    tbody.appendChild(tr);
                }
                table.appendChild(tbody);
                document.getElementById("questionTable").appendChild(table);
            }
        }
    }

    function loadQuestiontoInput(id) {
        let http = new XMLHttpRequest()
        http.open("GET", "./PHP/questions.php?f=getQuestion&id=" + id, true);
        http.send();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let data = JSON.parse(this.response);
                document.getElementById("editTitle").innerHTML = "Question " + data[0].id;
                document.getElementById("uniqueId").setAttribute("value", data[0].id);
                document.getElementById("editQuestionInput").setAttribute("value", data[0].question);
                document.getElementById("editAwnserInput").setAttribute("value", data[0].answer);
                document.getElementById("editWrong1Input").setAttribute("value", data[0].wrong1);
                document.getElementById("editWrong2Input").setAttribute("value", data[0].wrong2);
                document.getElementById("editWrong3Input").setAttribute("value", data[0].wrong3);
            }
        }
    }

    function editQuestion(id, question, answer, wrong1, wrong2, wrong3) {
        if (id == "") {
            return;
        }
        let http = new XMLHttpRequest();
        console.log("./PHP/questions.php?f=editQuestion&q=" + question + "&a=" + answer + "&w1=" + wrong1 + "&w2=" + wrong2 + "&w3=" + wrong3 + "&id=" + id)
        http.open("GET", "./PHP/questions.php?f=editQuestion&q=" + question + "&a=" + answer + "&w1=" + wrong1 + "&w2=" + wrong2 + "&w3=" + wrong3 + "&id=" + id, true);
        http.send();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.response);
                console.log(data);
            }
        }
    }
})