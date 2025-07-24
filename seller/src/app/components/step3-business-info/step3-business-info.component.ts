import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step3-business-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3-business-info.component.html',
  styleUrls: ['./step3-business-info.component.css']
})
export class Step3BusinessInfoComponent {
  @Output() prev = new EventEmitter<void>();
}
