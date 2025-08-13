import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Input() chips: string[] = [];
  @Output() searchChange = new EventEmitter<string>();
  @Output() chipClick = new EventEmitter<string>();
  @Output() viewClick = new EventEmitter<void>();

  term = '';

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  onKey(term: string) {
    this.term = term;
    this.searchChange.emit(term);
  }

  focusWithSlash(e: KeyboardEvent) {
    // dacă utilizatorul apasă "/" și NU e în input, focus pe input
    if (e.key === '/' && (e.target as HTMLElement)?.tagName !== 'INPUT') {
      e.preventDefault();
      this.searchInput?.nativeElement.focus();
    }
  }
}
