import React, { ChangeEvent, useContext, useState } from "react";
import { Input } from "../../../components/Input"
import { InputNumber, Form, Button } from "antd"
import { authContext } from "../../../contexts/AuthenticationContext";

export const AddOfferForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
    const token = useContext(authContext);
    const [offer, setOffer] = useState({
        title: "",
        description: "",
        minutes: 0,
        link: ""
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOffer({ ...offer, [e.target.name]: e.target.value })
    }

    const setMinutes = (minute: any) => {
        setOffer({ ...offer, minutes: minute })
    }

    const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
        const userId = token.actions.getTokenData()?.id
        const tempOffer = {
            title: offer.title,
            description: offer.description,
            duration: offer.minutes,
            link: `http://localhost:3000/api/booking/`,
        }
        console.log(tempOffer);
        await fetch(`/api/user/${userId}/eventType`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tempOffer),
        })

        afterSubmit();
    }

    return (
        <Form
            onFinish={onFinish}
        >
            <Input
                type="text"
                name="title"
                label="Titel"
                onChange={onChange}
                required
            />
            <Input
                type="text"
                name="description"
                label="Description"
                onChange={onChange}
                required
            />
            <Form.Item>
                <InputNumber
                    name="duration"
                    min={1}
                    max={59}
                    defaultValue={15}
                    onChange={setMinutes}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}