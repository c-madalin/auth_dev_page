import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Step1PersonalInfoComponent } from './components/step1-personal-info/step1-personal-info.component';
import { Step2ContactInfoComponent } from './components/step2-contact-info/step2-contact-info.component';
import { Step3BusinessInfoComponent } from './components/step3-business-info/step3-business-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Step1PersonalInfoComponent,
    Step2ContactInfoComponent,
    Step3BusinessInfoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  step = 1;

  nextStep() {
    if (this.step < 3) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }
}
