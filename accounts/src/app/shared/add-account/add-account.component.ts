import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {
  /** Titlul din header-ul modalului */
  @Input() title = 'Select Game';
  /** Lista de jocuri (string-uri simple) */
  @Input() games: string[] = [];

  /** Emitere la alegerea jocului */
  @Output() pick = new EventEmitter<string>();
  /** Emitere la închidere (X / overlay / ESC) */
  @Output() close = new EventEmitter<void>();

  q = '';

  get filtered(): string[] {
    const t = this.q.trim().toLowerCase();
    return t ? this.games.filter(g => (g ?? '').toLowerCase().includes(t)) : this.games;
  }

  @HostListener('document:keydown', ['$event'])
  onKey(ev: KeyboardEvent) {
    if (ev.key === 'Escape') this.close.emit();
  }

  onPick(game: string) {
    this.pick.emit(game);
  }
}
