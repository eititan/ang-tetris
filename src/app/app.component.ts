import { Component } from '@angular/core';
import { Piece } from './piece.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tetris';
  score: number;
  lines: number;
  level: number;
  next: Piece;
  playBool: boolean = false;

  tShapes = 0;
  jShapes = 0;
  zShapes = 0;
  oShapes = 0;
  sShapes = 0;
  lShapes = 0;
  iShapes = 0;

  setScore(points: number){
    this.score = points;
  }

  setLinesCleared(lines: number){
    this.lines = lines;
  }

  setLevel(level: number){
    this.level = level;
  }

  setStats(shape: number){
    switch(shape){
      case 1: {
        this.iShapes++;
        break;
      }
      case 2: {
        this.lShapes++;
        break;
      }
      case 3: {
        this.jShapes++;
        break;
      }
      case 4: {
        this.oShapes++;
        break;
      }
      case 5: {
        this.sShapes++;
        break;
      }
      case 6: {
        this.tShapes++;
        break;
      }
      case 7: {
        this.zShapes++;
        break;
      } case -1: {
        this.tShapes = 0;
        this.jShapes = 0;
        this.zShapes = 0;
        this.oShapes = 0;
        this.sShapes = 0;
        this.lShapes = 0;
        this.iShapes = 0;
        break;
      } default: {
        break;
      }
    }
  }

  setNextPiece(next: Piece){
    this.next = next;
  }
}
