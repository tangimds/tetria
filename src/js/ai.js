var populationSize = 50;
var currentGenome = -1;
var generation = 0;
var currentGenome = -1;
var genomes = [];
var archive = {
	populationSize: 0,
	currentGeneration: 0,
	elites: [],
	genomes: []
};
var rndSeed = 1;
var moveLimits = [100,500,1000,3000,10000,-1];
var moveIndex = 0;
var moveLimit = moveLimits[moveIndex];
var movesTaken = 0;

//0 pas de chute, 1 chute rapide, 2 chute normale
var speedIndex = 0;

var mutationRate = 0.05;
var mutationStep = 0.2;

//stores shapes
var bag = [];
//index for shapes in the bag
var bagIndex = 0;

function showAI(){
    let size = 15;
    let g = genomes[currentGenome];
    textSize(size);
    let pop = populationSize-1;
    let mLim = moveLimit;
    if(moveLimit<0) mLim = String.fromCharCode(8734);
    text("Generation "+generation+"\n"+
    "Genome "+currentGenome+"/"+pop+"\n"+
    "Move "+movesTaken+"/"+mLim+"\n"+
    "===================="+"\n"+
    "id : "+g.id+"\n"+
    "rowsCleared : "+g.rowsCleared.toFixed(4)+"\n"+
    "cumulativeHeight : "+g.cumulativeHeight.toFixed(4)+"\n"+
    "holes : "+g.holes.toFixed(4)+"\n"+
  //  "relativeHeight : "+g.relativeHeight.toFixed(4)+"\n"+
    "roughness : "+g.roughness.toFixed(4)+"\n"
   // "weightedHeight : "+g.weightedHeight.toFixed(4)+"\n"
    ,WIDTH+10,HEIGHT-25*size);
}

function firstGeneration() {
    //print("first population");
    //inits the array
    genomes = [];
    //for a given population size
    for (var i = 0; i < populationSize; i++) {
        //randomly initialize the 7 values that make up a genome
        //these are all weight values that are updated through evolution
        var genome = {
            //unique identifier for a genome
            id: Math.random(),
            //The weight of each row cleared by the given move. the more rows that are cleared, the more this weight increases
            rowsCleared: Math.random(),
            //the absolute height of the highest column to the power of 1.5
            //added so that the algorithm can be able to detect if the blocks are stacking too high
       //     weightedHeight: Math.random()  * -1,
            //The sum of all the column’s heights
            cumulativeHeight: Math.random() * -1,
            //the highest column minus the lowest column
        //    relativeHeight: Math.random() * -1,
            //the sum of all the empty cells that have a block above them (basically, cells that are unable to be filled)
            holes: Math.random() * -1,
            // the sum of absolute differences between the height of each column 
            //(for example, if all the shapes on the grid lie completely flat, then the roughness would equal 0).
            roughness: Math.random() * -1,
        };
        //add them to the array
        genomes.push(genome);
    }
    evaluateNextGenome();
}

function evaluateNextGenome() {
    //increment index in genome array
    currentGenome++;
    //If there is none, evolves the population.
    if (currentGenome == genomes.length) {
        evolve();
    }
    //print("evaluating genome "+ currentGenome+" of gen "+generation);
    //print(genomes[currentGenome]);
    //load current gamestate
    //loadState(roundState);
    reset(1);
    //reset moves taken
    movesTaken = 0;
    //and make the next move
    makeNextMove();
}

function evolve() {

    print("Generation " + generation + " evaluated.");
    //reset current genome for new generation
    currentGenome = 0;
    //increment generation
    generation++;
    //resets the game
    reset(1);
    //gets the current game state
    roundState = getState();
    //sorts genomes in decreasing order of fitness values
    genomes.sort(function(a, b) {
        return b.fitness - a.fitness;
    });
    //add a copy of the fittest genome to the elites list
    archive.elites.push(clone(genomes[0]));
    print("Elite's fitness: " + genomes[0].fitness);

    //remove the tail end of genomes, focus on the fittest
    while(genomes.length > populationSize / 2) {
        genomes.pop();
    }
    //sum of the fitness for each genome
    var totalFitness = 0;
    for (var i = 0; i < genomes.length; i++) {
        totalFitness += genomes[i].fitness;
    }

    //get a random index from genome array
   function getRandomGenome() {
       return genomes[randomWeightedNumBetween(0, genomes.length - 1)];
   }
   //create children array
   var children = [];
   //add the fittest genome to array
   for(var i=0 ; i < 10 ; i++){
       children.push(clone(genomes[i]));
   }
   //add population sized amount of children
   while (children.length < populationSize) {
       //crossover between two random genomes to make a child
       children.push(makeChild(getRandomGenome(), getRandomGenome()));
   }
   //create new genome array
   genomes = [];
   //to store all the children in
   genomes = genomes.concat(children);
   //store this in our archive
   archive.genomes = clone(genomes);
   //and set current gen
   archive.currentGeneration = clone(generation);
   archive.populationSize = clone(populationSize);
   //print(JSON.stringify(archive));
   print(archive);
   //store archive, thanks JS localstorage! (short term memory)
   localStorage.setItem("archive", JSON.stringify(archive));
}

function showStatsGenome(message){
    let totalLines = lvl.combo1 + 2*lvl.combo2 + 3*lvl.combo3 + 4*lvl.comboTetris;
    print("["+message+"] Genome "+currentGenome+" of generation "+generation+" scores "+genomes[currentGenome].fitness+" pts with "+totalLines+" lines("+lvl.comboTetris+" tetris).");
}

function makeNextMove() {
    //increment number of moves taken
    movesTaken++;
    if(currentPiece.isLanded())
	 	nextShape();
    //if its over the limit of moves
    if (movesTaken > moveLimit && moveLimit>0) {
        //update this genomes fitness value using the game score
        genomes[currentGenome].fitness = clone(lvl.score);
        showStatsGenome("MOVELIMIT");
        //and evaluates the next genome
        evaluateNextGenome();
    } else {
        //print("move "+movesTaken);
        //time to make a move

        //we're going to re-draw, so lets store the old drawing
        //var oldDraw = clone(draw);
        //draw = false;
        //get all the possible moves

        var possibleMoves = getAllPossibleMoves();
        //lets store the current state since we will update it
        
        var lastState = getState();
        //print('state',lastState);
        //whats the next shape to play
        nextShape();
        
        //for each possible move 
        //print("rating...");

        for (var i = 0; i < possibleMoves.length; i++) {
            //get the best move. so were checking all the possible moves, for each possible move. moveception.
            var nextMove = getHighestRatedMove(getAllPossibleMoves());
            //add that rating to an array of highest rates moves
            possibleMoves[i].rating += nextMove.rating;
        }
        //load current state
        loadState(lastState);
        //get the highest rated move ever
        var move = getHighestRatedMove(possibleMoves);
        //print('best move',move);
        //then rotate the shape as it says too
        for (var rotations = 0; rotations < move.rotations; rotations++) {
            //rotateShape();
            moveRotate(currentPiece);
        }
        //and move left as it says
        if (move.translation < 0) {
            for (var lefts = 0; lefts < Math.abs(move.translation); lefts++) {
                moveLeft(currentPiece);
            }
            //and right as it says
        } else if (move.translation > 0) {
            for (var rights = 0; rights < move.translation; rights++) {
                moveRight(currentPiece);
            }
        }

        //make the piece go down
        if(speedIndex==0){
            while(!currentPiece.isLanded()){
                moveDown(currentPiece);
                currentPiece.update();
            }
        }

        //update our move algorithm
        /*if (inspectMoveSelection) {
            moveAlgorithm = move.algorithm;
        }*/
        //and set the old drawing to the current
        //draw = oldDraw;
        //output the state to the screen
        //output();
        //and update the score
    }
}

function getHighestRatedMove(moves) {
    //start these values off small
    var maxRating = -10000000000000;
    var maxMove = -1;
    var ties = [];
    //iterate through the list of moves
    for (var index = 0; index < moves.length; index++) {
        //if the current moves rating is higher than our maxrating
        if (moves[index].rating > maxRating) {
            //update our max values to include this moves values
            maxRating = moves[index].rating;
            maxMove = index;
            //store index of this move
            ties = [index];
        } else if (moves[index].rating == maxRating) {
            //if it ties with the max rating
            //add the index to the ties array
            ties.push(index);
        }
    }
    //eventually we'll set the highest move value to this move var
   var move = moves[ties[0]];
   //and set the number of ties
   move.algorithm.ties = ties.length;
   return move;
}

function getAllPossibleMoves() {
    var lastState = getState();
    var possibleMoves = [];
    var possibleMoveRatings = [];
    var iterations = 0;
    //for each possible rotation
    for (var rots = 0; rots < currentPiece.statesPossible; rots++) {

        var oldX = [];
        //for each iteration
        for (var t = -5; t <= 5; t++) {

            iterations++;
            loadState(lastState);
            //rotate shape
            for (var j = 0; j < rots; j++) {
                moveRotate(currentPiece);
            }
            //move left
            if (t < 0) {
                for (var l = 0; l < Math.abs(t); l++) {
                    moveLeft(currentPiece);
                }
            //move right
            } else if (t > 0) {
                for (var r = 0; r < t; r++) {
                    moveRight(currentPiece);
                }
            }
            //if the shape has moved at all
            if (!contains(oldX, currentPiece.x)) {
                //move it down
                //var moveDownResults = moveDown(currentPiece);
                while (!currentPiece.isLanded()) {
                    moveDown(currentPiece);
                    currentPiece.update();
                }
                for(let i=0 ; i< currentPiece.emplacement.length ; i++){
                    pz.field[currentPiece.emplacement[i][0]][currentPiece.emplacement[i][1]] = currentPiece.color;
                }

                //set the 7 parameters of a genome
                var algorithm = {
                    rowsCleared: pz.linesComplete().length,
                  //  weightedHeight: Math.pow(pz.getHeight(), 1.5),
                    cumulativeHeight: pz.getCumulativeHeight(),
                  //  relativeHeight: pz.getRelativeHeight(),
                    holes: pz.getHoles(),
                    roughness: pz.getRoughness()
                };
                //rate each move
                var rating = 0;
                rating += algorithm.rowsCleared * genomes[currentGenome].rowsCleared;
              //  rating += algorithm.weightedHeight * genomes[currentGenome].weightedHeight;
                rating += algorithm.cumulativeHeight * genomes[currentGenome].cumulativeHeight;
              //  rating += algorithm.relativeHeight * genomes[currentGenome].relativeHeight;
                rating += algorithm.holes * genomes[currentGenome].holes;
                rating += algorithm.roughness * genomes[currentGenome].roughness;
                //if the move loses the game, lower its rating
                if (currentPiece.isOut()) {
                    rating -= 500;
                }
                //push all possible moves, with their associated ratings and parameter values to an array
                possibleMoves.push({rotations: rots, translation: t, rating: rating, algorithm: algorithm});
                //update the position of old X value
                oldX.push(currentPiece.x);
            }
        }
    }
    //get last state
    loadState(lastState);
    //return array of all possible moves
    return possibleMoves;
}

function makeChild(mum, dad) {
    //init the child given two genomes (its 7 parameters + initial fitness value)
    var child = {
        //unique id
        id : Math.random(),
        //all these params are randomly selected between the mom and dad genome
        rowsCleared: randomChoice(mum.rowsCleared, dad.rowsCleared),
      //  weightedHeight: randomChoice(mum.weightedHeight, dad.weightedHeight),
        cumulativeHeight: randomChoice(mum.cumulativeHeight, dad.cumulativeHeight),
      //  relativeHeight: randomChoice(mum.relativeHeight, dad.relativeHeight),
        holes: randomChoice(mum.holes, dad.holes),
        roughness: randomChoice(mum.roughness, dad.roughness),
        //no fitness. yet.
        fitness: -1
    };
    //mutation time!

    //we mutate each parameter using our mutationstep
    if (Math.random() < mutationRate) {
        child.rowsCleared = child.rowsCleared + Math.random() * mutationStep * 2 - mutationStep;
    }
  /*  if (Math.random() < mutationRate) {
        child.weightedHeight = child.weightedHeight + Math.random() * mutationStep * 2 - mutationStep;
    }*/
    if (Math.random() < mutationRate) {
        child.cumulativeHeight = child.cumulativeHeight + Math.random() * mutationStep * 2 - mutationStep;
    }
  /*  if (Math.random() < mutationRate) {
        child.relativeHeight = child.relativeHeight + Math.random() * mutationStep * 2 - mutationStep;
   }*/
    if (Math.random() < mutationRate) {
        child.holes = child.holes + Math.random() * mutationStep * 2 - mutationStep;
    }
    if (Math.random() < mutationRate) {
        child.roughness = child.roughness + Math.random() * mutationStep * 2 - mutationStep;
    }
    return child;
}

function loadState(s){
    currentPiece = s.currentPiece.clone();
    nextPiece = s.nextPiece.clone();
    pz = s.playzone.clone();
    rndSeed = clone(s.rndSeed);
    score = clone(s.score);
    lvl = s.level.clone();
    bag = clone(s.bag);
    bagIndex = clone(s.bagIndex);
    //lvl.show();
    //pz.show();  
    currentPiece.update();
   // currentPiece.show();
    //nextPiece.showThumbnail();
}

function getState(){
    var state = {
        currentPiece: currentPiece.clone(),
        nextPiece: nextPiece.clone(),
        playzone: pz.clone(),
        bag: clone(bag),
        bagIndex: clone(bagIndex),
        rndSeed: clone(rndSeed),
        level: lvl.clone(),
        score: clone(lvl.score)
    };
    return state;
}

function nextShape() {
    //increment the bag index
    bagIndex += 1;
    //if we're at the start or end of the bag
    if (bag.length === 0 || bagIndex == bag.length) {
        //generate a new bag of genomes
        generateBag();
        if(nextPiece){
            bag[0]=nextPiece.constructor.name;
        }
    }
    //if almost at end of bag
    if (bagIndex == bag.length - 1) {
        //store previous seed
        var prevSeed = rndSeed;
        //generate upcoming shape
        nextPiece = createNewTetrimino(random(tetriminos));
        //set random seed
        rndSeed = prevSeed;
    } else {
        //get the next shape from our bag
        nextPiece = createNewTetrimino(bag[bagIndex + 1]);
    }
    //get our current shape from the bag

    currentPiece = createNewTetrimino(bag[bagIndex]);
}

function loadArchive(archiveString) {
    var a = JSON.parse(archiveString);
    //archive = fullyEvolvedArchive;
    genomes = clone(a.genomes);
    populationSize = a.populationSize;
    generation = a.currentGeneration;
    archive.elites = clone(a.elites);
    currentGenome = 0;
    movesTaken = 0;
    reset(1);
    roundState = getState();
    print("Archive loaded!");
}


/*************************************************
 * UTILS
 */

function randomWeightedNumBetween(min, max) {
    return Math.floor(Math.pow(Math.random(), 2) * (max - min + 1) + min);
}

function generateBag() {
    bag = [];
    bagIndex = 0;
    let tempBag = clone(tetriminos);
    bag = shuffle(tempBag);
}

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function randomKey(obj) {
    var keys = Object.keys(obj);
    var i = seededRandom(0, keys.length);
    return keys[i];
}

function seededRandom(min, max) {
    max = max || 1;
    min = min || 0;

    rndSeed = (rndSeed * 9301 + 49297) % 233280;
    var rnd = rndSeed / 233280;

    return Math.floor(min + rnd * (max - min));
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function randomChoice(propOne, propTwo) {
    if (Math.round(Math.random()) === 0) {
        return clone(propOne);
    } else {
        return clone(propTwo);
    }
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}