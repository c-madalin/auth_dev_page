// overlay.component.ts
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" (click)="close.emit()" role="dialog" aria-modal="true">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown', ['$event'])
  onKey(ev: KeyboardEvent) {
    if (ev.key === 'Escape') this.close.emit();
  }
}
