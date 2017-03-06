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
var core_1 = require("@angular/core");
var fakeGameData_1 = require("../shared/fakeGameData");
var signalRService_1 = require("./signalRService");
var SimpleGameService = (function () {
    function SimpleGameService(_signalRService) {
        this._signalRService = _signalRService;
    }
    SimpleGameService.prototype.getGame = function (gameId) {
        //hit signalRService to request game
        var jsonGame = fakeGameData_1.FakeGameData.testGame;
        return jsonGame;
    };
    SimpleGameService.prototype.getGames = function () {
        // return this._signalRService.getGames();
    };
    SimpleGameService.prototype.resetGame = function () {
        console.log('API resetGame called');
        return null;
    };
    SimpleGameService.prototype.createPlayer = function (playerName) {
        console.log('API createPlayer called');
        return null;
    };
    SimpleGameService.prototype.createGame = function (createGameModel) {
        return fakeGameData_1.FakeGameData.testGame.id;
    };
    SimpleGameService.prototype.joinGame = function (user, game) {
        console.log('API joinGame called by ' + user.name + ' for game ' + game.id);
        return null;
    };
    SimpleGameService.prototype.play = function (playModel) {
        this._signalRService.play(playModel);
    };
    SimpleGameService.prototype.leave = function (gameId, playerId) {
        //  this._signalRService.leaveGame(gameId, playerId);
    };
    return SimpleGameService;
}());
SimpleGameService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [signalRService_1.SignalRService])
], SimpleGameService);
exports.SimpleGameService = SimpleGameService;
//# sourceMappingURL=simpleGameService.js.map