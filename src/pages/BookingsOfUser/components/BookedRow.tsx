
import React from 'react';
import moment from 'moment';

export enum Status {
    Inprocess,
    Done
}


export type BookItemProps = {
    booking: Booking;
    fetchBookings: () => void;
    userid: number;
}

export type EventType = {
    id: number;
    title: string;
    description: string;
    duration: number;
    link: string;
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}

export type Invitee = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}
export type Booking = {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    date: Date,
    eventType: EventType,
    status: Status,
    invitee: Invitee
}

export const BookedRow: React.FC<BookItemProps> = ({
    booking, fetchBookings, userid
}) => {
    const getEndTime = () : string => {
        let endTime = booking.date;
        endTime.setMinutes(booking.date.getMinutes() + booking.eventType.duration);
        return endTime.toLocaleTimeString("de-De").substring(0,5);
    }
    //{moment(booking.date).subtract(1,"hours").add(booking.eventType.duration, "minutes").format("HH:mm")
    return (
        // <form action="" style={{ display: 'flex', justifyContent: 'space-evenly', position: 'relative' }}>
            <div>
                <p>{ booking.date.toLocaleTimeString("de-DE").substring(0,5) } - {getEndTime() } </p>
                <p>{booking.invitee.firstName}</p>
                <p>{booking.invitee.lastName}</p>
            </div>
        // </form>
    )
}                                             