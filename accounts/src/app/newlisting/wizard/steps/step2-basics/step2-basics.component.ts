import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nl-step2-basics',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step2-basics.component.html',
  styleUrls: ['./step2-basics.component.css']
})
export class Step2BasicsComponent implements OnInit, OnDestroy {
  @Input() games: string[] = [];
  @Input() selectedGame = '';
  @Input() currency: 'EUR' | 'USD' | 'GBP' = 'EUR';
  @Input() price: number | null = null;
  @Input() title = '';
  @Input() slug = '';

  @Input() description = '';
  @Input() gallery: { name: string; sizeKB: number }[] = [];

  @Output() change = new EventEmitter<any>();
  @Output() validChange = new EventEmitter<boolean>();

  form!: FormGroup;
  private subs = new Subscription();
  private slugTouched = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.title, [Validators.required, Validators.minLength(3)]],
      slug:  [this.slug,  [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      price: [this.price, [Validators.required, Validators.min(1)]],
      currency: [this.currency, Validators.required],
      game: [this.selectedGame, Validators.required],
      description: [this.description, [Validators.required, Validators.minLength(3)]]
    });

    // Autogen slug din title până când userul editează slug-ul
    this.subs.add(this.form.get('title')!.valueChanges.subscribe((v: string) => {
      if (!this.slugTouched) {
        const s = this.slugify(v ?? '');
        this.form.get('slug')!.setValue(s, { emitEvent: false });
        this.emitChange();
      }
    }));

    this.subs.add(this.form.get('slug')!.valueChanges.subscribe(() => {
      this.slugTouched = true;
      this.emitChange();
    }));

    this.subs.add(this.form.valueChanges.subscribe(() => this.emitChange()));
    this.emitChange(); // inițial
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }

  // 85% după taxa de 15%
  get sellerGets(): number {
    const p = Number(this.form?.get('price')?.value ?? 0);
    return p > 0 ? p * 0.85 : 0;
  }

  symbol(cur: string) {
    return cur === 'USD' ? '$' : cur === 'GBP' ? '£' : '€';
  }

  addMockImage() {
    if (this.gallery.length >= 5) return;
    const n = this.gallery.length + 1;
    this.gallery = [...this.gallery, { name: `image_${n}.png`, sizeKB: 120 }];
    this.emitChange();
  }

  removeAt(i: number) {
    this.gallery = this.gallery.filter((_, idx) => idx !== i);
    this.emitChange();
  }

  private emitChange() {
    const val = this.form.getRawValue();
    const valid = this.form.valid && this.gallery.length >= 1 && this.gallery.length <= 5;
    this.validChange.emit(valid);

    this.change.emit({
      game: val.game,
      title: val.title,
      slug: val.slug,
      price: Number(val.price),
      currency: val.currency,
      description: val.description,
      gallery: this.gallery
    });
  }

  private slugify(s: string): string {
    return (s || '')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
