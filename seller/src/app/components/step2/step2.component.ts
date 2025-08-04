import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Asta trebuie!
import { CommonModule } from '@angular/common'; // dacă mai folosești *ngIf, *ngFor

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Adaugă FormsModule aici
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component {
  experienceType: 'new' | 'experienced' | null = null;
  stockSource = '';
  monthlyRevenue = '';
  experienceDescription = '';
  links: string[] = [''];



  checkLinks() {
    if (this.links.length < 3 && this.links[this.links.length - 1]) {
      this.links.push('');
    }
  }


  selectedFiles: File[] = [];

onFileSelected(event: any) {
  const files = Array.from(event.target.files) as File[];
  this.selectedFiles = files.slice(0, 5); // limităm la 5
}

}
