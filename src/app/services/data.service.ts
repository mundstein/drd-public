import { Injectable} from '@angular/core';
import { Anamnesis } from '../types/anamnesis';
import { Checkup } from '../types/checkup';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private store: StorageService) {
    this.init();
  }
  
  init() { 
    this.anamnesis 
    this.checkup
  }

  get anamnesis(): Anamnesis {
    let data = this.store.getItem("anamnesis")
    if (!data) {
      data = new Anamnesis()
      this.store.setItem("anamnesis", data)
    }
    return data;
  }

  get checkup(): Checkup {
    let data = this.store.getItem("checkup")
    if (!data) {
      data = new Checkup()
      this.store.setItem("checkup", data)
    }
    return data
  }

  updateAnamnesis(data: Anamnesis) {
    this.store.setItem("anamnesis", data);
  }

  updateCheckup(data: Checkup) {
    data.updated = new Date()
    this.store.setItem("checkup", data)
  }

  syncAll(lastUpdated: string) {
    let ch = this.checkup
    let an = this.anamnesis;
    ['birthyear', 'height', 'weight'].forEach( p => {
      if (lastUpdated = 'checkup') {
        if (ch[p] != an[p]) { an[p] = ch[p] }
      }
      else {
        if (ch[p] != an[p]) { ch[p] = an[p] }
      }
    })
  }
}
