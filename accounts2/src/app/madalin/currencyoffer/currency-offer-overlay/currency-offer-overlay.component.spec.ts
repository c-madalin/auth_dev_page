import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyOfferOverlayComponent } from './currency-offer-overlay.component';

describe('CurrencyOfferOverlayComponent', () => {
  let component: CurrencyOfferOverlayComponent;
  let fixture: ComponentFixture<CurrencyOfferOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyOfferOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyOfferOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
