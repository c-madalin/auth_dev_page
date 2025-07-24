import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step2-contact-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step2-contact-info.component.html',
  styleUrls: ['./step2-contact-info.component.css']
})
export class Step2ContactInfoComponent {
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();
}
