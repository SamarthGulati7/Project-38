
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var backImage,bg;
var score;
var survivalTime;
var canvas;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backImage=loadImage("jungle.jpg");
}



function setup() {
  
  canvas= createCanvas(displayWidth,displayHeight);
  
  bg=createSprite(0,0,displayWidth,displayHeight);
  bg.addImage(backImage);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  monkey.velocityX=3;
  
  ground=createSprite(600,350,1200,10);
  ground.visible=false;
  
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();

  survivalTime=0;
  score=0;
}


function draw() {
 
 background("white");
  
 if(keyDown("space")){
   
   monkey.velocityY=-12;
   
 }
  
  monkey.velocityY=monkey.velocityY+ 0.8;
  
  monkey.collide(ground);
  
 if(ground.x<0){
   
   ground.x=ground.width/2;
   
 } 
  
 if(bg.x<0){
   
   bg.x=bg.width/2;
   
 } 
  
 if(monkey.isTouching(FoodGroup)){
    
   FoodGroup.destroyEach();
   score=score+2;
   
    }
  
  if(monkey.isTouching(obstacleGroup)){
    
   obstacleGroup.destroyEach();
   monkey.scale=0.1;
   
    }
  
  switch(score){
      
    case 10:monkey.scale=0.12;
    break;  
    case 30:monkey.scale=0.14;
    break;
    case 30:monkey.scale=0.16;
    break;
    case 40:monkey.scale=0.18;
    break;
    
    default: break;
  }
  
  camera.position.x=monkey.position.x;
  camera.position.y=displayHeight/2; 
  
 spawnBananas(); 
 spawnObstacles(); 
  
 
  
 drawSprites();
  
  stroke("black");
  textSize(20);
  fill("red");
  text("Score: "+score,350,50);
  
  stroke("black");
  textSize(20);
  fill("red");
  survivalTime=Math.round(frameCount/frameRate());
  text("Survival time: "+survivalTime,50,50);
  
}

function spawnObstacles(){
  
 if(camera.position.x  === camera.position.x + 300) {
    var obstacle = createSprite(600,325,10,40);
  
    obstacle.velocityX = -6;
  
    obstacle.addImage(obstacleImage);
           
    obstacle.scale =  0.1;
    obstacle.lifetime = 100;

    obstacleGroup.add(obstacle);
  }

}

function spawnBananas() {
  
  if (camera.position.x  === camera.position.x + 150) {
    var banana = createSprite(600,300,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime=200;
    
    FoodGroup.add(banana);
}

}
