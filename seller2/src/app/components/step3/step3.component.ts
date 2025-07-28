import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-step3',
  standalone: true,
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css'],
  imports: [NgIf, FormsModule]
})
export class Step3Component {
  @Output() prev = new EventEmitter<void>();

  idPreview: string | null = null;
  selfiePreview: string | null = null;
  agreed = false;

  onFileSelected(event: any, type: 'id' | 'selfie') {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        if (type === 'id') this.idPreview = reader.result as string;
        else this.selfiePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {
    alert("Documents submitted successfully.");
    // Aici poți trimite datele către backend
  }
}
