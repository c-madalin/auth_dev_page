import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Asta trebuie!
import { CommonModule } from '@angular/common'; // dacă mai folosești *ngIf, *ngFor
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  imports: [CommonModule, FormsModule], // ✅ Adaugă FormsModule și NgModel aici
  styleUrls: ['./step5.component.css'],
  standalone: true
})
export class Step5Component {
  verificationType = '';
  selectedFiles: { front?: File; back?: File } = {};

  onFileSelected(event: any, side: 'front' | 'back') {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[side] = file;
    }
  }

}
