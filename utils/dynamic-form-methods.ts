import moment from "moment";

const DATE_FORMAT = "DD/MM/YYYY";

export class DynamicFormMethods {
    static getDifferenceBetweenDates(date1:string, date2:string) {
        const date1Moment = moment(date1, DATE_FORMAT);
        const date2Moment = moment(date2, DATE_FORMAT);
        const months = date2Moment.diff(date1Moment, 'months');
        const days = date2Moment.diff(date1Moment, 'days') - months * 30;
        return { months, days };
    }
    static getFiredDatePlusOneYear(firedDate: string) {
        const date2Moment = moment(firedDate, DATE_FORMAT).add(1, 'year');
        return date2Moment.format(DATE_FORMAT);
    }

    static getDaysSinceDismission(firedDate: string) {
        const date1Moment = moment(firedDate, DATE_FORMAT);
        const date2Moment = moment();
        const days = date2Moment.diff(date1Moment, 'days');
        return days;
    }

    static getDownWages(firedDate: string, integratedSalry: number) {
        let today = moment();
        const firedAnyversary = this.getFiredDatePlusOneYear(firedDate);
        const days = this.getDaysSinceDismission(firedDate);
        let result = 0;
        if (today.isSameOrBefore(firedAnyversary)) {
            result = days * integratedSalry
            
        } else { 
            result = 0;
        }
        return result.toFixed(2);
    }

    static getSeniorityBonus(startDate: string, firedDate: string, minimumWage: number, integratedSalry: number) {
        const { months } = this.getDifferenceBetweenDates(startDate, firedDate);
        let result = 0;
        if (integratedSalry > minimumWage * 2) {
            result = (minimumWage * 2) * months;
        } else {
            result = integratedSalry * months;
        }
        return result.toFixed(2);
    }
    
    static getProportionalDays(startDate: string, firedDate: string) {
        const startCurrentYear = moment().startOf('year');
        const start = moment(startDate, DATE_FORMAT);
        const end = moment(firedDate, DATE_FORMAT);
        const diffDays = end.diff(start, 'days');
        let result;
        if (start > startCurrentYear) {
            result = diffDays;
        } else {
            result = end.diff(startCurrentYear, 'days');
        }
        return result;
    }

   static getProportionalBonus(startDate: string, firedDate: string, bonusDays: number, baseSalary: number) {
        const currentProportionalDays = this.getProportionalDays(startDate, firedDate);
        let result = ((currentProportionalDays / 365) * bonusDays) * baseSalary;
        return result.toFixed(2);
    }

    static getProportionalDaysOfCurrentPeriod(startDate: string, firedDate: string) { 
        const start = moment(startDate, DATE_FORMAT);
        const end = moment(firedDate, DATE_FORMAT);
        const diffDays = end.diff(start, 'days');
        return diffDays;
    }

    static getProportionalVacation(vacationDays:number, startDate: string, firedDate: string, baseSalary: number) {
        const currentProportionalDays = this.getProportionalDaysOfCurrentPeriod(startDate, firedDate);
        let result = ((currentProportionalDays / 365) * vacationDays) * baseSalary;
        return result.toFixed(2);
    }

    static getProportionalVacationBonus(vacationDays:number, startDate: string, firedDate: string, baseSalary: number, vacationBonus: number) {
        const myProportionalVacation = this.getProportionalVacation(vacationDays, startDate, firedDate, baseSalary);
        let result = Number(myProportionalVacation) * vacationBonus;
        return result.toFixed(2);
    }

    static getTwentyDaysByYear(startDate: string, firedDate: string, integratedSalary: number) { 
        const { months } = this.getDifferenceBetweenDates(startDate, firedDate);
        let result = ((20 / 12) * months) * integratedSalary;
        return result.toFixed(2);
    }
    
}