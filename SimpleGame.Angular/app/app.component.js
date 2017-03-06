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
var user_1 = require("./shared/models/user");
var signalRService_1 = require("./services/signalRService");
var simpleGameService_1 = require("./services/simpleGameService");
var AppComponent = (function () {
    function AppComponent(_signalRService, _ngZone, _simpleGameService) {
        this._signalRService = _signalRService;
        this._ngZone = _ngZone;
        this._simpleGameService = _simpleGameService;
        // this can subscribe for events  
        this.subscribeToEvents();
        // this can check for conenction exist or not.  
        this.canSendMessage = _signalRService.connectionExists;
    }
    AppComponent.prototype.subscribeToEvents = function () {
        var _this = this;
        // if connection exists it can call of method.  
        this._signalRService.connectionEstablished.subscribe(function () {
            _this.canSendMessage = true;
        });
        // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
        this._signalRService.updateReceived.subscribe(function (message) {
            console.log('update received');
            console.log(message);
            _this._ngZone.run(function () {
                _this.allMessages = message;
            });
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        //create fake user unitl we implement a login/user service
        this.user = new user_1.User();
        this.user.id = "USERID1";
        this.user.name = "Justin";
        this.user.isActive = false;
        var gameId = this._simpleGameService.createGame({ user: this.user });
        if (gameId) {
            this.game = this._simpleGameService.getGame(gameId);
        }
        else {
            console.log("Game ID was empty");
        }
    };
    AppComponent.prototype.onSpaceClick = function (space) {
        var playModel = {
            spaceId: space.id,
            playerId: this.user.id,
            gameId: this.game.id
        };
        this._simpleGameService.play(playModel);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n    <div class=\"jumbotron\">\n        <h1>Welcome to Our App!</h1>\n        <div *ngIf=game>\n            <game [game]=\"game\" (spaceClickedEmitter)=\"onSpaceClick($event)\"></game>\n        </div>\n    </div>\n  ",
        styles: ["\n    .jumbotron { box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2); }\n  "]
    }),
    __metadata("design:paramtypes", [signalRService_1.SignalRService, core_1.NgZone, simpleGameService_1.SimpleGameService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map