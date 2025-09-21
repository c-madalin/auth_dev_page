// add-account-panel.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-account-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-account-panel.component.html',
  styleUrls: ['./add-account-panel.component.css']
})
export class AddAccountPanelComponent {
  @Input() title = 'Select Game';
  @Input() games: string[] = [];
  @Output() pick = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  q = '';

  get filtered(): string[] {
    const t = this.q.trim().toLowerCase();
    return t ? this.games.filter(g => (g ?? '').toLowerCase().includes(t)) : this.games;
  }

  onPick(game: string) {
    this.pick.emit(game);
  }
}
