import { Button, Form, Input, message, Space } from "antd"
import { ChangeEvent, useState } from "react"
import { User } from "../../../components/EntityTypes"

interface UserData {
    username?: string;
    password?: string;
    repeatedPassword?: string;
}

export const SettingsForm: React.FC<{ fetchUser: () => void, user: User | undefined }> = ({ user, fetchUser }) => {
    const [changedUserData, setChangedUserData] = useState<UserData>({
        username: user?.userName
    });

    const saveChanges = async () => {
        const userName = (document.getElementById("userNameInput") as HTMLInputElement).value;
        const InputPassword = (document.getElementById("passwordInput") as HTMLInputElement);
        const InputRepeatedPassword = (document.getElementById("repeatPassword") as HTMLInputElement);
        let savingUser;
        if (!InputPassword.value) {
            savingUser = { userName: userName }
        } else {
            if (InputPassword.value !== InputRepeatedPassword.value) {
                message.error("Passwords not matching!")
                return;
            }
            savingUser = {
                userName: userName,
                password: InputPassword.value
            }
        }
        await fetch(`/api/user/${user?.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(savingUser),
        })
        message.success("Changes saved!")
        setChangedUserData({ ...changedUserData, password: "", repeatedPassword: "" });
        disableSaveButton();
        fetchUser();
    }

    const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
        setChangedUserData({ ...changedUserData, [e.target.name]: e.target.value })
        const userName = (document.getElementById("userNameInput") as HTMLInputElement).value;
        const InputPassword = (document.getElementById("passwordInput") as HTMLInputElement);
        const InputRepeatedPassword = (document.getElementById("repeatPassword") as HTMLInputElement);
        if (userName === user?.userName &&
            !InputPassword.value &&
            !InputRepeatedPassword.value) {
            disableSaveButton();
        } else {
            enableSaveButton();
        }
    }

    const disableSaveButton = () => {
        document.getElementById("saveBtn")?.setAttribute("disabled", "disabled");
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
                style={{ margin: 10 }}
            >
                <Form.Item label="Username">
                    <Input id="userNameInput" name="username" value={changedUserData?.username} onChange={fieldDidChange} defaultValue={user.userName} minLength={2} />
                </Form.Item>
                <Form.Item label="E-Mail">
                    <Input defaultValue={user.email} disabled />
                </Form.Item>
                <Form.Item label="Change password">
                    <Space direction="vertical">
                        <Input.Password id="passwordInput" name="password" value={changedUserData?.password} onChange={fieldDidChange} placeholder="new password" />
                        <Input.Password id="repeatPassword" name="repeatesPassword" value={changedUserData?.repeatedPassword} onChange={fieldDidChange} placeholder="repeat password" />
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

