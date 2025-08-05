import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-step4',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component {
  @Output() validChange = new EventEmitter<boolean>();

  years = Array.from({ length: 2025 - 1970 + 1 }, (_, i) => 1970 + i);
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  formData = {
    firstName: '',
    lastName: '',
    personalId: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    nationality: '',
    dobYear: '',
    dobMonth: '',
    dobDay: ''
  };

  onFormChange(form: NgForm) {
    this.validChange.emit(!!form.valid);
  }
}
