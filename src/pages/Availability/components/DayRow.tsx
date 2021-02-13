import React, { useState } from 'react';
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

export type DayItemProps = {
    day: DayAvailability;
    fetchDays: () => void;
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
}

export const DayRow: React.FC<DayItemProps> = ({
    day, fetchDays = () => {

    }

}) => {
 
    const [checkedBox, setCheckedBox] = useState(true);

    return (
    <div>
        <form action="" style = {{display:'flex' , justifyContent: 'space-evenly'}}>
            <Checkbox onChange= {(e) => setCheckedBox(e.target.checked)} defaultChecked={true}/>
            <div style= {{position:"absolute", top: '50%'}}>
            {day.day}
            </div>
            {checkedBox && 
            <RangePicker defaultValue={[moment(day.fromTimeHour), moment(day.endTimeHour)]} showSecond = {false} showNow= {false} style = {{}}/>            
            }
            
            {!checkedBox && (
                <p>Unavailable!</p>
            )}
            
        </form>
    </div>
    )

}

// export const DayRow = ( dayAvailability: DayAvailability ) => {
//     const [checkedBox, setCheckedBox] = useState(true);

//     return (
//     <div>
//         <form action="" style = {{display:'flex' , justifyContent: 'space-evenly'}}>
//             <Checkbox onChange= {(e) => setCheckedBox(e.target.checked)}/>
//             {dayAvailability.day}
//             <RangePicker defaultValue={[moment(dayAvailability.fromTimeHour), moment(dayAvailability.endTimeHour)]} showSecond = {false} showNow= {false} style = {{}}/>
            
//             {!checkedBox && (
//                 <p>Unvailable!</p>
//             )}
//         </form>
//     </div>
//     )
// }