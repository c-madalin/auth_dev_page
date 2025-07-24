import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step1-personal-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step1-personal-info.component.html',
  styleUrls: ['./step1-personal-info.component.css']
})
export class Step1PersonalInfoComponent {
  @Output() next = new EventEmitter<void>();
}
