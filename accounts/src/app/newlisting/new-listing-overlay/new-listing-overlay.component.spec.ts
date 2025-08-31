import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListingOverlayComponent } from './new-listing-overlay.component';

describe('NewListingOverlayComponent', () => {
  let component: NewListingOverlayComponent;
  let fixture: ComponentFixture<NewListingOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewListingOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewListingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
