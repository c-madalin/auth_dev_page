import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellserFormComponent } from './sellser-form.component';

describe('SellserFormComponent', () => {
  let component: SellserFormComponent;
  let fixture: ComponentFixture<SellserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellserFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
