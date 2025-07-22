import { Component } from '@angular/core';
import { Page1Component } from "./components/page-1/page-1.component";

@Component({
  selector: 'app-root',
  imports: [ Page1Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'auth_page';
}
