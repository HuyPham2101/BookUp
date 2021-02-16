import { Form, Input } from "antd"
import { User } from "../../../components/EntityTypes"

export const SettingsForm: React.FC<{ user: User | undefined }> = ({ user }) => {
    if (user) {
        return (
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item label="Username">
                    <Input defaultValue={user.userName} />
                </Form.Item>
                <Form.Item label="E-Mail">
                    <Input defaultValue={user.email} />
                </Form.Item>
                <Form.Item label="Password">
                    <Input.Password defaultValue={user.password} />
                </Form.Item>
            </Form>
        )
    }
    return <></>
}

