var PLAY = 1;
var END = 0;
gameState = PLAY;

var ground, groundImage, invisible, invisibleGImage;
var monkey , monkey_running;
var banana ,bananaImage, rocks, rocksImage;
var bananasGroup, rocksGroup;
var score = 0;

var go,goImage;

var st = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  rocksImage = loadImage("obstacle.png");
  goImage = loadImage("gameOver.png");
  
}

function setup() {
  createCanvas(660,400); 
  
  ground = createSprite(330,320,760,10);
  ground.shapeColor = "green";
  
  monkey = createSprite(50,320,100,100);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale = 0.15;
  
  go = createSprite(330,150);
  go.addImage(goImage);
  go.scale = 0.8;
  go.visible = false;
  
  rocksGroup = createGroup();
  bananasGroup = createGroup();
  
//   monkey.debug = true;
  monkey.setCollider("circle",0,0,300);
  
}

function draw() {
  background(220);
  
  if(gameState === PLAY){
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("space") && monkey.y >= 250) {
      monkey.velocityY = -17;
    }
    monkey.velocityY += 1;
    
    spawnBananas();
    spawnRocks();
    
    st = Math.ceil(frameCount/frameRate());
    
    if(monkey.isTouching(bananasGroup)){
      bananasGroup.destroyEach();
      score += 5;
    }
    
    if(monkey.isTouching(rocksGroup)){
      gameState = END;
      monkey.velocityY += 1;
    }
    
  }
  else if(gameState===END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    rocksGroup.setVelocityXEach(0);
    rocksGroup.setLifetimeEach(-1);
    bananasGroup.setVelocityXEach(0);
    bananasGroup.setLifetimeEach(-1);
    go.visible = true;
  }
  
  monkey.collide(ground);
  
  drawSprites();
  stroke("white");
  fill("black");
  textSize(20);
  text("Score : " + score, 550,30);
  text("Survival Time : " + st,230,30);
}

function spawnBananas(){
  if(frameCount%80 === 0){
    bananas();
  }
}

function bananas(){
  var r = Math.round(random(100,290));
  banana = createSprite(650,r,30,30);
  banana.addImage(bananaImage);
  banana.scale = 0.15;
  banana.velocityX = -8;
//   banana.debug = true;
  banana.setCollider("rectangle",0,0,500,250);
  bananasGroup.add(banana);
}

function spawnRocks(){
  if(frameCount%300 === 0){
    rock();
  }
}

function rock(){
  rocks = createSprite(650,277,30,30);
  rocks.addImage(rocksImage);
  rocks.scale = 0.2;
  rocks.velocityX = -8;
  rocks.lifetime = 90;
//   rocks.debug = true;
  rocks.setCollider("circle",0,20,200);
  rocksGroup.add(rocks);
}

