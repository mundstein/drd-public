import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Anamnesis } from '../types/anamnesis'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url = environment.apiURL + 'anamnesis/upload'

  constructor(
    private http: HttpClient
  ) { }

  upload(anamnesis: Anamnesis, code: string) {
    let data = {
      anamnesis: anamnesis,
      code: code
    }
    return this.http.post(this.url, data)
  }
}
