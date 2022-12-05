import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.scss'],
})
export class MedicineFormComponent implements OnInit {

  @Input() form: FormGroup
  @Input() locale = "de-AT"

  constructor(
  ) { }

  ngOnInit() {}

  get name(): FormControl { return this.form.get('name') as FormControl }
  get dosis(): FormControl { return this.form.get('dosis') as FormControl }
  get date(): FormControl { return this.form.get('date') as FormControl }

  formatDate(value: string) {
    return format(new Date(value), 'yyyy-MM-dd');
  }

}
