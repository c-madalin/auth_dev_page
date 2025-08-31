import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-offer-overlay',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './currency-offer-overlay.component.html',
  styleUrls: ['./currency-offer-overlay.component.css']
})
export class CurrencyOfferOverlayComponent implements OnInit, OnDestroy {
  @Input() games: string[] = [];
  @Input() feePercent = 0;        // % taxă – dacă vrei 15, setezi [feePercent]="15"
  @Output() close = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  form!: FormGroup;
  subs = new Subscription();

  currencies = ['EUR', 'USD', 'GBP'];
  regions = ['EU', 'NA', 'ASIA'];
  serversMap: Record<string, string[]> = {
    EU: ['Select Server', 'EU-1', 'EU-2', 'EU-3'],
    NA: ['Select Server', 'NA-East', 'NA-West'],
    ASIA: ['Select Server', 'SEA', 'KR', 'JP']
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // Main Currency Info
      pricePerUnit: [null, [Validators.required, Validators.min(0.000001)]],
      currency: ['EUR', Validators.required],
      unit: ['Unit', Validators.required],
      game: ['', Validators.required],
      description: [''],

      // Game Specific Data
      region: ['', Validators.required],
      server: ['', Validators.required],

      // Currency Stock
      stock: [1, [Validators.required, Validators.min(1)]],
      minQty: [1, [Validators.required, Validators.min(1)]],
      deliveryTime: [10, [Validators.required, Validators.min(1)]],
      deliveryTimeUnit: ['Minutes', Validators.required],

      // Delivery
      deliveryInstructions: ['']
    });

    // când se schimbă regiunea, resetăm serverul
    this.subs.add(
      this.form.get('region')!.valueChanges.subscribe(() => {
        this.form.get('server')!.setValue('');
      })
    );
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }

  // ===== Fees Breakdown =====
  symbol(cur: string) { return cur === 'USD' ? '$' : cur === 'GBP' ? '£' : '€'; }

  get originalPrice(): number {
    const p = Number(this.form?.get('pricePerUnit')?.value ?? 0);
    const qty = Number(this.form?.get('minQty')?.value ?? 0);
    return p > 0 && qty > 0 ? p * qty : 0;
  }
  get feeAmount(): number {
    return this.originalPrice * (Number(this.feePercent) / 100);
  }
  get sellerGets(): number {
    return Math.max(this.originalPrice - this.feeAmount, 0);
  }

  cancel() { this.close.emit(); }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.submitted.emit({
      ...v,
      breakdown: {
        originalPrice: this.originalPrice,
        feePercent: this.feePercent,
        feeAmount: this.feeAmount,
        amountYouReceive: this.sellerGets,
        currency: v.currency
      }
    });
  }

  serversFor(region: string): string[] {
    return this.serversMap[region] ?? [];
  }
}
