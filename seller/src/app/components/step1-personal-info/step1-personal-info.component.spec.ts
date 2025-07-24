import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1PersonalInfoComponent } from './step1-personal-info.component';

describe('Step1PersonalInfoComponent', () => {
  let component: Step1PersonalInfoComponent;
  let fixture: ComponentFixture<Step1PersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step1PersonalInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step1PersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
