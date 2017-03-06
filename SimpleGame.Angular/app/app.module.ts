import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameComponent } from './simpleGame/game/game.component';
import { BoardComponent } from './simpleGame/board/board.component';
import { SpaceComponent } from './simpleGame/space/space.component';
import { SignalRService } from './services/signalRService';
import { SimpleGameService } from './services/simpleGameService';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        GameComponent,
        BoardComponent,
        SpaceComponent
    ],
    providers: [
        SignalRService,
        SimpleGameService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}