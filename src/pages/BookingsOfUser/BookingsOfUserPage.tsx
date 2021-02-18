import { PageLayout } from "../../components/PageLayout"
import { Button, List, Tabs } from 'antd';
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { authContext } from "../../contexts/AuthenticationContext";
import { Booking } from "../../components/EntityTypes";
const { TabPane } = Tabs;


export type BookingDateFiltered = {
    date: string,
    booking: Booking[],
}

export const BookingOfUserPage = () => {
    const token = useContext(authContext);
    const [groupedBookingsMap, setGroupedBookingsMap] = useState<Map<Date, Booking[]>>(new Map())

    const getBookingsGroupedByDate = (arr: Booking[]) => {
        let groupedBookings = new Map();
        arr.forEach((item: Booking) => {

            console.log("item.date: ", item.date);
            console.log("new date: ", new Date());

            if (groupedBookings.has(item.date.toDateString())) {
                groupedBookings.get(item.date.toDateString()).push(item)
            }
            else {
                let tempArr = []
                tempArr.push(item)
                groupedBookings.set(item.date.toDateString(), tempArr)
            }
        })
        return groupedBookings;
    }

    const fetchBookings = async function () {
        let tempUserId = 0;
        const decode = token.actions.getTokenData();
        if (decode != null) {
            tempUserId = decode.id;
        }
        const allBookingRequest = await fetch("/api/booking/all/" + tempUserId, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (allBookingRequest.status === 200) {
            const allBookingRequestJson = await allBookingRequest.json();
            let bookings: Booking[] = allBookingRequestJson.data;
            for (let booking of bookings) {
                booking.date = new Date(booking.date);
                booking.date.setHours(booking.date.getHours() - 1);
            }
            bookings.sort((booking1: Booking, booking2: Booking) => {
                if (booking1.date < booking2.date) {
                    return -1;
                }
                if (booking1.date > booking2.date) {
                    return 1;
                }
                return 0;
            });
            setGroupedBookingsMap(getBookingsGroupedByDate(bookings));
        }
    }

    function callback(key: any) {
        fetchBookings()
    }

    useEffect(() => {
        fetchBookings();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getBookingRowFormattedJson = (booking: Booking) => {
        let endTime = new Date(booking.date);
        endTime.setMinutes(endTime.getMinutes() + booking.eventType.duration);

        const time = booking.date.toLocaleTimeString("de-DE").substring(0, 5) + " - " + endTime.toLocaleTimeString("de-De").substring(0, 5);
        const invitee = booking.invitee.firstName + " " + booking.invitee.lastName;

        const bookingRowJson =
        {
            "id": booking.id,
            "time": time,
            "title": booking.eventType.title,
            "description": booking.eventType.description,
            "invitee": invitee
        }

        return bookingRowJson;
    }

    const deleteBooking = async (bookingId : number) => {
        await fetch(`/api/booking/${bookingId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        });
        fetchBookings();
    }

    const generateBookingList = (bookingMap: Map<Date, Booking[]>) => {
        // const [detailModal, setDetailModal] = useState<boolean>(false);
        let formattedBookings: any[] = [];
        let jsxElementResultList : JSX.Element[] = [];
        bookingMap.forEach((bookings, date) => {
            if(bookings.length !== 0){
                for (let booking of bookings) {
                    formattedBookings.push(getBookingRowFormattedJson(booking))
                }
                jsxElementResultList.push(
                    <List
                    //  style = {{borderColor: "black", borderInlineColor: "black"}}
                    size="default"
                    header={date}
                    footer={" "}
                    bordered
                    dataSource={formattedBookings}
                    renderItem={item =>
                        <List.Item>
                            {/* {detailModal && (
                                <Modal title={item.title} onCancel={() => {setDetailModal(false);}}></Modal>
                            )} */}
                            <h4>{item.time}</h4>
                            <List.Item.Meta title={item.title} style={{ fontWeight: "bold" }} />
                            <List.Item.Meta description={item.description} />
                            {item.invitee}
                            <Button
                             danger
                             onClick={() => {deleteBooking(item.id)}}
                             style={{float: "right"}}
                            >
                                Delete
                            </Button>
                        </List.Item>} />
                );
                formattedBookings = [];
            }
        });

        return jsxElementResultList;
    }

    const showUpcoming = () => {
        let currentDate = new Date();

        let upcomingBookingsMap = new Map<Date, Booking[]>();
        groupedBookingsMap.forEach((bookings, date) => {
            upcomingBookingsMap.set(date, bookings.filter((bookingItem) => {
                //    const bookingdate = new Date(bookingItem.date)
                const bookingDate = moment(bookingItem.date).subtract(1, "hours")
                console.log(bookingDate)
                return bookingDate.toDate() >= currentDate
            }))
        })
  
        return  generateBookingList(upcomingBookingsMap);
    }

    const showPast = () => {
        let currentDate = new Date();

        // let bookingRows: any[] = []
        let pastBookingsMap = new Map<Date, Booking[]>();
        groupedBookingsMap.forEach((bookings, date) => {
            pastBookingsMap.set(date, bookings.filter((bookingItem) => {
                //    const bookingdate = new Date(bookingItem.date)
                const bookingDate = moment(bookingItem.date).subtract(1, "hours")
                console.log(bookingDate)
                return bookingDate.toDate() < currentDate
            }))
        })
    
        return generateBookingList(pastBookingsMap);
    } 

    return (
        <PageLayout index={3}>
            <h3>{moment().format('dddd, D MMMM YYYY')}</h3>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Upcoming" key="1">
                    <List>
                        {showUpcoming()}
                    </List>
                </TabPane>
                <TabPane tab="Past" key="2">
                    <List>
                        {showPast()}
                    </List>
                </TabPane>
                <TabPane tab="All" key="3">
                    {generateBookingList(groupedBookingsMap)}
                </TabPane>
            </Tabs>
        </PageLayout>
    )
}