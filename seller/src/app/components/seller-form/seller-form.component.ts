import { Component } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { Step1PersonalInfoComponent } from "../step1-personal-info/step1-personal-info.component";
import { Step2ContactInfoComponent } from "../step2-contact-info/step2-contact-info.component";
import { Step3BusinessInfoComponent } from "../step3-business-info/step3-business-info.component";


@Component({
  selector: 'app-seller-form',
  imports: [NgSwitch, NgSwitchCase, Step1PersonalInfoComponent, Step2ContactInfoComponent, Step3BusinessInfoComponent],
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
