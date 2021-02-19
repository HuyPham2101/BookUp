import { EditTwoTone, UserOutlined } from "@ant-design/icons"
import { Badge, message, Upload } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import { useContext, useEffect, useState } from "react"
import { User } from "../../components/EntityTypes"
import { authContext } from "../../contexts/AuthenticationContext"
import { Email, Name } from "./components/UserData"
import { SettingsForm } from "./components/SettingsForm"
import { PageLayout } from "../../components/PageLayout"

export const SettingsPage = () => {
    const { actions: { getTokenData } } = useContext(authContext);
    const [user, setUser] = useState<User>();
    const [imgUrl, setImgUrl] = useState("");
    const {token, actions} = useContext(authContext);

    const fetchUser = async () => {
        const userId = getTokenData()?.id;
        const userRequest = await fetch(`/api/user/${userId}`, {
            headers: { "Content-Type": "application/json" , Authorization : token!},
        });
        if (userRequest.status === 200) {
            const userJSON = await userRequest.json();
            setUser(userJSON.data);
            if (userJSON.data.imageId) {
                setImgUrl(`/api/profilePhoto/${userJSON.data.imageId.url}`)
            }
        }
    }

    useEffect(() => {
        fetchUser();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const props = {
        name: "avatar",
        multiple: false,
        showUploadList: false,
        action: `http://localhost:3000/api/user/${user?.id}/image`,
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`File uploaded successfully`);
                setImgUrl(`/api/profilePhoto/${info.file.response.data.url}`);
            } else if (info.file.status === 'error') {
                message.error(`File upload failed.`);
            }
        }
    }

    return (
        <PageLayout>
            <div style={{ backgroundColor: "#fff", padding: "2em" }}>
                <div style={{ margin: 10, borderRadius: 5, backgroundColor: "#f0f0f0" }}>
                    <div style={{ cursor: "pointer", display: 'inline-block', margin: 35 }}>
                        {user && (
                            <Upload {...props}>
                                <Badge count={<EditTwoTone />}>
                                    <Avatar
                                        size={84}
                                        src={imgUrl}
                                        icon={<UserOutlined />}
                                    />
                                </Badge>
                            </Upload>
                        )}
                    </div >
                    <div style={{ display: 'inline-block' }}>
                        <Name user={user} />
                        <Email user={user} />
                    </div>
                </div>
                <SettingsForm fetchUser={fetchUser} user={user} />
            </div>
        </PageLayout>
    )
}