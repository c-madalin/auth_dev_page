import { Component } from '@angular/core';
import { Step5Component } from "../step5/step5.component";
import { Step6Component } from "../step6/step6.component";
import { Step4Component } from "../step4/step4.component";
import { Step3Component } from "../step3/step3.component";
import { Step2Component } from "../step2/step2.component";
import { Step1Component } from "../step1/step1.component";
import { NavigationButtonsComponent } from '../navigation-buttons/navigation-buttons.component';

import { NgSwitch, NgSwitchCase } from '@angular/common';


@Component({
  selector: 'app-seller-form',
  imports: [Step5Component, Step6Component, Step4Component, Step3Component, Step2Component, Step1Component, NgSwitch, NgSwitchCase, NavigationButtonsComponent],
  templateUrl: './seller-form.component.html',
  styleUrl: './seller-form.component.css'
})

export class SellerFormComponent {
  step = 1;
  currentStepValid = false;

  nextStep() {
    if (this.step < 6 && this.currentStepValid) {
      this.step++;
      this.currentStepValid = false; // reset la pasul următor
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
      this.currentStepValid = true; // presupunem valid dacă se merge înapoi
    }
  }

  // Validează în funcție de ce primește de la copil (ex: Step4Component)
  updateStepValid(valid: boolean) {
  this.currentStepValid = valid ?? true; // dacă e undefined, presupune true
  }
}
