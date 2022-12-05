import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AlertController } from '@ionic/angular'
import { TranslateService } from '@ngx-translate/core'
import { switchMap } from 'rxjs/operators'
import { DataService } from 'src/app/services/data.service'
import { Anamnesis } from 'src/app/types/anamnesis'
import { Checkup } from 'src/app/types/checkup'
import { Location } from '@angular/common'

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.page.html',
  styleUrls: ['./list-form.page.scss'],
})
export class ListFormPage implements OnInit {

  form: FormGroup
  items = []
  anamnesis: Anamnesis
  checkup: Checkup
  title: string
  adding = false
  isMedication = false

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private alertController: AlertController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.title = this.route.snapshot.data['title']
    this.isMedication = this.title == 'medications'
    this.anamnesis = this.dataService.anamnesis
    this.checkup = this.dataService.checkup
    switch (this.title) {
      case 'illnesses': this.items = this.anamnesis.illnesses; break
      case 'surgeries': this.items = this.anamnesis.surgeries; break
      case 'medications': this.items = this.anamnesis.medications; break
      case 'acute': this.items = this.checkup.acuteIllnesses; 
    }
    this.initForm()
  }

  get itemName(): string {
    switch (this.title) {
      case 'illnesses': return 'Anamnesis.labels.illness'
      case 'surgeries': return 'Anamnesis.labels.surgery'
      case 'medications': return 'Anamnesis.labels.medication'
      case 'acute': return 'Checkup.labels.acuteIllnesses'
      default: return 'Anamnesis.labels.item'
    }
  }

  addItem() {
    const newValue = this.form.get('name').value
    if (!!newValue) {
      if (!this.isMedication) {
        this.items.push(newValue)
      }
      else {
        this.items.push(({
          name: this.form.get('name').value,
          dosis: this.form.get('dosis').value,
          date: this.form.get('date').value
        }))
      }
      this.initForm()
      this.save()
    }
    this.adding = false
  }

  save() {
    switch (this.title) {
      case 'illnesses': {
        this.anamnesis.illnesses = this.items 
        this.checkup.chronicIllnesses = this.items
        break
      }
      case 'surgeries': this.anamnesis.surgeries = this.items; break
      case 'medications': this.anamnesis.medications = this.items; break
      case 'acute': this.checkup.acuteIllnesses = this.items; break
    }
    if (this.title == 'acute' || this.title == 'illnesses') {
      this.dataService.updateCheckup(this.checkup)
    }
    if (this.title != 'acute') {
      this.dataService.updateAnamnesis(this.anamnesis)
    }
  }

  delete(index) {
    this.translate.get([
      'confirm',
      'cancel',
      'delete',
      'deleteWarning'
    ]).pipe(switchMap(t => 
      this.alertController.create({
        header: t.confirm,
        message: t.deleteWarning,
        buttons: [
          {
            text: t.cancel,
            role: 'cancel',
          },
          {
            text: t.delete,
            role: 'destructive',
            handler: () => {
              this.items.splice(index, 1)
              this.save()
            }
          }
        ]
      })
    ))
    .subscribe( alert => alert.present())
  }

  cancel() {
    this.adding = false
  }

  ionViewWillLeave() {
    this.save()
    this.items = []
  }

  goBack() {
    this.location.back()
  }

  initForm() {
    this.form = this.fb.group({
      name: this.fb.control(null),
      dosis: this.fb.control(null),
      date: this.fb.control(null)
    })
  }
}

