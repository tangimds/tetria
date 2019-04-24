class Playzone{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.field = new Array(x);
    for(let i=0 ; i<this.field.length ; i++){
      this.field[i]=new Array(y);
    }
    for(let i=0 ; i<this.field.length ; i++){
      for (let j=0 ; j<this.field[i].length;j++){
        this.field[i][j] = 0;
      }
    }
  }

  clone(){
    let clo = new Playzone(this.x,this.y);
    clo.setField(clone(this.field));
    return clo;
  }
  
  setField(f){
    this.field = f;
  }

  show(){
    for(let i=0 ; i<this.field.length ; i++){
      for (let j=0 ; j<this.field[i].length;j++){
        if(this.field[i][j] != 0){
          push()
          fill(this.field[i][j]);
          rect(i*TILE_SIZE,j*TILE_SIZE,TILE_SIZE,TILE_SIZE)
          pop();
        }
      }
    }
  }

  getCumulativeHeight(){
    let h = 0;
    for(let i=0 ; i<this.field.length ; i++){
      let j=0;
      while(this.field[i][j]==0){
        j++;
      }
      h += TILES_H - j;
    }
    return h;
  }

  getHeight(){
    let h = 0;
    for(let i=0 ; i<this.field.length ; i++){
      let j=0;
      while(this.field[i][j]==0){
        j++;
      }
      h = Math.max(h,TILES_H-j);
    }
    return h;
  }

  getRelativeHeight(){
    let max = 0;
    let min = TILES_H;
    for(let i=0 ; i<this.field.length ; i++){
      let j=0;
      while(this.field[i][j]==0){
        j++;
      }
      max = Math.max(max,TILES_H-j);
      min = Math.min(min,TILES_H-j);
    }
    return max-min;
  }

  getHoles(){
    let holes = 0;
    for(let i=0 ; i<this.field.length ; i++){
      let started = false;
      for(let j=0 ; j<this.field[i].length ; j++){
        if(this.field[i][j]!=0){
          started = true;
        }
        if(started && this.field[i][j]==0){
          holes++;
        }
      }
    }
    return holes;
  }

  getRoughness(){
    let heights = new Array(TILES_W);
    for(let i=0 ; i<this.field.length ; i++){
      let j=0;
      while(this.field[i][j]==0){
        j++;
      }
      heights[i] = TILES_H - j;
    }
    let bump = 0;
    for(let i=0 ; i<heights.length-1 ; i++){
      bump += Math.abs(heights[i]-heights[i+1]);
    }
    return bump;
  }
  
  linesComplete(){
    let linesComplete = [];
    for(let line=0 ; line < TILES_H ; line++){
      let complete = true;
      for(let col=0 ; col < TILES_W ; col++){
        if(this.field[col][line]==0)
          complete=false;
      }
      if(complete)
        linesComplete.push(line);
    }
    return linesComplete;
  }
  
  breakLine(i){
    for(let k=0 ; k<this.field.length ; k++){
      this.field[k][i] = 0;
    }
  }
  
  lowerAllAbove(line){
    for(let i=0 ; i<this.field.length ; i++){
      for(let j=line ; j>=1 ; j--){
        this.field[i][j] = this.field[i][j-1];
      }
      this.field[i][0] = 0;
    }
    
  }
}