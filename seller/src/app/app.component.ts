import { Component } from '@angular/core';
import { SellerFormComponent } from "./components/seller-form/seller-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SellerFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seller';
}
