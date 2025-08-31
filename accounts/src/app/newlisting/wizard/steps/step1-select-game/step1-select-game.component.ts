import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nl-step1-select-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step1-select-game.component.html',
  styleUrls: ['./step1-select-game.component.css']
})
export class Step1SelectGameComponent {
  @Input() games: string[] = [];
  @Input() selected: string | null = null;

  @Output() select = new EventEmitter<string>();
  @Output() validChange = new EventEmitter<boolean>();

  q = '';

  get filtered(): string[] {
    const t = this.q.trim().toLowerCase();
    return t
      ? this.games.filter(g => (g ?? '').toLowerCase().includes(t))
      : this.games;
  }

  choose(g: string) {
    this.selected = g;
    this.select.emit(g);
    this.validChange.emit(true);
  }
}
