class Tetrimino{
  constructor(x,y,w,h,c,s,e){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = c;
    this.landed = false;
    this.state = s;
    this.emplacement = e;
  }

  isLanded(){
    let res = false;
    for(let i=0 ; i<this.emplacement.length ; i++){
      // ieme piti carre
      let x = this.emplacement[i][0];
      let y = this.emplacement[i][1]+1;
      if(y>=0 && (pz.field[x][y] != 0)){
        res = true;
      }
    }
    this.landed = res;
    return res;
  }

  isOut(){
    let res = false;
    for(let i=0 ; i<this.emplacement.length ; i++){
      // ieme piti carre
      let x = this.emplacement[i][0];
      let y = this.emplacement[i][1];
      if(y<0){
        res = true;
      }
    }
    return res;
  }
  
  testRotation(){
    for(let i=0 ; i<this.emplacement.length ; i++){
      // ieme piti carre
      let x = this.emplacement[i][0];
      let y = this.emplacement[i][1];
      if(y>0 && (pz.field[x][y] != 0)){
        this.rotate(-1);
        //this.update();

      }
    }
  }

  collision(){
    for(let i=0 ; i<this.emplacement.length ; i++){
      // ieme piti carre
      let x = this.emplacement[i][0];
      let y = this.emplacement[i][1];
      if(y>0 && (pz.field[x][y] != 0)){
        return true;
      }
    }
    return false;
  }
  
  show(){
    let ghost = this.clone();

    while(!ghost.isLanded()){
      moveDown(ghost);
      ghost.update();
    }
    push();
    fill("#fff0");
    stroke(ghost.color);
    rect(ghost.emplacement[0][0]*TILE_SIZE,ghost.emplacement[0][1]*TILE_SIZE,TILE_SIZE,TILE_SIZE);
    rect(ghost.emplacement[1][0]*TILE_SIZE,ghost.emplacement[1][1]*TILE_SIZE,TILE_SIZE,TILE_SIZE);
    rect(ghost.emplacement[2][0]*TILE_SIZE,ghost.emplacement[2][1]*TILE_SIZE,TILE_SIZE,TILE_SIZE);
    rect(ghost.emplacement[3][0]*TILE_SIZE,ghost.emplacement[3][1]*TILE_SIZE,TILE_SIZE,TILE_SIZE);
    pop();
    
    push();
    fill(this.color);
    rect(this.emplacement[0][0]*TILE_SIZE,this.emplacement[0][1]*TILE_SIZE,TILE_SIZE,TILE_SIZE);
    rect(this.emplacement[1][0]*TILE_SIZE,this.emplacement[1][1]*TILE_SIZE,TILE_SIZE,TILE_SIZE);
    rect(this.emplacement[2][0]*TILE_SIZE,this.emplacement[2][1]*TILE_SIZE,TILE_SIZE,TILE_SIZE);
    rect(this.emplacement[3][0]*TILE_SIZE,this.emplacement[3][1]*TILE_SIZE,TILE_SIZE,TILE_SIZE);
    pop();
    
  }

  clone(){
    let ghost = createNewTetrimino(this.constructor.name);
    ghost.setX(this.x);
    ghost.setY(this.y);
    ghost.setWidth(this.width);
    ghost.setHeight(this.height);
    ghost.setColor(this.color);
    ghost.setEmplacement(clone(this.emplacement));
    ghost.setState(this.state);
    ghost.setLanded(this.landed);
    ghost.setStatesPossible(this.statesPossible);
    return ghost;
  }

  

  showThumbnail(){
    push();
    translate(WIDTH+10,10);
    push();
    fill(this.color);
    let ratio = 2
    let dx = WIDTH + 10 - this.x;
    let dy = this.height + 10;
    let size = TILE_SIZE;
    scale(0.5);
    //translate((WIDTH + 10)*ratio,10*ratio);
    rect(this.emplacement[0][0]*size-this.x,this.emplacement[0][1]*size-this.y,size,size);
    rect(this.emplacement[1][0]*size-this.x,this.emplacement[1][1]*size-this.y,size,size);
    rect(this.emplacement[2][0]*size-this.x,this.emplacement[2][1]*size-this.y,size,size);
    rect(this.emplacement[3][0]*size-this.x,this.emplacement[3][1]*size-this.y,size,size);
    pop();
    pop();
  }

  getX(){
    return this.x;
  }
  
  getY(){
    return this.y;
  }
  
  getWidth(){
    return this.width;
  }
  
  getHeight(){
    return this.height;
  }
  
  setX(x){
    this.x = x;
  }
  
  setY(y){
    this.y = y;
  }
  
  setWidth(w){
    this.width=w;
  }
  
  setHeight(h){
    this.height=h;
  }

  setColor(c){
    this.color = c;
  }

  setEmplacement(e){
    this.emplacement = e;
  }

  setLanded(l){
    this.landed = l;
  }

  setState(s){
    this.state = s;
  }

  setStatesPossible(s){
    this.statesPossible = s;
  }
}