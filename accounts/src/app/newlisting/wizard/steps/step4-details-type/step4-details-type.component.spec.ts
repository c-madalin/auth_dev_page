import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step4DetailsTypeComponent } from './step4-details-type.component';

describe('Step4DetailsTypeComponent', () => {
  let component: Step4DetailsTypeComponent;
  let fixture: ComponentFixture<Step4DetailsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step4DetailsTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step4DetailsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
