import React from 'react';
import { TimePicker, Checkbox, message } from 'antd';
import moment from 'moment';

const { RangePicker } = TimePicker;

export enum Day {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    STATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}

export type DayItemProps = {
    day: DayAvailability;
    fetchDays: () => void;
    userid: number;
}

export type DayAvailability = {
    day: Day,
    fromTimeHour: number,
    fromTimeMinute: number,
    endTimeHour: number,
    endTimeMinute: number,
    id: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    active: boolean
}

export const DayRow: React.FC<DayItemProps> = ({
    day, fetchDays, userid
}) => {
    const timeChanges = async (_: any, timestring: any) => {
        let startTimeHour = Number(timestring[0].substring(0, 2))
        let startTimeMinute = Number(timestring[0].substring(3, 5))

        let endTimeHour = Number(timestring[1].substring(0, 2))
        let endTimeMinute = Number(timestring[1].substring(3, 5))

        await fetch(`/api/availability/update/${userid}`, {
            headers: { 'content-type': 'application/json' },
            method: "PATCH",
            body: JSON.stringify({
                fromTimeHour: startTimeHour,
                fromTimeMinute: startTimeMinute,
                endTimeHour: endTimeHour,
                endTimeMinute: endTimeMinute,
                day: day.day
            }),
        });
        message.success("Changes saved!", 1.5);
    }
    const checkBoxChanges = async (checked: boolean) => {
        await fetch(`/api/availability/update/${userid}`, {
            headers: { 'content-type': 'application/json' },
            method: "PATCH",
            body: JSON.stringify({
                day: day.day,
                active: checked
            }),
        });
        fetchDays();
        message.success("Changes saved!", 1.5);
    }


    let startTimeValue = moment().hours(day.fromTimeHour).minutes(day.fromTimeMinute).second(0);
    let endTimeValue = moment().hours(day.endTimeHour).minutes(day.endTimeMinute).second(0);
    return (
        <div>
            <form action="" style={{ display: 'flex', justifyContent: 'space-evenly', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0 }}>
                    <Checkbox onChange={(e) => checkBoxChanges(e.target.checked)} checked={day.active} style={{ marginRight: "5px" }} />
                    {day.day}
                </div>
                {day.active &&
                    <RangePicker allowClear={false} inputReadOnly={true} minuteStep={15} defaultValue={[startTimeValue, endTimeValue]} format="HH:mm" showSecond={false} showNow={false} style={{ marginLeft: '50px' }} onChange={timeChanges} />
                }
                {!day.active && (
                    <p>Unavailable!</p>
                )}
            </form>
        </div>
    )
}