var canvasBg = document.getElementById('canvasBg');
var ctxBg = canvasBg.getContext('2d');
var gameWidth = canvasBg.width;
var gameHeight = canvasBg.height;

//ActionPlay canvas
var canvasActions = document.getElementById('canvasActions');
var ctxActions = canvasActions.getContext('2d');
// Actions variables
var BombAction;

//Cannon canvas
var canvasCannon = document.getElementById('canvasCannon');
var ctxCannon = canvasCannon.getContext('2d');
var cannon1;

//menu canvas
var canvasMenuBox = document.getElementById('canvasMenuBox');
var ctxMenuBox = canvasMenuBox.getContext('2d');
//Menu Variables
var start;
//var  option;
//var quit;



// Level State
var level1;
var level2;
var level3;
var UpDateLevel;
var updateMenu;
var endlevel;


//Physics canvas
var canvas = document.getElementById('game'); 
var ctx = canvas.getContext('2d');
var canvasWidth = parseInt(canvas.width);
var canvasHeight = parseInt(canvas.height);
//physics variables
var join;


// game tools
var fps = 7;
var balls=0;
var score=0;
//game images
var imgSprite = new Image();
imgSprite.src = 'images/sprite.png';
var imgfgSprite = new Image();
imgfgSprite.src = 'images/fg.png';
imgSprite.addEventListener('load',init,false);
var bombImg=new Image();
bombImg.src='images/ball.png';
var NodeImg=new Image();
NodeImg.src='images/Node.png';
var TwinsImg=new Image();
TwinsImg.src='images/box.png';
var baseImg=new Image();
baseImg.src='images/base.png';
var CannonImg=new Image();
CannonImg.src='images/Cannon1.png';
var LogoImg=new Image();
LogoImg.src='images/logo.png';

var bombImg2=new Image();
bombImg2.src='images/enemy.png';


var borderImg=new Image();
borderImg.src='images/border.png';

//game events variables
var mouseX;
var mouseY;
var mouseDown=false;





   





    
var twinsGame = {
    
  STATE_MENU: 1,
  STATE_PLAYING : 2,
  STATE_GAMEOVER_SCREEN : 3,
  state : 0,
  currentLevel: 0
}

twinsGame.levels = new Array();

twinsGame.levels[0] = [{"type":"chain","x":300,"y":50,"length":5},
{"type":"chain","x":700, "y":50, "length":5},
{"type":"border","x":500, "y":200, "width":30,"height":80},



{"type":"border","x":0, "y":-5, "width":800,"height":5},
{"type":"border","x":-5, "y":0, "width":5,"height":500},
{"type":"border","x":805, "y":0, "width":5,"height":500},

{"type":"cannon","x":100,"y":200}
];



twinsGame.levels[1] = [{"type":"chain","x":400,"y":0,"length":5},
{"type":"chain","x":700, "y":50, "length":9 },
{"type":"chain","x":100,"y":50,"length":9},
{"type":"border","x":250,"y":250,"width":20,"height":80},
{"type":"border","x":550,"y":250,"width":20,"height":80},

{"type":"border","x":0, "y":-5, "width":800,"height":5},
{"type":"border","x":-5, "y":0, "width":5,"height":500},
{"type":"border","x":805, "y":0, "width":5,"height":500},
{"type":"Twins","x":100, "y":100, "width":32,"height":32},
{"type":"cannon","x":400,"y":320}
];

twinsGame.levels[2] = [
{"type":"chain","x":500,"y":50,"length":3},
{"type":"chain","x":500,"y":200,"length":3},
{"type":"chain","x":700, "y":50, "length":3 },
{"type":"chain","x":700, "y":200, "length":3},
{"type":"border","x":0, "y":-5, "width":800,"height":5},
{"type":"border","x":-5, "y":0, "width":5,"height":500},
{"type":"border","x":805, "y":0, "width":5,"height":500},
{"type":"Twins","x":100, "y":100, "width":32,"height":32},
{"type":"cannon","x":100,"y":100}
];
twinsGame.levels[3] = [
{"type":"chain","x":100,"y":70,"length":3},
{"type":"border","x":350, "y":170, "width":10,"height":70},
{"type":"border","x":0, "y":-5, "width":800,"height":5},
{"type":"border","x":-5, "y":0, "width":5,"height":500},
{"type":"border","x":805, "y":0, "width":5,"height":500},
{"type":"Twins","x":100, "y":100, "width":32,"height":32},
{"type":"cannon","x":700,"y":200}
];


twinsGame.levels[4] = [
{"type":"chain","x":100,"y":50,"length":5},
{"type":"border","x":200, "y":180, "width":10,"height":40},
{"type":"chain","x":300,"y":50,"length":5},
{"type":"border","x":400, "y":180, "width":10,"height":40},
{"type":"chain","x":500,"y":50,"length":5},
{"type":"border","x":600, "y":180, "width":10,"height":40},
{"type":"chain","x":700, "y":50, "length":5},

{"type":"border","x":0, "y":-5, "width":800,"height":5},
{"type":"border","x":-5, "y":0, "width":5,"height":500},
{"type":"border","x":805, "y":0, "width":5,"height":500},


{"type":"Twins","x":600, "y":270, "width":32,"height":32},
{"type":"cannon","x":400,"y":450}
];



twinsGame.levels[5] = [
{"type":"chain","x":100,"y":50,"length":5},
{"type":"border","x":200, "y":180, "width":40,"height":10},
{"type":"chain","x":300,"y":50,"length":2},
{"type":"border","x":400, "y":180, "width":40,"height":10},
{"type":"chain","x":500,"y":50,"length":2},
{"type":"border","x":600, "y":180, "width":40,"height":10},
{"type":"chain","x":700, "y":50, "length":5},
{"type":"chain","x":100,"y":200,"length":2},
{"type":"border","x":200, "y":180, "width":40,"height":10},
{"type":"chain","x":300,"y":200,"length":2},
{"type":"border","x":400, "y":180, "width":40,"height":10},
{"type":"chain","x":500,"y":200,"length":2},
{"type":"border","x":600, "y":180, "width":40,"height":10},
{"type":"chain","x":700, "y":200, "length":2},

{"type":"border","x":0, "y":-5, "width":800,"height":5},
{"type":"border","x":-5, "y":0, "width":5,"height":500},
{"type":"border","x":805, "y":0, "width":5,"height":500},


{"type":"Twins","x":600, "y":270, "width":32,"height":32},
{"type":"cannon","x":400,"y":450}
];


twinsGame.levels[6] = [
{"type":"chain","x":100,"y":50,"length":5},
{"type":"border","x":200, "y":180, "width":70,"height":10},



{"type":"border","x":600, "y":180, "width":70,"height":10},
{"type":"chain","x":700, "y":50, "length":5},


{"type":"border","x":0, "y":-5, "width":800,"height":5},
{"type":"border","x":-5, "y":0, "width":5,"height":500},
{"type":"border","x":805, "y":0, "width":5,"height":500},


{"type":"Twins","x":600, "y":270, "width":32,"height":32},
{"type":"cannon","x":400,"y":450}
];


twinsGame.levels[7] = [
{"type":"chain","x":100,"y":50,"length":5},
{"type":"border","x":200, "y":180, "width":70,"height":10},



{"type":"border","x":600, "y":180, "width":70,"height":10},
{"type":"chain","x":700, "y":50, "length":5},
{"type":"chain","x":700, "y":300, "length":5},
{"type":"chain","x":100, "y":300, "length":5},


{"type":"border","x":0, "y":-5, "width":800,"height":5},
{"type":"border","x":-5, "y":0, "width":5,"height":500},
{"type":"border","x":805, "y":0, "width":5,"height":500},


{"type":"Twins","x":600, "y":270, "width":32,"height":32},
{"type":"cannon","x":400,"y":200}
];


twinsGame.levels[8] = [
{"type":"chain","x":700, "y":50, "length":5},
{"type":"border","x":400, "y":180, "width":10,"height":60},
{"type":"border","x":0, "y":-5, "width":800,"height":5},
{"type":"border","x":-5, "y":0, "width":5,"height":500},
{"type":"border","x":805, "y":0, "width":5,"height":500},


{"type":"Twins","x":400, "y":270, "width":32,"height":32},
{"type":"cannon","x":100,"y":250}
];



// main functions


function init() {
    //Init Tools Of menu
    start=new menuBox('start',400,380);
   //option=new menuBox('option',100,200);
    //quit=new menuBox('quit',100,400);
    
    //init icons of levels
    level1=new menuBox('level1',100,100);
     level2=new menuBox('level2',400,100);
     level3=new menuBox('level3',700,100);
   //init icon of end level
   endlevel=new menuBox('EndLevel',400,400);

    //init Actions
    var Bomb_fbs=10;
    var Bomb_FrameNum=5;
    var Bomb_srcX=0;
    var Bomb_srcY=585;
    var Bomb_width=50;
    var Bomb_height=50;

    BombAction=new Animation(Bomb_srcX,Bomb_srcY,Bomb_width,Bomb_height,Bomb_FrameNum,Bomb_fbs);

  
    //add action listners
    document.addEventListener('keydown', checkKeyDown, false);
    document.addEventListener('keyup', checkKeyUp, false);


    canvasCannon.addEventListener('mousedown',ev_mousedown, false);
    canvasCannon.addEventListener('mousemove',ev_mousemove, false);

    // set the game state as "starting screen"
    twinsGame.state = twinsGame.STATE_MENU;
    factory(twinsGame.state);


}

function factory(state){
  if(twinsGame.STATE_MENU==state){
    
    // set the game state as "starting screen"
    twinsGame.world = createWorld();//physics world
    drawBg();
    
    createLogo(390,10,7);
    twinsGame.state = twinsGame.STATE_MENU;
    menu(); 
  }
}

function  menu(){

    stepMenu();  
}

function stepMenu(){

	twinsGame.world.Step(1.0/60, 1);
	ctxMenuBox.clearRect(0, 0, canvasWidth, canvasHeight);
	drawMenu();
	drawWorld(twinsGame.world,  ctxMenuBox);
	drawMenu();
	updateMenu=setTimeout(stepMenu, 10);
	//updateMenu=setTimeout(stepMenu, 10);
	start.checkboxLocation();
	//option.checkboxLocation();
	//quit.checkboxLocation();
  
   
  if(mouseDown){

    mouseDown=false;


      if(start.condition){
      // change the state to playing.
      stopUpdatingMenu();
      ctxMenuBox.clearRect(0,0,canvasWidth,canvasHeight);
      // start new game      
      LevelFrame();
  
    }  
   }
}
function  stopUpdatingMenu() {
    clearInterval(updateMenu);
}
function drawMenu(){
  
  start.drawMenuBox(0,665);
  //option.drawMenuBox(100,500);
  //quit.drawMenuBox(100,200);
}
 function LevelFrame(){
 
   // drawBg();
    //stepLevel();


    //hna 2l mafrod kona n3ml 7kayet 2l level we 7teet 2l satreen dool 3shan y5osh 3la 2l level 3la tool
    //3mlt comment lel two method 2lle fo2

     twinsGame.state = twinsGame.STATE_PLAYING;
     gamePlay(twinsGame.currentLevel);
   }
  
function stepLevel(){
   
  UpDateLevel=setTimeout(stepLevel, 10);
  level1.checkboxLocation();
  level2.checkboxLocation();
  level3.checkboxLocation();
  DrawLevelFrame();


  if(mouseDown){


    mouseDown=false;

      if(level1.condition){
      // change the state to playing.
      twinsGame.state = twinsGame.STATE_PLAYING;

      stopUpdatingLevel();
      ctxMenuBox.clearRect(0,0,canvasWidth,canvasHeight);
      // start new game
      gamePlay(twinsGame.currentLevel);
  
    }
    else if(level2.condition){
      twinsGame.state = twinsGame.STATE_PLAYING;

      stopUpdatingLevel();
      ctxMenuBox.clearRect(0,0,canvasWidth,canvasHeight);
      // start new game
      gamePlay(1);
       
    }
    else if(level3.condition){
    gamePlay(2);
    }
      
   }

}

function  stopUpdatingLevel() {
    clearInterval(UpDateLevel);
}


function DrawLevelFrame(){
    
  level1.drawMenuBox(100,100);
  level2.drawMenuBox(100,200);
  level3.drawMenuBox(100,300);
}


function DrawNumbers(x,y,Number1){
  var num="";
  num+=Number1;
for(var i=0;i<num.length;i++){

  ctxActions.drawImage(imgSprite, 27*num[i], 500,30,100, x -(i*20),y, 20,20);
}
}
   


function gamePlay(level){

    // create the world
    twinsGame.world = createWorld();//physics world
    drawBg();
    twinsGame.currentLevel = level;
 

   // create the world
   twinsGame.world = createWorld();
   //create the platform
   createGround();
   
   // DrawNumbers(200,200,score);

  // load the environment info from level data
  for(var i=0;i<twinsGame.levels[level].length;i++)
  {
    var obj = twinsGame.levels[level][i];
    

    if (obj.type == "chain")
    {

       createchain(obj.x,obj.y,obj.length);
       balls++;

    }
    else  if(obj.type == "border")
    {
      createSBox(obj.width,obj.height,obj.x,obj.y,twinsGame.levels[level][i]);
    }

    else if(obj.type == "cannon")
    {
      cannon1=new cannon(obj.x,obj.y);
      //cannon1.x=obj.x;
      //cannon1.y=obj.y;
    }
    else if(obj.type=="Twins"){
       createTwinsBox(obj.width,obj.height,obj.x,obj.y,"Twins");
    }

  }

   step();
 
}




function draw() {
  
    cannon1.draw();
}


function drawBg() {
    var srcX = 0;
    var srcY = 0;
    var drawX = 0;
    var drawY = 0;
    ctxBg.drawImage(imgSprite, srcX, srcY, gameWidth, gameHeight, drawX, drawY, gameWidth, gameHeight);
}

function clearCtxBg() {
    ctxBg.clearRect(0, 0, gameWidth, gameHeight);
}




//physics functions
function createWorld(){
   // set the size of the world
   var worldAABB = new b2AABB();
   worldAABB.minVertex.Set(-4000, -4000);
   worldAABB.maxVertex.Set(4000, 4000);
  
   // Define the gravity
   var gravity = new b2Vec2(0, 300);
  
   // set to ignore sleeping object
   var doSleep = false;
  
   // finally create the world with the size, gravity,  and sleep object parameter.
   var world = new b2World(worldAABB, gravity, doSleep);
  
   return world;

}

function step() {
   twinsGame.world.Step(1.0/60, 1);
   ctx.clearRect(0, 0, canvasWidth, canvasHeight);

   drawWorld(twinsGame.world, ctx);
   drawActions(ctxActions);
   setTimeout(step, 10);

   
// update cannon
   if(cannon1.throwCond){
    cannon1.bomb.thrown();
    cannon1.throwCond=false;
  }
  // rotate cannon
  cannon1.dx=mouseX-cannon1.x;
  cannon1.dy=mouseY-cannon1.y;
  cannon1.rotation = Math.atan2(cannon1.dy,cannon1.dx);

  //alert(cannon1.rotation);
  // draw after update the game
    draw();



   for (var cn = twinsGame.world.GetContactList(); cn != null; cn = cn.GetNext())
   { 
	var shape1 = cn.GetShape1();
    var shape2 = cn.GetShape2();
          if (shape1.GetUserData() != undefined && shape2.GetUserData() != undefined ) {


      if (shape1.GetUserData() == 'Node'&& shape2.GetUserData() == 'Bomb') {

      dx=Math.abs(shape2.GetBody().GetLinearVelocity().x);
      dy=Math.abs(shape2.GetBody().GetLinearVelocity().y);
        if(dx>550||dy>550){

     
        var j=shape1.GetBody().GetJointList();
        if( j != null)
        {
        var jj=j.joint;
        twinsGame.world.DestroyJoint(jj);
        jj=null;

        }
  
        }
        
      }
      
      else if(shape1.GetUserData() == 'Bomb' && shape2.GetUserData() == 'Node')
    {
          dx=Math.abs(shape1.GetBody().GetLinearVelocity().x);
          dy=Math.abs(shape1.GetBody().GetLinearVelocity().y);
        if(dx>550||dy>550){

        var j=shape2.GetBody().GetJointList();
        if(j != null)
        {
             var jj=j.joint;
             twinsGame.world.DestroyJoint(jj);
             jj=null;
          
    }

  } 
}
        if(shape1.GetUserData()=='Bomb'&&shape2.GetUserData() =='enemy')
        {
           dx=Math.abs(shape1.GetBody().GetLinearVelocity().x);
           dy=Math.abs(shape1.GetBody().GetLinearVelocity().y);
             if(dx>280||dy>280){
                
            
               twinsGame.world.DestroyBody(shape2.GetBody());
               balls--;
               score++;
               if(balls==0)
               {  

              /** endlevel.check();

               endlevel.drawMenuBox(400,400);
                  if(mouseDown){

                   mouseDown=false;


                    if(endlevel.condition){
      // change the state to playing.
                  twinsGame.state = twinsGame.STATE_PLAYING;
                  

                   
                   ctxMenuBox.clearRect(0,0,canvasWidth,canvasHeight);

                  LevelFrame();
                     }}**/
                   //LevelFrame();  

                    twinsGame.currentLevel=twinsGame.currentLevel+1;
                      gamePlay(twinsGame.currentLevel);

               }
               else{
                   BombAction.AnimateCondition=true;
               BombAction.x=shape1.GetPosition().x-20;
               BombAction.y=shape1.GetPosition().y-20;


               }

             }

        }
        else if(shape2.GetUserData()=='Bomb'&&shape1.GetUserData() =='enemy')
        {
           dx=Math.abs(shape2.GetBody().GetLinearVelocity().x);
           dy=Math.abs(shape2.GetBody().GetLinearVelocity().y);
             if(dx>280||dy>280){
               
     

               twinsGame.world.DestroyBody(shape1.GetBody());
               balls--;
               score++;

               if(balls==0)
               {

               /**
 
                endlevel.check();

                 endlevel.drawMenuBox(400,400);
                  if(mouseDown){

                   mouseDown=false;


                    if(endlevel.condition){
      // change the state to playing.
                  twinsGame.state = twinsGame.STATE_PLAYING;
                  ctxMenuBox.clearRect(0,0,canvasWidth,canvasHeight);
                    LevelFrame();
                  
                     }}
                     **/
                   //  LevelFrame(); 
                   
                  twinsGame.currentLevel=twinsGame.currentLevel+1;
                      gamePlay(twinsGame.currentLevel);

               }
               else{
                   BombAction.AnimateCondition=true;
               BombAction.x=shape1.GetPosition().x-20;
               BombAction.y=shape1.GetPosition().y-20;


               }
             }
        }
    }
  }
}

//drawing Action
function drawActions(context){

    if(BombAction.AnimateCondition&&balls!=0){
   
    BombAction.draw(ctxActions);
  }

}

//clear ActionDraw
function clearCtxActions() {
   ctxActions.clearRect(0, 0, gameWidth, gameHeight);
}


// drawing functions
function drawWorld(world, context) {


    for (var b = world.m_bodyList; b != null; b = b.m_next) {
    for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
    // drawShape(s, context);
if (s.GetUserData() != undefined){
      if(s.GetUserData()=="Node"){
      var x = s.GetPosition().x;
        var y = s.GetPosition().y;

 
        context.save();

        context.translate(x,y);
       
        context.rotate(s.GetBody().GetRotation());
        context.drawImage(NodeImg, -5,-10);           
        context.restore();
      }
     
      else  if(s.GetUserData()=="Twins"){
      var x = s.GetPosition().x;
        var y = s.GetPosition().y;

 
        context.save();

        context.translate(x,y);
       
        context.rotate(s.GetBody().GetRotation());
        context.drawImage(TwinsImg, -32,-32);           
        context.restore();
      }
       else if(s.GetUserData()=="base"){
      var x = s.GetPosition().x;
        var y = s.GetPosition().y;

 
        context.save();

        context.translate(x,y);
       
        context.rotate(s.GetBody().GetRotation());
        context.drawImage(baseImg, -10,-10);           
        context.restore();
      }
      else if(s.GetUserData()=="Bomb"){
            // the x and y of the image. We have to substract the half width/height
        var x = s.GetPosition().x;
        var y = s.GetPosition().y;

 
        context.save();

        context.translate(x,y);
       
        context.rotate(s.GetBody().GetRotation());
        context.drawImage(bombImg, -15,-15);           
        context.restore();

      }
      else if(s.GetUserData()=="enemy"){
            // the x and y of the image. We have to substract the half width/height
        var x = s.GetPosition().x;
        var y = s.GetPosition().y;

 
        context.save();

        context.translate(x,y);
       
        context.rotate(s.GetBody().GetRotation());
        context.drawImage(bombImg2, -20,-20);           
        context.restore();
           // animate.draw(ctx, x, y, w, h);
      }
      else if (s.GetUserData()=="logo"){
      var x = s.GetPosition().x;
        var y = s.GetPosition().y;

 
        context.save();

        context.translate(x,y);
       
        context.rotate(s.GetBody().GetRotation());
        context.drawImage(LogoImg, -128,-50);           
        context.restore();
      }
      else{
      
       var x = s.GetPosition().x;
       var y = s.GetPosition().y;
        var obj=s.GetUserData();
        context.save();

        context.translate(x,y);
       
        context.rotate(s.GetBody().GetRotation());
     
       //context.drawImage(borderImg, -5,-10); 
        context.drawImage(borderImg, 0, 0,200,200, 0-obj.width,0-obj.height,obj.width*2,obj.height*2);     
    
       context.restore();
      }
      }
    }
  }
      
    context.drawImage(imgfgSprite, 0, 0, gameWidth, gameHeight, 0,0, gameWidth, gameHeight);
}
//create a static ground <environment>
function createGround(){
    // box shape definition
   var groundSd = new b2BoxDef();
   groundSd.extents.Set(800, 20);
   groundSd.restitution = 0.9;
   groundSd.userData='Ground';
  
   // body definition with the given shape we just created.
   var groundBd = new b2BodyDef();
   groundBd.AddShape(groundSd);
   groundBd.position.Set(0, 480);
   rotate=groundBd;
   var body = twinsGame.world.CreateBody(groundBd);
   return body;

}
//create twins box
//create dynamic box
function createTwinsBox(width,height,x,y,type) {
    var boxSd = new b2BoxDef();


    boxSd.density = 0.2;
    boxSd.friction = .1;
    boxSd.restitution = 0.5;

    boxSd.userData = type; 
    boxSd.extents.Set(width, height);

    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);     
    boxBd.linearDamping = .03;
    var box = twinsGame.world.CreateBody(boxBd);
    return box;
    
}

//create dynamic box
function createDBox(width,height,x,y,type) {
    var boxSd = new b2BoxDef();


    boxSd.density = 0.2;
    boxSd.friction = 0.8;
    boxSd.restitution = 0;

    boxSd.userData = type; 
    boxSd.extents.Set(width, height);

    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);     
    boxBd.linearDamping = .03;
    var box = twinsGame.world.CreateBody(boxBd);
    return box;
    
}
//create static box
function createSBox(width,height,x,y,type) {
    var boxSd = new b2BoxDef();
    boxSd.restitution = 0.4;
    boxSd.extents.Set(width, height);
    
    boxSd.userData = type; 
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y); 

    var box=twinsGame.world.CreateBody(boxBd);
    return box;
    
}

//create dynamic ball
function createWheel(x,y,type) {
   // wheel circle definition
   var ballSd = new b2CircleDef();
   ballSd.density = 0.55;
   ballSd.radius = 15;
   ballSd.restitution = 0;
   ballSd.friction = 4.3;
   ballSd.userData=type;
     
   // body definition
   var ballBd = new b2BodyDef();
   ballBd.AddShape(ballSd);
   ballBd.position.Set(x,y);
   var ball=twinsGame.world.CreateBody(ballBd);
   return ball;
   }
   function createchain(x,y,ChainLength){
    var width=5;
    var height=10;
    var baseNode=createSBox(10,10,x,y,"base");
    y+=15;
    var newNode=createDBox(width,height,x,y,"Node");
    var oldNode;
    var jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(x, y-(15/2));
    jointDef.body1 = baseNode;
    jointDef.body2 = newNode;


    join=twinsGame.world.CreateJoint(jointDef);
 


    for(var i=1;i<ChainLength;i++){
    oldNode=newNode;

    y+=15;
    newNode=createDBox(width,height,x,y,"Node");
    // join oldNode with newNode
    jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(x, y-(15/2));
    jointDef.body1 = newNode;
    jointDef.body2 = oldNode;
    twinsGame.world.CreateJoint(jointDef);
    

    }
    //join The Ball of Enemy At The end Of the Chain
    oldNode=newNode;
    y+=15;
    newNode=createWheel(x,y,"enemy");
    jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(x, y-(15/2));
    jointDef.body1 = newNode;
    jointDef.body2 = oldNode;
    twinsGame.world.CreateJoint(jointDef);



    }


  

//create chain
    function createLogo(x,y,ChainLength){
    var width=5;
    var height=10;
    var baseNode=createSBox(10,10,x,y,"base");
    y+=15;
    var newNode=createDBox(width,height,x,y,"Node");
    var oldNode;
    var jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(x, y-(15/2));
    jointDef.body1 = baseNode;
    jointDef.body2 = newNode;


    join=twinsGame.world.CreateJoint(jointDef);
 


    for(var i=1;i<ChainLength;i++){
    oldNode=newNode;

    y+=15;
    newNode=createDBox(width,height,x,y,"Node");
    // join oldNode with newNode
    jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(x, y-(15/2));
    jointDef.body1 = newNode;
    jointDef.body2 = oldNode;
    twinsGame.world.CreateJoint(jointDef);
    

    }
    //join The Ball of Enemy At The end Of the Chain
    oldNode=newNode;
    y+=15;
    newNode= createTwinsBox(32,32,x,y,"logo");
    jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(x, y-(15/2));
    jointDef.body1 = newNode;
    jointDef.body2 = oldNode;
    //newNode.getBody().position.Set(x+50,y);
    twinsGame.world.CreateJoint(jointDef);
 
     // var force = new b2Vec2(80000*x, 0);

    //newNode.ApplyForce (force, newNode.GetCenterPosition());



    }


  
// drawShape function directly copy from draw_world.js in Box2dJS library
function drawShape(shape, context){
    context.strokeStyle = '#003300';
  context.beginPath();
  switch (shape.m_type) {
  case b2Shape.e_circleShape:
    var circle = shape;
    var pos = circle.m_position;
    var r = circle.m_radius;
    var segments = 16.0;
    var theta = 0.0;
    var dtheta = 2.0 * Math.PI / segments;
    // draw circle
    context.moveTo(pos.x + r, pos.y);
    for (var i = 0; i < segments; i++) {
      var d = new b2Vec2(r * Math.cos(theta),  
        r * Math.sin(theta));
      var v = b2Math.AddVV(pos, d);
      context.lineTo(v.x, v.y);
      theta += dtheta;
    }
    context.lineTo(pos.x + r, pos.y);
  
    // draw radius
    context.moveTo(pos.x, pos.y);
    var ax = circle.m_R.col1;
    var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
    context.lineTo(pos2.x, pos2.y);
    break;
    case b2Shape.e_polyShape:
      var poly = shape;
      var tV = b2Math.AddVV(poly.m_position,  
      b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
      context.moveTo(tV.x, tV.y);
      for (var i = 0; i < poly.m_vertexCount; i++) {
          var v = b2Math.AddVV(poly.m_position,  
          b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
          context.lineTo(v.x, v.y);
      }
      context.lineTo(tV.x, tV.y);
      break;
     }
     context.stroke();   
}

//end physics functions

//bomb and cannon class
 function bomb(x,y){
  this.x=x;
  this.y=y;
  this.directX=0;
  this.directY=0;
  this.forceX=50000;
  this.forceY=50000;

  
}
bomb.prototype.thrown=function(){

  this.directX=mouseX-this.x;
  this.directY=mouseY-this.y;
  var wheel=createWheel(this.x,this.y,'Bomb');
  var force = new b2Vec2(this.forceX*this.directX, this.forceY*this.directY);
  wheel.ApplyForce (force, wheel.GetCenterPosition());

  
}

 function cannon (x,y){
  this.x=x;
  this.y=y;
  this.dx=0;
  this.dy=0;
  var bomb1=new bomb(x,y);
  this.bomb=bomb1;
  this.throwCond=false;
  this.rotation=-Math.PI/4;


}


cannon.prototype.draw = function (){
   clearCtxCannon();
    // translate context to center of canvas
       var rectWidth = 80;
   var rectHeight = 50;
      ctxCannon.save();

    ctxCannon.translate(cannon1.x, cannon1.y);

    ctxCannon.rotate(this.rotation);
   // ctxCannon.fillStyle = "blue";

 
    //ctxCannon.fillRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);
     ctxCannon.drawImage(CannonImg, -rectWidth / 2,-rectHeight / 2);   
    ctxCannon.restore();

};

function clearCtxCannon() {
    ctxCannon.clearRect(0, 0, gameWidth, gameHeight);
}

//menu tool
function menuBox(name,centerX,centerY) {

    this.centerX=centerX;
    this.centerY=centerY;
   
    this.height = 75;
     this.width = 200;
    this.name=name;
    this.condition=false;

}

 menuBox.prototype.drawMenuBox= function (x,y) {

   // clearCtxMenuBox(this.centerX-200,this.centerY-200,600,600);

    ctxMenuBox.drawImage(imgSprite, x, y,200,75, this.centerX-this.width/2,this.centerY-this.height/2, this.width, this.height);

 
};
menuBox.prototype.checkboxLocation=function(){
  
   if(mouseX>this.centerX-this.width/2&&mouseX<this.centerX+this.width/2){
     
     if(mouseY>this.centerY-this.height/2&&mouseY<this.centerY+this.height/2)
     {
       this.width=300;
       this.height=100;
       this.condition=true;
     }}

     else {
       
       this.width=200;
       this.height=75;
       this.condition=false;
     }
}
menuBox.prototype.check=function(){
  if(mouseX>this.centerX-this.width/2&&mouseX<this.centerX+this.width/2){
     
     if(mouseY>this.centerY-this.height/2&&mouseY<this.centerY+this.height/2)
     {
       
       this.condition=true;
     }}

     else {
         this.condition=false;
     }

}

function clearCtxMenuBox(x,y,width,height) {
    ctxMenuBox.clearRect(x, y, width, height);
}









//handle events



function getMousePos(cvs, evt){
    // get canvas posit
    var obj = cvs;
    var top = 0;
    var left = 0;
    while (obj && obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
 
    // return relative mouse position
    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;
    return {
        x: mouseX,
        y: mouseY
    };
}
 

// event functions
function ev_mousedown(evt) {

        var mousePos = getMousePos(canvasBg, evt);
        var message = "Mouse position: " + mousePos.x + "," + mousePos.y;
        mouseX=mousePos.x;
        mouseY=mousePos.y;
        mouseDown=true;

   if(mouseDown){
     // mouseDown=false;
     if(twinsGame.state == twinsGame.STATE_PLAYING)
        cannon1.throwCond=true;
    }


}

function ev_mousemove(evt){
    
  //  Calculate the angle to the mouse
        var mousePos = getMousePos(canvasBg, evt);
        mouseX=mousePos.x;
        mouseY=mousePos.y;
   
  
  
}


function checkKeyDown(e) {
    var keyID = e.keyCode || e.which;
     //up arrow or W key 38 87
     //down arrow or S key 40 83

    if (keyID === 39 || keyID === 68) { //right arrow or D key
       // player1.isRightKey = true;
        

    }
    if (keyID === 37 || keyID === 65) { //left arrow or A key
        //player1.isLeftKey = true;
       // e.preventDefault();
    }

    if (keyID === 38 || keyID === 87) { //left arrow or A key
        //player1.isUpKey = true;

       // e.preventDefault();
    }
}


function checkKeyUp(e) {
    var keyID = e.keyCode || e.which;

    if (keyID === 39 || keyID === 68) { //right arrow or D key
       // player1.isRightKey = false;
        e.preventDefault();
    }

    if (keyID === 37 || keyID === 65) { //left arrow or A key
       // player1.isLeftKey = false;
        e.preventDefault();
    }

    if (keyID === 38 || keyID === 87) { //left arrow or A key
        //player1.isUpKey = false;
        e.preventDefault();
    }
}


// end of event functions













//animation class
function Animation(startX, startY, frameW, frameH, lastFrame, frameRate)
{
     var startX, startY;
     var frameW, frameH;
     var AnimateCondition=false;
     
     // Coords of current animation frame rectangle
     var x1 = y1 = 0;
     
     var frameRate;             // Frames to elapse per animation step
     var frameCounter;      // Keeps track of framecount before next step
     var currentFrame;      // # of current frame, flips over when frameCounter > frameRate.
     
     // Assign local vars
     this.startX = startX;
     this.startY = startY;
     this.x=0;
     this.y=0;
     this.frameW = frameW;
     this.frameH = frameH;
     this.lastFrame = lastFrame; // Zero-index of last frame before looping back to zero (0 for a single-frame sequence).
     this.frameRate = frameRate;
     
     this.frameCounter=0;
     this.currentFrame = 0;
     
}
Animation.prototype.draw = function(ctx) {
    
    // Set current rectangle
    this.x1 = this.currentFrame * this.frameW;
    this.y1 = this.startY;
     ctx.clearRect(0,0, gameWidth, gameHeight);
    // Draw image (clip to x1,y1-> w,h, draw at x,y and w,h of sprite)
    ctx.drawImage(imgSprite, this.x1, this.y1, this.frameW, this.frameH, this.x,this.y,this.frameW,this.frameH);
    
    // Increment counter
    this.frameCounter++;
    
    // Increment current frame, or set back to zero if we're on last frame.
    if (this.frameCounter >= this.frameRate) {
    
        
        // Check to see if we're on last frame, if so loop back to zero.
        if (this.currentFrame >= this.lastFrame) {

            this.currentFrame = 0;
            this.AnimateCondition=false;
            ctx.clearRect(0,0, gameWidth, gameHeight);

        } else {
            this.currentFrame++;
        }
        
        // Reset frame counter
        this.frameCounter = 0;
    }

};


 

        
