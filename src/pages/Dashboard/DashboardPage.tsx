import { Card } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../contexts/AuthenticationContext';
import { Modal } from '../../components/Modal'
import { AddOfferForm } from "./components/AddOfferForm"
import { Offer } from "../../components/EntityTypes"
import { OfferItem } from "./components/OfferItem"
import { PlusCircleTwoTone } from '@ant-design/icons';
import { FilterInput } from "./components/FilterInput"
import { PageLayout } from '../../components/PageLayout';

export const DashboardPage = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const {token, actions} = useContext(authContext);
  const [addOfferVisible, setAddOfferVisible] = useState(false);
  const [filteredOffers, setFilteredOffer] = useState<Offer[]>();
  const [filtering, setFiltering] = useState<boolean>(false);

  const fetchOffers = async function () {
    const userId = actions.getTokenData()?.id

    const offerRequest = await fetch(`/api/user/${userId}/eventTypes`, {
      headers: { "Content-Type": "application/json" , Authorization : token!},
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
    <PageLayout index={1}>
      <FilterInput offers={offers} setFilteredOffer={setFilteredOffer} setFiltering={setFiltering} />
      <div style={{ backgroundColor: "#fff", padding: "2em" }}>
        <Card
          data-cy="Offer-button-Testing"
          onClick={() => (setAddOfferVisible(true))}
          hoverable={true}
          style={{ display: 'inline-block', width: 300, height: 278, margin: 8, textAlign: 'center', boxShadow: "5px 8px 8px #c4c4c4" }}
        >
          <div style={{ margin: 20, fontStyle: "italic", fontSize: 24 }} >Add Offer</div>
          <PlusCircleTwoTone style={{ margin: 45, fontSize: '7em' }} twoToneColor="#1da57a" />
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
        <Modal title={"Add Offer"} onCancel={() => { setAddOfferVisible(false) }}>
          <AddOfferForm afterSubmit={() => {
            setAddOfferVisible(false);
            fetchOffers();
          }}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

