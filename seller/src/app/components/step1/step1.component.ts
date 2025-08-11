import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component {
  @Output() validChange = new EventEmitter<boolean>();

  selectedCategories: string[] = [];

  toggleCategory(value: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.selectedCategories.push(value);
    } else {
      this.selectedCategories = this.selectedCategories.filter(v => v !== value);
    }

    this.validChange.emit(this.selectedCategories.length > 0);
  }

  ngOnInit() {
    this.validChange.emit(false); // la început nu e valid
  }
}
