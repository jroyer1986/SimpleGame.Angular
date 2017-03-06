import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../../shared/models/board';
import { Space } from '../../shared/models/space';

@Component({
	selector: 'board',
	template: `
		<div class="board">
			<h2>BOARD CONTAINER</h2>
			<space (spaceClickedEmitter)="onSpaceClick($event)"></space>
            <space (spaceClickedEmitter)="onSpaceClick($event)"></space>
		</div>
	`,
	styles: [`
		.board {
			border: 2px solid red;
		}
		h2 {
			color: red;
		}
	`]
})
export class BoardComponent {
	@Output() spaceClickedEmitter = new EventEmitter();

	onSpaceClick(space: Space) {
		//push the clicked space up to parent component
		this.spaceClickedEmitter.emit(space)
	}
} 