import { EditTwoTone, ProfileOutlined, UserOutlined } from "@ant-design/icons"
import { Badge, Dropdown, Menu, message, Upload } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Copyright } from "../../components/CopyrightComponent"
import { User } from "../../components/EntityTypes"
import { ProfileMenu } from "../../components/ProfileMenu"
import { authContext } from "../../contexts/AuthenticationContext"
import { Email, Name } from "./components/UserData"
import { SettingsForm } from "./components/SettingsForm"

export const SettingsPage = () => {
    const { actions: { logout, getTokenData } } = useContext(authContext);
    const [user, setUser] = useState<User>();
    const [imgUrl, setImgUrl] = useState("");

    const fetchUser = async () => {
        const userId = getTokenData()?.id;
        const userRequest = await fetch(`/api/user/${userId}`, {
            headers: { 'content-type': "application/json" },
        });
        if (userRequest.status === 200) {
            const userJSON = await userRequest.json();
            setUser(userJSON.data);
            setImgUrl(`/api/profilePhoto/${userJSON.data.imageId.url}`)
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
        <Layout style={{ height: '100%' }}>
            <Header className="header" style={{ marginBottom: 30 }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" >
                    <Menu.Item key="1"><Link to="/dashboard">Dashboard</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/Availability">Availability</Link></Menu.Item>
                    <div key="3" style={{ float: "right" }}>
                        <Dropdown trigger={['click']} overlay={() => ProfileMenu(logout)}><span><ProfileOutlined style={{ fontSize: 30 }} /></span></Dropdown>
                    </div>
                </Menu>

            </Header>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: '24px 50px',
                        marginLeft: '12%',
                        marginRight: '12%',
                        minHeight: 280,
                        backgroundColor: '#fff'
                    }}
                >
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
                </Content>
            </Layout>
            <Footer>
                <Copyright />
            </Footer>
        </Layout >
    )
}