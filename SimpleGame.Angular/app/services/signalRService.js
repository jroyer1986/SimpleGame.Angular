"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// import the packages  
var core_1 = require("@angular/core");
var app_constants_1 = require("../generic/app.constants");
var SignalRService = (function () {
    function SignalRService() {
        this.proxyName = 'gameHub';
        // Constructor initialization  
        this.connectionEstablished = new core_1.EventEmitter();
        this.updateReceived = new core_1.EventEmitter();
        this.connectionExists = false;
        // create hub connection  
        this.connection = $.hubConnection(app_constants_1.CONFIGURATION.baseUrls.server);
        // create new proxy as name already given in top  
        this.proxy = this.connection.createHubProxy(this.proxyName);
        // register on server events  
        this.registerOnServerEvents();
        // call the connecion start method to start the connection to send and receive events.  
        this.startConnection();
    }
    // check in the browser console for either signalr connected or not  
    SignalRService.prototype.startConnection = function () {
        var _this = this;
        this.connection.start({ withCredentials: false }).done(function (data) {
            console.log('Now connected ' + data.transport.name + ', connection ID = ' + data.id);
            _this.connectionEstablished.emit(true);
            _this.connectionExists = true;
        }).fail(function (error) {
            console.log('Could not connect ' + error);
            _this.connectionEstablished.emit(false);
        });
    };
    SignalRService.prototype.registerOnServerEvents = function () {
        var _this = this;
        debugger;
        this.proxy.on('update', function (data) {
            console.log('received in SignalRService: ' + JSON.stringify(data));
            _this.updateReceived.emit(data);
            console.log(data);
        });
    };
    // method to hit from client  
    SignalRService.prototype.play = function (playModel) {
        console.log('PLAY call sent to server...');
        // server side hub method using proxy.invoke with method name pass as param  
        this.proxy.invoke('play', playModel);
    };
    SignalRService.prototype.getGames = function () {
        console.log('GETGAMES call sent to server...');
        return this.proxy.invoke('getGames');
    };
    SignalRService.prototype.resetGame = function () {
        this.proxy.invoke('resetGame');
    };
    SignalRService.prototype.getGame = function (gameId) {
        return this.proxy.invoke('getGame', gameId);
    };
    SignalRService.prototype.leaveGame = function (gameId, playerId) {
        this.proxy.invoke('leaveGame', { gameId: gameId, playerId: playerId });
    };
    return SignalRService;
}());
SignalRService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SignalRService);
exports.SignalRService = SignalRService;
//# sourceMappingURL=signalRService.js.map