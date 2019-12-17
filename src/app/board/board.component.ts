import { Component, ViewChild, ElementRef, OnInit, HostListener, EventEmitter, Output} from '@angular/core';
import { COLS, BLOCK_SIZE, ROWS, FILL_COLORS, LINES_PER_LEVEL, LEVEL, POINTS, KEY, BORDER_COLORS } from '../constants';
import { Piece, IPiece } from '../piece.component';
import { GameService } from '../game.service';

@Component({
  selector: 'gm-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

  export class BoardComponent implements OnInit {
    @ViewChild('board', { static: true })
    canvas: ElementRef<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;
    ctxNext: CanvasRenderingContext2D;
    board: number[][];
    piece: Piece;
    next: Piece;
    previewPiece: Piece;

    @Output() onNextPiece: EventEmitter<any> = new EventEmitter<any>();
    requestId: number;
    time: { start: number; elapsed: number; level: number };
    points: number;
    @Output() onPointsChanged: EventEmitter<any> = new EventEmitter<any>();
    lines: number;
    totalLinesCleared: number = 0;
    @Output() onLinesChanged: EventEmitter<any> = new EventEmitter<any>();
    level: number;
    @Output() onLevelChanged: EventEmitter<any> = new EventEmitter<any>();
    shapeCount: any = Array(0,0,0,0,0,0,0);
    @Output() onStatsChanged: EventEmitter<any> = new EventEmitter<any>();

    moves = {
      [KEY.LEFT]: (p: IPiece): IPiece => ({ ...p, x: p.x - 1 }),
      [KEY.RIGHT]: (p: IPiece): IPiece => ({ ...p, x: p.x + 1 }),
      [KEY.DOWN]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
      [KEY.SPACE]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
      [KEY.UP]: (p: IPiece): IPiece => this.service.rotate(p)
    }
  
    @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
      if (event.keyCode === KEY.ESC) {
        this.gameOver();
      } else if (this.moves[event.keyCode]) {
        event.preventDefault();
        // Get new state
        let p = this.moves[event.keyCode](this.piece);
        if (event.keyCode === KEY.SPACE) {
          // Hard drop
          while (this.service.valid(p, this.board)) {
            this.points += POINTS.HARD_DROP;
            this.piece.move(p);
            p = this.moves[KEY.DOWN](this.piece);
            this.pointsChanged()
          }
          this.drop();
        } else if (this.service.valid(p, this.board)) {
          this.piece.move(p);
          if (event.keyCode === KEY.DOWN) {
            this.points += POINTS.SOFT_DROP;            
            this.pointsChanged();
          }
        }
      }
    }
  
    constructor(private service: GameService) {}
  
    ngOnInit() {
      this.initBoard();
      this.resetGame();
    }
  
    initBoard() {
      this.ctx = this.canvas.nativeElement.getContext('2d');
  
      // Calculate size of canvas from constants.
      this.ctx.canvas.width = COLS * BLOCK_SIZE;
      this.ctx.canvas.height = ROWS * BLOCK_SIZE;
  
      // Scale so we don't need to give size on every draw.
      this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    }
  
    play() {
      this.resetGame();
      this.next = new Piece(this.ctx);
      this.piece = new Piece(this.ctx);
      this.statsChanged(this.piece.typeId);
      this.nextPiece();
      this.time.start = performance.now();
  
      // If we have an old game running a game then cancel the old
      if (this.requestId) {
        cancelAnimationFrame(this.requestId);
      }
  
      this.animate();
    }
  
    resetGame() {
      this.points = 0;
      this.lines = 0;
      this.totalLinesCleared = 0;
      this.level = 0;
      this.board = this.getEmptyBoard();
      this.time = { start: 0, elapsed: 0, level: LEVEL[this.level] };

      this.linesChanged();
      this.pointsChanged();
      this.levelChanged();
      this.statsChanged(-1);
    }
  
    animate(now = 0) {
      this.time.elapsed = now - this.time.start;
      if (this.time.elapsed > this.time.level) {
        this.time.start = now;
        if (!this.drop()) {
          this.gameOver();
          return;
        }
      }
      this.draw();
      this.requestId = requestAnimationFrame(this.animate.bind(this));
    }
  
    draw() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.piece.draw();
      this.dropPreview();
      this.drawBoard();
    }
  
    drop(): boolean {
      let p = this.moves[KEY.DOWN](this.piece);
      if (this.service.valid(p, this.board)) {
        this.piece.move(p);
      } else {
        this.freeze();
        this.clearLines();
        if (this.piece.y === 0) {
          // Game over
          return false;
        }
        this.piece = this.next;
        this.statsChanged(this.piece.typeId);
        this.next = new Piece(this.ctx);
        this.nextPiece();
      }
      return true;
    }
  
    clearLines() {
      let lines = 0;
      this.board.forEach((row, y) => {
        if (row.every(value => value !== 0)) {
          lines++;
          this.board.splice(y, 1);
          this.board.unshift(Array(COLS).fill(0));
        }
      });
      if (lines > 0) {
        this.points += this.service.getLinesClearedPoints(lines, this.level);
        this.lines += lines;
        this.totalLinesCleared += lines;
        this.linesChanged()
        if (this.lines >= LINES_PER_LEVEL) {
          this.level++;
          this.levelChanged();
          this.lines -= LINES_PER_LEVEL;
          this.time.level = LEVEL[this.level];
        }
      }
    }
  
    freeze() {
      this.piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value > 0) {
            this.board[y + this.piece.y][x + this.piece.x] = value;
          }
        });
      });
    }
  
    drawBoard() {
      this.board.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value > 0) {
            //in-most rectangle
            this.ctx.lineJoin = "round";
            this.ctx.fillStyle = FILL_COLORS[value];
            this.ctx.fillRect(x + .15, y + .15, .75, .75);

            //out-most border
            this.ctx.lineJoin = "round";
            this.ctx.lineWidth = .1;
            this.ctx.strokeStyle = BORDER_COLORS[value];
            this.ctx.strokeRect(x + .05, y +.05, .9, .9);  

            //second inmost border for inside rect rounding
            this.ctx.lineJoin = "round";
            this.ctx.lineWidth = .1;
            this.ctx.strokeStyle = FILL_COLORS[value];
            this.ctx.strokeRect(x + .12, y +.12, .75, .75);  

            //shine pixel
            this.ctx.fillStyle = 'white';
            this.ctx.beginPath();
            this.ctx.fillRect(x + .07, y + .07, .075, .075);
            this.ctx.stroke();
          }
        });
      });
    }
  
    dropPreview(){
      let previewPiece = new Piece(this.ctx, this.piece);
      let p = this.moves[32](previewPiece);
      while (this.service.valid(previewPiece, this.board)) {
        previewPiece.move(p);
        p = this.moves[32](previewPiece);
      }
      //while loop moved to invalid state, move back up and draw
      p.y = p.y - 2;
      previewPiece.move(p);
      previewPiece.drawPreview(previewPiece);
    }

    gameOver() {
      cancelAnimationFrame(this.requestId);
      this.ctx.lineJoin = "round";
      this.ctx.fillStyle = 'rgb(12, 0, 29)';
      this.ctx.fillRect(1, 3, 8, 1.2);
      this.ctx.font = '1px Ariel';
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('GAME OVER', 1.8, 3.95);
    }
  
    getEmptyBoard(): number[][] {
      return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }

    pointsChanged(){
      this.onPointsChanged.emit(this.points);
    }

    linesChanged(){
      this.onLinesChanged.emit(this.totalLinesCleared);
    }

    levelChanged(){
      this.onLevelChanged.emit(this.level);
    }

    statsChanged(shape: number){
      this.onStatsChanged.emit(shape);
    }

    nextPiece(){
      this.onNextPiece.emit(this.next);
    }
  }