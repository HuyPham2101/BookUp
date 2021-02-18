
export type Offer = {
    id: number;
    title: string;
    description: string;
    duration: number;
    link: string;
    user: User;
}

export type User = {
    id: number;
    userName: string;
    email: string;
    password: string;
    imageId: ProfilePhoto;
}

export type ProfilePhoto = {
    id: number;
    url: string;
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

export enum Status {
    Inprocess,
    Done
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
