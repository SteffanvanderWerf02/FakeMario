// document.getElementById("StartGame").addEventListener("click", () => {

var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 650 },
            debug: true,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

var player;
var stars;
var platforms;
var moveablePlatforms
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var whiteSpace;

var game = new Phaser.Game(config);

function preload() {
    this.load.image("sky", "./img/sky.png");
    this.load.image("ground", "./img/platform.png");
    this.load.image("skyPlatform", "./img/platform.png");
    this.load.image("buldingblock", "./img/block.png");
    this.load.image("star", "./img/star.png");
    this.load.image("moveObjectHolder", "./img/moveObjectHolder.png");
    this.load.spritesheet("player", "./img/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
    });
}

function create() {
    this.add.image(600, 300, "sky");

    platforms = this.physics.add.staticGroup();
    whiteSpace = this.physics.add.staticGroup();
    // Floor
    platforms.create(600, 600, "ground").setScale(3).refreshBody();

    //Skyplatform floor 1
    platforms.create(275, 410, "skyPlatform");
    platforms.create(925, 410, "skyPlatform");

    //Skyplatform floor 2
    platforms.create(275, 250, "skyPlatform");
    platforms.create(1200, 250, "skyPlatform");

    //Skyplatform floor 3

    platforms.create(550, 50, "skyPlatform");

    //buldingblocks stair
    platforms.create(550 - 64, 535, "buldingblock");
    platforms.create(550 - 32, 535, "buldingblock");
    platforms.create(550 - 32, 535 - 32, "buldingblock");
    platforms.create(550, 535, "buldingblock");
    platforms.create(550, 535 - 32, "buldingblock");
    platforms.create(550, 535 - 64, "buldingblock");
    platforms.create(550 + 32, 535, "buldingblock");
    platforms.create(550 + 32, 535, "buldingblock");
    platforms.create(550 + 32, 535 - 32, "buldingblock");
    platforms.create(550 + 64, 535, "buldingblock");

    //buldingblocks jumping block
    platforms.create(1185, 490, "buldingblock");
    platforms.create(50, 330, "buldingblock");
    platforms.create(50, 330, "buldingblock");


    moveablePlatforms = this.physics.add.sprite(610, 250, "buldingblock");
    const tween = this.tweens.add({
        targets: this.moveablePlatforms,
        x: 700,
        ease: 'Power0',
        duration: 3000,
        flipX: true,
        yoyo: true,
        repeat: -1,
    });
    moveablePlatforms.setCollideWorldBounds(true);
    whiteSpace.create(660, 280, "moveObjectHolder");
    whiteSpace.create(790, 280, "moveObjectHolder");

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

    stars = this.physics.add.staticGroup({
        key: "star",
        repeat: 8,
        setXY: { x: 12, y: 0, stepX: 70 },
    });


    scoreText = this.add.text(16, 16, "score: 0", {
        fontSize: "32px",
        fill: "#000",
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, moveablePlatforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(moveablePlatforms, whiteSpace);
    this.physics.add.overlap(player, stars, collectStar, null, this);

}

function update() {
    if (gameOver) {
        return;
    }

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

function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText("Score: " + score);

    if (stars.countActive(true) === 0) {
        var x =
            player.x < 400
                ? Phaser.Math.Between(400, 800)
                : Phaser.Math.Between(0, 400);
    }
}
// });