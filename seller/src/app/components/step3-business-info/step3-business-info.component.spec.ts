import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3BusinessInfoComponent } from './step3-business-info.component';

describe('Step3BusinessInfoComponent', () => {
  let component: Step3BusinessInfoComponent;
  let fixture: ComponentFixture<Step3BusinessInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step3BusinessInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3BusinessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
