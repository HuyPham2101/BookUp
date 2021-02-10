import { TimePicker,  List ,Card} from 'antd';
import { useState } from 'react';
import { Day } from '../../components/Day';

const { RangePicker } = TimePicker;

export const AvailabilityPage = () => {
    const [hour,setHour] = useState('')
    const [minute, setMinute] = useState('')

    return(
        <div style = {{display :'flex', alignContent : 'center', justifyContent : "center"}} >
            <Card title="Set your weekly Hours" extra={<a href="#">More</a>} style={{ width: 500 }}>
            <List>
            <List.Item> <Day title = "Mon"/> </List.Item>
            <List.Item> <Day title = "Tue"/> </List.Item>
            <List.Item> <Day title = "Wed"/> </List.Item>
            <List.Item> <Day title = "Thu"/> </List.Item>
            <List.Item> <Day title = "Fri"/> </List.Item>
            <List.Item> <Day title = "Sat"/> </List.Item>
            <List.Item> <Day title = "Sun"/> </List.Item>
            </List>
            </Card>
        </div>
    )
}


