import { Component, NgZone, AfterViewInit } from '@angular/core';
import { Game } from './shared/models/game';
import { User } from './shared/models/user';
import { SignalRService } from './services/signalRService';
import { SimpleGameService } from './services/simpleGameService';

@Component({
  selector: 'my-app',
  template: `
    <div class="jumbotron">
        <h1>Welcome to Our App!</h1>
        <div *ngIf=game>
            <game [game]="game" (spaceClickedEmitter)="onSpaceClick($event)"></game>
        </div>
    </div>
  `,
  styles: [`
    .jumbotron { box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2); }
  `]
})

export class AppComponent {
    public currentMessage: Game;
    public allMessages: Game;
    public canSendMessage: Boolean; 

    public game: Game;
    public listOfGames: Game[];
    public user: User;

    constructor(private _signalRService: SignalRService, private _ngZone: NgZone, private _simpleGameService: SimpleGameService) {
        // this can subscribe for events  
        this.subscribeToEvents();
        // this can check for conenction exist or not.  
        this.canSendMessage = _signalRService.connectionExists;
    }

    private subscribeToEvents(): void {
        // if connection exists it can call of method.  
        this._signalRService.connectionEstablished.subscribe(() => {
            this.canSendMessage = true;
        });
        // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
        this._signalRService.updateReceived.subscribe((message: Game) => {
            console.log('update received');
            console.log(message);
            this._ngZone.run(() => {
                this.allMessages = message;
            });
        });
    }

    ngOnInit() {
        //create fake user unitl we implement a login/user service
        this.user = new User();
        this.user.id = "USERID1";
        this.user.name = "Justin";
        this.user.isActive = false;

        let gameId = this._simpleGameService.createGame({ user: this.user });
        if (gameId) {
            this.game = this._simpleGameService.getGame(gameId);
        }
        else {
            console.log("Game ID was empty");
        }
    }

    onSpaceClick(space: any): void {
        let playModel: any = {
            spaceId: space.id,
            playerId: this.user.id,
            gameId: this.game.id
        }
        this._simpleGameService.play(playModel);
    }
}