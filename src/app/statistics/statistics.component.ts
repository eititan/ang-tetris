import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Piece } from '../piece.component';
import { STATS_BLOCK_SIZE } from '../constants';

@Component({
    selector: 'gm-stats',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
    @ViewChild('tblock', { static: true })
    tcanvas: ElementRef<HTMLCanvasElement>;
    tctx: CanvasRenderingContext2D;
    
    @ViewChild('jblock', { static: true })
    jcanvas: ElementRef<HTMLCanvasElement>;
    jctx: CanvasRenderingContext2D;

    @ViewChild('zblock', { static: true })
    zcanvas: ElementRef<HTMLCanvasElement>;
    zctx: CanvasRenderingContext2D;

    @ViewChild('oblock', { static: true })
    ocanvas: ElementRef<HTMLCanvasElement>;
    octx: CanvasRenderingContext2D;

    @ViewChild('sblock', { static: true })
    scanvas: ElementRef<HTMLCanvasElement>;
    sctx: CanvasRenderingContext2D;
    @ViewChild('lblock', { static: true })
    lcanvas: ElementRef<HTMLCanvasElement>;
    lctx: CanvasRenderingContext2D;

    @ViewChild('iblock', { static: true })
    icanvas: ElementRef<HTMLCanvasElement>;
    ictx: CanvasRenderingContext2D;

    peice: Piece;
    pageTitle: string = 'statistics'
    @Input() tShapes: number = 0;
    @Input() jShapes: number = 0;
    @Input() zShapes: number = 0;
    @Input() oShapes: number = 0;
    @Input() sShapes: number = 0;
    @Input() lShapes: number = 0;
    @Input() iShapes: number = 0;
    numPadded: string;

    ngOnInit(): void {
        this.canvasInit(this.tctx, this.tcanvas, 6);
        this.canvasInit(this.jctx, this.jcanvas, 3);
        this.canvasInit(this.zctx, this.zcanvas, 7);
        this.canvasInit(this.octx, this.ocanvas, 4);
        this.canvasInit(this.sctx, this.scanvas, 5);
        this.canvasInit(this.lctx, this.lcanvas, 2);
        this.canvasInit(this.ictx, this.icanvas, 1); 
    }

    canvasInit(pieceCtx: CanvasRenderingContext2D, pieceCanvas:ElementRef<HTMLCanvasElement>, typeId:number){
        pieceCtx = pieceCanvas.nativeElement.getContext('2d');
        pieceCtx.canvas.width = 4 * STATS_BLOCK_SIZE;
        pieceCtx.canvas.height = 2 * STATS_BLOCK_SIZE;
        pieceCtx.scale(STATS_BLOCK_SIZE, STATS_BLOCK_SIZE);

        let piece = new Piece(pieceCtx, null, typeId);
        this.renderBlock(piece, pieceCtx);
    }

    renderBlock(piece: Piece, ctx: CanvasRenderingContext2D){
        piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
            //in most rectangle
            ctx.lineJoin = "round";
            ctx.fillStyle = piece.fillColor;
            ctx.fillRect(x + .15, y + .15, .75, .75);
    
            //out-most border
            ctx.lineJoin = "round";
            ctx.lineWidth = .1;
            ctx.strokeStyle = piece.borderColor;
            ctx.strokeRect(x + .05, y +.05, .9, .9);  
    
            //second in-most border for inside rect rounding
            ctx.lineJoin = "round";
            ctx.lineWidth = .1;
            ctx.strokeStyle = piece.fillColor;
            ctx.strokeRect(x + .12, y +.12, .75, .75);  
    
            //shine pixel
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.fillRect(x + .07, y + .07, .075, .075);
            ctx.stroke();
            }
        });
        });
    }

    padThreeDigits(num: number):string {
        this.numPadded = num.toString();
        return this.numPadded.padStart(3, "0");
    }
}