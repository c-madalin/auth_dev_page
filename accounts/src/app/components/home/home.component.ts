import { Component } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  onImports() { /* open imports flow */ }
  onAddNew() { /* open create flow */ }

  onSearch(term: string) {
    // TODO: filtrează datele tabelului pe baza 'term'
    console.log('search:', term);
  }

  onChipClick(label: string) {
    // TODO: va deschide dropdown-ul dedicat pentru chip-ul respectiv
    console.log('chip:', label);
  }

  onViewClick() {
    // TODO: schimbare mod afisare (table/grid)
    console.log('view clicked');
  }
}
