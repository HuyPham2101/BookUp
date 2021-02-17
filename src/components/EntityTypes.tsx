
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