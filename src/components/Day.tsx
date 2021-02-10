import React, { Children } from 'react';
import { TimePicker,Checkbox } from 'antd';

const { RangePicker } = TimePicker;

export const Day = (props:any) => {
    return (
    <div>
        <form action="" style = {{display:'flex' , justifyContent: 'space-evenly'}}>
            <Checkbox/>
            {props.title}
            <RangePicker showSecond = {false} showNow= {false} style = {{}}/>
        </form>
    </div>
    )
}