import { Layout, Menu, Card, Dropdown } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { Copyright } from '../../components/CopyrightComponent';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../contexts/AuthenticationContext';
import { Modal } from './components/Modal'
import { AddOfferForm } from "./components/AddOfferForm"
import { Offer } from "../../components/EntityTypes"
import { OfferItem } from "./components/OfferItem"
import { Link } from 'react-router-dom';
import { PlusCircleTwoTone, ProfileOutlined } from '@ant-design/icons';
import { ProfileMenu } from "../../components/ProfileMenu"
import { FilterInput } from "./components/FilterInput"


const { Header, Content } = Layout;

export const DashboardPage = () => {
  const { actions: { logout } } = useContext(authContext);
  const [offers, setOffers] = useState<Offer[]>([]);
  const token = useContext(authContext);
  const [addOfferVisible, setAddOfferVisible] = useState(false);
  const [filteredOffers, setFilteredOffer] = useState<Offer[]>();
  const [filtering, setFiltering] = useState<boolean>(false);

  const fetchOffers = async function () {
    const userId = token.actions.getTokenData()?.id;
    const offerRequest = await fetch(`/api/user/${userId}/eventTypes`, {
      headers: { 'content-type': "application/json" },
    });
    if (offerRequest.status === 200) {
      const offerJSON = await offerRequest.json();
      setOffers(offerJSON.data);
    }
  };
  useEffect(() => {
    fetchOffers();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Layout style={{ height: '100%' }}>
      <Header className="header" style={{ marginBottom: 30 }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
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
            backgroundColor: '#fff',

          }}
        >
          <FilterInput offers={offers} setFilteredOffer={setFilteredOffer} setFiltering={setFiltering} />
          <div>
            <Card
              onClick={() => (setAddOfferVisible(true))}
              hoverable={true}
              style={{ display: 'inline-block', width: 300, height: 278, margin: 8, textAlign: 'center', boxShadow: "5px 8px #c4c4c4" }}
            >
              <div style={{ margin: 20, fontStyle: "italic", fontSize: 24 }} >Add Offer</div>
              <PlusCircleTwoTone style={{ margin: 45, fontSize: '7em' }} />
            </Card>
            {!filtering && (
              offers.map(offer => (
                <OfferItem key={offer.id} offer={offer} fetchOffers={() => {
                  fetchOffers();
                }} />
              ))
            )}
            {filtering && (
              filteredOffers?.map(offer => (
                <OfferItem key={offer.id} offer={offer} fetchOffers={() => {
                  fetchOffers();
                }} />
              ))
            )}
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
      <Footer>
        <Copyright />
      </Footer>
    </Layout >
  );
}

