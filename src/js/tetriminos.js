O_COLOR = "#fffa00";
J_COLOR = "#002eff";
L_COLOR = "#ff9400";
I_COLOR = "#00e8cc";
T_COLOR = "#a500ff";
Z_COLOR = "#e80000";
S_COLOR = "#06cc00";

function createNewTetrimino(t){
  let res = null;
  switch(t){
    case 'O':
      res = new O();
      break;
    case 'J':
      res = new J();
      break;
    case 'L':
      res = new L();
      break;
    case 'I':
      res = new I();
      break;
    case 'T':
      res = new T();
      break;
    case 'Z':
      res = new Z();
      break;
    case 'S':
      res = new S();
      break;
  }
  return res;
}

class O extends Tetrimino{
  constructor(){
    let state = 0;
    let emplacement =[[4,-2],[5,-2],[4,-1],[5,-1]];
    super(TILE_SIZE*4,TILE_SIZE*-2,TILE_SIZE*2,TILE_SIZE*2,O_COLOR,state,emplacement);
    this.statesPossible = 1;
  }
  
  update(){
    this.emplacement[0][0] = this.x/TILE_SIZE;
    this.emplacement[0][1] = this.y/TILE_SIZE;
    this.emplacement[1][0] = (this.x+TILE_SIZE)/TILE_SIZE;
    this.emplacement[1][1] = this.y/TILE_SIZE;
    this.emplacement[2][0] = this.x/TILE_SIZE;
    this.emplacement[2][1] = (this.y+TILE_SIZE)/TILE_SIZE;
    this.emplacement[3][0] = (this.x+TILE_SIZE)/TILE_SIZE;
    this.emplacement[3][1] = (this.y+TILE_SIZE)/TILE_SIZE;
  }
  
  rotate(){
    this.state=0;
  }
    
}

class J extends Tetrimino{
  constructor(){
    let state = 0;
    let emplacement =[[4,-1],[5,-2],[5,-1],[5,-3]];
    super(TILE_SIZE*4,TILE_SIZE*-3,TILE_SIZE*2,TILE_SIZE*3,J_COLOR,state,emplacement);
    this.statesPossible = 4;
  }
  
  update(){
    switch(this.state){
      case 0:
        this.emplacement[0][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[0][1] = this.y/TILE_SIZE;
        this.emplacement[1][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+2*TILE_SIZE)/TILE_SIZE;
        break;
      case 1:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][1] = (this.y)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y)/TILE_SIZE;
        this.emplacement[3][0] = (this.x+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        break;
      case 2:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][1] = (this.y)/TILE_SIZE;
        this.emplacement[2][0] = (this.x)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+2*TILE_SIZE)/TILE_SIZE;
        break;
      case 3:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x)/TILE_SIZE;
        this.emplacement[1][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        break;
    }
  }
  
  rotate(sens){
    this.state = (this.state+sens)%4;
    if(this.state == 0 || this.state == 2){
      this.height=3*TILE_SIZE;
      this.width=2*TILE_SIZE;
    }else{
      this.height=2*TILE_SIZE;
      this.width=3*TILE_SIZE;
    }
    while( this.x + this.width > WIDTH ){
      this.x -= TILE_SIZE;
    }
    while(this.y+this.height>HEIGHT){
      this.y-=TILE_SIZE;
    }
    this.update();
  }
    
}

class L extends Tetrimino{
  constructor(){
    let state = 0;
    let emplacement =[[4,-3],[4,-2],[4,-1],[5,-1]];
    super(TILE_SIZE*4,TILE_SIZE*-3,TILE_SIZE*2,TILE_SIZE*3,L_COLOR,state,emplacement);
    this.statesPossible = 4;
  }
  
  update(){
    switch(this.state){
      case 0:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = this.y/TILE_SIZE;
        this.emplacement[1][0] = (this.x)/TILE_SIZE;
        this.emplacement[1][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][0] = (this.x)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+2*TILE_SIZE)/TILE_SIZE;
        break;
      case 1:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][1] = (this.y)/TILE_SIZE;
        break;
      case 2:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][1] = (this.y)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+2*TILE_SIZE)/TILE_SIZE;
        break;
      case 3:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][1] = (this.y)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y)/TILE_SIZE;
        this.emplacement[3][0] = (this.x)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        break;
    }

  }
  
  rotate(){
    this.state = (this.state+1)%4;
    if(this.state == 0 || this.state == 2){
      this.height=3*TILE_SIZE;
      this.width=2*TILE_SIZE;
    }else{
      this.height=2*TILE_SIZE;
      this.width=3*TILE_SIZE;
    }
    while( this.x + this.width > WIDTH ){
      this.x -= TILE_SIZE;
    }
    while(this.y+this.height>HEIGHT){
      this.y-=TILE_SIZE;
    }
    this.update();

  }
}

class I extends Tetrimino{
  constructor(){
    let state = 0;
    let emplacement =[[4,-4],[4,-3],[4,-2],[4,-1]];
    super(TILE_SIZE*4,TILE_SIZE*-4,TILE_SIZE,TILE_SIZE*4,I_COLOR,state,emplacement);
    this.statesPossible = 2;
  }
  
  update(){
    switch(this.state){
      case 0:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = this.y/TILE_SIZE;
        this.emplacement[1][0] = (this.x)/TILE_SIZE;
        this.emplacement[1][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][0] = (this.x)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+3*TILE_SIZE)/TILE_SIZE;
        break;
      case 1:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][1] = (this.y)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y)/TILE_SIZE;
        this.emplacement[3][0] = (this.x+3*TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][1] = (this.y)/TILE_SIZE;
        break;
    }

  }
  
  rotate(){
    this.state = (this.state+1)%2;
    if(this.state == 0){
      this.height=4*TILE_SIZE;
      this.width=TILE_SIZE;
    }else{
      this.height=TILE_SIZE;
      this.width=4*TILE_SIZE;
    }
    while( this.x + this.width > WIDTH ){
      this.x -= TILE_SIZE;
    }
    while(this.y+this.height>HEIGHT){
      this.y-=TILE_SIZE;
    }
    this.update();

  }
}

class T extends Tetrimino{
  constructor(){
    let state = 0;
    let emplacement =[[4,-2],[5,-2],[6,-2],[5,-1]];
    super(TILE_SIZE*4,TILE_SIZE*-2,TILE_SIZE*3,TILE_SIZE*2,T_COLOR,state,emplacement);
    this.statesPossible = 4;
  }
  
  update(){
    switch(this.state){
      case 0:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][1] = (this.y)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y)/TILE_SIZE;
        this.emplacement[3][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        break;
      case 1:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x)/TILE_SIZE;
        this.emplacement[1][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][0] = (this.x)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        break;
      case 2:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][1] = (this.y)/TILE_SIZE;
        break;
      case 3:
        this.emplacement[0][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        break;
    }

  }
  
  rotate(){
    this.state = (this.state+1)%4;
    if(this.state == 0 || this.state == 2){
      this.height=2*TILE_SIZE;
      this.width=3*TILE_SIZE;
    }else{
      this.height=3*TILE_SIZE;
      this.width=2*TILE_SIZE;
    }
    while( this.x + this.width > WIDTH ){
      this.x -= TILE_SIZE;
    }
    while(this.y+this.height>HEIGHT){
      this.y-=TILE_SIZE;
    }
    this.update();

  }
}

class Z extends Tetrimino{
  constructor(){
    let state = 0;
    let emplacement =[[4,-2],[5,-2],[5,-1],[6,-1]];
    super(TILE_SIZE*4,TILE_SIZE*-2,TILE_SIZE*3,TILE_SIZE*2,Z_COLOR,state,emplacement);
    this.statesPossible = 2;
  }
  
  update(){
    switch(this.state){
      case 0:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][1] = (this.y)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        break;
      case 1:
        this.emplacement[0][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x)/TILE_SIZE;
        this.emplacement[1][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+2*TILE_SIZE)/TILE_SIZE;
        break;
    }

  }
  
  rotate(){
    this.state = (this.state+1)%2;
    if(this.state == 0){
      this.height=2*TILE_SIZE;
      this.width=3*TILE_SIZE;
    }else{
      this.height=3*TILE_SIZE;
      this.width=2*TILE_SIZE;
    }
    while( this.x + this.width > WIDTH ){
      this.x -= TILE_SIZE;
    }
    while(this.y+this.height>HEIGHT){
      this.y-=TILE_SIZE;
    }
    this.update();

  }
}

class S extends Tetrimino{
  constructor(){
    let state = 0;
    let emplacement =[[4,-1],[5,-1],[5,-2],[6,-2]];
    super(TILE_SIZE*4,TILE_SIZE*-2,TILE_SIZE*3,TILE_SIZE*2,S_COLOR,state,emplacement);
    this.statesPossible = 2;
  }
  
  update(){
    switch(this.state){
      case 0:
        this.emplacement[0][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x+2*TILE_SIZE)/TILE_SIZE;
        this.emplacement[1][1] = (this.y)/TILE_SIZE;
        this.emplacement[2][0] = (this.x)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        break;
      case 1:
        this.emplacement[0][0] = (this.x)/TILE_SIZE;
        this.emplacement[0][1] = (this.y)/TILE_SIZE;
        this.emplacement[1][0] = (this.x)/TILE_SIZE;
        this.emplacement[1][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[2][1] = (this.y+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][0] = (this.x+TILE_SIZE)/TILE_SIZE;
        this.emplacement[3][1] = (this.y+2*TILE_SIZE)/TILE_SIZE;
        break;
    }

  }
  
  rotate(){
    this.state = (this.state+1)%2;
    if(this.state == 0){
      this.height=2*TILE_SIZE;
      this.width=3*TILE_SIZE;
    }else{
      this.height=3*TILE_SIZE;
      this.width=2*TILE_SIZE;
    }
    while( this.x + this.width > WIDTH ){
      this.x -= TILE_SIZE;
    }
    while(this.y+this.height>HEIGHT){
      this.y-=TILE_SIZE;
    }
    this.update();

  }
}