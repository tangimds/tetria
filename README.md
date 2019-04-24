# Tetria - a Tetris AI

![25th Generation AI](https://github.com/mzmousa/tetris-ai/blob/master/tetris_gameplay.gif?raw=true)
# Rules
The rules used here are the basic Tetris rules set :
* the main goal is to score the maximum amount of points
* you score points by completing a line
* every 10 lines completed, the level increases (the pieces fall faster and you score more points by line complete)
* the more lines you complete at a time, the more points you get.
* if a piece is out of the grid (touches the roof), you die
* the next piece is known

**Table of points :**
| Level | 1 line | 2 lines | 3 lines | 4 lines (tetris) |
|:-:|:-:|:-:|:-:|:-:|
|0|40|100|300|1200|
|1|40\*2|100\*2|300\*2|1200\*2|
|2|40\*3|100\*3|300\*3|1200\*3|
|...|...|...|...|...|
|n|40\*(n-1)|100\*(n-1)|300\*(n-1)|1200\*(n-1)|

# AI

## Author 
Tangi Mendès