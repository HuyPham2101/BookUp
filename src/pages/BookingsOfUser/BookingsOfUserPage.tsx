import { PageLayout } from "../../components/PageLayout"
import { List, Tabs } from 'antd';
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { authContext } from "../../contexts/AuthenticationContext";
import { BookedRow, Booking, EventType, Invitee, Status} from "./components/BookedRow";
const { TabPane } = Tabs;


export type BookingDateFiltered = {
    date: string,
    booking : Booking[],
}


// var result = objArray.map(function(a) {return a.foo;});
export const BookingOfUserPage = () => {
    const token = useContext(authContext);
    const [userid, setUserId] = useState<number>(0)
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [sortedBookingsMap, setSortedBookingsMap] = useState(new Map())
    const [date, setDate ] = useState<Date[]>([]) 



    const getSortedBookingsByDate = (arr:Booking[]) => {
        let sortedBookings = new Map();
        arr.forEach((item:Booking) => {
            let tempDate = new Date(item.date)
            console.log("tempDate in Sort Function: " + tempDate);
            console.log("item.date: " + item.date);

            if(sortedBookings.has(tempDate.toDateString())) {
                sortedBookings.get(tempDate.toDateString()).push(item)
            }
            else{
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
            console.log("JSON String: ")
            console.log(allBookingRequestJson)
            console.log("JSON Data:")
            console.log(allBookingRequestJson.data)
            setBookings(allBookingRequestJson.data)
            console.log("After Set Bookings: ")
            console.log(bookings);
            // console.log(filterbook(bookings))
            // let filteredBooking = getSortedBookingsByDate(bookings)
            // filteredBooking.forEach((value: Booking[],key:string) => {
            //     console.log("key")
            //     console.log(key)
            //     value.forEach((valueitem)=> {
            //         console.log("itemID")
            //         console.log(valueitem.id)
            //     })
            // })
        }
        setSortedBookingsMap(getSortedBookingsByDate(bookings))
        console.log("Bookins from DB: ")
        console.log(bookings)
        console.log("Sorted Bookings: ")
        console.log(sortedBookingsMap)
    }

    function callback(key:any) {
        fetchBookings()
    }

    useEffect(() => {
        console.log("use Effect")
        fetchBookings();
    }, []); 

    const parseDate = (input:any) => {
        let parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
      
    }

    const showAllRows = () => {
        let bookingRows : any[] = []  
        sortedBookingsMap.forEach((value:Booking[],key:string) => {
            bookingRows.push(<h2> {key} </h2>)
            value.map((itemValue) => {
            bookingRows.push(<List.Item key = {itemValue.id}>
                 <BookedRow booking = {itemValue} fetchBookings = {() => fetchBookings} userid= {userid}/>
             </List.Item>)
            })
        })
        return bookingRows;
    }

    const showUpcoming = () => {
        let currentDate = new Date();
        console.log("CurrentDate: " + currentDate);
        

        let html:any[] = []  
        sortedBookingsMap.forEach((value:Booking[],key:string) => {
            let keyDate = new Date(key);
            console.log("key: " + key);
            console.log("KeyDate: " + keyDate);

            if(currentDate <= keyDate) {
                html.push(<h2> {key} </h2>)
            
                value.map((itemValue) => {
                    html.push(<List.Item key = {itemValue.id}>
                        <BookedRow booking = {itemValue} fetchBookings = {() => fetchBookings} userid= {userid}/>
                    </List.Item>)
            
                })
            }
            
        })
        return html
    }

    const showPast = () => {
        let currentDate = new Date();
        let html:any[] = []  
        sortedBookingsMap.forEach((value:Booking[],key:string) => {
            html.push(<h2> {key} </h2>)
            value.map((itemValue) => {
                if(itemValue.date < currentDate) {
                    html.push(<List.Item key = {itemValue.id}>
                        <BookedRow booking = {itemValue} fetchBookings = {() => fetchBookings} userid= {userid}/>
                    </List.Item>)
                }
            })
        })
        return html
    }


    return(
        <PageLayout index = {3}>     
         <h3>{moment().format('dddd, D MMMM YYYY' )}</h3>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Upcoming" key="1">
                <List>
                    {
                    showAllRows()
                    }
                    
                </List>
                </TabPane>
                <TabPane tab="Past" key="2">
                <List>
                    {
                    showPast()
                    }
                </List>
                </TabPane>
                <TabPane tab="All" key="3">
                <List>
                    {
                    showAllRows()
                    }
                </List>
                </TabPane>
            </Tabs>
        </PageLayout>
    )
}