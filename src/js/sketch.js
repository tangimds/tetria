// O J L I T Z S
var currentPiece;
var nextPiece;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  /*
    variables initialization
  */
  ai = true;
  showPlayzone = true;
  showFalling = true;
  highscore = localStorage.getItem("highscore");
  gamePaused = false;
  lvl = new Level(0,48);
  TILE_SIZE = 20;
  TILES_W = 10;
  TILES_H = 22;
  WIDTH = TILE_SIZE*TILES_W;
  HEIGHT = TILE_SIZE*TILES_H
  pz = new Playzone(TILES_W,TILES_H);
  tetriminos = ['O','J','L','I','T','Z','S'];

  nextShape();
  roundState = getState();
  if(ai)
    firstGeneration();
}

function draw() {
  background(30);
  
  fill(70);
  rect(0,0,WIDTH,HEIGHT);
  if(ai){
    if(speedIndex == 2 && frameCount%lvl.speed==0 && !gamePaused
      || (speedIndex == 1 || speedIndex==0) && !gamePaused){
      if (currentGenome != -1) {
        //move the shape down
        moveDown(currentPiece);
        /*while(!currentPiece.isLanded()){
          moveDown(currentPiece);
          currentPiece.update();
        }*/
        
        //if that didn't do anything
        if (currentPiece.isLanded()) {
          //if we lost
          if (currentPiece.isOut()) {
            //update the fitness
            genomes[currentGenome].fitness = clone(lvl.score);
            showStatsGenome("GAMEOVER");
            //move on to the next genome
            evaluateNextGenome();
          } else {
            //if we didnt lose, make the next move
            for(let i=0 ; i< currentPiece.emplacement.length ; i++){
              pz.field[currentPiece.emplacement[i][0]][currentPiece.emplacement[i][1]] = currentPiece.color;
            }
            updateScore();
            makeNextMove();
          }
        }
      } else {
           //else just move down
        moveDown(currentPiece);
      }
      /*if(currentPiece.isLanded()){
        if(currentPiece.isOut()){
          reset(1);
        }   
      //add current piece to pz
        for(let i=0 ; i< currentPiece.emplacement.length ; i++){
          pz.field[currentPiece.emplacement[i][0]][currentPiece.emplacement[i][1]] = currentPiece.color;
        }
      //check if there is lines complete
      
        //nextShape();
        
      }*/
    }
  }else{
    showPlayzone = true;
    if(frameCount%lvl.speed==0 && !gamePaused){
      moveDown(currentPiece);
      if(currentPiece.isLanded()){
        if(currentPiece.isOut()){
          reset(1);
        }   
      //add current piece to pz
        for(let i=0 ; i< currentPiece.emplacement.length ; i++){
          pz.field[currentPiece.emplacement[i][0]][currentPiece.emplacement[i][1]] = currentPiece.color;
        }
      //check if there is lines complete
      
        nextShape();
        let linesComplete = pz.linesComplete();
        for(let l=0 ; l<linesComplete.length ; l++){
          pz.breakLine(linesComplete[l]);
          pz.lowerAllAbove(linesComplete[l]);
        }
        if(linesComplete.length > 0){
          lvl.addLinesComplete(linesComplete.length);
          lvl.addPoints(linesComplete.length-1);
          linesComplete = [];
        }
        if(lvl.linesComplete >= 10){
          lvl.up();
          lvl.linesComplete = 0;
        } 
      }
    }
}


  if(!ai && frameCount%1==0 && keyIsDown(DOWN_ARROW) && !currentPiece.isLanded() && !gamePaused){
    moveDown(currentPiece);
  }
  
  lvl.show();
  if(showPlayzone){
    pz.show();
    currentPiece.show();
    nextPiece.showThumbnail();
  }

  currentPiece.update();
  if(ai)showAI();
  showControl();

  if(gamePaused){
    push();
    fill("#202020AA");
    rect(0,0,WIDTH,HEIGHT);
    pop();
  }
}

function updateScore(){
  let linesComplete = pz.linesComplete();
  for(let l=0 ; l<linesComplete.length ; l++){
    pz.breakLine(linesComplete[l]);
    pz.lowerAllAbove(linesComplete[l]);
  }
  if(linesComplete.length > 0){
    lvl.addLinesComplete(linesComplete.length);
    lvl.addPoints(linesComplete.length-1);
    linesComplete = [];
  }
  if(lvl.linesComplete >= 10){
    lvl.up();
    lvl.linesComplete = 0;
  } 
}

function showControl(){
  let size = 10;
    textSize(size);
    text(
    "============ IN GAME ============"+"\n"+
    String.fromCharCode(8592)+"\t:\tMove to left\n"+
    String.fromCharCode(8594)+"\t:\tMove to right\n"+
    String.fromCharCode(8593)+"\t:\tRotate\n"+
    String.fromCharCode(8595)+"\t:\tAccelerate\n"+
    "Space\t:\tPlace piece\n"+
    "P\t:\tPause\n"+
    "A\t:\tToogle AI\n"+
    "R\t:\tRestart\n"+
    "============ AI ============"+"\n"+
    "S\t:\tChange speed of the AI (instantaneous > fast > real)\n"+
    "M\t:\tChange move limit for a game (100,500,1000,3000,10000,"+String.fromCharCode(8734)+")\n"+
    "H\t:\tToogle Hide game\n"+
    "L\t:\tLoad the older generation generated in this browser\n"+
    "B\t:\tLoad the exemple generation"
    ,10,HEIGHT+size*2);
}

/*********************************************************
 *  KEYS MANAGEMENT
 */
function keyPressed(){
  var characterPressed = String.fromCharCode(keyCode);
  if(!gamePaused && !ai){
    // controls when human is playing
    switch(keyCode){
      case LEFT_ARROW:
        moveLeft(currentPiece);
        break;
      case RIGHT_ARROW:
        moveRight(currentPiece);
        break;
      case UP_ARROW:
        moveRotate(currentPiece)
        break;
      case 32: // space
        while(!currentPiece.isLanded()){
          moveDown(currentPiece);
          currentPiece.update();
        }
        break;
      case 80: // P
        gamePaused = !gamePaused;
        break;
      case 82: // R
        reset(1);
        break;
      case 65: // A
        ai = !ai;
        break;
    }
  } else{
    // controls when AI is playing
    switch(characterPressed){
      case "P":
          gamePaused = !gamePaused;
          break;
      case "H":
        showPlayzone = !showPlayzone;
        break;
      case "S":
        speedIndex = (speedIndex+1)%3 ;
        break;
      case "A":
        ai = !ai;
        break;
      case "L":
        if(localStorage.getItem("archive")===null){
          alert("No generation evaluated yet in this browser.\nTry again after a full generation.");
        }else{
          loadArchive(localStorage.getItem("archive"));
        }
        break;
      case "B" :
        loadArchive(bestGeneration);
        break;
      case "R":
        reset(1);
        break;
      case "M":
        moveIndex = (moveIndex+1)%moveLimits.length;
        moveLimit = moveLimits[moveIndex];
    }
  }
}

/*********************************************************
 *  MOUVEMENTS
 */
function moveLeft(p){
  let movePossible = true;
  for(let i=0 ; i<p.emplacement.length ; i++){
      // ieme piti carre
      let x = p.emplacement[i][0]-1;
      let y = p.emplacement[i][1];
      if(y>=0 && x>=0 && x<=TILES_W-1 && (pz.field[x][y] != 0)){
        movePossible = false;
      }
  }
  if(p.getX()>0 && movePossible)
    p.setX(p.getX()-TILE_SIZE);
}

function moveRight(p){
  let movePossible = true;
  for(let i=0 ; i<p.emplacement.length ; i++){
      // ieme piti carre
      let x = p.emplacement[i][0]+1;
      let y = p.emplacement[i][1];
      if(y>=0 && x>=0 && x<=TILES_W-1 && (pz.field[x][y] != 0)){
        movePossible = false;
      }
  }
  if(p.getX()<WIDTH-p.getWidth() && movePossible)
    p.setX(p.getX()+TILE_SIZE);
}

function moveDown(p){
  if(p.getY()<HEIGHT-p.getHeight()){
    p.setY(p.getY()+TILE_SIZE);
  }
}

function moveRotate(p){
  p.rotate(1);
  if(p.collision())
    p.rotate(-1);
}

/*********************************************************
 *  GAMEOVER
 */
function reset(restart){
  if(restart){
    if(highscore !== null){
      if (lvl.score > highscore) {
        print("new highscore");
          localStorage.setItem("highscore", lvl.score);      
      }
    }
    else{
      print("first highscore");
      localStorage.setItem("highscore", lvl.score);
    }
    pz = new Playzone(TILES_W,TILES_H);
    lvl = new Level(0,48);
    nextShape();
    nextShape();
  } else {
    gamePaused = true;
  }
  highscore = localStorage.getItem("highscore");
}


