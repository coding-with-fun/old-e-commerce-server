import dayjs, { type OpUnitType, type QUnitType } from 'dayjs';

export const getTimeDifference = (
    startDateString: string | Date,
    endDateString: string | Date = new Date(),
    unit: QUnitType | OpUnitType = 'minute'
): number => {
    const startDate = dayjs(startDateString);
    const endDate = dayjs(endDateString);

    return startDate.diff(endDate, unit);
};

export const getBeforeTime = (
    difference: number,
    unit: dayjs.ManipulateType = 'minute',
    time: dayjs.Dayjs = dayjs()
): string => {
    return dayjs(time).subtract(difference, unit).utc().format();
};
