import { Component, Input } from '@angular/core';

@Component({
    selector: 'gm-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css']
})

export class ScoreComponent{
    pageTitle: string = 'score';
    scoreString: string = '0';
    
    @Input() scoreNum: number;

    padScore(){
        this.scoreString = this.scoreNum.toString();
        return this.scoreString.padStart(6, "0");
    }

}