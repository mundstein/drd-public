export enum CheckupBool {
    YES = 'yes',
    NO = 'no',
    DONT_KNOW = "dontKnow" 
}

export enum CheckupFrequency {
    NEVER = 'never',
    MONTHLY = 'monthly',
    WEEKLY = 'weekly',
    DAILY = 'daily'
}

export interface CheckupAnswer {
    bool?: CheckupBool
    frequency?: CheckupFrequency
}

export interface CheckupItem {
    text: string
    answer?: CheckupAnswer
}

export class Checkup {
    items: CheckupItem[] = []
    updated: Date = new Date()
    acuteIllnesses: string[] = []
    chronicIllnesses: string[] = []
    surgeries: string[] = []
    relative?: string
    cancerType?: string
    cigarettes?: number
    weight: number
    height: number

    constructor() {
        for (let i = 1; i < 46; i++) {
            let item = {text: "q" + i, answer: {}}
            this.items.push(item)
        }
    }
}