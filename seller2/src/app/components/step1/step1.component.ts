import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [],
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component {
  @Output() next = new EventEmitter<void>();

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
}
