import { List, Card, Menu, Breadcrumb } from 'antd';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Copyright } from '../../components/CopyrightComponent';
import { PageLayout } from '../../components/PageLayout';
import { authContext } from '../../contexts/AuthenticationContext';
import { DayAvailability, DayRow } from './components/DayRow';


export const AvailabilityPage = () => {
    const { actions: { logout } } = useContext(authContext)
    const {token, actions} = useContext(authContext);
    const [daysAvailability, setDaysAvailability] = useState<DayAvailability[]>([]);
    const [userid, setUserId] = useState<number>(0)

    const fetchAvailability = async function () {
        let tempUserId = 0;
        const decode = actions.getTokenData();
        if (decode != null) {
            tempUserId = decode.id;
        }
        setUserId(tempUserId)
        const availabilityRequest = await fetch("/api/availability/" + tempUserId, {
            method: "GET",
            headers: { "Content-Type": "application/json" , Authorization : token!},
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
        <PageLayout index = {2}>
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


