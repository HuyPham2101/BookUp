import { List, Card, Menu, Breadcrumb } from 'antd';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Copyright } from '../../components/CopyrightComponent';
import { authContext } from '../../contexts/AuthenticationContext';
import { DayAvailability, DayRow } from './components/DayRow';


export const AvailabilityPage = () => {
    const { actions: { logout } } = useContext(authContext)
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
        <Layout style={{ height: '100%' }}>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to="/dashboard">Dashboard</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/Availability">Availability</Link></Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                    <Menu.Item key="4" style={{ float: "right" }} onClick={() => logout()}>Log Out</Menu.Item>
                </Menu>
            </Header>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>Availability</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        marginLeft: '12%',
                        marginRight: '12%',
                        minHeight: 280,
                    }}
                >
                    <div style={{ display: 'flex', alignContent: 'center', justifyContent: "center" }} >
                        <Card title="Set your weekly Hours" style={{ width: 500 }}>
                            <List>
                                {daysAvailability.map((day) => (
                                    <List.Item key={day.id}> <DayRow day={day} fetchDays={() => { fetchAvailability() }} userid={userid} /></List.Item>
                                ))}
                            </List>
                        </Card>
                    </div>
                </Content>
            </Layout>
            <Layout>
                <Footer>
                    <Copyright />
                </Footer>
            </Layout>
        </Layout >
    )
}


