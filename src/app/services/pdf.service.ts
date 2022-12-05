import { Injectable } from '@angular/core';
import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator/ngx'
import { File } from '@awesome-cordova-plugins/file/ngx'
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx'
import { HttpClient } from '@angular/common/http';
import { Checkup } from '../types/checkup';
import { formatDate } from '@angular/common'
import { forkJoin, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    private pdfGenerator: PDFGenerator,
    private http: HttpClient
  ) { }

  file = new File()
  fileOpener = new FileOpener()

  generateCheckup(checkup: Checkup) {
    const baseUrl = "/assets/document/"
    const options = { responseType: 'text'} as Object

    forkJoin({
      html: this.http.get(baseUrl + "checkup-template.html", options), 
      image: this.http.get(baseUrl + "logo.base64", options)
    })
    .subscribe((result) => {
      let html = this.substituteValues(result.html as string, checkup)
      let finalHTML = html.replace("/assets/icon/logo.png", result.image as string)
      this.createPDF(finalHTML)
    })
  }

  private createPDF(html:string) {
    from(this.pdfGenerator.fromData(html, {
      type: "base64",
      documentSize: "A4"
    }))
    .subscribe({
      next: pdf => {
        let contentType = 'application/pdf'
        let fileName = 'checkup.pdf'
        let folderpath = this.file.cacheDirectory
        this.savebase64AsPDF(folderpath, fileName, pdf, contentType)
        this.fileOpener.open(folderpath + fileName, contentType)
          .catch((err) => console.log(err))
      },
      error: e => console.log("error in fromData()", e)
    })
  }

  b64toBlob(b64Data: string, contentType='', sliceSize: number): Blob {
    sliceSize = sliceSize || 512
    var byteCharacters = atob(b64Data)
    var byteArrays = []
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize)
      let byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      let byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }
    return new Blob(byteArrays, { type: contentType })
  }

  savebase64AsPDF(folderpath: string, filename: string, content: string, contentType:string) {
    let data = this.b64toBlob(content, contentType, 512);
    (window as any).resolveLocalFileSystemURL(folderpath, (dir)=> {
      dir.getFile(filename, { create: true }, (file) => {
        file.createWriter((fileWriter) => {
          fileWriter.write(data)
        }, () => console.log("Unable to write to ", folderpath))
      })
    })
  }

  substituteValues(html:string, checkup:Checkup) : string {
    const none = "(keine Antwort)"
    let replacement = none

    // cigarette question
    if (!!checkup.cigarettes || checkup.cigarettes == 0) {
      replacement = `${checkup.cigarettes}`
    }
    html = html.replace("{{cigarettes}}", replacement)

    // all "bool" questions
    checkup.items.forEach(q => {
      if (q.text == "q12") { return }
      const placeholder = `{{answer-${q.text}}}`
      let replacement = none
      switch (q.answer?.bool) {
        case 'yes': replacement = "Ja"; break
        case 'no': replacement = "Nein"; break
        case 'dontKnow': replacement = "Ich weiß es nicht"; break
      }
      switch (q.answer?.frequency) {
        case 'never': replacement = "Nie"; break
        case 'monthly': replacement = "Einmal im Monat oder seltener"; break
        case 'weekly': replacement = "Zwei- bis dreimal pro Woche"; break
        case 'daily': replacement = "Viermal pro Woche oder öfter"; break
      }
      html = html.replace(placeholder, replacement)
    })

    // lists
    html = html.replace("{{illnesses", checkup.chronicIllnesses.join(", "))
    html = html.replace("{{acute-illnesses", checkup.acuteIllnesses.join(", "))
    html = html.replace("{{surgeries}}", checkup.surgeries.join(", "))

    // all other fields
    replacement = formatDate(checkup.updated, 'dd.LL.YYYY', 'de-AT')
    html = html.replace("{{date}}", replacement)
    html = html.replace("{{height}}", `${checkup.height || none } cm`)
    html = html.replace("{{weight}}", `${checkup.weight || none } kg`)
    html = html.replace("{{relative}}", `${checkup.relative || ""}`)
    html = html.replace("{{cancer-type}}", `${checkup.cancerType || ""}`)
    return html
  }
}
