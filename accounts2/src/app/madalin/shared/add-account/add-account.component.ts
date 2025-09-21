// add-account.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayComponent } from '../../background/overlay/overlay.component';
import { AddAccountPanelComponent } from '../add-account-panel/add-account-panel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [CommonModule, OverlayComponent, AddAccountPanelComponent],
  template: `
    <app-overlay (close)="close.emit()">
      <app-add-account-panel
        [title]="title"
        [games]="games"
        (pick)="pick.emit($event)"
        (close)="close.emit()">
      </app-add-account-panel>
    </app-overlay>
  `
})
export class AddAccountComponent {
  @Input() title = 'Select Game';
  @Input() games: string[] = [];
  @Output() pick = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();
}
