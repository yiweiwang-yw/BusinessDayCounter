# BusinessDayCounter

This repository contains a TypeScript implementation of a business day counter. It provides functionality to calculate the number of weekdays and business days between two dates.

## Files
- **BusinessDayCounter.ts**: This file contains the `BusinessDayCounter` class which provides methods to calculate weekdays and business days between two dates.
- **PublicHolidays.ts**: This file contains the `PublicHolidays` class which provides methods to get public holidays for multiple years.
- **BusinessDayCounter.test.ts**: This file contains the unit tests for the `BusinessDayCounter` class.

## Usage
Create an instance of the `BusinessDayCounter` class and use the `WeekdaysBetweenTwoDates` and `BusinessDaysBetweenTwoDates` methods to calculate the number of weekdays and business days between two dates respectively.

```typescript
import { BusinessDayCounter } from "./BusinessDayCounter"; 
import { Holiday, PublicHolidays } from "./PublicHolidays";

let counter = new BusinessDayCounter();
let publicHolidays = new PublicHolidays();
let holidaysForMultipleYears = PublicHolidays.getHolidaysForMultipleYears(2013, 2015); 
// or getHolidaysForMultipleYears(2013) for a single year

let weekdays = counter.WeekdaysBetweenTwoDates(
    new Date("2013-10-07"),
    new Date("2013-10-09")
);

let businessDays = counter.BusinessDaysBetweenTwoDates(
    new Date("2013-10-07"),
    new Date("2014-01-01"),
    holidaysForMultipleYears
);
```
Running Tests
To run tests, execute:
```bash
npm run test
```
or
```bash
npx jest
```