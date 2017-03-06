import { Injectable } from '@angular/core';
import { Game } from '../shared/models/game';
import { User } from '../shared/models/user';
import { Board } from '../shared/models/board';
import { Space } from '../shared/models/space';
import { FakeGameData } from '../shared/fakeGameData';
import { SignalRService } from './signalRService';

@Injectable()
export class SimpleGameService {

    constructor (private _signalRService: SignalRService) {

    }

    public getGame(gameId: string): Game {
        //hit signalRService to request game
        let jsonGame = FakeGameData.testGame;
        return jsonGame;
    }

    public getGames(): void {
        
    }

    public resetGame(): Game {
        console.log('API resetGame called');
        return null;
    }

    public createPlayer(playerName: string): void {
        console.log('API createPlayer called');
        return null;
    }

    public createGame(createGameModel: any): string {
        return FakeGameData.testGame.id;
    }

    public joinGame(user: User, game: Game): void {
        console.log('API joinGame called by ' + user.name + ' for game ' + game.id);
        return null;
    }

    public play(playModel: any): void {
        this._signalRService.play(playModel);
    }

    public leave(gameId: string, playerId: string): void {
      //  this._signalRService.leaveGame(gameId, playerId);
    }
}