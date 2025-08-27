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
  accountId: string;
  credentials: string;
  status: Status;
  views: number;
  price: string | number;
  rating: Rating;
  updated: string;
  id?: string | number;
  slug?: string;
  imageUrl?: string;  // tip corect
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

  @Output() rowMenu = new EventEmitter<AccountRow>();
  @Output() selectionChange = new EventEmitter<AccountRow[]>();
  @Output() rowAction = new EventEmitter<{ action: RowAction; row: AccountRow }>();

  selected = new Set<AccountRow>();
  openMenuFor: AccountRow | null = null;

  /** rând pentru care se afișează imaginea */
  imageVisibleFor: AccountRow | null = null;

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

  isCasualVisible(r: AccountRow): boolean {
    return r.status === 'Listed' || r.status === 'Unlisted';
  }

  emit(action: RowAction, row: AccountRow) {
    this.rowAction.emit({ action, row });
    if (this.openMenuFor === row && action !== 'copy-url') {
      this.openMenuFor = null;
    }
  }

  toggleMenu(row: AccountRow, ev?: MouseEvent) {
    ev?.stopPropagation();
    this.openMenuFor = this.openMenuFor === row ? null : row;
  }

  /** toggle pentru afișarea imaginii */
  toggleImage(row: AccountRow) {
    this.imageVisibleFor = this.imageVisibleFor === row ? null : row;
  }

  @HostListener('document:click')
  closeMenuOnOutsideClick() {
    this.openMenuFor = null;
  }
}
