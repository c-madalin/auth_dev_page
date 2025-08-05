import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./step5.component.css'],
  standalone: true
})
export class Step5Component {
  @Output() validChange = new EventEmitter<boolean>();

  verificationType: string = '';
  selectedFiles: { front?: File; back?: File; selfie?: File } = {};
  agreed = false;

  ngOnInit() {
    this.validChange.emit(false); // inițial invalid
  }

  checkValidity() {
    const isValid =
      this.verificationType &&
      !!this.selectedFiles.front &&
      !!this.selectedFiles.back &&
      !!this.selectedFiles.selfie &&
      this.agreed;

    this.validChange.emit(!!isValid);
  }

  onFileSelected(event: any, side: 'front' | 'back' | 'selfie') {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[side] = file;
      this.checkValidity();
    }
  }
}
