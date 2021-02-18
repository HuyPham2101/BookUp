import React, { ChangeEvent, useContext, useState } from "react";
import { CustomInput } from "../../../components/CustomInput"
import { Form, Button, Slider, InputNumber, Row, Col } from "antd"
import { authContext } from "../../../contexts/AuthenticationContext";

export const AddOfferForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
    const token = useContext(authContext);
    const [offer, setOffer] = useState({
        title: "",
        description: "",
        duration: 15,
        link: ""
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOffer({ ...offer, [e.target.name]: e.target.value })
    }

    const setMinutes = (minute: any) => {
        setOffer({ ...offer, duration: minute })
    }

    const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
        const userId = token.actions.getTokenData()?.id

        const tempOffer = {
            title: offer.title,
            description: offer.description,
            duration: offer.duration,
            link: `http://localhost:3000/api/user/${userId}/booking/offer/${getTitleWithoutSpace(offer.title)}/${offer.duration}`,
        }
        console.log(tempOffer);
        await fetch(`/api/user/${userId}/eventType`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tempOffer),
        })

        afterSubmit();
    }

    const getTitleWithoutSpace = (title: string) => {
        return title.split(' ').join('_');
    }

    return (
        <Form
            onFinish={onFinish}
        >
            <CustomInput
                type="text"
                name="title"
                label="Titel"
                onChange={onChange}
                required
            />
            <CustomInput
                type="text"
                name="description"
                label="Description"
                onChange={onChange}
                required
            />
            <Form.Item
                name="duration"
                label="Duration"
            >
                <Row>
                    <Col span={16}>
                        <Slider
                            min={10}
                            max={90}
                            onChange={setMinutes}
                            step={5}
                            value={offer.duration}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            name="duration"
                            min={10}
                            max={90}
                            value={offer.duration}
                            step={5}
                            onChange={setMinutes}
                        />
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
