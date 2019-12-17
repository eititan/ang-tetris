import { FILL_COLORS, BORDER_COLORS,  SHAPES } from './constants';

export interface IPiece {
  x: number;
  y: number;
  fillColor: string;
  borderColor: string;
  shape: number[][];
}

export class Piece implements IPiece {
  x: number;
  y: number;
  typeId: number;
  fillColor: string;
  borderColor: string;
  shape: number[][];
  canvas: CanvasRenderingContext2D;
  
  constructor(private ctx: CanvasRenderingContext2D, newPiece?: Piece, tId?: number) {
    if(newPiece != null){
      //copy new piece object for hard-drop preview
      this.typeId = newPiece.typeId;
      this.shape = newPiece.shape;
      this.fillColor = newPiece.fillColor;
      this.borderColor = newPiece.borderColor;
      this.x = newPiece.x;
      this.y = newPiece.y;
    }else if(tId != null){
      //if we passed a block id in -- used to draw blocks in stats
      this.typeId = tId;
      this.shape = SHAPES[this.typeId];
      this.fillColor = FILL_COLORS[this.typeId];
      this.borderColor = BORDER_COLORS[this.typeId];
      this.x = this.typeId === 4 ? 4 : 3;
      this.y = 0;
    }else{
      //if just context, create randomized block
      this.typeId = this.randomizeTetrominoType(FILL_COLORS.length - 1);
      this.shape = SHAPES[this.typeId];
      this.fillColor = FILL_COLORS[this.typeId];
      this.borderColor = BORDER_COLORS[this.typeId];
      this.x = this.typeId === 4 ? 4 : 3;
      this.y = 0;
    }
  }

  draw() {
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          //in most rectangle
          this.ctx.lineJoin = "round";
          this.ctx.fillStyle = this.fillColor;
          this.ctx.fillRect(this.x + x + .15, this.y + y + .15, .75, .75);

          //out-most border
          this.ctx.lineJoin = "round";
          this.ctx.lineWidth = .1;
          this.ctx.strokeStyle = this.borderColor;
          this.ctx.strokeRect(this.x + x + .05, this.y + y +.05, .9, .9);  

          //second in-most border for inside rect rounding
          this.ctx.lineJoin = "round";
          this.ctx.lineWidth = .1;
          this.ctx.strokeStyle = this.fillColor;
          this.ctx.strokeRect(this.x + x + .12, this.y + y +.12, .75, .75);  

          //shine pixel
          this.ctx.fillStyle = 'white';
          this.ctx.beginPath();
          this.ctx.fillRect(this.x + x + .07, this.y + y + .07, .075, .075);
          this.ctx.stroke();
        }
      });
    });
  }

  drawPreview(previewPiece: Piece) {
    previewPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          //out-most border
          this.ctx.lineJoin = "round";
          this.ctx.lineWidth = .1;
          this.ctx.strokeStyle = this.borderColor;
          this.ctx.strokeRect(this.x + x + .05, this.y + y +.05, .9, .9);  
        }
      });
    });
  }

  move(p: IPiece) {
    this.x = p.x;
    this.y = p.y;
    this.shape = p.shape;
  }

  randomizeTetrominoType(noOfTypes: number): number {
    return Math.floor(Math.random() * noOfTypes + 1);
  }
  
}