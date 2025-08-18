import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccountRow {
  title: string;
  game: string;
  accountId: string;        // ex. "#182665"
  credentials: string;      // text scurtat în celulă
  status: 'In Progress'|'Disputed'|'Done'|'Unlisted'|'Listed'|'Refounded';
  views: number;
  price: string | number;   // ex. "€59,99"
  rating: 'Positive'|'Neutral'|'Negative'|'-';
  updated: string;          // ex. "3 months ago"
  id?: string | number;     // opțional, pt. trackBy
}

@Component({
  selector: 'app-accounts-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.css']
})
export class AccountsTableComponent {
  @Input() rows: AccountRow[] = [];
  @Input() loading = false;

  /** evenimente utile */
  @Output() rowMenu = new EventEmitter<AccountRow>();
  @Output() selectionChange = new EventEmitter<AccountRow[]>();

  /** selecție */
  selected = new Set<AccountRow>();

  get allChecked(): boolean {
    return this.rows.length > 0 && this.selected.size === this.rows.length;
  }
  get anyChecked(): boolean {
    return this.selected.size > 0 && this.selected.size < this.rows.length;
  }

  toggleAll(checked: boolean) {
    this.selected.clear();
    if (checked) this.rows.forEach(r => this.selected.add(r));
    this.selectionChange.emit([...this.selected]);
  }

  toggleRow(row: AccountRow, checked: boolean) {
    checked ? this.selected.add(row) : this.selected.delete(row);
    this.selectionChange.emit([...this.selected]);
  }

  trackById = (_: number, r: AccountRow) => r.id ?? r.accountId ?? r.title;
}
