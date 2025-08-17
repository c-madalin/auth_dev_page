import { Component } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { AccountsTableComponent, AccountRow } from '../../shared/accounts-table/accounts-table.component';
import { FilterButtonComponent, FilterOption } from '../../shared/filter-button/filter-button.component';

type Status = 'Draft'|'Active'|'Sold'|'Hidden';
type Rating = 'Positive'|'Neutral'|'Negative'|'-';

interface AccountsFilters {
  search?: string;
  game?: string[];
  status?: Status[];
  rating?: Rating[];
  server?: string[];
  discounted?: boolean;
  date?: { from?: string; to?: string };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, AccountsTableComponent, FilterButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // --- opțiunile dropdown ---
  gameOptions: FilterOption[] = [
  { value: 'Fortnite' },
  { value: 'League of Legends' },
  { value: 'GTA V (GTA Online)' },
  { value: 'Minecraft (Java Edition)' },
  { value: 'Call of Duty: Warzone / Warzone Mobile' },
  { value: 'Valorant' },
  { value: 'Clash of Clans' },
  { value: 'Clash Royale' },
  { value: 'Brawl Stars' },
  { value: 'Genshin Impact' },
  { value: 'Call of Duty: Mobile' },
  { value: 'World of Warcraft (Retail si Classic)' },
  { value: 'Final Fantasy XIV' },
  { value: 'Diablo 4' },
  { value: 'Black Desert Online' },
  { value: 'Rainbow Six Siege' },
  { value: 'Apex Legends' },
  { value: 'PUBG' },
  { value: 'Rocket League' },
  { value: 'Roblox' },
  { value: 'Lost Ark' },
  { value: 'Old School RuneScape' },
  { value: 'RuneScape 3' },
  { value: 'Diablo Immortal' },
  { value: 'Summoners War' },
  { value: 'Path of Exile' },
  { value: 'Pokemon GO' },
  { value: 'Honkai: Star Rail' },
  { value: 'Destiny 2' },
  { value: 'Tibia' },
  { value: 'Lineage 2' },
  { value: 'EVE Online' },
  { value: 'Blade and Soul' },
  { value: 'Tower of Fantasy' },
  { value: 'V4' },
  { value: 'Lords Mobile' },
  { value: 'Marvel Snap' },
  { value: 'Ragnarok Origin' },
  { value: 'Monster Hunter: World' },
  { value: 'ArcheAge / ArcheAge Unchained' },
  { value: 'Red Dead Redemption 2 (cu Red Dead Online)' },
  { value: 'Diablo 3' },
  { value: 'Crowfall' },
  { value: 'Undawn' },
  { value: 'Swords of Legends Online' },
  { value: 'Marvel Rivals (beta 2025)' },
  { value: 'Enshrouded' },
  { value: 'Myth of Empires' },
  { value: 'Conan Exiles' },
  { value: 'Palia' },
  { value: 'Dark and Darker' },
  { value: 'XDefian' }
];


  statusOptions: FilterOption[] = [
    { value: 'Draft' }, { value: 'Active' }, { value: 'Sold' }, { value: 'Hidden' }
  ];

  ratingOptions: FilterOption[] = [
    { value: 'Positive' }, { value: 'Neutral' }, { value: 'Negative' }, { value: '-' , label: '—' }
  ];

  serverOptions: FilterOption[] = [
    { value: 'EU' }, { value: 'NA' }, { value: 'ASIA' }
  ];

  dateOptions: FilterOption[] = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: 'all', label: 'All time' }
  ];
  datePreset: string[] = [];

  // --- datele + filtrele (ca înainte) ---
  private allRows: AccountRow[] = [/* ... rândurile tale ... */];
  rows: AccountRow[] = [...this.allRows];
  filters: AccountsFilters = { search: '' };

  // search text
  onSearch(term: string) { this.filters.search = term; this.applyFilters(); }
  onViewClick() {}

  // dropdown handlers
  setFilter<K extends keyof AccountsFilters>(key: K, value: AccountsFilters[K]) {
    this.filters[key] = value;
    this.applyFilters();
  }

  onDatePresetChange(selected: string[]) {
    this.datePreset = selected;
    if (!selected.length || selected[0] === 'all') {
      delete this.filters.date;
      this.applyFilters();
      return;
    }
    const today = new Date();
    const from = new Date(today);
    if (selected[0] === '7d') from.setDate(today.getDate() - 7);
    if (selected[0] === '30d') from.setDate(today.getDate() - 30);
    const iso = (d: Date) => d.toISOString().slice(0,10);
    this.filters.date = { from: iso(from) };
    this.applyFilters();
  }

  onRowMenu(row: AccountRow) { console.log('row menu:', row); }
  onSelectionChange(rows: AccountRow[]) { console.log('selected:', rows); }

  // filtrarea (ca înainte)
  private applyFilters() {
    const f = this.filters;
    const term = (f.search ?? '').trim().toLowerCase();

    this.rows = this.allRows.filter((r: any) => {
      const matchesTerm =
        !term ||
        r.title.toLowerCase().includes(term) ||
        r.game.toLowerCase().includes(term) ||
        r.accountId.toLowerCase().includes(term) ||
        r.credentials.toLowerCase().includes(term);
      if (!matchesTerm) return false;

      if (f.game?.length && !f.game.includes(r.game)) return false;
      if (f.status?.length && !f.status.includes(r.status)) return false;
      if (f.rating?.length && !f.rating.includes(r.rating)) return false;
      if (f.server?.length && (!r.server || !f.server.includes(r.server))) return false;

      if (typeof f.discounted === 'boolean') {
        if (!!r.discounted !== f.discounted) return false;
      }

      if (f.date && (f.date.from || f.date.to)) {
        if (!r.updatedAt) return false;
        const d = new Date(r.updatedAt).getTime();
        if (f.date.from && d < new Date(f.date.from).getTime()) return false;
        if (f.date.to && d > new Date(f.date.to).getTime()) return false;
      }

      return true;
    });
  }
  // adaugă în clasa HomeComponent:
onStatusChange(values: string[]) {
  this.setFilter('status', values as Status[]);
}

onRatingChange(values: string[]) {
  this.setFilter('rating', values as Rating[]);
}

}
