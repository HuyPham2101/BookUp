import { Menu } from "antd"
import { UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

export const ProfileMenu = (logout: () => void) => {
    return (
        <Menu>
            <Menu.Item>
                <Link to="/settings"><UserAddOutlined />My profile</Link>
            </Menu.Item>
            <Menu.Item onClick={logout}>
                <LogoutOutlined />Log Out
            </Menu.Item>
        </Menu>
    )

}