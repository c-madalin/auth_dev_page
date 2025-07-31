import { Component } from '@angular/core';
import { ContainerComponent } from './components/container/container.component';

@Component({
  selector: 'app-root',
  imports: [ContainerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seller';
}
