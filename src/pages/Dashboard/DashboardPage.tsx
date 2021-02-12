import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { Copyright } from '../../components/CopyrightComponent';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../contexts/AuthenticationContext';
import { Modal } from './components/Modal'
import { AddOfferForm } from "./components/AddOfferForm"
import { Offer } from "../../components/EntityTypes"
import { OfferItem } from "./components/OfferItem"
// import { useContext } from 'react';
// import { authContext } from '../../contexts/AuthenticationContext';

const { Header, Content } = Layout;

export const DashboardPage = () => {
  const { actions: { logout } } = useContext(authContext)
  const [offers, setOffers] = useState<Offer[]>([]);
  const token = useContext(authContext);
  const [addOfferVisible, setAddOfferVisible] = useState(false);

  const fetchOffers = async function () {
    const userId = token.actions.getTokenData()?.id;
    const offerRequest = await fetch(`/api/user/${userId}/eventTypes`, {
      headers: { 'content-type': "application/json" },
    });
    if (offerRequest.status === 200) {
      const offerJSON = await offerRequest.json();
      setOffers(offerJSON.data);
      console.log(offers);
    }
  };
  useEffect(() => {
    fetchOffers();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Layout style={{ height: '100%' }}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="4" style={{ float: "right" }} onClick={() => logout()}>Log Out</Menu.Item>
        </Menu>
      </Header>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Button type='primary' style={{ float: "right" }} onClick={() => {
              setAddOfferVisible(true)
            }}>Add Offer</Button>
          </Breadcrumb.Item>
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

          <div>
            {offers.map(offer => (
              <OfferItem key={offer.id} offer={offer} fetchOffers={() => {
                fetchOffers();
              }} />
            ))}
          </div>
          {addOfferVisible && (
            <Modal onCancel={() => { setAddOfferVisible(false) }}>
              <AddOfferForm afterSubmit={() => {
                setAddOfferVisible(false);
                fetchOffers();
              }}
              />
            </Modal>
          )}
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