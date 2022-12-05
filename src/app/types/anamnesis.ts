import { BloodGroup } from './blood-group';
import { Medication } from './medication';

export class Anamnesis {
    allergies: string = '';
    surgeries: string[] = [];
    illnesses: string[] = [];
    medications: Medication[] = [];
    bloodGroup: BloodGroup =  'NA' as BloodGroup; 
    height: number = 0;
    weight: number = 0;
    birthyear: number = 2000;

    static BMI(a: Anamnesis): number {
        if (a.height == 0) { return 0; }
        const h = a.height / 100.0;
        return a.weight / (h * h);
    }
}