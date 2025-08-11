import { Component } from '@angular/core';
import { Step1Component } from '../step1/step1.component';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { Step3Component } from '../step3/step3.component';
import { Step2Component } from '../step2/step2.component';

@Component({
  selector: 'app-seller-form',
  imports: [NgSwitch, NgSwitchCase,Step1Component, Step2Component, Step3Component],
  standalone: true,
  templateUrl: './seller-form.component.html',
  styleUrls: ['./seller-form.component.css']
})
export class SellerFormComponent {
  step = 1;

  nextStep() {
    if (this.step < 3) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

}
