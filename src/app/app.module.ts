import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NextBlockComponenet } from './next-block/next-block.component';
import { BoardComponent } from './board/board.component'
import { LinesComponent } from './lines/lines.component';
import { LevelComponent } from './level/level.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    StatisticsComponent,
    NextBlockComponenet,
    BoardComponent,
    LinesComponent,
    LevelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
