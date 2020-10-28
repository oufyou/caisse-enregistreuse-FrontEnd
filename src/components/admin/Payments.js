import React, { useEffect, useState } from 'react';
import tableIcons from '../../utils/icons';
import MaterialTable from 'material-table';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';
import PaymentsService from '../../service/PaymentsService';
import DetailsVente from '../cashier/DetailsVente';

const Payments = props => {
  let history = useHistory();

  const [payments, setPayments] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [detailSale, setDetailSale] = useState([]);

  useEffect(() => {
    PaymentsService.getPayments().then(response => setPayments(response.data));
  }, []);
  return (
    <>
      <MaterialTable
        columns={[
          { title: 'Temps de paiement', field: 'dateheures', type: 'datetime' },
          {
            title: 'Client',
            customFilterAndSearch: (term, rowData) =>
              (rowData.sale.customer.firstName + rowData.sale.customer.lastName)
                .toLowerCase()
                .includes(term.toLowerCase()),
            render: rowData => (
              <div>
                {rowData.sale.customer.firstName}{' '}
                {rowData.sale.customer.lastName}
              </div>
            )
          },
          {
            title: 'Caissier',
            customFilterAndSearch: (term, rowData) =>
              (rowData.sale.caissier.firstName + rowData.sale.caissier.lastName)
                .toLowerCase()
                .includes(term.toLowerCase()),
            render: rowData => (
              <div>
                {rowData.sale.caissier.firstName}{' '}
                {rowData.sale.caissier.lastName}
              </div>
            )
          },
          { title: 'Montant', field: 'montant' },
          { title: 'Rendue', field: 'rendre' },
          { title: 'Type', field: 'type' },
          {
            title: 'Etat',
            field: 'closed',
            lookup: { true: 'Fermé', false: 'En attente' }
          },
          { title: 'Commentaire', field: 'comment' },
          {
            title: 'Detail du vente',
            render: rowData => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setDetailSale(rowData.sale);
                  setShowDetails(true);
                }}
                style={{ width: 50, borderRadius: '50%' }}
                alt="image">
                Details
              </Button>
            )
          }
        ]}
        data={payments}
        options={{
          filtering: true,
          pageSize: 10,
          pageSizeOptions: [10],
          actionsColumnIndex: -1
        }}
        title="Paiements"
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

export default Payments;
