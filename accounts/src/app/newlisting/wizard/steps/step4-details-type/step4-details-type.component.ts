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
  @Input() details: Record<string, any> = {};

  @Output() change = new EventEmitter<any>();
  @Output() validChange = new EventEmitter<boolean>();

  form!: FormGroup;
  private subs = new Subscription();

  platforms = ['PC', 'PlayStation', 'Xbox', 'Android', 'iOS', 'Switch'];
  types = ['OG Account', 'Full Access', 'Original Email', 'Save the World', 'Stacked'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const arr = (x: any) => (Array.isArray(x) ? x : []);
    const num = (x: any) => (x === '' || x === undefined || x === null ? 0 : Number(x));

    this.form = this.fb.group({
      mainPlatform: [this.details?.['mainPlatform'] ?? '', Validators.required],
      linkablePlatforms: [arr(this.details?.['linkablePlatforms'])],
      type: [this.typeValue ?? '', Validators.required],

      // counts (numerice => dacă lipsesc, 0)
      outfitsSkinsCount: [num(this.details?.['outfitsSkinsCount'])],
      vbucksCount:       [num(this.details?.['vbucksCount'])],
      accountLevel:      [num(this.details?.['accountLevel'])],
      emotesCount:       [num(this.details?.['emotesCount'])],
      pickaxesCount:     [num(this.details?.['pickaxesCount'])],
      backblingsCount:   [num(this.details?.['backblingsCount'])],
      glidersCount:      [num(this.details?.['glidersCount'])],
      wrapsCount:        [num(this.details?.['wrapsCount'])],
      bannersCount:      [num(this.details?.['bannersCount'])],
      spraysCount:       [num(this.details?.['spraysCount'])],
    });

    this.subs.add(this.form.valueChanges.subscribe(() => this.emit()));
    this.emit(); // initial
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }

  private emit() {
    const v = this.form.getRawValue();

    // asigură numeric la 0
    const n = (x: any) => Number(x ?? 0);

    const payload = {
      type: v.type,
      details: {
        mainPlatform: v.mainPlatform,
        linkablePlatforms: v.linkablePlatforms ?? [],
        outfitsSkinsCount: n(v.outfitsSkinsCount),
        vbucksCount:       n(v.vbucksCount),
        accountLevel:      n(v.accountLevel),
        emotesCount:       n(v.emotesCount),
        pickaxesCount:     n(v.pickaxesCount),
        backblingsCount:   n(v.backblingsCount),
        glidersCount:      n(v.glidersCount),
        wrapsCount:        n(v.wrapsCount),
        bannersCount:      n(v.bannersCount),
        spraysCount:       n(v.spraysCount),
      }
    };

    const valid = this.form.get('type')!.valid && this.form.get('mainPlatform')!.valid;
    this.validChange.emit(valid);
    this.change.emit(payload);
  }
}
