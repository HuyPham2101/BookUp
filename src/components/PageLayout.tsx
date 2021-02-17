import { Layout, Menu, Dropdown } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Copyright } from './CopyrightComponent';
import { authContext } from '../contexts/AuthenticationContext';
import { ProfileMenu } from './ProfileMenu';
import { ProfileOutlined } from '@ant-design/icons';


const { Header, Content } = Layout;

export const PageLayout = (props: any) => {
  const { actions: { logout } } = useContext(authContext)

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[`${props.index}`]}>
          <Menu.Item key="1"><Link to="/dashboard">Dashboard</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/Availability">Availability</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/meetings">Meetings</Link></Menu.Item>
          <div key="3" style={{ float: "right", cursor: "pointer" }}>
            <Dropdown trigger={['click']} overlay={() => ProfileMenu(logout)}><span><ProfileOutlined style={{ fontSize: 30 }} /></span></Dropdown>
          </div>
        </Menu>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          marginLeft: '12%',
          marginRight: '12%',
          minHeight: 280,
        }}
      >
        {props.children}
      </Content>
      <Footer>
        <Copyright />
      </Footer>
    </Layout >
  );
}

