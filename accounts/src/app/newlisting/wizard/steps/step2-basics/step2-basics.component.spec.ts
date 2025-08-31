import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2BasicsComponent } from './step2-basics.component';

describe('Step2BasicsComponent', () => {
  let component: Step2BasicsComponent;
  let fixture: ComponentFixture<Step2BasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step2BasicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2BasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
