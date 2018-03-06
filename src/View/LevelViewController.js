function LevelViewController( canvas, spacing, numberColor, level, score ) {
   this.canvas = canvas;
   this.spacing = spacing;
   this.numberColor = numberColor;
   this.level = level;
   this.score = score;

   this.offset = canvas.height * .15;
   this.determineBlockSize();
   this.determineLeftMargin();

   var brush = canvas.getContext('2d');
   this.brush = brush;
}

LevelViewController.prototype.resetFont = function() {
    this.brush.font = 'bold ' + this.blockSize * .5 + 'px sans-serif';
    this.brush.textAlign = 'center';
    this.brush.textBaseline = 'middle';
};

LevelViewController.prototype.determineBlockSize = function() {
    var columns = this.level.puzzle.board.columns;
    var rows = this.level.puzzle.board.rows + 1;
    var maxWidth = this.canvas.width / columns;
    var maxHeight = (this.canvas.height - this.offset) / rows;
    this.blockSize = Math.min(maxWidth, maxHeight) - this.spacing;
};

LevelViewController.prototype.determineLeftMargin = function() {
    var columns = this.level.puzzle.board.columns;
    this.leftMargin = (this.canvas.width - ((this.blockSize * columns) + (this.spacing * (columns - 1)))) / 2;
};

LevelViewController.prototype.drawBoard = function() {
   var blockIndex = this.level.puzzle.currentRow * this.level.puzzle.board.columns;
   var x = 0;
   var y = 0;
   var offset = this.offset + this.blockSize + this.spacing;
   for( var i = 0; i < this.level.puzzle.board.columns; i += 1) {
     for (var j = this.level.puzzle.history.length; j < this.level.puzzle.board.rows; j += 1) {
       var number = this.level.puzzle.board.get(j, i);
       this.brush.fillStyle = this.level.palette.boardColors[number - 1].toString();
       x = i * this.blockSize + (this.spacing * i) + this.leftMargin;
       y = j * this.blockSize + offset + (this.spacing * j);
       this.brush.fillRect(x, y, this.blockSize, this.blockSize);
       this.brush.fillStyle = this.numberColor;
       this.brush.fillText('' + number, x + this.blockSize / 2, y + this.blockSize / 2);
       blockIndex += 1;
     }
  }
};

LevelViewController.prototype.drawNumber = function() {
    var lastIndex = this.liveIndex;
    if( typeof lastIndex === 'undefined' ) {
        lastIndex = this.level.puzzle.history.slice(-1)[0];
        if( typeof lastIndex === 'undefined' ) {
            lastIndex = Math.floor(this.level.puzzle.board.columns / 2);
        }
    }
    var currentRow = this.level.puzzle.currentRow;
    var x = lastIndex * this.blockSize + ( this.spacing * lastIndex ) + this.leftMargin;
    var y = currentRow * this.blockSize + this.offset + (this.spacing * currentRow);
    this.brush.fillStyle = this.level.palette.numberColor.toString();
    this.brush.fillRect(x, y, this.blockSize, this.blockSize);
    this.brush.fillStyle = this.numberColor;
    this.brush.fillText('' + this.level.puzzle.number, x + this.blockSize / 2, y + this.blockSize / 2);
};

LevelViewController.prototype.drawStatusBar = function() {
    this.brush.font = this.blockSize / 3.25 + 'px sans-serif';
    this.brush.textAlign = 'left';
    this.brush.textBaseline = 'top';
    this.brush.fillStyle = this.level.palette.numberColor.toString();
    var levelStr = 'level ' + this.level.puzzle.original;
    if(this.score) {
        levelStr += ' | avg: ' + this.score.average().toFixed(4);
    }
    this.brush.fillText(levelStr, this.leftMargin + this.spacing, 0);
    this.brush.textAlign = 'right';
    this.brush.fillText('[select]', this.leftMargin + (this.blockSize + this.spacing) * 4, 0);
};

LevelViewController.onDraw = function(levelViewController) {};

LevelViewController.prototype.draw = function() {
    this.brush.clearRect(0, 0, canvas.width, canvas.height);
    this.resetFont();
    this.drawNumber();
    this.drawBoard();
    this.drawStatusBar();
    this.onDraw(this);
};
