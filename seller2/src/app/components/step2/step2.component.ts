import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-step2',
  imports: [],
  standalone: true,
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component {
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

}
