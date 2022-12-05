import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PdfService } from 'src/app/services/pdf.service';
import { Checkup, CheckupAnswer, CheckupBool, CheckupFrequency, CheckupItem } from 'src/app/types/checkup';

@Component({
  selector: 'app-checkup',
  templateUrl: './checkup.page.html',
  styleUrls: ['./checkup.page.scss'],
})
export class CheckupPage implements OnInit {

  checkup: Checkup
  exportEnabled = true
  cancer = false

  constructor(
    private dataService: DataService,
    private pdfService: PdfService
  ) { }

  ngOnInit() {
    this.checkup = this.dataService.checkup
    const item = this.checkup.items.filter(i => i.text == "q45")[0]
    this.cancer = item.answer?.bool == 'yes'
    const ana = this.dataService.anamnesis
    if (!this.checkup.height) {
      this.checkup.height = ana.height
    }
    if (!this.checkup.weight) {
      this.checkup.weight = ana.weight
    }
    if (!this.checkup.chronicIllnesses || this.checkup.chronicIllnesses.length == 0) {
      this.checkup.chronicIllnesses = ana.illnesses
    }
    if (!this.checkup.surgeries || this.checkup.surgeries.length == 0) {
      this.checkup.surgeries = ana.surgeries
    }
  }

  ionViewWillEnter() {
    this.exportEnabled = true
  }

  boolOptions = Object.values(CheckupBool)
  boolAnswer(answer: string): string {
    return CheckupBool[answer]
  }

  frequencyOptions = Object.values(CheckupFrequency)
  frequencyAnswer(answer: string): string {
    return CheckupFrequency[answer]
  }

  boolColor(answer: string) {
    switch(answer) {
      case 'yes': return 'danger'
      case 'no': return 'success'
      case 'dontKnow': return 'warning'
      case 'notAnswered': return 'medium'
    }
  }

  tappedAnswer(question:string, answer: string) {
    question = question.split('.').pop()
    let item = this.checkup.items.filter( i => i.text == question)[0]
    this.cancer = (question == "q45" && answer == 'yes')
    if (answer == 'notAnswered') {
      item.answer = {}
      if (item.text == 'q12') {
        this.checkup.cigarettes = null
      }
    } else {
      if (question != "q12") {
        item.answer = { bool: answer} as CheckupAnswer
      }
    }
    this.checkup.items = this.checkup.items.map(i => i.text == question ? item : i)
    this.dataService.updateCheckup(this.checkup)
  }

  public type(question: CheckupItem): string {
    if (question.text == "q12") { return 'number' }
    return 'bool'
  }

  cigsChanged() {
    this.dataService.updateCheckup(this.checkup)
  }

  frequencyChanged(event: any) {
    let item = this.checkup.items.filter( i => i.text == 'q18')[0]
    item.answer = {frequency: event.detail.value}
    this.checkup.items = this.checkup.items.map( i => i.text == 'q18' ? item : i)
    this.dataService.updateCheckup(this.checkup)
  }

  statusForQuestion(text: string){
    const item = this.checkup.items.filter( i => i.text == text )[0]
    if (Object.keys(item.answer).length === 0 && text != "q12") { 
      return 'notAnswered' 
    }
    // cigarette question
    if (item.text == "q12") {
      if (this.checkup.cigarettes == 0) { return 'no' }
      else if (this.checkup.cigarettes > 0) { return 'yes' }
      else { return 'notAnswered' }
    }
    // alcohol question
    else if (item.text == "q18") {
      if (item.answer.frequency == 'never') { return 'no' }
      else { return 'yes'}
    }
    else {
      return item.answer.bool ? item.answer.bool : 'notAnswered'
    }
  }

  // this is required by the "trackBy" feature of *ngFor so that items update dynamically
  public text(index: number, item: CheckupItem) { return item.text }
  
  reset() {
    this.checkup = new Checkup()
    this.dataService.updateCheckup(this.checkup)
  }

  save() {
    this.dataService.updateCheckup(this.checkup)
  }

  showDividerForQuestion(question: CheckupItem) {
    const nr = parseInt(question.text.slice(1))
    if (nr > 23 && nr < 32) return false
    if (nr > 31 && nr < 44) return false
    return true
  }

  fillForButton(question: CheckupItem, bool: CheckupBool): string {
    return question.answer.bool == bool ? 'solid' : 'outline'
  }

  export() {
    this.exportEnabled = false
    this.pdfService.generateCheckup(this.checkup)
  }
}
