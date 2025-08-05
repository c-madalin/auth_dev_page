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
  selectedFiles: { front?: File; back?: File } = {};

  ngOnInit() {
    this.validChange.emit(false); // inițial invalid
  }

  // Se apelează când se selectează fișiere sau tipul
  checkValidity() {
    const isValid =
      this.verificationType &&
      !!this.selectedFiles.front &&
      !!this.selectedFiles.back;

    this.validChange.emit(!!isValid);
  }

  onFileSelected(event: any, side: 'front' | 'back') {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[side] = file;
      this.checkValidity();
    }
  }
}
