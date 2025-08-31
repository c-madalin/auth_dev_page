import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3DescriptionGalleryComponent } from './step3-description-gallery.component';

describe('Step3DescriptionGalleryComponent', () => {
  let component: Step3DescriptionGalleryComponent;
  let fixture: ComponentFixture<Step3DescriptionGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step3DescriptionGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3DescriptionGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
