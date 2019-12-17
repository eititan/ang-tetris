import { Component, Input } from '@angular/core';

@Component({
    selector: 'gm-level',
    templateUrl: './level.component.html'
})
export class LevelComponent{
    pageTitle: string = 'level';
    @Input() level: number;
    paddedLevel: string;

    padTwoDigits(){
        this.paddedLevel = this.level.toString();
        return this.paddedLevel.padStart(2, "0");
    }
}