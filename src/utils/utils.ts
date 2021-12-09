import { Status } from '../enum';
import { DayItem, Schedule } from '../types';

const validDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const getHours = (unixTimeStamp?: number) => {
    if (unixTimeStamp === undefined || isNaN(unixTimeStamp) || unixTimeStamp.toString() === '') {
        throw new Error('data contains invalid timestamps');
    }
    const format = unixTimeStamp >= 12 * 3600 ? 'PM' : 'AM';
    const currentHours = Math.round(unixTimeStamp / 3600) % 12;
    return (currentHours === 0 ? 12 : currentHours) + ' ' + format;
};

const getOpenCloseHour = (currentDay: DayItem[], nextDay: DayItem[], day: string) => {
    const values: string[] = [];
    const lastItem = currentDay[currentDay.length - 1];
    const nextDayType = nextDay.length > 0 ? nextDay[0].type : undefined;
    const nextDayClosed = nextDayType === Status.close ? nextDay[0] : undefined;

    currentDay.forEach((item, index) => {
        const currentItem = item;
        const nextItem = currentDay[index + 1];
        if (!currentItem || !nextItem) {
            return;
        }

        if (currentItem.type === Status.open && nextItem.type === Status.open) {
            throw new Error(`${day} contains consecutive open times`);
        }

        const isOpenCloseMatch = currentItem.type === Status.open && nextItem.type === Status.close;
        if (isOpenCloseMatch) {
            values.push(`${getHours(currentItem.value)} - ${getHours(nextItem.value)}`);
        }
    });

    if (lastItem.type === Status.open) {
        nextDayClosed
            ? values.push(`${getHours(lastItem.value)} - ${getHours(nextDayClosed.value)}`)
            : values.push(`opens from ${getHours(lastItem.value)}`);
    }

    return values;
};

export const getDayByNumber = (dayNumber: number) => {
    return validDays[dayNumber];
};

const isDayValid = (day: string) => validDays.includes(day.toLowerCase());

export const getPeriod = (response: Schedule, day: string, index: number) => {
    const currentDay = response[day];
    handleErrors(day, currentDay);

    const days = Object.keys(response);
    if (days.length < validDays.length) {
        throw new Error('some days of the week are missing in input');
    }

    const nextDay = response[days[(index + 1) % 7]];
    const noTimes = !Boolean(currentDay.length);
    const onlyClosedTimes = currentDay.every((day) => day.type === Status.close);
    const noClosing =
        currentDay.every((day) => day.type === Status.open) &&
        (!nextDay || nextDay?.every((day) => day.type === Status.open));

    if (noTimes || onlyClosedTimes) {
        return { day, schedule: ['Closed'] };
    }

    if (noClosing) {
        return { day, schedule: ['Open'] };
    }

    const openClosedTimes = getOpenCloseHour(currentDay, nextDay, day) || [];
    return { day, schedule: openClosedTimes };
};

const handleErrors = (day: string, currentDay: DayItem[]) => {
    if (!isDayValid(day)) {
        throw new Error(`${day} is not a valid  week day`);
    }

    if (!currentDay || !Array.isArray(currentDay)) {
        throw new Error('check data input');
    }

    const invalidData = currentDay.find(
        (item) => item.type !== Status.open && item.type !== Status.close
    );

    if (invalidData) {
        throw new Error(`${day} contains invalid entry: ${invalidData.type}`);
    }
};
