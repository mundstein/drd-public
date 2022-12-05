import { Injectable } from '@angular/core';
import { InfoTourStepData } from '../types/info-tour-step-data.interface';
import { InfoTourStep } from '../types/info-tour-step.enum';

@Injectable({
    providedIn: 'root'
})
export class InfoTourService {
    constructor() { }

    get data(): InfoTourStepData[] {
        return [
            {
                step: InfoTourStep.WALKTHROUGH,
                image: './assets/image/walkthrough.svg',
                tag: 'appTour.walkThrough.tag',
                title: 'appTour.walkThrough.title',
                bulletPoints: [
                    'appTour.walkThrough.bulletPoints.1',
                    'appTour.walkThrough.bulletPoints.2',
                    'appTour.walkThrough.bulletPoints.3',
                    'appTour.walkThrough.bulletPoints.4'
                ],
                conclusion: 'appTour.walkThrough.conclusion'
            },
            {
                step: InfoTourStep.CONSULTATION,
                image: './assets/image/consultation.svg',
                title: 'appTour.consultation.title',
                description: 'appTour.consultation.description',
                bulletPoints: [
                    'appTour.consultation.bulletPoints.1',
                    'appTour.consultation.bulletPoints.2',
                    'appTour.consultation.bulletPoints.3'
                ]
            },
            {
                step: InfoTourStep.DOCS,
                image: './assets/image/docs.svg',
                title: 'appTour.docs.title',
                description: 'appTour.docs.description',
                bulletPoints: [
                    'appTour.docs.bulletPoints.1',
                    'appTour.docs.bulletPoints.2',
                    'appTour.docs.bulletPoints.3',
                    'appTour.docs.bulletPoints.4'
                ],
                conclusion: 'appTour.docs.conclusion'
            },
            {
                step: InfoTourStep.HEALTH_FILE,
                image: './assets/image/health.svg',
                title: 'appTour.health.title',
                description: 'appTour.health.description',
                bulletPoints: [
                    'appTour.health.bulletPoints.1',
                    'appTour.health.bulletPoints.2',
                    'appTour.health.bulletPoints.3',
                    'appTour.health.bulletPoints.4'
                ]
            },
            {
                step: InfoTourStep.DOCTOR_SEARCH,
                image: './assets/image/doctor-search.svg',
                title: 'appTour.doctorSearch.title',
                bulletPoints: [
                    'appTour.doctorSearch.bulletPoints.1',
                    'appTour.doctorSearch.bulletPoints.2',
                    'appTour.doctorSearch.bulletPoints.3',
                    'appTour.doctorSearch.bulletPoints.4'
                ]
            },
            {
                step: InfoTourStep.DATA_PROTECTION,
                image: './assets/image/data-protection.svg',
                title: 'appTour.dataProtection.title',
                description: 'appTour.dataProtection.description',
                bulletPoints: [
                    'appTour.dataProtection.bulletPoints.1',
                    'appTour.dataProtection.bulletPoints.2',
                    'appTour.dataProtection.bulletPoints.3',
                    'appTour.dataProtection.bulletPoints.4'
                ]
            }
        ];
    }
}
