import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import useNavigation from '../hooks/navigation';
import { useAlertMessage } from '../contexts/alert-message-context';
import { removeCustomer, findCustomers } from '../services/server/customer-service';
import Panel from '../components/containers/panel';
import Table from '../components/table/table';
import { removeColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';
import Page from '../components/containers/page';

export default function Customers() {
  const navigation = useNavigation();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [columnDefinitions, setColumnDefinitions] = useState([]);
  const [filterDefinitions, setFilterDefinitions] = useState([]);
  const { t } = useTranslation('pages', { keyPrefix: 'customers' });

  function create() {
    navigation.navigateTo('/Customer');
  };

  useEffect(() => {
    setColumnDefinitions([
      textColumnDefinition({
        key: 'name',
        label: 'Nombre',
        target: '/Customer'
      }),
      textColumnDefinition({
        key: 'lastName',
        label: 'Apellido'
      }),
      textColumnDefinition({
        key: 'mail', 
        label: 'E-Mail'
      }),
      removeColumnDefinition({
        key: 'remove',
        icon: 'trash-fill',
        dialogConfig: {
          key: 'remove',
          message: { key: "message", placeholders: ["name"] },
          onAccept: (model) => {
            return removeCustomer(model.id)
              .then(() => {
                addSuccessMessage(t("remove.successMessage", { name: model.name }));
              })
              .then((errorData) => {
                if (errorData) {
                  addErrorMessage(errorData.message);
                }
              });
          }
        }
      })
    ]);

    setFilterDefinitions([
      textColumnDefinition({
        key: 'name',
        label: 'Nombre',
        target: '/User'
      }),
      textColumnDefinition({
        key: 'lastName',
        label: 'Apellido'
      }),
      textColumnDefinition({
        key: 'mail', 
        label: 'E-Mail'
      })
    ]);
        
    return () => {
      setColumnDefinitions([]);
      setFilterDefinitions([]);
    };
  }, []);

  return (
    <Page id="customers" >
      <Panel
        model={{}}
        actions={[
          {
            key: 'add',
            icon: 'plus',
            action: create,
            tooltip: 'Crear un cliente nuevo.',
          },
        ]}
      >
        <Table id="main.panel.main.table" columnDefinitions={columnDefinitions} requestRowObjectsFunction={findCustomers} filterDefinitions={filterDefinitions} ></Table>
      </Panel>
    </Page>
  );
}
