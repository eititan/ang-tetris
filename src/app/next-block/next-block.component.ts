import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Piece } from '../piece.component';
import { BLOCK_SIZE } from '../constants';

@Component({
  selector: 'gm-nextb',
  templateUrl: './next-block.component.html',
  styleUrls: ['./next-block.component.css']
})

export class NextBlockComponenet implements OnInit {
  @ViewChild('next', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  pageTitle: string = "Next";
  @Input('nextPiece') nextPiece: Piece;
  
  ngOnInit(){
    this.ctx = this.canvas.nativeElement.getContext('2d');    
    this.ctx.canvas.width = 4 * BLOCK_SIZE;
    this.ctx.canvas.height = 3 * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    this.draw();
  }

  draw() {
    if(this.nextPiece != null){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.nextPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value > 0) {
            //in most rectangle
            this.ctx.lineJoin = "round";
            this.ctx.fillStyle = this.nextPiece.fillColor;
            this.ctx.fillRect(x + .15, y + .15, .75, .75);
  
            //out-most border
            this.ctx.lineJoin = "round";
            this.ctx.lineWidth = .1;
            this.ctx.strokeStyle = this.nextPiece.borderColor;
            this.ctx.strokeRect(x + .05, y +.05, .9, .9);  
  
            //second in-most border for inside rect rounding
            this.ctx.lineJoin = "round";
            this.ctx.lineWidth = .1;
            this.ctx.strokeStyle = this.nextPiece.fillColor;
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
  }
}