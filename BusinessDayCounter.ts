export class BusinessDayCounter {
    WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
        if (secondDate <= firstDate) {
            return 0;
        }

        let weekdaysCount = 0;
        let currentDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 1);
        let endDate = new Date(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate());

        console.log(`Starting count from: ${currentDate.toDateString()}`);

        while (currentDate < endDate) {

            console.log(`Current day is: ${currentDate.toDateString()}`);
            console.log(`currentday is smaller than seconddate: ${currentDate < secondDate}`)
            const dayOfWeek = currentDate.getDay();
            console.log(
                `Today is: ${currentDate.toDateString()}, Day of week: ${dayOfWeek}`
            );

            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                weekdaysCount++;
                console.log("Today got counted.");
            } else {
                console.log("Today is a weekend, not counting.");
            }

            console.log(`Current count is: ${weekdaysCount}`);

            currentDate.setDate(currentDate.getDate() + 1);
            console.log(`Current day incremented to: ${currentDate}`);
        }

        return weekdaysCount;
    }
    BusinessDaysBetweenTwoDates(
        firstDate: Date,
        secondDate: Date,
        publicHolidays: Holiday[]
    ): number {
        if (secondDate <= firstDate) {
            return 0;
        }

        let businessDaysCount = 0;
        let currentDate = new Date(Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + 1));
        let endDate = new Date(Date.UTC(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate()));

        const holidaysMap = new Map<string, boolean>();
        publicHolidays.forEach(holiday => {
            holidaysMap.set(holiday.date.toISOString().split('T')[0], true);
        });

        while (currentDate < endDate) {
            console.log(`Current day is: ${currentDate.toDateString()}`);
            console.log(`currentday is smaller than seconddate: ${currentDate < secondDate}`)
            if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5 && !holidaysMap.has(currentDate.toISOString().split('T')[0])) {
                businessDaysCount++;
                console.log("Today got counted.");
            }
            console.log(`Current count is: ${businessDaysCount}`);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return businessDaysCount;
    }
}

type Holiday = {
    name: string;
    date: Date;
};

export class NSWPublicHolidays {
    year: number;

    constructor(year: number) {
        this.year = year;
    }

    // Calculate a fixed date holiday
    fixedDateHoliday(name: string, month: number, day: number): Holiday {
        let date = new Date(this.year, month, day);
        return { name, date };
    }

    // Calculate holiday that may shift to Monday if it falls on a weekend
    shiftingHoliday(name: string, month: number, day: number): Holiday {
        let date = new Date(this.year, month, day);
        if (date.getDay() === 0) { // Sunday
            date.setDate(date.getDate() + 1);
        } else if (date.getDay() === 6) { // Saturday
            date.setDate(date.getDate() + 2);
        }
        return { name, date };
    }

    // Calculate a holiday that falls on a specific occurrence of a weekday in a month
    occurrenceHoliday(name: string, month: number, occurrence: number, weekday: number): Holiday {
        let date = new Date(this.year, month, 1);
        let count = 0;
        while (date.getMonth() === month) {
            if (date.getDay() === weekday) {
                count++;
                if (count === occurrence) {
                    return { name, date };
                }
            }
            date.setDate(date.getDate() + 1);
        }
        throw new Error("Invalid date calculation");
    }

    // Get all public holidays for the year
    getAllHolidays(): Holiday[] {
        return [
            this.shiftingHoliday("New Year's Day", 0, 1), // January 1
            this.fixedDateHoliday("Australia Day", 0, 26), // January 26
            this.occurrenceHoliday("Labour Day", 2, 1, 1), // First Monday in March
            this.fixedDateHoliday("Good Friday", 3, this.calculateEaster().goodFriday), // Date varies
            this.fixedDateHoliday("Easter Monday", 3, this.calculateEaster().easterMonday), // Date varies
            this.occurrenceHoliday("Anzac Day", 3, 25, 0), // April 25
            this.occurrenceHoliday("Queen's Birthday", 5, 2, 1), // Second Monday in June
            this.fixedDateHoliday("Bank Holiday", 7, 1), // First Monday in August
            this.occurrenceHoliday("Labour Day", 9, 1, 1), // First Monday in October
            this.shiftingHoliday("Christmas Day", 11, 25), // December 25
            this.shiftingHoliday("Boxing Day", 11, 26) // December 26
        ];
    }

    private calculateEaster(): { goodFriday: number, easterMonday: number } {
        // got the idea from https://github.com/codebrainz/easterjs/blob/master/easter.js
        const a = this.year % 19;
        const b = Math.floor(this.year / 100);
        const c = this.year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        const goodFriday = new Date(this.year, month - 1, day - 2).getDate();
        const easterMonday = new Date(this.year, month - 1, day + 1).getDate();
        return { goodFriday, easterMonday };
    }
}