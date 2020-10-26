import React, { useEffect, useState } from 'react';
import tableIcons from '../../utils/icons';
import MaterialTable from 'material-table';

import { Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { Delete } from '@material-ui/icons';

import CashierService from '../../service/CashierService';
import AddCashier from './AddCashier';

const Cashiers = props => {
  let history = useHistory();

  const [cashiers, setCashiers] = useState([]);
  const [showAddCashier, setShowAddCashier] = useState(false);

  useEffect(() => {
    CashierService.getCashiers().then(response => setCashiers(response.data));
  }, []);
  console.log(cashiers);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddCashier(true)}>
        {' '}
        Ajouter caissier
      </Button>
      <MaterialTable
        columns={[
          { title: 'Prénom', field: 'firstName' },
          { title: 'Nom', field: 'lastName' },
          { title: 'Sexe', field: 'sexe' },
          { title: 'Date de naissance', field: 'bdate' },
          { title: 'N° Telephone', field: 'phone' },
          { title: 'Email', field: 'email' },
          { title: 'Addresse', field: 'adress' },
          { title: 'username', field: 'username' }
        ]}
        data={cashiers}
        options={{
          filtering: true,
          pageSize: 10,
          pageSizeOptions: [10],
          actionsColumnIndex: -1
        }}
        title="Caissiers"
        icons={tableIcons}
        actions={[
          {
            icon: () => <Delete />,
            tooltip: 'supprimer caissier',
            onClick: (event, rowData) =>
              CashierService.removeCashier(rowData.id)
          }
        ]}
      />
      <AddCashier
        showAddCashier={showAddCashier}
        setShowAddCashier={setShowAddCashier}
      />
    </>
  );
};

export default Cashiers;
