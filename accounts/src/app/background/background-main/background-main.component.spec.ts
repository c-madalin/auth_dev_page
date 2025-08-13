import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundMainComponent } from './background-main.component';

describe('BackgroundMainComponent', () => {
  let component: BackgroundMainComponent;
  let fixture: ComponentFixture<BackgroundMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
