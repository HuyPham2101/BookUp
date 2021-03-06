import { Offer } from "../../../components/EntityTypes"
import { Button, Card, message, Input } from "antd"
import { DeleteTwoTone } from "@ant-design/icons"
import { useContext } from "react";
import { authContext } from "../../../contexts/AuthenticationContext";

export const OfferItem: React.FC<{ offer: Offer, fetchOffers: () => void }> = ({ offer, fetchOffers }) => {
    const {token, actions} = useContext(authContext);
    const copyLink = () => {
        navigator.clipboard.writeText(`http://localhost:3000/booking/${offer.id}`);
        message.success("Link copied!", 1.5);
        // doit();
        
        
        // console.log(navigator.clipboard.readText().then)
    }

    // const doit = async () => {
    //     let eventId
    //     const ti = await navigator.clipboard.readText().then(text => {
    //     eventId = text.split('/')[4]
    //         return eventId
    //     });
    //     console.log(ti)
    //     return ti
    // }
    const deleteOffer = async () => {
        const userId = actions.getTokenData()?.id;
        await fetch(`/api/user/${userId}/eventType/${offer.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" , Authorization : token!},

            
        })
        fetchOffers();
    }

    const { TextArea } = Input;

    return (
        <Card
            title={offer.title}
            extra={<Button onClick={deleteOffer} ><DeleteTwoTone twoToneColor="red" /></Button>}
            style={{ display: 'inline-block', width: 300, minHeight: 200, margin: 8, boxShadow: "5px 8px 8px #c4c4c4 " }}
        >
            <div style={{ textAlign: 'center' }}>
                <TextArea value={offer.description} style={{ border: 'none', textAlign: 'center', minHeight: 70 }} readOnly></TextArea>
                <div style={{ margin: 10 }}>{offer.duration} minutes</div>
                <Button type='primary' onClick={copyLink} style={{ margin: 10 }}>
                    Copy Link
                </Button>
            </div>
        </Card>
    )
}