import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nl-step4-details-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step4-details-type.component.html',
  styleUrls: ['./step4-details-type.component.css']
})
export class Step4DetailsTypeComponent implements OnInit, OnDestroy {
  @Input() typeValue = '';
  @Input() details: Record<string, number|string> = {};

  @Output() change = new EventEmitter<any>();
  @Output() validChange = new EventEmitter<boolean>();

  form!: FormGroup;
  private subs = new Subscription();

  // câmpuri demo — le poți modifica după joc
  fields = [
    { key: 'level', label: 'Level', type: 'number' as const },
    { key: 'rank',  label: 'Rank',  type: 'text'   as const },
    { key: 'skins', label: 'Skins', type: 'number' as const },
    { key: 'hours', label: 'Hours Played', type: 'number' as const },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const cfg: Record<string, FormControl> = {
      type: new FormControl(this.typeValue, Validators.required),
    };
    // inițializează controale pt. fiecare field
    for (const f of this.fields) {
      const v = this.details?.[f.key];
      cfg[f.key] = new FormControl(
        f.type === 'number' ? (v === undefined || v === '' ? 0 : Number(v)) : (v ?? ''),
        f.type === 'number' ? [] : []
      );
    }
    this.form = this.fb.group(cfg);

    this.subs.add(this.form.valueChanges.subscribe(() => this.emit()));
    // emit inițial
    this.emit();
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }

  private emit() {
    const v = this.form.getRawValue();
    // normalizează numerele goale la 0
    for (const f of this.fields) {
      if (f.type === 'number') v[f.key] = Number(v[f.key] ?? 0);
    }
    const valid = this.form.get('type')!.valid; // TYPE obligatoriu
    this.validChange.emit(valid);
    this.change.emit({
      type: v.type,
      details: this.fields.reduce((acc, f) => ({ ...acc, [f.key]: v[f.key] }), {})
    });
  }
}
