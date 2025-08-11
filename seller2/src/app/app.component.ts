import { Component } from '@angular/core';
import { SellerFormComponent } from './components/seller-form/seller-form.component';
import { StarsBackgroundComponent } from './background/stars-background/stars-background.component';

@Component({
  selector: 'app-root',
  imports: [SellerFormComponent, StarsBackgroundComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seller2';
}
