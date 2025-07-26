import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ AICI

@Component({
  selector: 'app-step2-contact-info',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Adaugă FormsModule
  templateUrl: './step2-contact-info.component.html',
  styleUrls: ['./step2-contact-info.component.css']
})
export class Step2ContactInfoComponent {
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  hasExperience = false;
  experienceText = '';
  files: File[] = [];

  handleFileInput(event: any) {
    const selected = Array.from(event.target.files).slice(0, 5);
    this.files = selected as File[];
  }
}
