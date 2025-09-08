import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

type GameSpecific = Record<string, GameMeta>;

interface GameMeta {
  unitLabel?: string;
  regions?: string[];
  platforms?: string[];
  packs?: string[];
  factions?: string[];
  servers?: string[];
  serversByRegion?: Record<string, string[]>;
  note?: string;
}

@Component({
  selector: 'app-currency-offer-overlay',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './currency-offer-overlay.component.html',
  styleUrls: ['./currency-offer-overlay.component.css']
})
export class CurrencyOfferOverlayComponent implements OnInit, OnDestroy {
  @Input() games: string[] = [];
  @Input() feePercent = 0;
  @Output() close = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>();

  form!: FormGroup;
  subs = new Subscription();

  // static
  currencies = ['EUR', 'USD', 'GBP'];

  // dynamic (from JSON)
  private gameData: GameSpecific = {};
  private currentMeta: GameMeta | null = null;

  unitLabel: string | null = null;
  regionOptions: string[] = [];
  serverOptions: string[] = [];
  platformOptions: string[] = [];
  packOptions: string[] = [];
  factionOptions: string[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // Main
      pricePerUnit: [null, [Validators.required, Validators.min(0.000001)]],
      currency: ['EUR', Validators.required],
      unit: ['Unit', Validators.required],
      game: ['', Validators.required],
      description: [''],

      // Game specific (validators set dynamically)
      region: [''],
      server: [''],
      platform: [''],
      pack: [''],
      faction: [''],

      // Stock
      stock: [1, [Validators.required, Validators.min(1)]],
      minQty: [1, [Validators.required, Validators.min(1)]],
      deliveryTime: [10, [Validators.required, Validators.min(1)]],
      deliveryTimeUnit: ['Minutes', Validators.required],

      // Delivery
      deliveryInstructions: ['']
    });

    // load JSON once
    this.http.get<GameSpecific>('assets/game-specific.json').subscribe({
      next: (data) => {
        this.gameData = data;
        const initialGame = this.form.get('game')!.value;
        if (initialGame) this.applyGameMeta(initialGame);
      },
      error: (e) => console.error('Cannot load assets/game-specific.json', e)
    });

    // react on game change
    this.subs.add(
      this.form.get('game')!.valueChanges.subscribe((g: string) => this.applyGameMeta(g))
    );

    // react on region change (for serversByRegion)
    this.subs.add(
      this.form.get('region')!.valueChanges.subscribe((reg: string) => {
        if (!this.currentMeta?.serversByRegion) return;
        this.serverOptions = this.currentMeta.serversByRegion[reg] ?? [];
        this.form.get('server')!.setValue('');
      })
    );
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }

  // ----- fees helpers
  symbol(cur: string) { return cur === 'USD' ? '$' : cur === 'GBP' ? '£' : '€'; }
  get originalPrice(): number {
    const p = Number(this.form?.get('pricePerUnit')?.value ?? 0);
    const qty = Number(this.form?.get('minQty')?.value ?? 0);
    return p > 0 && qty > 0 ? p * qty : 0;
  }
  get feeAmount(): number { return this.originalPrice * (Number(this.feePercent) / 100); }
  get sellerGets(): number { return Math.max(this.originalPrice - this.feeAmount, 0); }

  // ----- apply meta from JSON
  private applyGameMeta(game: string) {
    const meta = (this.gameData && this.gameData[game]) || null;
    this.currentMeta = meta;

    // unit
    this.unitLabel = meta?.unitLabel ?? null;
    this.form.get('unit')!.setValue(this.unitLabel || 'Unit', { emitEvent: false });

    // regions
    this.regionOptions = meta?.regions ?? [];
    this.setRequired('region', this.regionOptions.length > 0);

    // servers (flat or per region)
    if (meta?.serversByRegion) {
      const currentRegion = this.form.get('region')!.value;
      this.serverOptions = (currentRegion && meta.serversByRegion[currentRegion]) ? meta.serversByRegion[currentRegion] : [];
    } else {
      this.serverOptions = meta?.servers ?? [];
    }
    this.setRequired('server', this.serverOptions.length > 0);

    // platforms
    this.platformOptions = meta?.platforms ?? [];
    this.setRequired('platform', this.platformOptions.length > 0);

    // packs
    this.packOptions = meta?.packs ?? [];
    this.setRequired('pack', this.packOptions.length > 0);

    // factions
    this.factionOptions = meta?.factions ?? [];
    this.setRequired('faction', this.factionOptions.length > 0);

    // reset dependent fields without looping events
    this.form.patchValue({
      region: this.regionOptions.length ? '' : '',
      server: this.serverOptions.length ? '' : '',
      platform: this.platformOptions.length ? '' : '',
      pack: this.packOptions.length ? '' : '',
      faction: this.factionOptions.length ? '' : ''
    }, { emitEvent: false });
  }

  private setRequired(controlName: string, required: boolean) {
    const c = this.form.get(controlName);
    if (!c) return;
    c.setValidators(required ? [Validators.required] : []);
    c.updateValueAndValidity({ emitEvent: false });
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
}
