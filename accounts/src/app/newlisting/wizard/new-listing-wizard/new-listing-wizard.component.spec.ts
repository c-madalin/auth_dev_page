import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListingWizardComponent } from './new-listing-wizard.component';

describe('NewListingWizardComponent', () => {
  let component: NewListingWizardComponent;
  let fixture: ComponentFixture<NewListingWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewListingWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewListingWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
