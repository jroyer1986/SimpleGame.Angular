import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Board } from '../../shared/models/board';
import { User } from '../../shared/models/user';
import { Game } from '../../shared/models/game';
import { Space } from '../../shared/models/space';

@Component({
	selector: "game",
	template: `
		<div class="game">
			<h1>GAME CONTAINER</h1>
			<board (spaceClickedEmitter)="onSpaceClick($event)"></board>
		</div>
	`,
	styles: [`
		.game {
			border: 3px solid blue;
		}
		h1 {
			color: blue;
		}
	`]
})
export class GameComponent {
	@Input() game: Game;
	@Output() spaceClickedEmitter = new EventEmitter();

	board: Board;
	listOfUsers: User[];
	state: string;
	output: string;

	setActivePlayer() {
		
	}

	ngOnInit() {
		console.log("gameboard initializing...");
		this.board = this.game.board;
		this.listOfUsers = this.game.listOfPlayers;
		this.state = this.game.state;
		this.output = this.game.output;

	}

	onSpaceClick(spaceClicked: Space) {
        if (spaceClicked !== null) {
            this.spaceClickedEmitter.emit(spaceClicked);	
		}
	}
}