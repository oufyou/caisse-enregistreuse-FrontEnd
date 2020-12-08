import React, { useEffect, useState } from 'react';
import tableIcons from '../../utils/icons';
import MaterialTable from 'material-table';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import Box from '@material-ui/core/Box';
import SalesService from '../../service/SalesService';
import { Button } from '@material-ui/core';
import DetailsVente from '../cashier/DetailsVente';

const Sales = props => {
  const [sales, setSales] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [detailSale, setDetailSale] = useState();

  useEffect(() => {
    SalesService.getSales().then(response => setSales(response.data));
  }, []);
  return (
    <>
      <MaterialTable
        columns={[
          { title: '#', field: 'id', width: '1' },
          {
            title: 'Client',
            customFilterAndSearch: (term, rowData) =>
              (rowData.customer.firstName + rowData.customer.lastName)
                .toLowerCase()
                .includes(term.toLowerCase()),
            render: rowData => (
              <div>
                {rowData.customer.firstName} {rowData.customer.lastName}
              </div>
            )
          },
          {
            title: 'Caissier',
            customFilterAndSearch: (term, rowData) =>
              (rowData.caissier.firstName + rowData.caissier.lastName)
                .toLowerCase()
                .includes(term.toLowerCase()),
            render: rowData => (
              <div>
                {rowData.caissier.firstName} {rowData.caissier.lastName}
              </div>
            )
          },
          { title: 'Total', field: 'total' },
          {
            title: 'Etat',
            field: 'finished',
            lookup: { true: 'Finie', false: 'En attente' }
          },
          { title: 'Commentaire', field: 'comment' },
          {
            title: 'Produits',
            render: rowData => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setDetailSale(rowData);
                  setShowDetails(true);
                }}
                style={{ width: 50, borderRadius: '50%' }}
                alt="image">
                Details
              </Button>
            )
          }
        ]}
        data={sales}
        options={{
          filtering: true,
          pageSize: 10,
          pageSizeOptions: [10],
          actionsColumnIndex: -1
        }}
        title="Ventes"
        icons={tableIcons}
      />
      <Dialog
        style={{ padding: '3em' }}
        onClose={() => setShowDetails(false)}
        aria-labelledby="simple-dialog-title"
        open={showDetails}>
        <DialogTitle id="simple-dialog-title">Detail du vente</DialogTitle>
        <Box p={5}>
          <DetailsVente sale={detailSale} />
        </Box>
      </Dialog>
    </>
  );
};

export default Sales;
