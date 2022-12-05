import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Anamnesis } from 'src/app/types/anamnesis';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.page.html',
  styleUrls: ['./allergies.page.scss'],
})
export class AllergiesPage implements OnInit {

  form: FormGroup
  anamnesis: Anamnesis;
  
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.anamnesis = this.dataService.anamnesis;
    this.initForm();
  }

  get allergies(): FormControl { return this.form.get('allergies') as FormControl; }

  initForm() {
    this.form = this.formBuilder.group({
      allergies: this.anamnesis.allergies
    });

    this.form.valueChanges.subscribe(
      () => {
        this.anamnesis.allergies = this.allergies.value;
        this.dataService.updateAnamnesis(this.anamnesis);
      }
    )
  }

  clear() {
    this.allergies.setValue('');
  }

  save() {
    this.anamnesis.allergies = this.allergies.value;
    this.dataService.updateAnamnesis(this.anamnesis);
  }
}
