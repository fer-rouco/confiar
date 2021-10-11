import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getStores } from '../services/store-service';
import Panel from '../components/panel';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 5px;
  background: #097890;
  color: #ffffff;
  margin: 5px;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 7px 7px 3px rgb(0 0 0 / 50%);
`;

const StyledCircle = styled.div`
  border-radius: 50%;
  width: 34px;
  height: 34px;
  padding: 3px;
  background: #ddd;
  color: lightseagreen;
  text-align: center;
  font: 20px Arial, sans-serif;
  font-weight: 800;
`;

const StyledText = styled.span`
  padding: 5px;
  font: 20px Cursive;
  font-weight: 800;
`;

export default function Stores(props) {
  const history = useHistory();
  const [storeItems, setStoreItems] = useState([]);
  const [stores, setStores] = useState({});

  useEffect(() => {
    function navigateToStore(store) {
      history.push('/Users', { store: store });
    }

    getStores().then((storeList) => {
      setStores(storeList);
      const storeItemList = storeList.map((store) => (
        <StyledContainer
          onClick={() => navigateToStore(store)}
          className="col-md-8"
          key={store.number}
        >
          <div className="row">
            <div className="col-md-3">
              <StyledCircle>{store.number}</StyledCircle>
            </div>
            <div className="col-md-9">
              <StyledText>{store.name}</StyledText>
            </div>
          </div>
        </StyledContainer>
      ));
      setStoreItems(storeItemList);
    });

    return () => {
      setStoreItems([]);
    };
  }, [setStoreItems, history]);

  return (
    <Panel title="Tiendas" size="small" model={stores}>
      <div className="row justify-content-center">{storeItems}</div>
    </Panel>
  );
}
