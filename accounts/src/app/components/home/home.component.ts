import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // date statice doar pentru UI
  rows = [
    {
      title: '65 Skins (2000 VBUCKS) • PC/PSN/XBOX',
      game: 'Fortnite',
      accountId: '#182665',
      credentials: 'kubl_bong@outlook.com:clash.edy7222',
      status: 'Draft',
      views: 193,
      price: '€34,99',
      rating: '—',
      updated: '3 months ago'
    },
    {
      title: '112 Skins • PC/PSN/XBOX • DRIFT • ARC',
      game: 'Fortnite',
      accountId: '#951132',
      credentials: 'ElizabethNan...@outlook.com:clash.edy7222',
      status: 'Sold',
      views: 0,
      price: '€59,99',
      rating: 'Positive',
      updated: '4 months ago'
    }
  ];
}
