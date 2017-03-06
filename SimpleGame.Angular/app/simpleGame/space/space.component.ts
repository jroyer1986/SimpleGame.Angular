import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Space } from '../../shared/models/space';
import { User } from '../../shared/models/user';

@Component({
	selector: "space",
	template: `
		<div class="space" (click)="onSpaceClick($event)">
			[O]
		</div>
	`,
	styles: [`
		.space {
			border: 1px solid green;
			background: green;
			width: 60px;
			height: 60px;
			display: block;
			text-align: center;
			vertical-align: middle;
		}
	`]
})
export class SpaceComponent{
    @Output() spaceClickedEmitter = new EventEmitter();
    clickedSpace: Space = new Space();

    onSpaceClick($event: any) {
        if ($event !== null) {
            this.clickedSpace = { id: "Space1", state: "clicked", isAvailable: false, owner: new User() };
            this.spaceClickedEmitter.emit(this.clickedSpace);
        }
    }
}