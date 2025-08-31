import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewListingWizardComponent } from '../wizard/new-listing-wizard/new-listing-wizard.component';

@Component({
  selector: 'app-new-listing',
  standalone: true,
  imports: [CommonModule, NewListingWizardComponent],
  template: `
    <div class="overlay" (click)="close.emit()">
      <div class="panel" (click)="$event.stopPropagation()">
        <app-new-listing-wizard
          [games]="games"
          (cancel)="close.emit()"
          (submit)="submitted.emit($event)">
        </app-new-listing-wizard>
      </div>
    </div>
  `,
  styleUrls: ['./new-listing-overlay.component.css']
})
export class NewListingOverlayComponent {
  @Input() games: string[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>(); // fără interfață
}
