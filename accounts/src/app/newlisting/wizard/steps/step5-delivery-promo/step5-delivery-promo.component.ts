import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

type Plan = '24H'|'3D'|'7D'|'NONE';

@Component({
  selector: 'app-nl-step5-delivery-promo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step5-delivery-promo.component.html',
  styleUrls: ['./step5-delivery-promo.component.css']
})
export class Step5DeliveryPromoComponent implements OnInit, OnDestroy {
  @Input() delivery = '';
  @Input() plan: Plan | undefined;

  @Output() change = new EventEmitter<any>();
  @Output() validChange = new EventEmitter<boolean>();

  form!: FormGroup;
  private subs = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      delivery: [this.delivery],
      plan: [this.plan ?? null, Validators.required] // plan obligatoriu
    });

    this.subs.add(this.form.valueChanges.subscribe(() => this.emit()));
    // emit inițial
    this.emit();
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }

  private emit() {
    const v = this.form.getRawValue();
    const valid = this.form.get('plan')!.valid;
    this.validChange.emit(valid);
    if (valid) {
      this.change.emit({
        deliveryInstructions: v.delivery || '',
        promotionPlan: v.plan as Plan
      });
    } else {
      // chiar dacă nu-i valid, trimitem payload parțial ca să ții state-ul în wizard
      this.change.emit({
        deliveryInstructions: v.delivery || '',
        promotionPlan: v.plan
      });
    }
  }
}
