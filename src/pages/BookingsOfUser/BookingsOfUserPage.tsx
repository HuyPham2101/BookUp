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
    const [groupedBookingsMap, setGroupedBookingsMap] = useState<Map<Date, Booking[]>>(new Map())

    const getBookingsGroupedByDate = (arr: Booking[]) => {
        let groupedBookings = new Map();
        arr.forEach((item: Booking) => {

            console.log("item.date: ", item.date);
            console.log("new date: " , new Date());

            if (groupedBookings.has(item.date)) {
                groupedBookings.get(item.date).push(item)
            }
            else {
                let tempArr = []
                tempArr.push(item)
                groupedBookings.set(item.date, tempArr)
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
        setUserId(tempUserId)
        const allBookingRequest = await fetch("/api/booking/all/" + tempUserId, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (allBookingRequest.status === 200) {
            const allBookingRequestJson = await allBookingRequest.json();
            let bookings: Booking[] = allBookingRequestJson.data;
            for(let booking of bookings){
                booking.date = new Date(booking.date);
                booking.date.setHours(booking.date.getHours() - 1);
            }
            bookings.sort((booking1: Booking, booking2: Booking) => {
                if(booking1.date < booking2.date){
                    return -1;
                }
                if( booking1.date > booking2.date){
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
        console.log("use Effect")
        fetchBookings();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /* const parseDate = (input: any) => {
        let parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based

    } */

    const getBookingRowFormattedString = (booking: Booking) => {
        let endTime = new Date(booking.date);
        console.log("ENDTIME VOR SET: ", endTime);
        console.log("DURATION:", booking.eventType.duration);
        endTime.setMinutes(endTime.getMinutes() + booking.eventType.duration);
       
        console.log("ENDTIME NACH SET: ", endTime);
        const time = booking.date.toLocaleTimeString("de-DE").substring(0,5) + " - " + endTime.toLocaleTimeString("de-De").substring(0,5);
        console.log("RESULTAT TIME: ", time);
        const invitee = booking.invitee.firstName + " " + booking.invitee.lastName;

        

        const bookingRowJson =
        {
            "time": time,
            "title": booking.eventType.title,
            "description": booking.eventType.description,
            "invitee": invitee
        } 
        //  booking.date.toLocaleTimeString("de-DE").substring(0,5) + " - " + endTime.toLocaleTimeString("de-De").substring(0,5) + "\n"
        //  + "Event: " + booking.eventType.title + "\n" 
        //  + "Description: " + booking.eventType.description + "\n" 
        //  + "Invitee: " + booking.invitee.firstName + " " + booking.invitee.lastName + "\n";

        return bookingRowJson;
    }

    const showAllRows = () => {
        let bookingRows: any[] = []
        let formattedBookings: any[] = [];
        groupedBookingsMap.forEach((value, key) => {
            for(let booking of value){
                formattedBookings.push(getBookingRowFormattedString(booking))
            }
 //           bookingRows.push(<h2> {key} </h2>)
            bookingRows.push(
                <List 
                //  style = {{borderColor: "black", borderInlineColor: "black"}}
                 size = "default"
                 header={key.toDateString()}
                 footer={" "}
                 bordered
                 dataSource={formattedBookings}
                 renderItem={item => 
                 <List.Item>
                     <h4>{item.time}</h4>
                     <List.Item.Meta title = {item.title} style={{fontWeight: "bold"}}/>
                     <List.Item.Meta description= {item.description} />
                     {item.invitee}
                </List.Item>}/>
            )
            // value.map((itemValue) => (
            //     bookingRows.push(<List.Item key={itemValue.id}>
            //         <BookedRow booking={itemValue} fetchBookings={fetchBookings} userid={userid} />
            //     </List.Item>)
            // ))
            formattedBookings = [];
        })
        console.log("BOOKINGROWSSSS", bookingRows);
        console.log("FORMATTEDVOOOOKIGNGSSS",formattedBookings);
        return bookingRows;
    }

     const showUpcoming = () => {
        let currentDate = new Date();
        console.log("CurrentDate: " + currentDate);


        let bookingRows: any[] = []
        let upcomingBookingsMap = new Map<Date,Booking[]>();
        groupedBookingsMap.forEach((value,key) => {
            console.log("dateofBOok")
            console.log(value[0].date)
           upcomingBookingsMap.set(key, value.filter((bookingItem) => {
            //    const bookingdate = new Date(bookingItem.date)
            const bookingDate = moment(bookingItem.date).subtract(1,"hours")
               console.log(bookingDate)
               return bookingDate.toDate() >= currentDate
           }))
        })
        upcomingBookingsMap.forEach((value , key) => {
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
        console.log("CurrentDate: " + currentDate);


        let bookingRows: any[] = []
        let pastBookingsMap = new Map<Date,Booking[]>();
        groupedBookingsMap.forEach((value,key) => {
            console.log("dateofBOok")
            console.log(value[0].date)
            pastBookingsMap.set(key, value.filter((bookingItem) => {
            //    const bookingdate = new Date(bookingItem.date)
            const bookingDate = moment(bookingItem.date).subtract(1,"hours")
               console.log(bookingDate)
               return bookingDate.toDate() < currentDate
           }))
        })
        pastBookingsMap.forEach((value , key) => {
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
                        {showAllRows()}
                </TabPane>
            </Tabs>
        </PageLayout>
    )
}