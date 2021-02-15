import { Layout, Menu, Breadcrumb, Button, Card } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { Children, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Copyright } from './CopyrightComponent';
import { authContext } from '../contexts/AuthenticationContext';


const { Header, Content } = Layout;

export const PageLayout = (props:any) => {
  const { actions: { logout } } = useContext(authContext)

    return (
        <Layout style={{ height: '100%' }}>
          <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={props.index}>
              <Menu.Item key="1"><Link to="/dashboard">Dashboard</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/Availability">Availability</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/meetings">Meetings</Link></Menu.Item>
              <Menu.Item key="4" style={{ float: "right" }} onClick={() => logout()}>Log Out</Menu.Item>
            </Menu>
          </Header>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                marginLeft: '12%',
                marginRight: '12%',
                minHeight: 280,
              }}
            >
            {props.Children}
            </Content>
          </Layout>
          <Layout>
            <Footer>
              <Copyright />
            </Footer>
          </Layout>
        </Layout >
      );
}

