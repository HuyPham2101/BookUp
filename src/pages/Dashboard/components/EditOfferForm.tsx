import { Button, Col, Form, InputNumber, Row, Slider } from "antd";
import { ChangeEvent, useContext, useState } from "react";
import { CustomInput } from "../../../components/CustomInput";
import { Offer } from "../../../components/EntityTypes";
import { authContext } from "../../../contexts/AuthenticationContext";

export const EditOfferForm: React.FC<{ clickedOffer: Offer, afterSubmit: () => void }> = ({ clickedOffer, afterSubmit }) => {
    const token = useContext(authContext);
    const [offer, setOffer] = useState(clickedOffer);

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
            link: "",
        }
        console.log(tempOffer);
        await fetch(`/api/user/${userId}/eventType/${offer.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
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
                value={offer.title}
                onChange={onChange}
                required
            />
            <CustomInput
                type="text"
                name="description"
                label="Description"
                value={offer.description}
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