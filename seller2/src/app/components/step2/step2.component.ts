// step2.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step2',
  standalone: true,
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
  imports: [NgIf, NgFor, FormsModule],
})
export class Step2Component {
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  productType = '';
  salesRange = '';
  experience: 'no' | 'yes' | '' = '';
  description = '';
  previewImages: string[] = [];

  link1 = '';
  link2 = '';
  link3 = '';

  onFileSelected(event: any) {
    const files = event.target.files;
    this.previewImages = [];

    if (files && files.length <= 5) {
      for (let file of files) {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (reader.result) {
              this.previewImages.push(reader.result as string);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  removeImage(index: number) {
    this.previewImages.splice(index, 1);
  }
}
