import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Anamnesis } from 'src/app/types/anamnesis';
import { BloodGroup } from 'src/app/types/blood-group';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
})
export class MeasurementsPage implements OnInit {

  form: FormGroup
  anamnesis: Anamnesis
  
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
    ) { }
    
    ngOnInit() {
      this.anamnesis = this.dataService.anamnesis;
      this.initForm();
    }
    
    get height(): FormControl { return this.form.get('height') as FormControl; }
    get weight(): FormControl { return this.form.get('weight') as FormControl; }
    get blood(): FormControl { return this.form.get('blood') as FormControl; }
    get birthyear(): FormControl { return this.form.get('birthyear') as FormControl; }
    
    get bmi(): number {
      return Anamnesis.BMI(this.anamnesis);
    }

    get age(): number {
      const thisYear = (new Date).getFullYear();
      return thisYear - this.anamnesis.birthyear;
    }
    
    initForm() {
      this.form = this.formBuilder.group({
        height: this.anamnesis.height,
        weight: this.anamnesis.weight,
        blood: this.anamnesis.bloodGroup,
        birthyear: this.anamnesis.birthyear
      })
      
      this.form.valueChanges.subscribe(
        () => this.save());
    }
      
    openURL(url: string) {
      window.open(url, '_system');
    }
    
    bloodOptions = Object.keys(BloodGroup);
    bloodgroup(group: string): string {
      return BloodGroup[group]; 
    }
    
    BMI_URL = "https://de.m.wikipedia.org/wiki/Body_Mass_Index";

    public save() {
      this.anamnesis.height = this.height.value;
      this.anamnesis.weight = this.weight.value;
      this.anamnesis.bloodGroup = this.blood.value;
      this.anamnesis.birthyear = this.birthyear.value
      this.dataService.updateAnamnesis(this.anamnesis);
    }
}
