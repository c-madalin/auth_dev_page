import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2ContactInfoComponent } from './step2-contact-info.component';

describe('Step2ContactInfoComponent', () => {
  let component: Step2ContactInfoComponent;
  let fixture: ComponentFixture<Step2ContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step2ContactInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2ContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
