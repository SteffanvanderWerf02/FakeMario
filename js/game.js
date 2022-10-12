document.getElementById("StartGame").addEventListener("click", () => {
    let nameInputvalue = document.getElementById("nameInput").value;
    var playername = nameInputvalue;
    nameInputvalue = "";

    var config = {
        type: Phaser.WEBGL,
        width: 1200,
        height: 600,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 650 },
                debug: false,
            },
        },
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
    };

    let player;
    let stars;
    let platforms;
    let moveablePlatforms
    let cursors;
    let score = 0;
    let quizeScreen = false;
    let scoreText;

    let whiteSpace;
    let direction = 1;


    //quiz let
    let questions;
    let question;
    let questionIndex = 0;

    let questionText;
    let answer1;
    let answer2;
    let answer3;
    let answer4;

    //start Game
    let game = new Phaser.Game(config);


    function preload() {
        this.load.image("sky", "./img/sky.png");
        this.load.image("ground", "./img/platform.png");
        this.load.image("skyPlatform", "./img/platform.png");
        this.load.image("buldingblock", "./img/block.png");
        this.load.image("star", "./img/star.png");
        this.load.image("moveObjectHolder", "./img/moveObjectHolder.png");
        this.load.image("pilar", "./img/pilar.png");
        this.load.spritesheet("player", "./img/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });


        // load questions
        var http = new XMLHttpRequest()
        http.open("GET", "./PHP/questions.php?f=getQuestions", true);
        http.send();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                questions = JSON.parse(this.response);
                questions = shuffleArray(questions);
                console.log(questions);
            }
        }
    }

    function create() {
        this.add.image(600, 300, "sky");

        platforms = this.physics.add.staticGroup();
        whiteSpace = this.physics.add.staticGroup();
        pilar = this.physics.add.staticGroup();

        // Floor
        platforms.create(600, 600, "ground").setScale(3).refreshBody();

        //Skyplatform floor 1
        platforms.create(275, 410, "skyPlatform");
        platforms.create(925, 410, "skyPlatform");

        //Skyplatform floor 2
        platforms.create(275, 250, "skyPlatform");
        platforms.create(1150, 250, "skyPlatform");

        //Skyplatform floor 3

        platforms.create(665, 80, "skyPlatform");

        //buldingblocks stair
        platforms.create(550 - 64, 536, "buldingblock");
        platforms.create(550 - 32, 536, "buldingblock");
        platforms.create(550 - 32, 536 - 32, "buldingblock");
        platforms.create(550, 536, "buldingblock");
        platforms.create(550, 536 - 32, "buldingblock");
        platforms.create(550, 536 - 64, "buldingblock");
        platforms.create(550 + 32, 536, "buldingblock");
        platforms.create(550 + 32, 536, "buldingblock");
        platforms.create(550 + 32, 536 - 32, "buldingblock"); // right 2 row
        platforms.create(550 + 64, 536, "buldingblock"); // right last block 1 row

        //buldingblocks jumping block

        //first floor
        platforms.create(1185, 490, "buldingblock");

        //second floor
        platforms.create(50, 330, "buldingblock");
        platforms.create(10, 170, "buldingblock");

        //third floor
        platforms.create(1100, 175, "buldingblock");
        platforms.create(960, 120, "buldingblock");


        moveablePlatforms = this.physics.add.sprite(610, 250, "buldingblock");

        moveablePlatforms.setCollideWorldBounds(true);
        whiteSpace.create(660, 280, "moveObjectHolder");
        whiteSpace.create(790, 280, "moveObjectHolder");

        pilar.create(850, 250, "pilar");
        pilar.create(600, 250, "pilar");

        player = this.physics.add.sprite(100, 450, "player");
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "player", frame: 4 }],
            frameRate: 60,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });

        cursors = this.input.keyboard.createCursorKeys();

        stars = this.physics.add.staticGroup();

        //create star locations
        //ground floor
        stars.create(15, 410, "star");
        stars.create(550, 535 - 96, "star");
        stars.create(1150, 535, "star");
        // first floor
        stars.create(745, 380, "star");
        stars.create(270, 300, "star");
        //second floor
        stars.create(725, 125, "star");
        stars.create(100, 90, "star");
        //third floor
        stars.create(475, 20, "star");

        scoreText = this.add.text(16, 16, "score: 0", {
            fontSize: "32px",
            fill: "#111",
        });

        questionText = this.add.text(100, 100, "", {
            fontSize: "32px",
            fill: "#111"
        });
        answer1 = this.add.text(100, 200, "", {
            fontSize: "28px",
            fill: "#111"
        });
        answer2 = this.add.text(100, 300, "", {
            fontSize: "28px",
            fill: "#111"
        });
        answer3 = this.add.text(100, 400, "", {
            fontSize: "28px",
            fill: "#111"


        });
        answer4 = this.add.text(100, 500, "", {
            fontSize: "28px",
            fill: "#111"
        });


        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, moveablePlatforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(moveablePlatforms, whiteSpace);

        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.collider(pilar, whiteSpace);
        this.physics.add.collider(pilar, whiteSpace);

        answer1.setInteractive(new Phaser.Geom.Rectangle(0, 0, answer1.width, answer1.height), Phaser.Geom.Rectangle.Contains);

        // listen for clicks on it
        this.input.on('pointerdown', function (pointer) {
            if (answer1.getBounds().contains(pointer.x, pointer.y)) {
                getRightAnswer(answer1.text);
            } else if (answer2.getBounds().contains(pointer.x, pointer.y)) {
                getRightAnswer(answer2.text);
            }
            else if (answer3.getBounds().contains(pointer.x, pointer.y)) {
                getRightAnswer(answer3.text);
            }
            else if (answer4.getBounds().contains(pointer.x, pointer.y)) {
                getRightAnswer(answer4.text);
            }
        });
    }

    function update() {
        //start moving platform
        this.physics.add.collider(pilar, moveablePlatforms, flipX, null, this);
        this.physics.add.collider(pilar, moveablePlatforms, flipX, null, this);
        moveablePlatforms.setVelocityX(direction * 100)

        // quize screen toggle
        if (quizeScreen) {
            this.physics.pause();
        } else {
            this.physics.resume();
        }

        //end game
        if (stars.countActive(true) === 0 && !quizeScreen) {
            game.destroy(true);
            finischGame();
        }

        //player movement
        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play("left", true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play("right", true);
        } else {
            player.setVelocityX(0);

            player.anims.play("turn");
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }

    function createQuiz() {
        quizeScreen = true;
        question = questions[questionIndex];
        console.log(question);
        questionText.text = question.question

        let answersIndexArray = [0, 1, 2, 3];
        answersIndexArray = shuffleArray(answersIndexArray);
        console.log(answersIndexArray);
        answer1.text = question.answers[answersIndexArray[0]].answer;
        answer2.text = question.answers[answersIndexArray[1]].answer;
        answer3.text = question.answers[answersIndexArray[2]].answer;
        answer4.text = question.answers[answersIndexArray[3]].answer;
        questionIndex++;
    }

    function getRightAnswer(chosenAnswer) {
        console.log(chosenAnswer);
        for (let index = 0; index < 4; index++) {
            if (chosenAnswer == question.answers[index].answer && question.answers[index].isCorrect == 1) {
                console.log("right answer");
                score += 10;
                scoreText.setText("Score: " + score);
                answer1.text = "";
                answer2.text = "";
                answer3.text = "";
                answer4.text = "";
                questionText.text = "";

            }
        }

        answer1.text = "";
        answer2.text = "";
        answer3.text = "";
        answer4.text = "";
        questionText.text = "";
        quizeScreen = false;
    }

    function flipX() {
        direction = - direction
    }

    function collectStar(player, star) {
        star.disableBody(true, true);

        createQuiz();
    }

    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    function finischGame() {
        console.log("klass")
        // load questions
        var http = new XMLHttpRequest()
        http.open("GET", "./PHP/questions.php?f=addHighscore&name=" + playername + "&score=" + score, true);
        console.log("questions.php?f=addHighscore&name=" + playername + "&score=" + score);
        http.send();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("game").classList.add("d-none");
                document.getElementById("menu").classList.remove("d-none");
            }
        }

    }
});