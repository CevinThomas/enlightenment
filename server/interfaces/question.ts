export interface Question {
    _id: number;
    name: string;
    category: string;
    explanation: string;
    group: string;
    options: [];
    licenseGroup: number
}
