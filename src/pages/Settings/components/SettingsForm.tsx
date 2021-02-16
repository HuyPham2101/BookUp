import { Button, Form, Input, message, Space } from "antd"
import { User } from "../../../components/EntityTypes"

export const SettingsForm: React.FC<{ fetchUser: () => void, user: User | undefined }> = ({ user, fetchUser }) => {

    const saveChanges = async () => {
        const userName = (document.getElementById("userNameInput") as HTMLInputElement).value;
        const password = (document.getElementById("passwordInput") as HTMLInputElement).value;
        let savingUser;
        if (!password) {
            savingUser = { userName: userName }
        } else {
            savingUser = {
                userName: userName,
                password: password
            }
        }
        await fetch(`/api/user/${user?.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(savingUser),
        })
        message.success("Changes saved!")
        document.getElementById("saveBtn")?.setAttribute("disabled", "disabled")
        fetchUser();
    }

    const enableSaveButton = () => {
        document.getElementById("saveBtn")?.removeAttribute("disabled")
    }

    if (user) {
        return (
            <Form
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 6 }}
                labelAlign="left"
                onFinish={saveChanges}
                onChange={enableSaveButton}
                style={{ margin: 10 }}
            >
                <Form.Item label="Username">
                    <Input id="userNameInput" defaultValue={user.userName} />
                </Form.Item>
                <Form.Item label="E-Mail">
                    <Input defaultValue={user.email} disabled />
                </Form.Item>
                <Form.Item label="Change password">
                    <Space direction="vertical">
                        <Input.Password id="passwordInput" placeholder="input password" />
                    </Space>
                </Form.Item>
                <Form.Item>
                    <Button id="saveBtn" type="primary" htmlType="submit" disabled>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        )
    }
    return <></>
}

