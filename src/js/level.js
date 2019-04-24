tabScore = [40,100,300,1200];

class Level{
  constructor(lvl,spd){
    this.level = lvl;
    this.speed = spd;
    this.linesComplete = 0;
    this.score = 0;
    this.combo1 = 0;
    this.combo2 = 0;
    this.combo3 = 0;
    this.comboTetris = 0;
  }

  clone(){
    let clo = new Level(this.level,this.speed);
    clo.setScore(clone(this.score));
    clo.setLinesComplete(clone(this.linesComplete));
    clo.setCombos(clone(this.combo1),clone(this.combo2),clone(this.combo3),clone(this.comboTetris));
    return clo;
  }
  
  setLinesComplete(l){
    this.linesComplete = l;
  }

  setCombos(c1,c2,c3,cT){
    this.combo1 = c1;
    this.combo2 = c2;
    this.combo3 = c3;
    this.comboTetris = cT;
  }

  setScore(s){
    this.score=s;
  }
  
  up(){
    this.level++;
    this.speed -= 3;
    if(this.speed < 1)
      this.speed = 1;
  }
  
  addLinesComplete(x){
    this.linesComplete += x;
    switch(x){
      case 1:
        this.combo1++;
        break;
      case 2:
        this.combo2++;
        break;
      case 3:
        this.combo3++;
        break;
      case 4:
        this.comboTetris++;
        break;
    }
  }
  
  addPoints(x){
    this.score += tabScore[x]*(this.level+1);
  }
  
  show(){
    push()
    fill("#aaa");
    let size = 15;
    textSize(size);
    text("level : "+this.level+"\n"+
    "score : "+this.score.toLocaleString('en')+"\n"
    ,WIDTH+10,HEIGHT-8*size);
    push();
    textSize(size*0.7);
    let tot = this.combo1+this.combo2*2+this.combo3*3+this.comboTetris*4;
    text(
    "-single : "+this.combo1+"\n"+
    "-double : "+this.combo2+"\n"+
    "-triple : "+this.combo3+"\n"+
    "-tetris : "+this.comboTetris+"\n"+
    "-TOTAL : "+tot+"\n"
    ,WIDTH+10,HEIGHT-5*size);
    text("highscore : "+parseInt(highscore).toLocaleString('en'),WIDTH+10,HEIGHT);
    pop();
    pop();
  }
}