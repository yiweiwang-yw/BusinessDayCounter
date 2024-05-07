import {PublicHolidays } from "./PublicHolidays";

describe('PublicHolidays', () => {
    describe('occurrenceHoliday', () => {
        test('should throw an error for invalid date calculation', () => {
            const publicHolidays = new PublicHolidays(2023);
            expect(() => {
                publicHolidays.occurrenceHoliday('Test Holiday', 1, 5, 1);
            }).toThrow('Invalid date calculation');
        });
    });

    describe('getYearsOfHolidays', () => {
        test('should handle single year when endYear is not provided', () => {
            const singleYearResult = PublicHolidays.getYearsOfHolidays(2020);
            const rangeYearResult = PublicHolidays.getYearsOfHolidays(2020, 2020);

            expect(singleYearResult).toEqual(rangeYearResult);
        });
    });
});