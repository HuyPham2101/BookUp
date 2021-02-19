import React, { ChangeEvent, useContext, useState } from "react";
import { CustomInput } from "../../../components/CustomInput"
import { Form, Button, Slider, InputNumber, Row, Col } from "antd"
import { authContext } from "../../../contexts/AuthenticationContext";

export const AddOfferForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
    const {token, actions} = useContext(authContext);
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
        const userId = actions.getTokenData()?.id

        const tempOffer = {
            title: offer.title,
            description: offer.description,
            duration: offer.duration,
            link: "",
        }
        console.log(tempOffer);
        await fetch(`/api/user/${userId}/eventType`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , Authorization : token!},
            body: JSON.stringify(tempOffer),
        })

        afterSubmit();
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
                            data-cy="Select-Minute-Testing"
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
