import { Component } from '@angular/core';
import { BackgroundMainComponent } from '../../background/background-main/background-main.component';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-container',
  imports: [BackgroundMainComponent, HomeComponent],
  standalone: true,
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

}
