import React, { useEffect, useState } from 'react';
import tableIcons from '../../utils/icons';
import MaterialTable from 'material-table';

import { Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { Delete } from '@material-ui/icons';
import CustomersService from '../../service/CustomersService';
import AddCustomer from './AddCustomer';

const Customers = props => {
  let history = useHistory();

  const [customers, setCustomers] = useState([]);
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  useEffect(() => {
    CustomersService.getCustomers().then(response =>
      setCustomers(response.data)
    );
  }, []);
  console.log(customers);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddCustomer(true)}>
        {' '}
        Ajouter client
      </Button>
      <MaterialTable
        columns={[
          { title: 'Code', field: 'code' },
          { title: 'Prénom', field: 'firstName' },
          { title: 'Nom', field: 'lastName' },
          { title: 'Sexe', field: 'sexe' },
          { title: 'Date de naissance', field: 'bdate' },
          { title: 'N° Telephone', field: 'phone' },
          { title: 'Email', field: 'email' },
          { title: 'Addresse', field: 'adress' },
          { title: 'username', field: 'username' }
        ]}
        data={customers}
        options={{
          filtering: true,
          pageSize: 10,
          pageSizeOptions: [10],
          actionsColumnIndex: -1
        }}
        title="Clients"
        icons={tableIcons}
        actions={[
          {
            icon: () => <Delete />,
            tooltip: 'supprimer client',
            onClick: (event, rowData) =>
              CustomersService.removeCustomer(rowData.id)
          }
        ]}
      />
      <AddCustomer
        showAddCustomer={showAddCustomer}
        setShowAddCustomer={setShowAddCustomer}
      />
    </>
  );
};

export default Customers;
