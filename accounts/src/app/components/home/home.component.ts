import { Component } from '@angular/core';
// Update the import path to match the actual file location and name
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { AccountsTableComponent, AccountRow } from '../../shared/accounts-table/accounts-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, AccountsTableComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  rows: AccountRow[] = [
    {
      id: 1,
      title: '6S Skins (2000 VBUCKS) - PC/PSN/XBOX',
      game: 'Fortnite',
      accountId: '#182665',
      credentials: 'kubl_bong@outlook.com:clash.edy7222',
      status: 'Draft',
      views: 193,
      price: '€34,99',
      rating: '-',
      updated: '3 months ago'
    },
    {
      id: 2,
      title: '112 Skins - PC/PSN/XBOX · DRIFT - ARC',
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

  onChipClick(label: string) { /* deschizi dropdown-ul aferent */ }
  onViewClick() { /* toggle table/grid viitor */ }
    onImports() { /* open imports flow */ }
  onAddNew() { /* open create flow */ }

  onSearch(term: string) {
    // TODO: filtrează datele tabelului pe baza 'term'
    console.log('search:', term);
  }
  onRowMenu(row: AccountRow) {
  // aici vei deschide meniul contextual (⋯) pentru rândul selectat
  console.log('row menu:', row);
}

onSelectionChange(selected: AccountRow[]) {
  // primești lista elementelor bifate
  console.log('selected rows:', selected);
}

}

