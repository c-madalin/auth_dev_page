import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaigationButtonsComponent } from './naigation-buttons.component';

describe('NaigationButtonsComponent', () => {
  let component: NaigationButtonsComponent;
  let fixture: ComponentFixture<NaigationButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NaigationButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaigationButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
