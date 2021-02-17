import { PageLayout } from "../../components/PageLayout"
import { List, Tabs } from 'antd';
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { authContext } from "../../contexts/AuthenticationContext";
import { BookedRow, Booking } from "./components/BookedRow";
const { TabPane } = Tabs;


export type BookingDateFiltered = {
    date: string,
    booking: Booking[],
}


export const BookingOfUserPage = () => {
    const token = useContext(authContext);
    const [userid, setUserId] = useState<number>(0)
    const [sortedBookingsMap, setSortedBookingsMap] = useState<Map<Date, Booking[]>>(new Map())

    const getSortedBookingsByDate = (arr: Booking[]) => {
        let sortedBookings = new Map();
        arr.forEach((item: Booking) => {
            let tempDate = new Date(item.date)

            if (sortedBookings.has(tempDate.toDateString())) {
                sortedBookings.get(tempDate.toDateString()).push(item)
            }
            else {
                let tempArr = []
                tempArr.push(item)
                sortedBookings.set(tempDate.toDateString(), tempArr)
            }
        })
        return sortedBookings;
    }

    const fetchBookings = async function () {
        let tempUserId = 0;
        const decode = token.actions.getTokenData();
        if (decode != null) {
            tempUserId = decode.id;
        }
        setUserId(tempUserId)
        const allBookingRequest = await fetch("/api/booking/all/" + tempUserId, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (allBookingRequest.status === 200) {
            const allBookingRequestJson = await allBookingRequest.json();
            setSortedBookingsMap(getSortedBookingsByDate(allBookingRequestJson.data))
        }
    }

    function callback(key: any) {
        fetchBookings()
    }

    useEffect(() => {
        fetchBookings();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /* const parseDate = (input: any) => {
        let parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based

    } */

    const showAllRows = () => {
        let bookingRows: any[] = []
        sortedBookingsMap.forEach((value, key) => {
            bookingRows.push(<h2> {key} </h2>)
            value.map((itemValue) => (
                bookingRows.push(<List.Item key={itemValue.id}>
                    <BookedRow booking={itemValue} fetchBookings={fetchBookings} userid={userid} />
                </List.Item>)
            ))
        })
        return bookingRows;
    }

    const showUpcoming = () => {
        let currentDate = new Date();
        let bookingRows: any[] = []
        let upcomingBookingsMap = new Map<Date, Booking[]>();
        sortedBookingsMap.forEach((value, key) => {
            upcomingBookingsMap.set(key, value.filter((bookingItem) => {
                //    const bookingdate = new Date(bookingItem.date)
                const bookingDate = moment(bookingItem.date).subtract(1, "hours")
                return bookingDate.toDate() >= currentDate
            }))
        })
        upcomingBookingsMap.forEach((value, key) => {
            if (value.length !== 0) {
                bookingRows.push(<h2> {key} </h2>)

                value.map((itemValue) => {
                    bookingRows.push(<List.Item key={itemValue.id}>
                        <BookedRow booking={itemValue} fetchBookings={() => fetchBookings} userid={userid} />
                    </List.Item>)

                })
            }
        })
        return bookingRows
    }

    const showPast = () => {
        let currentDate = new Date();


        let bookingRows: any[] = []
        let pastBookingsMap = new Map<Date, Booking[]>();
        sortedBookingsMap.forEach((value, key) => {
            pastBookingsMap.set(key, value.filter((bookingItem) => {
                //    const bookingdate = new Date(bookingItem.date)
                const bookingDate = moment(bookingItem.date).subtract(1, "hours")
                return bookingDate.toDate() < currentDate
            }))
        })
        pastBookingsMap.forEach((value, key) => {
            if (value.length !== 0) {
                bookingRows.push(<h2> {key} </h2>)

                value.map((itemValue) => {
                    bookingRows.push(<List.Item key={itemValue.id}>
                        <BookedRow booking={itemValue} fetchBookings={() => fetchBookings} userid={userid} />
                    </List.Item>)

                })
            }
        })
        return bookingRows
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
                    <List>
                        {showAllRows()}
                    </List>
                </TabPane>
            </Tabs>
        </PageLayout>
    )
}