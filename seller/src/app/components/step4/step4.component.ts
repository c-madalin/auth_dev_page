import { Component } from '@angular/core';
import { NgFor} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-step4',
  imports: [ NgFor, FormsModule, CommonModule],
  standalone:true,
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component {
years = Array.from({ length: 2025 - 1970 + 1 }, (_, i) => 1970 + i);

}
