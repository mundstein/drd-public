import { Doctor } from "./doctor";

export class Specialty {
    id: number
    group: string
    mainSubject: string
}

export class Address {
    city: string
    zipCode: string
    street: string
    streetNumber: string
}

export class OpeningHours {
    weekday: number;
    startTime: string;
    endTime: string;
    text: string;
}

export enum Insurer {
    SVS = 'SVS',
    OEGK = 'ÖGK',
    BVAEB = 'BVAEB',
    AUVA = 'AUVA',
    PVA = 'PVA',
    NONE = 'account.noInsurer'
}
export class Employer {
    address: Address
    email: string
    phone: string
    url: string
    openingHours: OpeningHours[] = []
    insurers: Insurer[] = []
}

export class Institution {
    practiceNumber?: string
    name: string
    email: string
    phone: string
    fax: string
    insurers: string[]
    url: string
    institutionNumber:  string
    type: string
    subject: string
    address: Address
}

export class Profile {
    id: number
    doctor: Doctor
    employer?: Employer
    doctorNumber: string = ''
    specialty: Specialty
    grade?: string
    gradeI?: string;
    qualification?: string
    title?: string = ''
    otherSubjects: string;
    institution?: Institution;
    institutionRole?: string;
    institutionDepartment?: string;
    personId: string;

    static fullName(profile): string {
        const d = profile.doctor
        return d.firstName + ' ' + d.lastName
    }

    static openingHoursStatus(profile: Profile): string {
        if (!profile.employer?.openingHours || profile.employer.openingHours.length == 0) {
            return "none"
        }
        else {
            return this.isOpen(profile) ? "open" : "closed"
        }
    }

    static isOpen(profile: Profile) {
        return Profile.isOpenWithTime(profile, new Date())
    }

    /** Use in unit tests */
    static isOpenWithTime(profile: Profile, currentTime: Date): boolean {
        if (!profile.employer.openingHours) {
            return false
        }
        const raw = currentTime
        const msLocal = raw.getTime() - raw.getTimezoneOffset() * 60 * 1000
        const now = new Date(msLocal)
        const nowTime = now.toISOString().substring(11, 16).replace(":","")
        let hours = profile.employer.openingHours
         .filter(h => h.weekday == now.getDay())
         .filter(h => h.startTime < nowTime && nowTime < h.endTime)
        return (hours && hours.length > 0) ? true : false
    }

    static formattedSpecialty(profile: Profile): string {
        const s = profile.specialty;
        if (!!s.group) {
            if (!!s.mainSubject) {
                return s.group == s.mainSubject
                    ? s.group
                    : `${s.group}, ${s.mainSubject}`;
            } else {
                return s.group;
            }
        }
        return !!s.mainSubject ? s.mainSubject : '';
    }
}

export class ProfileResult {
    count: number
    next?: string
    previous?: string
    results: Profile[]
}