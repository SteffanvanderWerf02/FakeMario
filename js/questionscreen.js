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
                document.getElementById("uniqueId").setAttribute("value", + data[0].id);
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
                console.log(data);
                var table = document.createElement('table');
                table.classList.add("table", "table-striped", "table-hover");
                var thead = document.createElement('thead');

                var tr = document.createElement('tr');
                var thNr = document.createElement('th');
                var thQuest = document.createElement('th');
                var thAwnserA = document.createElement('th');
                var thAwnserB = document.createElement('th');
                var thAwnserC = document.createElement('th');
                var thAwnserD = document.createElement('th');
                var thCorrect = document.createElement('th');

                var text1 = document.createTextNode("ID");
                var text2 = document.createTextNode("Question");
                var text3 = document.createTextNode("Awnser A");
                var text4 = document.createTextNode("Awnser B");
                var text5 = document.createTextNode("Awnser C");
                var text6 = document.createTextNode("Awnser D");

                thNr.appendChild(text1);
                thQuest.appendChild(text2);
                thAwnserA.appendChild(text3);
                thAwnserB.appendChild(text4);
                thAwnserC.appendChild(text5);
                thAwnserD.appendChild(text6);

                tr.appendChild(thNr);
                tr.appendChild(thQuest);
                tr.appendChild(thAwnserA);
                tr.appendChild(thAwnserB);
                tr.appendChild(thAwnserC);
                tr.appendChild(thAwnserD);
                tr.appendChild(thCorrect);

                thead.appendChild(tr);
                table.appendChild(thead);
                console.log(Object.keys(data).length)
                var tbody = document.createElement('tbody');
                for (var i = 0; i < Object.keys(data).length; i++) {
                    var tr = document.createElement('tr');
                    var tdNr = document.createElement('td');
                    var tdQuest = document.createElement('td');
                    var tdAwnserA = document.createElement('td');
                    var tdAwnserB = document.createElement('td');
                    var tdAwnserC = document.createElement('td');
                    var tdAwnserD = document.createElement('td');

                    var text1 = document.createTextNode(data[i].id);
                    var text2 = document.createTextNode(data[i].question);
                    var text3 = document.createTextNode(data[i].answers[0].answer);
                    var text4 = document.createTextNode(data[i].answers[1].answer);
                    var text5 = document.createTextNode(data[i].answers[2].answer);
                    var text6 = document.createTextNode(data[i].answers[3].answer);
                    tdNr.appendChild(text1);
                    tdQuest.appendChild(text2);
                    tdAwnserA.appendChild(text3);
                    tdAwnserB.appendChild(text4);
                    tdAwnserC.appendChild(text5);
                    tdAwnserD.appendChild(text6);

                    tr.appendChild(tdNr);
                    tr.appendChild(tdQuest);
                    tr.appendChild(tdAwnserA);
                    tr.appendChild(tdAwnserB);
                    tr.appendChild(tdAwnserC);
                    tr.appendChild(tdAwnserD);

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