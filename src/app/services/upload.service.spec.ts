import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { UploadService } from './upload.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Anamnesis } from '../types/anamnesis';

describe('UploadService', () => {
    let httpClient: HttpClient
    let httpTestingController: HttpTestingController
    let uploadService: UploadService
    let anamnesis: Anamnesis

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UploadService],
        });
        httpClient = TestBed.inject(HttpClient)
        httpTestingController = TestBed.inject(HttpTestingController)
        uploadService = new UploadService(httpClient)
        anamnesis = new Anamnesis()
    });

    it('exists', inject([UploadService], (service: UploadService) => {
        expect(service).toBeTruthy();
    }))

    it('returns an error 404 when no PIN is provided', () => {
        uploadService.upload(anamnesis, null).subscribe({
            error: (error) => {
                expect(error.error.errorCode).toEqual('pin.noneProvided')
            }
        })
        const req = httpTestingController.expectOne(uploadService.url)
        expect(req.request.method).toEqual('POST')
        req.flush(
            { errorCode: "pin.noneProvided"}, 
            { status: 404, statusText: "pin.noneProvided"}
        )
    })

    it('returns an error 400 when PIN is not found', () => {
        const code = "1"
        uploadService.upload(anamnesis, code).subscribe({
            error: (e) => {
                expect(e.error.errorCode).toEqual('pin.notValid')
            }
        })
        const req = httpTestingController.expectOne(uploadService.url)
        expect(req.request.method).toEqual('POST')
        req.flush(
            { errorCode: "pin.notValid" }, 
            { status: 400, statusText: "pin.notValid" }
        )
    })
    
    afterEach(() => {
        httpTestingController.verify()
    })


});
