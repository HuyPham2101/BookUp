import { TimePicker,  List ,Card} from 'antd';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../contexts/AuthenticationContext';
import { Day, DayAvailability, DayRow } from './components/DayRow';
import jwt_decode from "jwt-decode";

const { RangePicker } = TimePicker;

export const AvailabilityPage = () => {
    const {token} = useContext(authContext);
    const [daysAvailability, setDaysAvailability] = useState<DayAvailability[]>([]);
    const [userid, setUserId] = useState()

    const fetchAvailability = async function () {
        let decoded : any = jwt_decode(token || "");
        setUserId(decoded.id)
        const availabilityRequest = await fetch("/api/availability/" + decoded.id, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
        if (availabilityRequest.status === 200) {
            const availabilityJSON = await availabilityRequest.json();
            console.log(availabilityJSON.data);
            setDaysAvailability(availabilityJSON.data);
            console.log(daysAvailability);

        }
    }

    useEffect(() => {
        fetchAvailability();
    }, []);
    

    return(
        <div style = {{display :'flex', alignContent : 'center', justifyContent : "center"}} >
            <Card title="Set your weekly Hours" extra={<a href="#">More</a>} style={{ width: 500 }}>
            <List>
            {/* <List.Item> <DayRow title = "Mon"/> </List.Item>
            <List.Item> <DayRow title = "Tue"/> </List.Item>
            <List.Item> <DayRow title = "Wed"/> </List.Item>
            <List.Item> <DayRow title = "Thu"/> </List.Item>
            <List.Item> <DayRow title = "Fri"/> </List.Item>
            <List.Item> <DayRow title = "Sat"/> </List.Item>
            <List.Item> <DayRow title = "Sun"/> </List.Item> */}
            {/* {daysAvailability.map((dayAvailability) => {
                <List.Item> <DayRow {...dayAvailability} /> </List.Item>
            })} */}

            {daysAvailability.map((day)=> (
                <List.Item key={day.id}> <DayRow day={day} fetchDays={() => {fetchAvailability()}} userid= {userid} /></List.Item>
            ))}
            {/* <List.Item> <DayRow {daysAvailability[1]} /> </List.Item> */}
            </List>
            </Card>
        </div>
    )
}


