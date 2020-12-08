var trex;
var gameState = "PLAY";
var score = 0;
var restart;

function preload() {
    restart_image = loadImage("images/restart.png")
}

function setup() {
    createCanvas(500, 500);
    trex = createSprite(100, 400, 50, 50);
    ground = createSprite(350, 430, 800, 1);
    obstacleGroup = new Group();
    restart = createSprite(250, 250, 170, 60);
    restart.addImage(restart_image);
    restart.scale = 0.7;
    restart.visible = false;

}

function draw() {
    background(220);
    if (gameState === "PLAY") {
        if (trex.collide(ground)) {
            if (keyDown("space")) {
                trex.velocityY -= 25;
            }
        }
        trex.velocityY += 2;
        trex.collide(ground);


        obstacleGroup.collide(ground)
        createObstacle();

        if (frameCount % 5 === 0) {
            score++;
        }
        if (trex.x < 100) {
            trex.x = 100
        }

        if (trex.collide(obstacleGroup)) {
            gameState = "STOP";
        }
    }

    if (gameState === "STOP") {
        gameOver();
        restart.visible = true;
        if (mousePressedOver(restart)) {
            restartGame();
        }
    }

    textSize(40);
    text("score : " + score, 50, 50)

    drawSprites();

    function createObstacle() {
        if (frameCount % 30 === 0) {
            var obstacle = createSprite(800, 350, 40, 70);
            obstacle.height = random(70, 100);
            obstacle.velocityX = -10;
            obstacle.velocityY = +5;
            obstacle.collide(ground);
            obstacle.lifetime = 300;
            obstacleGroup.add(obstacle);
        }
    }

    function gameOver() {
        obstacleGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        trex.velocityX = 0;
        trex.velocityY = 0;
        score = 0;
    }

    function restartGame() {
        gameState = "PLAY";
        if (gameState === "PLAY") {
            trex.x = 100;
            trex.y = 400;
            obstacleGroup.destroyEach();
            restart.visible = false;
        }
    }

}