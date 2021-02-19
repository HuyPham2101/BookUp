import { List, Card } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { PageLayout } from '../../components/PageLayout';
import { authContext } from '../../contexts/AuthenticationContext';
import { DayAvailability, DayRow } from './components/DayRow';


export const AvailabilityPage = () => {
    const token = useContext(authContext);
    const [daysAvailability, setDaysAvailability] = useState<DayAvailability[]>([]);
    const [userid, setUserId] = useState<number>(0)

    const fetchAvailability = async function () {
        let tempUserId = 0;
        const decode = token.actions.getTokenData();
        if (decode != null) {
            tempUserId = decode.id;
        }
        setUserId(tempUserId)
        const availabilityRequest = await fetch("/api/availability/" + tempUserId, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (availabilityRequest.status === 200) {
            const availabilityJSON = await availabilityRequest.json();
            setDaysAvailability(availabilityJSON.data);
        }
    }

    useEffect(() => {
        fetchAvailability();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <PageLayout index={2}>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: "center" }} >
                <Card title="Set your weekly Hours" style={{ width: 500 }}>
                    <List>
                        {daysAvailability.map((day) => (
                            <List.Item key={day.id}> <DayRow day={day} fetchDays={() => { fetchAvailability() }} userid={userid} /></List.Item>
                        ))}
                    </List>
                </Card>
            </div>
        </PageLayout>
    )
}


