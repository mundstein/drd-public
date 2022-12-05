import { Address } from "./profile"

export class Doctor {
    id: number
    firstName: string
    lastName: string
    gender: 'male' | 'female'
    specialty?: string
    phoneNumber?: string
    address: Address
    profileImage?: string
    grade?: string
    gradeI?: string
}