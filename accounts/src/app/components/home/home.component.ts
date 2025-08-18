import { Component } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { AccountsTableComponent, AccountRow } from '../../shared/accounts-table/accounts-table.component';
import { FilterButtonComponent, FilterOption } from '../../shared/filter-button/filter-button.component';

type Status =
  | 'In Progress'
  | 'Disputed'
  | 'Done'
  | 'Unlisted'
  | 'Listed'
  | 'Refounded';

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
    { value: 'In Progress' },
    { value: 'Disputed' },
    { value: 'Done' },
    { value: 'Unlisted' },
    { value: 'Listed' },
    { value: 'Refounded' }
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
  private allRows: (AccountRow & { updatedAt?: string; server?: string; discounted?: boolean })[] = [
    { id: 1,  title: 'Starter Bundle — 8 Skins',               game: 'Fortnite',                       accountId: '#100231', credentials: 'starter@demo.com:pass',        status: 'Listed',      views: 312, price: '€24.99', rating: 'Positive', updated: '2 days ago',    updatedAt: '2025-08-16', server: 'EU',  discounted: true  },
    { id: 2,  title: 'Gold IV Midlane Main',                    game: 'League of Legends',              accountId: '#100232', credentials: 'lol.gold@demo.com:pass',        status: 'Refounded',   views: 88,  price: '€29.00', rating: 'Neutral',  updated: '1 week ago',   updatedAt: '2025-08-10', server: 'EU'                       },
    { id: 3,  title: 'Heist Ready — 50M Cash',                  game: 'GTA V (GTA Online)',             accountId: '#100233', credentials: 'gta.heist@demo.com:pass',       status: 'Disputed',    views: 145, price: '€39.99', rating: 'Positive', updated: '3 days ago',    updatedAt: '2025-08-15', server: 'NA',  discounted: false },
    { id: 4,  title: 'Survival Realm • Elytra',                 game: 'Minecraft (Java Edition)',       accountId: '#100234', credentials: 'mc.survival@demo.com:pass',     status: 'Unlisted',    views: 12,  price: '€12.00', rating: '-',        updated: '2 months ago', updatedAt: '2025-06-12', server: 'EU'                       },
    { id: 5,  title: 'Ranked Pack • M4 & ISO',                  game: 'Call of Duty: Warzone / Warzone Mobile', accountId: '#100235', credentials: 'wz.ranked@demo.com:pass', status: 'Done',         views: 201, price: '€49.90', rating: 'Positive', updated: '5 days ago',    updatedAt: '2025-08-13', server: 'NA'                       },
    { id: 6,  title: 'Immortal 1 • Prime Ready',                game: 'Valorant',                       accountId: '#100236', credentials: 'val.imm1@demo.com:pass',        status: 'In Progress', views: 0,   price: '€59.99', rating: 'Positive', updated: '1 month ago',  updatedAt: '2025-07-12', server: 'EU',  discounted: true  },
    { id: 7,  title: 'TH12 • Max Walls • Clan 10',              game: 'Clash of Clans',                 accountId: '#100237', credentials: 'coc.th12@demo.com:pass',        status: 'Listed',      views: 73,  price: '€34.50', rating: 'Neutral',  updated: '3 weeks ago',  updatedAt: '2025-07-28', server: 'ASIA'                     },
    { id: 8,  title: 'AR45 • Diluc + Jean',                     game: 'Genshin Impact',                 accountId: '#100238', credentials: 'gi.ar45@demo.com:pass',         status: 'Refounded',   views: 54,  price: '€27.00', rating: '-',        updated: '4 days ago',   updatedAt: '2025-08-14', server: 'EU'                       },
    { id: 9,  title: 'Retail • ilvl 486 • M+',                  game: 'World of Warcraft (Retail si Classic)', accountId: '#100239', credentials: 'wow.retail@demo.com:pass', status: 'Disputed',    views: 166, price: '€79.00', rating: 'Positive', updated: '2 weeks ago',  updatedAt: '2025-08-03', server: 'EU'                       },
    { id:10,  title: 'FFXIV • Endwalker Unlocked',              game: 'Final Fantasy XIV',              accountId: '#100240', credentials: 'ffxiv.ew@demo.com:pass',        status: 'Unlisted',    views: 8,   price: '€42.00', rating: 'Neutral',  updated: '2 months ago', updatedAt: '2025-06-18', server: 'NA'                       },
    { id:11,  title: 'Season 4 • WT4 • Barb 80',                game: 'Diablo 4',                       accountId: '#100241', credentials: 'd4.barbarian@demo.com:pass',    status: 'Done',         views: 121, price: '€44.99', rating: 'Positive', updated: '6 days ago',   updatedAt: '2025-08-12', server: 'EU',  discounted: true  },
    { id:12,  title: 'Premier Ready • 6k Hours',                 game: 'CS2',                            accountId: '#100242', credentials: 'cs2.premier@demo.com:pass',     status: 'In Progress', views: 199, price: '€55.00', rating: 'Positive', updated: '3 days ago',    updatedAt: '2025-08-15', server: 'EU'                       },
    { id:13,  title: 'Predator Badge (S17)',                     game: 'Apex Legends',                   accountId: '#100243', credentials: 'apex.pred@demo.com:pass',       status: 'Listed',      views: 0,   price: '€89.00', rating: 'Positive', updated: '1 month ago',  updatedAt: '2025-07-09', server: 'NA'                       },
    { id:14,  title: 'Survivor Mastery 500 • Skins',            game: 'PUBG',                           accountId: '#100244', credentials: 'pubg.m500@demo.com:pass',       status: 'Refounded',   views: 64,  price: '€23.99', rating: 'Neutral',  updated: '9 days ago',   updatedAt: '2025-08-09', server: 'ASIA'                     },
    { id:15,  title: 'Fennec + Octane • GC',                    game: 'Rocket League',                   accountId: '#100245', credentials: 'rl.gc@demo.com:pass',           status: 'Disputed',    views: 25,  price: '€31.00', rating: '-',        updated: '3 weeks ago',  updatedAt: '2025-07-29', server: 'EU'                       },
    { id:16,  title: 'Dev Mode • 3M Visits',                    game: 'Roblox',                         accountId: '#100246', credentials: 'rb.dev@demo.com:pass',          status: 'Done',         views: 410, price: '€19.99', rating: 'Positive', updated: 'yesterday',     updatedAt: '2025-08-17'                                  },
    { id:17,  title: 'Tier 3 • Argos Clear',                    game: 'Lost Ark',                       accountId: '#100247', credentials: 'la.t3@demo.com:pass',           status: 'Unlisted',    views: 77,  price: '€28.00', rating: 'Neutral',  updated: '10 days ago',  updatedAt: '2025-08-08', server: 'EU'                       },
    { id:18,  title: 'Lightfall • 1810 Power',                   game: 'Destiny 2',                      accountId: '#100248', credentials: 'd2.1810@demo.com:pass',         status: 'Listed',      views: 5,   price: '€26.50', rating: '-',        updated: '2 months ago', updatedAt: '2025-06-20', server: 'NA'                       }
  ];
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
