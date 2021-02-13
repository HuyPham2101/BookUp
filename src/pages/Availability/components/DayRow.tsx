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
    userid: number | undefined;
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

// const timechanges = async (time:any,timestring:any) => {
//     let startTimeHour = timestring[0].substring(0,2)
//     let startTimeMinute = timestring[0].substring(2,5)

//     let endTimeHour = timestring[1].substring(0,2)
//     let endTimeMinute = timestring[1].substring(2,5)

//     console.log("starttimehour:" + startTimeHour)
//     console.log("Starttimeminute:" + startTimeMinute)

//     console.log("starttimehour:" + endTimeHour)
//     console.log("Starttimeminute:" + endTimeMinute)

// } 

export const DayRow: React.FC<DayItemProps> = ({
    day, fetchDays = () => {}, userid
}) => {
    
const [values, setValues] = useState({ startTimeHour: 0, startTimeMinute: 0, endTimeHour: 0, endTimeMinute: 0, day: "" });

const timechanges = async (time:any,timestring:any) => {
    let startTimeHour = Number(timestring[0].substring(0,2))
    let startTimeMinute = Number(timestring[0].substring(3,5))

    let endTimeHour = Number(timestring[1].substring(0,2))
    let endTimeMinute = Number(timestring[1].substring(3,5))

    console.log("starttimehour:" + startTimeHour)
    console.log("Starttimeminute:" + startTimeMinute)

    console.log("starttimehour:" + endTimeHour)
    console.log("Starttimeminute:" + endTimeMinute)
    // console.log(day.day)
    console.log(userid)

    setValues({ ...values, startTimeHour: startTimeHour, startTimeMinute:startTimeMinute, endTimeHour:endTimeHour, endTimeMinute:endTimeMinute, day: day.day });
    const updateTime = await fetch(`/api/availability/update/${userid}`, {
        headers: { 'content-type': 'application/json' },
        method: "PATCH", 
        body: JSON.stringify(values),
    });
    console.log(JSON.stringify(values));
    const updatedTime = await updateTime.json()
    // console.log(updatedTime)
} 


    const [checkedBox, setCheckedBox] = useState(true);
    let temp = moment().hours(day.fromTimeHour).minutes(day.fromTimeMinute).second(0);
    let tempend = moment().hours(day.endTimeHour).minutes(day.endTimeMinute).second(0);
    return (
    <div>
        <form action="" style = {{display:'flex' , justifyContent: 'space-evenly', position : 'relative'}}>
            <div style= {{position:'absolute' , left : 0}}>
            <Checkbox onChange= {(e) => setCheckedBox(e.target.checked)} defaultChecked={true} style = {{marginRight : "5px"}} />
            {day.day}
            </div>
            {checkedBox && 
            <RangePicker allowClear = {false} defaultValue={[temp,tempend]} format = "HH:mm" showSecond = {false}  showNow= {false} style = {{marginLeft:'50px'}} onChange = {timechanges} />            
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