export interface BoxData {
    order: number;
    code: string;
    name: string;
    credit: string;
    classPerWeek: string;
    group: string | string[];
    instructor: string | string[];
    enrollment: string | string[];
    electiveQuantity: string | string[];
    updatedElectiveQuantity: string | string[];
    classtime: string | string[];
    classroom: string | string[];
    note: string | string[];
}