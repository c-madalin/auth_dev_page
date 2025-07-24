import { Component } from '@angular/core';
import { Step1PersonalInfoComponent } from './components/step1-personal-info/step1-personal-info.component';
import { Step2ContactInfoComponent } from './components/step2-contact-info/step2-contact-info.component';
import { Step3BusinessInfoComponent } from './components/step3-business-info/step3-business-info.component';

@Component({
  selector: 'app-root',
  imports: [Step1PersonalInfoComponent,Step2ContactInfoComponent,Step3BusinessInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'seller';
}
