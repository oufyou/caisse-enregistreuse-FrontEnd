import React, { useEffect, useState } from 'react';
import tableIcons from '../../utils/icons';
import MaterialTable from 'material-table';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import SalesService from '../../service/SalesService';
import { Button } from '@material-ui/core';

const Sales = props => {
  let history = useHistory();

  const [sales, setSales] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [detailSaleLines, setDetailSaleLines] = useState([]);

  useEffect(() => {
    SalesService.getSales().then(response => setSales(response.data));
  }, []);
  return (
    <>
      <MaterialTable
        columns={[
          { title: 'Client', field: 'customer.firstName' },
          { title: 'Caissier', field: 'caissier.firstName' },
          { title: 'Total', field: 'total' },
          { title: 'Finished', field: 'finished' },
          { title: 'Commentaire', field: 'comment' },
          {
            title: 'Produits',
            render: rowData => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setDetailSaleLines(rowData.saleLines);
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
          {detailSaleLines.map(item => (
            <>
              <Typography>{item.product.nom}</Typography>
              <Typography>{item.quantity}</Typography>
            </>
          ))}
        </Box>
      </Dialog>
    </>
  );
};

export default Sales;
