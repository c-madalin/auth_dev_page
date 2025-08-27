import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountPanelComponent } from './add-account-panel.component';

describe('AddAccountPanelComponent', () => {
  let component: AddAccountPanelComponent;
  let fixture: ComponentFixture<AddAccountPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAccountPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccountPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
