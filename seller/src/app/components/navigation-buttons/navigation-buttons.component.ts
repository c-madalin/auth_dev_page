import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation-buttons',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navigation-buttons.component.html',
  styleUrl: './navigation-buttons.component.css'
})
export class NavigationButtonsComponent {
  @Input() step!: number;
  @Input() maxStep = 6;
  @Input() isNextEnabled = true;

  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  goNext() {
    this.next.emit();
  }

  goPrev() {
    this.prev.emit();
  }
}

