import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nl-step3-description-gallery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step3-description-gallery.component.html',
  styleUrls: ['./step3-description-gallery.component.css']
})
export class Step3DescriptionGalleryComponent implements OnInit, OnDestroy {
  @Input() description = '';
  @Input() gallery: { name: string; sizeKB: number }[] = [];

  @Output() change = new EventEmitter<any>();
  @Output() validChange = new EventEmitter<boolean>();

  form!: FormGroup;
  private subs = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, [Validators.required, Validators.minLength(3)]]
    });

    this.subs.add(this.form.valueChanges.subscribe(() => this.emit()));
    // emit inițial
    this.emit();
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }

  addMockImage() {
    if (this.gallery.length >= 5) return;
    const n = this.gallery.length + 1;
    this.gallery = [...this.gallery, { name: `image_${n}.png`, sizeKB: 120 }];
    this.emit();
  }

  removeAt(i: number) {
    this.gallery = this.gallery.filter((_, idx) => idx !== i);
    this.emit();
  }

  private emit() {
    const valid = this.form.valid && this.gallery.length >= 1 && this.gallery.length <= 5;
    this.validChange.emit(valid);
    this.change.emit({
      description: this.form.get('description')!.value,
      gallery: this.gallery
    });
  }
}
