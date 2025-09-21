import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step5DeliveryPromoComponent } from './step5-delivery-promo.component';

describe('Step5DeliveryPromoComponent', () => {
  let component: Step5DeliveryPromoComponent;
  let fixture: ComponentFixture<Step5DeliveryPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step5DeliveryPromoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step5DeliveryPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
