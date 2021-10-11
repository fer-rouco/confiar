import React, { useEffect } from 'react';
import AngularGaugeChart from '../components/charts/angular-gauge-chart';
import SelectField from '../components/controls/fields/select/select-field';
import PanelForm from '../components/panel-form';
import { getStats } from '../services/stats-service';
import { getStores } from '../services/store-service';
import styled from 'styled-components';

const StyledQuantityStats = styled.div`
  padding-top: 6px;
`;

const StyledPercentageStats = styled.div`
  text-align: center;
`;

export default function Stats() {
  const [stores, setStores] = React.useState([]);
  const [stats, setStats] = React.useState({});
  let model = { store: 1 };

  function assignStats(storeId) {
    if (storeId > -1) {
      getStats(storeId).then((statistics) => {
        setStats(statistics);
      });
    }
  }

  function onStoreChange(storeId) {
    assignStats(storeId);
  }

  useEffect(() => {
    getStores().then((storeList) => {
      let storeListForSelectField = [];
      storeListForSelectField.push({
        value: -1,
        label: 'Seleccione una tienda',
      });
      storeList.map((option) =>
        storeListForSelectField.push({ value: option.id, label: option.name }),
      );
      setStores(storeListForSelectField);
      assignStats(storeListForSelectField[1].value);
    });
  }, []);

  return (
    <PanelForm title="Info de usuarios" size="large" model={model}>
      <div className="row">
        <div className="col-md-6">
          <SelectField
            attr="store"
            options={stores}
            onChange={onStoreChange}
            required
          ></SelectField>
        </div>
        <StyledQuantityStats className="col-md-6">
          <div className="row">
            <div className="col-md-12">
              <h5>Cantidad de cajeros: {stats.numberOfCashiers} </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h5>Cantidad de supervisores: {stats.numberOfSupervisors} </h5>
            </div>
          </div>
        </StyledQuantityStats>
      </div>
      <div className="row">
        <StyledPercentageStats className="col-md-6">
          <p>
            Porcentaje de cajeros sobre el total de usuarios:{' '}
            {stats.percentageOfCashiersOverTotalUsers}%{' '}
          </p>
        </StyledPercentageStats>
        <StyledPercentageStats className="col-md-6">
          <p>
            Porcentaje de supervisores sobre el total de usuarios:{' '}
            {stats.percentageOfSupervisorsOverTotalUsers}%{' '}
          </p>
        </StyledPercentageStats>
      </div>
      <div className="row">
        <div className="col-md-6">
          <AngularGaugeChart
            value={stats.percentageOfCashiersOverTotalUsers}
            id="angular-gauge-chart-1"
          ></AngularGaugeChart>
        </div>
        <div className="col-md-6">
          <AngularGaugeChart
            value={stats.percentageOfSupervisorsOverTotalUsers}
            id="angular-gauge-chart-2"
          ></AngularGaugeChart>
        </div>
      </div>
    </PanelForm>
  );
}
