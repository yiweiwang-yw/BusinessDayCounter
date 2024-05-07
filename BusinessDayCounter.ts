import { Holiday } from "./PublicHolidays";

export class BusinessDayCounter {
    WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
        if (secondDate <= firstDate) {
            return 0;
        }

        let weekdaysCount = 0;
        let currentDate = new Date(
            Date.UTC(firstDate.getFullYear(),
            firstDate.getMonth(),
            firstDate.getDate() + 1)
        );
        let endDate = new Date(
            Date.UTC(secondDate.getFullYear(),
            secondDate.getMonth(),
            secondDate.getDate())
        );

        console.log(`Starting count from: ${currentDate.toDateString()}`);

        while (currentDate < endDate) {
            console.log(`Current day is: ${currentDate.toDateString()}`);
            console.log(
                `currentday is smaller than seconddate: ${
                    currentDate < secondDate
                }`
            );
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
        publicHolidays: Map<string, Holiday>
    ): number {
        if (secondDate <= firstDate) {
            return 0;
        }

        let businessDaysCount = 0;
        let currentDate = new Date(
            Date.UTC(
                firstDate.getFullYear(),
                firstDate.getMonth(),
                firstDate.getDate() + 1
            )
        );
        let endDate = new Date(
            Date.UTC(
                secondDate.getFullYear(),
                secondDate.getMonth(),
                secondDate.getDate()
            )
        );


        while (currentDate < endDate) {
            const currentDateKey = currentDate.toISOString().split("T")[0];
            console.log(`Current day is: ${currentDate.toDateString()}`);
            console.log(
                `currentday is smaller than seconddate: ${
                    currentDate < secondDate
                }`
            );
            if (
                currentDate.getDay() >= 1 &&
                currentDate.getDay() <= 5 &&
                !publicHolidays.has(currentDateKey)
            ) {
                businessDaysCount++;
                console.log("Today got counted.");
            }
            console.log(`Current count is: ${businessDaysCount}`);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return businessDaysCount;
    }
}
