import { BusinessDayCounter } from "./BusinessDayCounter"; 
import { Holiday,PublicHolidays } from "./PublicHolidays";

describe("WeekDayCounter", () => {
    let counter: BusinessDayCounter;

    beforeAll(() => {
        counter = new BusinessDayCounter();
    });

    test("counts 1 weekday between 7th October 2013 and 9th October 2013", () => {
        expect(
            counter.WeekdaysBetweenTwoDates(
                new Date("2013-10-07"),
                new Date("2013-10-09")
            )
        ).toBe(1);
    });

    test("counts 5 weekdays between 5th October 2013 and 14th October 2013", () => {
        expect(
            counter.WeekdaysBetweenTwoDates(
                new Date("2013-10-05"),
                new Date("2013-10-14")
            )
        ).toBe(5);
    });

    test("counts 61 weekdays between 7th October 2013 and 1st January 2014", () => {
        expect(
            counter.WeekdaysBetweenTwoDates(
                new Date("2013-10-07"),
                new Date("2014-01-01")
            )
        ).toBe(61);
    });

    test("counts 0 weekdays when the end date is before the start date", () => {
        expect(
            counter.WeekdaysBetweenTwoDates(
                new Date("2013-10-07"),
                new Date("2013-10-05")
            )
        ).toBe(0);
    });

    test("counts 0 weekdays when the end date is the same as the start date", () => {
        expect(
            counter.WeekdaysBetweenTwoDates(
                new Date("2013-10-07"),
                new Date("2013-10-07")
            )
        ).toBe(0);
    });
});


describe("BusinessDayCounter", () => {
    let counter: BusinessDayCounter;
    let holidaysForMultipleYears: Map<string, Holiday>;

    beforeAll(() => {
        counter = new BusinessDayCounter();
        holidaysForMultipleYears = PublicHolidays.getYearsOfHolidays(2013, 2015);
    });

    test("counts correct business days excluding public holidays", () => {
        
        expect(
            counter.BusinessDaysBetweenTwoDates(
                new Date("2013-12-24"),
                new Date("2013-12-27"),
                holidaysForMultipleYears
            )
        ).toBe(0);
    });

    test("counts 59 business days between 7th October 2013 and 1st January 2014 excluding public holidays", () => {

        expect(
            counter.BusinessDaysBetweenTwoDates(
                new Date("2013-10-07"),
                new Date("2014-01-01"),
                holidaysForMultipleYears
            )
        ).toBe(59);
    });

    test("count 1 business day between 7th October 2013 and 9th October 2013 excluding public holidays", () => {
        expect(
            counter.BusinessDaysBetweenTwoDates(
                new Date("2013-10-07"),
                new Date("2013-10-09"),
                holidaysForMultipleYears
            )
        ).toBe(1);
    });

    test("counts 0 business days when the end date is before the start date", () => {
        expect(
            counter.BusinessDaysBetweenTwoDates(
                new Date("2013-10-07"),
                new Date("2013-10-05"),
                holidaysForMultipleYears
            )
        ).toBe(0);
    });
});
