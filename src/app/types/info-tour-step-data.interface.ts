import { InfoTourStep } from './info-tour-step.enum'

export interface InfoTourStepData {
    step: InfoTourStep
    image: string
    tag?: string
    title: string
    description?: string
    bulletPoints: string[]
    conclusion?: string
}
