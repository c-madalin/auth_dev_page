import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1SelectGameComponent } from './step1-select-game.component';

describe('Step1SelectGameComponent', () => {
  let component: Step1SelectGameComponent;
  let fixture: ComponentFixture<Step1SelectGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step1SelectGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step1SelectGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
