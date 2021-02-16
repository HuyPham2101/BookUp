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
    date: string,
    booking : Booking[],
}


// var result = objArray.map(function(a) {return a.foo;});
export const BookingOfUserPage = () => {
    const token = useContext(authContext);
    const [userid, setUserId] = useState<number>(0)
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filterBookingMap, setfilterBookingMap] = useState(new Map())
    const [date, setDate ] = useState<Date[]>([]) 



    const filterbook = (arr:Booking[]) => {
        let myMap = new Map();
        arr.forEach((item:Booking) => {
            let tempDate = new Date(item.date)
            if(myMap.has(tempDate.toDateString())) {
                myMap.get(tempDate.toDateString()).push(item)
            }
            else{
                let temparr = []
                temparr.push(item)
                myMap.set(tempDate.toDateString(), temparr)
            }
        })
        return myMap;
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
            console.log(allBookingRequestJson)
            setBookings(allBookingRequestJson.data)
            // console.log(filterbook(bookings))
            let filteredBooking = filterbook(bookings)
            filteredBooking.forEach((value: Booking[],key:string) => {
                console.log("key")
                console.log(key)
                value.forEach((valueitem)=> {
                    console.log("itemID")
                    console.log(valueitem.id)
                })
            })
        }
        setfilterBookingMap(filterbook(bookings))
        console.log(filterBookingMap)
        console.log(bookings)
    }
    useEffect(() => {
        fetchBookings();
    }, []); 

    const parseDate = (input:any) => {
        let parts = input.match(/(\d+)/g);
        // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
      
    }

    const showRow = () => {
        let html:any[] = []  
        filterBookingMap.forEach((value:Booking[],key:string) => {
            html.push(<h2> {key} </h2>)
            value.map((itemValue) => {
             html.push(<List.Item key = {itemValue.id}>
                 <BookedRow booking = {itemValue} fetchBookings = {() => fetchBookings} userid= {userid}/>
             </List.Item>)
            })
        })
        console.log("HHHss")
        return html
    }
    return(
        <PageLayout index = {3}>     
         <h3>{moment().format('dddd, D MMMM YYYY' )}</h3>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Upcoming" key="1">
                <List>
                {
                    showRow()
                }
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