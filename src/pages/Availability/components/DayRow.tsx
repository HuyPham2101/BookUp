import React, { Children } from 'react';
import { TimePicker,Checkbox } from 'antd';
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

export type DayAvailability = {
     day: Day,
     fromTimeHour: number,
     fromTimeMinute: number,
     endTimeHour: number,
     endTimeMinute: number,
}

export const DayRow = ( dayAvailability: DayAvailability ) => {
    return (
    <div>
        <form action="" style = {{display:'flex' , justifyContent: 'space-evenly'}}>
            <Checkbox/>
            {dayAvailability.day}
            <RangePicker defaultValue={[moment(dayAvailability.fromTimeHour), moment(dayAvailability.endTimeHour)]} showSecond = {false} showNow= {false} style = {{}}/>
        </form>
    </div>
    )
}