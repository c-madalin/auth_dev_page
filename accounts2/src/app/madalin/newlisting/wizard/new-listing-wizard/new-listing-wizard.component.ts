import { CommonModule, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Step1SelectGameComponent } from '../steps/step1-select-game/step1-select-game.component';
import { Step2BasicsComponent } from '../steps/step2-basics/step2-basics.component';
import { Step3DescriptionGalleryComponent } from '../steps/step3-description-gallery/step3-description-gallery.component';
import { Step4DetailsTypeComponent } from '../steps/step4-details-type/step4-details-type.component';
import { Step5DeliveryPromoComponent } from '../steps/step5-delivery-promo/step5-delivery-promo.component';
import { WizardNavComponent } from '../wizard-nav/wizard-nav.component';

@Component({
  selector: 'app-new-listing-wizard',
  standalone: true,
  imports: [
    CommonModule, NgSwitch, NgSwitchCase,
    WizardNavComponent,
    Step1SelectGameComponent, Step2BasicsComponent,
     Step4DetailsTypeComponent,
    Step5DeliveryPromoComponent
  ],
  templateUrl: './new-listing-wizard.component.html',
  styleUrls: ['./new-listing-wizard.component.css']
})
export class NewListingWizardComponent {
  @Input() games: string[] = [];
  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>(); // fără interfață

  step = 1;
  maxStep = 4;
  currentStepValid = false;

  // obiect simplu pentru colectarea datelor (doar pentru UI)
  data: any = {
    game: null, title: '', slug: '', price: null, currency: 'EUR',
    description: '', gallery: [], details: {}, type: '',
    deliveryInstructions: '', promotionPlan: undefined
  };

  private validate(): boolean {
    switch (this.step) {
      case 1: return !!this.data.game;
      case 2: return !!(this.data.title && this.data.slug && (this.data.price ?? 0) > 0 && this.data.game);
      case 3: return !!this.data.type;
      case 4: return !!this.data.promotionPlan;
      default: return false;
    }
  }

  setValid(v: boolean) { this.currentStepValid = v; }
  next() {
    if (!this.validate()) return;
    if (this.step === this.maxStep) { this.submit.emit(this.data); return; }
    this.step++; this.currentStepValid = this.validate();
  }
  prev() { if (this.step > 1) { this.step--; this.currentStepValid = this.validate(); } }

  // handlers simple (fără tipuri)
  onGamePicked(game: string) { this.data.game = game; this.setValid(!!game); }
  onBasicsChange(partial: any) { Object.assign(this.data, partial); this.setValid(this.validate()); }
  onDescChange(partial: any) { Object.assign(this.data, partial); this.setValid(this.validate()); }
  onDetailsChange(partial: any) { Object.assign(this.data, partial); this.setValid(this.validate()); }
  onDeliveryChange(partial: any) { Object.assign(this.data, partial); this.setValid(this.validate()); }
}
