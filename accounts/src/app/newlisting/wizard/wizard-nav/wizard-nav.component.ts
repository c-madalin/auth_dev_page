import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wizard-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wizard-nav.component.html',
  styleUrls: ['./wizard-nav.component.css']
})
export class WizardNavComponent {
  @Input() step!: number;
  @Input() maxStep = 5;
  @Input() isNextEnabled = true;

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  onNext() { this.next.emit(); }
  onPrev() { this.prev.emit(); }
}
