import { Component } from '@angular/core';
import { StarsComponent } from '../../background/stars/stars.component';
import { SellerFormComponent } from '../seller-form/seller-form.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [StarsComponent, SellerFormComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {

}
