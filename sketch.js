var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score = 0;
var ground;
var survivalTime = 0;
var gameState = 1;
function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png",
  "Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  jungleImage = loadImage("jungle.jpg");
  gameOverImg = loadImage("gameOver.png");
}
function setup() {
  createCanvas(900,600);
  jungle = createSprite(450,300);
  jungle.addImage("sdaf", jungleImage);
  jungle.velocityX = -(6 + 3*score/100);
  jungle1 = createSprite(900,300);
  jungle1.addImage("sdaf", jungleImage);
  jungle1.velocityX = -(6 + 3*score/100);
  monkey = createSprite(100,480);
  monkey.addAnimation("running", monkey_running);  
  monkey.scale = 0.26;
  monkey.setCollider("circle",0,0,270);
  monkey.debug = false;
  ground = createSprite(450, 535,2000,10);
  ground.velocityX = -(6 + 3*score/100);
  gameOver = createSprite(450, 300);
  gameOver.addImage("fdsa",gameOverImg);
  gameOver.visible = false;
  FoodGroup = new Group();
  obstacleGroup = new Group();
}
function draw() {
  background(2);
  if (gameState === 1){
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Score : " + score,20,20);
    text("Survival Time : " + survivalTime,20,40);
    obstacleSpawn();
    bananaSpawn();
    jungle1.velocityX = -(6 + 3*score/100);
    jungle.velocityX = -(6 + 3*score/100);
    ground.velocityX = -(6 + 3*score/100);
    monkey.collide(ground);
    if (ground.x<20){
      ground.x = 435;
    }
    if (jungle.x<20){
      jungle.x = 435;
    }
    if (jungle1.x<470){
      jungle1.x = 885;
    }
    if (keyWentDown("space") && monkey.y>350){
      monkey.velocityY = -30;
    }
    monkey.velocityY = monkey.velocityY + 1.2;

    if (monkey.isTouching(obstacleGroup)){
      score = score - Math.round(random(5, 15));
      monkey.scale = monkey.scale - 0.03;
      obstacleGroup[0].destroy();
     
    }

    if (monkey.isTouching(FoodGroup)){
      
      score = score + Math.round(random(1,7));
      monkey.scale = monkey.scale + 0.01;
      FoodGroup[0].destroy();
    }
    if (monkey.scale < 0.05){
      gameState = 0;
    }
}
  if (gameState === 0){
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    FoodGroup.setVelocityX = 0;
    obstacleGroup.setVelocityX = 0;
    jungle.velocityX = 0;
    jungle1.velocityY = 0;
    jungle.x = 450,
    jungle1.x = 900;
    gameOver.visible = true;
    if (keyWentDown("r")){
      score = 0;
      monkey.scale = 0.255;
      monkey.y = 100;
      gameOver.visible = false;
      gameState = 1;
    }
  }
  console.log("the game will end automatically after the size of monkey become too small.");
  
  drawSprites();
  text("Score : " + score,20,20);
  text("Survival Time : " + survivalTime,20,40);
}
function obstacleSpawn(){
 if (frameCount % 110 === 0){
    obstacle = createSprite(910,500);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.16;
    obstacle.velocityX = -(10 + 5*score/100)
    obstacleGroup.add(obstacle);
  }
}
function bananaSpawn(){
  if (frameCount % Math.round(random(70, 150)) === 0){
    banana = createSprite(910,Math.round(random(200,300)));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.13;
    banana.velocityX = -(10 + 5*score/100)
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}