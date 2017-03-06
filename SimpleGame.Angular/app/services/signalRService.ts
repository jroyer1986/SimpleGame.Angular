// import the packages  
import { Injectable, EventEmitter } from '@angular/core';
import { CONFIGURATION } from '../generic/app.constants';
import { Game } from '../shared/models/game';

declare var $: any;

@Injectable()
export class SignalRService {
    // Declare the variables  
    private proxy: any;
    private proxyName: string = 'gameHub';
    private connection: any;
    // create the Event Emitter  
    public connectionEstablished: EventEmitter<Boolean>;
    public updateReceived: EventEmitter<Game>;
    public connectionExists: Boolean;

    constructor() {
        // Constructor initialization  
        this.connectionEstablished = new EventEmitter<Boolean>();
        this.updateReceived = new EventEmitter <Game> ();  
        this.connectionExists = false;
        // create hub connection  
        this.connection = $.hubConnection(CONFIGURATION.baseUrls.server);
        // create new proxy as name already given in top  
        this.proxy = this.connection.createHubProxy(this.proxyName);
        // register on server events  
        this.registerOnServerEvents();
        // call the connecion start method to start the connection to send and receive events.  
        this.startConnection();
    }

    // check in the browser console for either signalr connected or not  
    private startConnection(): void {
        this.connection.start({ withCredentials: false }).done((data: any) => {
            console.log('Now connected ' + data.transport.name + ', connection ID = ' + data.id);
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error: any) => {
            console.log('Could not connect ' + error);
            this.connectionEstablished.emit(false);
        });
    }
    private registerOnServerEvents(): void {
        debugger;
        this.proxy.on('update', (data: Game) => {
            console.log('received in SignalRService: ' + JSON.stringify(data));
            this.updateReceived.emit(data);
            console.log(data);
        });
    }

    // method to hit from client  
    public play(playModel: any): void {
        console.log('PLAY call sent to server...');
        // server side hub method using proxy.invoke with method name pass as param  
        this.proxy.invoke('play', playModel);
    }

    public resetGame(): void {
        this.proxy.invoke('resetGame');
    }

    public getGame(gameId: string): Game {
        return this.proxy.invoke('getGame', gameId);
    }

    public leaveGame(gameId: string, playerId: string): void {
        this.proxy.invoke('leaveGame', { gameId: gameId, playerId: playerId });
    }
}