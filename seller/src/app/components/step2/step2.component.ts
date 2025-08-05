import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})
export class Step2Component {
  @Output() validChange = new EventEmitter<boolean>();

  experienceType: string = '';
  stockSource: string = '';
  monthlyRevenue: string = '';
  experienceDescription: string = '';
  selectedFiles: File[] = [];
  links: string[] = [''];

  ngOnInit() {
    this.validChange.emit(false);
  }

  // Apelează când se schimbă oricare input relevant
  checkValidity() {
    if (this.experienceType === 'new') {
      this.validChange.emit(true);
    } else if (this.experienceType === 'experienced') {
      const isValid =
        this.stockSource &&
        this.monthlyRevenue &&
        this.experienceDescription.trim().length >= 10;

      this.validChange.emit(!!isValid);
    } else {
      this.validChange.emit(false);
    }
  }

  // Gestionare fișiere
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files).slice(0, 5); // max 5
    }
  }

  // Adăugare dinamică de câmpuri link
  checkLinks() {
    if (this.links.length < 3 && this.links[this.links.length - 1]) {
      this.links.push('');
    }
  }
}
