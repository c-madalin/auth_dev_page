import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export type Status =
  | 'In Progress'
  | 'Disputed'
  | 'Done'
  | 'Unlisted'
  | 'Listed'
  | 'Refounded'
  | 'Sold';

export type Rating = 'Positive' | 'Neutral' | 'Negative' | '-';

export interface AccountRow {
  title: string;
  game: string;
  accountId: string;        // ex. "#182665"
  credentials: string;      // text scurtat în celulă
  status: Status;
  views: number;
  price: string | number;   // ex. "€59,99"
  rating: Rating;
  updated: string;          // ex. "3 months ago"
  id?: string | number;     // opțional, pt. trackBy
  slug?: string;            // opțional: pt. public URL
}

type RowAction =
  | 'edit'
  | 'unlist'
  | 'delete'
  | 'promote'
  | 'quick-edit'
  | 'view'
  | 'copy-url'
  | 'delete-account';

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
  @Output() rowMenu = new EventEmitter<AccountRow>(); // îl poți păstra pentru compat.
  @Output() selectionChange = new EventEmitter<AccountRow[]>();
  @Output() rowAction = new EventEmitter<{ action: RowAction; row: AccountRow }>();

  /** selecție */
  selected = new Set<AccountRow>();

  /** meniu contextual per rând */
  openMenuFor: AccountRow | null = null;

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

  /** butoanele Edit/Unlist/Delete/Promote apar doar pentru Listed/Unlisted */
  isCasualVisible(r: AccountRow): boolean {
    return r.status === 'Listed' || r.status === 'Unlisted';
  }

  emit(action: RowAction, row: AccountRow) {
    this.rowAction.emit({ action, row });
    // închide meniul după acțiune (exceptând copy, dacă vrei)
    if (this.openMenuFor === row && action !== 'copy-url') {
      this.openMenuFor = null;
    }
  }

  toggleMenu(row: AccountRow, ev?: MouseEvent) {
    ev?.stopPropagation();
    this.openMenuFor = this.openMenuFor === row ? null : row;
  }

  @HostListener('document:click')
  closeMenuOnOutsideClick() {
    this.openMenuFor = null;
  }
}
