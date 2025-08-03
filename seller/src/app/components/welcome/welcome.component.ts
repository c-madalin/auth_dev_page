import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  standalone: true
})
export class WelcomeComponent {
navigateToForm() {
    this.router.navigate(['/seller-form']);
}
  constructor(private router: Router) {}

  goToForm() {
    this.router.navigate(['/seller-form']);
  }
}
