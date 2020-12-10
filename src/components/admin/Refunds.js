import React, { useEffect, useState } from 'react';
import tableIcons from '../../utils/icons';
import MaterialTable from 'material-table';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import Box from '@material-ui/core/Box';
import SalesService from '../../service/SalesService';
import RefundService from '../../service/RefundService';
import { Button, Grid } from '@material-ui/core';
import DetailsVente from '../cashier/DetailsVente';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const Refunds = props => {
  const [sales, setSales] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [detailSale, setDetailSale] = useState();
  const [showRefund, setShowRefund] = useState(false);
  const [saleData, setSaleData] = useState();
  const [refundData, setRefundData] = useState();
  const [montant, setMontant] = useState(0);
  const [type, setType] = useState('espèces');
  const [comment, setComment] = useState('');

  useEffect(() => {
    SalesService.getSales().then(response =>
      setSales(response.data.filter(e => e.finished === false))
    );
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
          },
          {
            title: 'Rembourser',
            render: rowData => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setSaleData(rowData);
                  RefundService.getRefund(rowData.id, rowData.customer.id).then(
                    response => {
                      setRefundData(response.data.credit[0]);
                      console.log(response.data.credit[0]);
                    }
                  );
                  setShowRefund(true);
                }}
                style={{ width: 100, borderRadius: '50%' }}
                alt="image">
                Rembourser
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
        title="Rêgelement"
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

      <Dialog
        style={{ padding: '3em' }}
        onClose={() => setShowRefund(false)}
        aria-labelledby="simple-dialog-title"
        open={showRefund}>
        <DialogTitle id="simple-dialog-title">Refund</DialogTitle>
        <Box p={5}>
          <Grid container alignContent="center" alignItems="center">
            <Grid md={12} xs={12}>
              <Typography variant="h3">
                Rembourser pour la vente : # {saleData?.id}
              </Typography>
            </Grid>
            <Typography variant="h4">
              {parseFloat(refundData?.rendre) < 0 ? (
                <>
                  Crédit de : {-1 * parseFloat(refundData?.rendre).toFixed(2)}{' '}
                  DH
                </>
              ) : (
                <div>C'est reglé</div>
              )}
            </Typography>
            <Grid md={12} xs={12}>
              <TextField
                fullWidth
                native
                style={{ height: '4em', margin: 20 }}
                variant="outlined"
                value={montant}
                onChange={e =>
                  setMontant(Number.parseFloat(e.target.value) | 0)
                }
                label="Montant de remboursement"
              />
              <FormControl
                fullWidth
                style={{ height: '4em', margin: 20 }}
                variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  Type de paiement
                </InputLabel>
                <Select
                  fullWidth
                  native
                  value={type}
                  onChange={e => setType(e.target.value)}
                  label="Catégorie mère">
                  <option defaultChecked value="espèces">
                    Espèces
                  </option>
                  <option value="chèque">Chèque</option>
                  <option value="CB">Carte Bancaire</option>
                  <option value="virement">Virement</option>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                native
                style={{ height: '4em', margin: 20 }}
                variant="outlined"
                value={comment}
                onChange={e => setComment(e.target.value)}
                label="Commentaire"
              />
              {(parseFloat(refundData?.rendre) | 0) + montant >= 0 ? (
                <Typography
                  variant="h4"
                  style={{ color: '#488E48', margin: 20 }}>
                  A RENDRE : {(parseFloat(refundData?.rendre) | 0) + montant} DH
                </Typography>
              ) : (
                <Typography
                  variant="h4"
                  style={{ color: '#B8081D', margin: 20 }}>
                  IL RESTERA :{' '}
                  {-1 * ((parseFloat(refundData?.rendre) | 0) + montant)} DH
                </Typography>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  let rendre;

                  if (refundData?.closed === 0) {
                    rendre = refundData?.rendre;
                  }
                  rendre = refundData?.rendre;
                  const refund = {
                    montant: montant,
                    sale_id: saleData.id,
                    rendre: montant + parseFloat(rendre),
                    type: type,
                    comment: comment
                  };
                  RefundService.doRefund(refund).then(res =>
                    setShowRefund(!res.data)
                  );
                }}
                style={{ width: 100, borderRadius: '5%' }}
                alt="image">
                Rembourser
              </Button>
            </Grid>
          </Grid>{' '}
        </Box>
      </Dialog>
    </>
  );
};

export default Refunds;
