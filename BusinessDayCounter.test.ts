import { BusinessDayCounter } from "./BusinessDayCounter"; // Adjust the import path as necessary

describe("BusinessDayCounter", () => {
    let counter: BusinessDayCounter;

    beforeEach(() => {
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
