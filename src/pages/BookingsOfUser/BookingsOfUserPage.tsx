import { PageLayout } from "../../components/PageLayout"
import { List, Tabs } from 'antd';
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { authContext } from "../../contexts/AuthenticationContext";
import { BookedRow, Booking, EventType, Invitee, Status} from "./components/BookedRow";
const { TabPane } = Tabs;
function callback(key:any) {
    console.log(key);
}

export type BookingDateFiltered = {
    date: Date,
    booking : Booking[],
}
// var result = objArray.map(function(a) {return a.foo;});
export const BookingOfUserPage = () => {
    const token = useContext(authContext);
    const [userid, setUserId] = useState<number>(0)
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filter, setfilter] = useState<[]>([])
    const [date, setDate ] = useState<Date[]>([]) 

    let filteredBooking = (arr:any) => arr.reduce(function (r:any, a:any) {
        r[a.date] = r[a.date] || [];
        r[a.date].push(a);
        return r;
    }, Object.create(null));

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
            console.log(allBookingRequestJson)
            setBookings(allBookingRequestJson.data)
            // console.log(" before booking")
            // console.log(bookings[0].)
            // console.log(" after booking")
            let filting223: BookingDateFiltered = filteredBooking(bookings)
            console.log(filting223)
            // let temparr = [][]
            // temparr = filting223;
            // console.log("111111")
            // for(let day of temparr){
            //     console.log(day)
            //     for(let data of day) {
            //         console.log(data)
            //     }
            // }
            console.log("test")
            console.log(filting223.booking)
            // for(let booking of bookings){
            //     console.log(booking.date)
            //     for(let invitee of booking.invitee)
            // }
            for(let[key,value] of Object.entries(filting223)){
                console.log("key")
                console.log(key)
                console.log("value")
                // console.log(value.)
            }

        }
    }
    useEffect(() => {
        fetchBookings();
    }, []); 

    const parseDate = (input:any) => {
        let parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
      
    }

    return(
        <PageLayout index = {3}>     
         <h3>{moment().format('dddd, D MMMM YYYY' )}</h3>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Upcoming" key="1">
                <List>
                {/*
                    Object.entries(filteredBooking(booking)).map(([key,value]) => {
                        return(
                        <div> {key} : {value} </div>
                        )
                    })
                } */}
                </List>
                </TabPane>
                <TabPane tab="Past" key="2">
                <List>
                </List>
                </TabPane>
                <TabPane tab="All" key="3">
                <List>
                </List>
                </TabPane>
            </Tabs>
        </PageLayout>
    )
}