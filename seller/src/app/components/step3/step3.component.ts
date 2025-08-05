import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css'
})
export class Step3Component {
  @Output() validChange = new EventEmitter<boolean>();

  email: string = '';
  discord: string = '';
  telegram?: string;
  phone?: string;

  ngOnInit() {
    this.validChange.emit(false);
  }

  validateForm() {
    const isValid = this.email.trim().length > 0 && this.discord.trim().length > 0;
    this.validChange.emit(isValid);
  }
}
