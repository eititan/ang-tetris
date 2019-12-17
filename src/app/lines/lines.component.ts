import { Component, Input } from '@angular/core';

@Component({
    selector: 'gm-lines',
    templateUrl: './lines.component.html'
})
export class LinesComponent{
    pageTitle: string = 'lines';
    @Input() linesCleared: number;
    paddedLinesCleared: string;

    padThreeDigits() {
        this.paddedLinesCleared = this.linesCleared.toString();
        return this.paddedLinesCleared.padStart(3, "0");
    }
}