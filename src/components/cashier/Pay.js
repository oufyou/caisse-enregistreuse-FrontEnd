import React, { Fragment, useEffect, useState } from 'react';

import { Button, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';

import CustomersService from '../../service/CustomersService';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import AddCustomer from '../admin/AddCustomer';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import SalesService from '../../service/SalesService';
import PaymentsService from '../../service/PaymentsService';
import BWLogo from '../../assets/images/lily-BW.jpg';
import { useHistory } from 'react-router';
import {
  anonymUserId,
  PRINTING_SERVER,
  TXT_ALIGN_LT,
  TXT_ALIGN_RT,
  TXT_FONT_A
} from '../../service/consts';
import UsersService from '../../service/UsersService';

export default function Pay() {
  const history = useHistory();
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState('');
  const [customerId, setCustomerId] = useState(0);
  const [typePaiement, setTypePaiement] = useState('');
  const [montant, setMontant] = useState(0);
  const [supplement, setSupplement] = useState(0);
  const [commentaire, setCommentaire] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  /*
   *
   * OUTPUT SHOULD BE
   * {"customer_id":"3",
   *  "caissier_id":"2",
   *  "saleLines":
   *      [ {"product_id":"4","quantity":"20"},
   *        {"product_id":"4","quantity":"20"},
   *        {"product_id":"4","quantity":"20"}],
   * "total":"80",
   * "finished":"true",
   * "comment":null,
   *  "Supplement":"0"
   * }
   *
   *
   * And perform payment
   *  {
   *       "type":"espéces",
   *       "montant":"1000",
   *       "rendre":"100",
   *       "closed":"true",
   *       "comment":null,
   *       "sale_id":"7"
   *     }
   *
   *
   *
   * */
  const cartItems = JSON.parse(sessionStorage.getItem('cart'));
  const saleLines = [];
  let totalPrice = 0;
  if (cartItems === null) history.push('/DashboardDefault');
  else {
    cartItems.map(item => {
      saleLines.push({ product_id: item.productId, quantity: item.quantity });
    });
    cartItems.map(item => {
      totalPrice += Number(item.pu * item.quantity);
    });
  }
  useEffect(() => {
    UsersService.getUser(anonymUserId).then(res => {
      setCustomerId(res.data);
    });
    CustomersService.getCustomers().then(response =>
      setCustomers(response.data)
    );
  }, []);
  const onSubmit = () => {
    const sale = {
      customer_id: customerId.id,
      caissier_id: JSON.parse(sessionStorage.getItem('user')).id, //l'utilisateur authentifié
      saleLines: saleLines,
      total: totalPrice + supplement,
      finished: montant - (totalPrice + supplement) >= 0, // l'etat selon la difference entre le montant est total; s
      comment: commentaire.length > 0 ? commentaire : null,
      Supplement: supplement | 0
    };
    SalesService.createSale(sale)
      .then(response => {
        const payment = {
          type: typePaiement,
          montant: montant,
          rendre: montant - (totalPrice + supplement),
          closed: montant - (totalPrice + supplement) >= 0,
          comment: commentaire.length > 0 ? commentaire : null,
          sale_id: response.data.id
        };
        return PaymentsService.createPayment(payment);
      })
      .then(response => {
        history.push('/DashboardDefault');
        const qz = require('qz-tray');
        console.log(response);
        qz.websocket
          .connect({ host: PRINTING_SERVER })
          .then(() => {
            return qz.printers.find();
          })
          .then(printers => {
            console.log(printers);
            const date = new Date().toLocaleString().toString();
            let productsArr = [];
            let nbArticles = 0;
            response.data.sale.saleLines.map(item => {
              nbArticles += item.quantity;
              productsArr.push(item.product.nom);
              productsArr.push(' >> ');
              productsArr.push('\x0A');
              productsArr.push(
                '            ' +
                  item.quantity +
                  ' X ' +
                  item.product.pu.toFixed(2) +
                  ' DH       '
              );
              productsArr.push(TXT_ALIGN_RT);
              productsArr.push(
                (item.product.pu * item.quantity).toFixed(2) + ' DH'
              );
              productsArr.push('\x0A');
            });
            if (response.data.sale.supplement > 0) {
              productsArr.push(
                'Supplement           ' +
                  response.data.sale.supplement +
                  ' DH ' +
                  '\x0A'
              );
            }
            let config = qz.configs.create(
              { name: 'TSP' },
              { language: 'ESCPOS' }
            );
            let data = [
              {
                type: 'raw',
                format: 'image',
                flavor: 'file',
                data: BWLogo,
                options: { language: 'ESCPOS', dotDensity: 'double' }
              },

              '\x1B' + '\x40', // init
              '\x1B' + '\x61' + '\x31', // center align
              '\x1B' + '\x74' + '\x10',
              '\x1B' + '\x45' + '\x0D', // bold on

              'Lily Gourmet, ' + '\x0A',
              '\x1B' + '\x45' + '\x0A', // bold off
              'Lily Gourmet, 6 rue Soumaya, Agdal, Rabat' + '\x0A',
              '\x0A',
              'I.F 3367629      N.P 70185234' + '\x0A',
              'R.C 99941      CNSS 9725039' + '\x0A',
              'ICE 001701634000029      CNSS 9725039' + '\x0A',
              '\x0A', // line break
              'www.lily-gourmet.com' + '\x0A', // text and line break
              '+212 537 653 182' + '\x0A', // text and line break
              '\x0A', // line break
              'Ticket N° ' + response.data.sale.id + ' --- ',
              date,
              ' ' + '\x0A',
              '\x0A', // line break
              'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' + '\x0A',
              'Client:   ' +
                response.data.sale.customer.firstName +
                ' ' +
                response.data.sale.customer.lastName +
                '\x0A',
              'Caissier:   ' + response.data.sale.caissier.firstName + '\x0A',
              'Type de payment:   ' + response.data.type + '\x0A',
              'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' + '\x0A',
              'Transaction # ' +
                response.data.id +
                '   pour la vente: ' +
                response.data.sale.id +
                '\x0A',
              '\x0A',
              '\x0A',
              '\x1B' + '\x45' + '\x0D', // bold on
              '\x1B' + '\x61' + '\x30', // left align
              'Designation QTE   PU           MNT ',
              '\x1B' + '\x45' + '\x0A', // bold off
              '\x0A',
              'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' + '\x0A',
              '\x0A',
              '\x1B' + '\x4D' + '\x30', // normal text
              ...productsArr, //print special char symbol after numeric
              '\x0A',
              '\x1B' + '\x4D' + '\x30', // normal text
              'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' + '\x0A',
              'TVA pour information' + '\x0A',
              'N.      Tx      HT      TAXE      TTC' + '\x0A',
              `${nbArticles}    10.00    ${(
                (totalPrice + supplement) *
                0.9
              ).toFixed(2)}    ${(
                totalPrice +
                supplement -
                (totalPrice + supplement) * 0.9
              ).toFixed(2)}    ${(totalPrice + supplement).toFixed(2)}` +
                '\x0A',
              'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' + '\x0A',
              'Total :      ' +
                (response.data.montant - response.data.rendre).toFixed(2) +
                ' DH' +
                '\x0A',
              response.data.type + ' : ' + response.data.montant + ' DH',
              '\x0A',
              'à rendre :       ' +
                response.data.rendre.toFixed(2) +
                ' DH' +
                '\x0A',
              '\x1B' + '\x45' + '\x0D', // bold on
              response.data.rendre < 0
                ? ' ( PAYMENT NON COMPLET )'
                : '' + '\x0A',
              '\x0A',

              'Total :      ' +
                (response.data.montant - response.data.rendre).toFixed(2) +
                ' DH' +
                '\x0A',
              '\x1B' + '\x45' + '\x0A', // bold off
              '\x0A' + '\x0A',
              '\x1B' + '\x61' + '\x32', // right align
              '\x1B' + '\x4D' + '\x31', // small text
              'Lily Gourmet vous remercie ',
              '\x0A',
              ' pour votre visite.',
              '\x1B' + '\x4D' + '\x30', // normal text
              '\x0A' + '\x0A',
              '\x1B' + '\x61' + '\x30', // left align
              '------------------------------------------' + '\x0A',
              '\x1B' + '\x4D' + '\x31', // small text
              'Pour nous contacter : +212 537 653 182' + '\x0A',
              'Ou commander sur notre site web : www.lily-gourmet.com' + '\x0A',
              TXT_FONT_A,
              '------------------------------------------' + '\x0A',
              'A bientôt.',
              TXT_ALIGN_LT,
              '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
              '\x1B' + '\x69' // cut paper (old syntax)
              // '\x1D' + '\x56'  + '\x00' // full cut (new syntax)
              // '\x1D' + '\x56'  + '\x30' // full cut (new syntax)
              // '\x1D' + '\x56'  + '\x01' // partial cut (new syntax)
              // '\x1D' + '\x56'  + '\x31' // partial cut (new syntax)
              //'\x10' + '\x14' + '\x01' + '\x00' + '\x05' // Generate Pulse to kick-out cash drawer**
              // **for legacy drawer cable CD-005A.  Research before using.
            ];
            return qz.print(config, data);
          })
          .then(() => {
            return qz.websocket.disconnect();
          })
          .then(() => {
            // process.exit(0);
          })
          .catch(err => {
            console.error(err);
            // process.exit(1);
          });
      });
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} alignContent="center">
          <Card
            style={{
              padding: 20,
              margin: 20,
              justifyContent: 'center',
              justifySelf: 'center',
              justifyItems: 'center'
            }}>
            <div
              className="d-flex align-items-center justify-content-between"
              style={{
                padding: 10,
                margin: 10,
                color: '#d30043',
                borderBottom: '#d30043 4px solid'
              }}>
              <div className="d-flex">
                <div>
                  <div className="font-size-md font-weight-bold font-italic">
                    Quantité
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div>
                  <div className="font-size-md font-weight-bold font-italic">
                    Produit
                  </div>
                </div>
              </div>
              <div className="font-weight-bold font-italic  font-size-md">
                {' '}
                PRIX D'UNITE
              </div>
              <div className="font-weight-bold font-italic  font-size-md">
                {' '}
                PRIX TOTAL
              </div>
            </div>

            {cartItems?.map(item => (
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex">
                  <div>
                    <div className="text-black-50 font-size-lg font-weight-bold">
                      {item.quantity}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex">
                    <div>
                      <div className="text-black-50 font-size-lg font-weight-bold">
                        {item.nom}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="font-weight-bold text-first font-size-md">
                    {' '}
                    {item.pu} MAD
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="font-weight-bold text-first font-size-lg">
                    {' '}
                    {item.pu * item.quantity} MAD
                  </div>
                </div>
              </div>
            ))}
            <Typography style={{ padding: 10 }} variant="h3" align="center">
              Total : {totalPrice + supplement} MAD{' '}
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid container alignContent="center" alignItems="center">
        <Grid md={2} xs={12}>
          <Typography variant="h3">Client</Typography>
        </Grid>

        <Grid md={4} xs={12}>
          <Autocomplete
            required
            margin="normal"
            fullWidth
            variant="outlined"
            renderOption={option => {
              return (
                <MenuItem
                  fullWidth
                  name="Customer"
                  key={option.id}
                  value={option.id}>
                  {option.firstName +
                    ' ' +
                    option.lastName +
                    '(' +
                    option.phone +
                    ')'}
                </MenuItem>
              );
            }}
            labelId="Customer"
            id="Customer"
            name="Customer"
            value={customerId}
            inputValue={customer}
            onChange={(e, newValue) => {
              setCustomerId(newValue);
              console.log('customerID');
              console.log(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setCustomer(newInputValue);
            }}
            getOptionSelected={(option, _value) => option.id === _value.id}
            options={customers}
            getOptionLabel={option =>
              option.firstName +
              ' ' +
              option.lastName +
              '(' +
              option.phone +
              ')'
            }
            renderInput={params => (
              <TextField
                fullWidth
                {...params}
                label="Client"
                variant="outlined"
              />
            )}
          />
        </Grid>

        <Grid md={4} xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ height: '4em', margin: 20 }}
            onClick={() => setShowAddCustomer(true)}>
            {' '}
            Ajouter client
          </Button>
        </Grid>
        <Grid md={3} xs={12}>
          <Typography variant="h3">Type de paiement</Typography>
        </Grid>
        <Grid md={5} xs={12}>
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
              value={typePaiement}
              onChange={e => setTypePaiement(e.target.value)}
              label="Catégorie mère">
              <option aria-label="None" value="" />
              <option value="espèces">Espèces</option>
              <option value="chèque">Chèque</option>
              <option value="CB">Carte Bancaire</option>
              <option value="virement">Virement</option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container alignContent="center" alignItems="center">
        <Grid md={2} xs={12}>
          <Typography variant="h3">Montant</Typography>
        </Grid>
        <Grid md={5} xs={12}>
          <TextField
            fullWidth
            native
            style={{ height: '4em', margin: 20 }}
            variant="outlined"
            value={montant}
            onChange={e => setMontant(Number.parseInt(e.target.value) | 0)}
            label="Montant"
          />
        </Grid>

        <Grid md={4} xs={12} style={{ marginLeft: 20 }}>
          {montant - (totalPrice + supplement) >= 0 ? (
            <Typography variant="h3" style={{ color: '#488E48', margin: 20 }}>
              A RENDRE : {montant - (totalPrice + supplement)} DH
            </Typography>
          ) : (
            <Typography variant="h3" style={{ color: '#B8081D', margin: 20 }}>
              IL RESTE : {totalPrice + supplement - montant} DH
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container alignContent="center" alignItems="center">
        <Grid md={2} xs={12}>
          <Typography variant="h3">Commentaire</Typography>
        </Grid>
        <Grid md={5} xs={12}>
          <TextField
            fullWidth
            native
            style={{ height: '4em', margin: 20 }}
            variant="outlined"
            value={commentaire}
            onChange={e => setCommentaire(e.target.value)}
            label="Commentaire"
          />
        </Grid>
        <Grid container alignContent="center" alignItems="center">
          <Grid md={2} xs={12}>
            <Typography variant="h3">Montant supplémentaire</Typography>
          </Grid>
          <Grid md={5} xs={12}>
            <TextField
              fullWidth
              native
              style={{ height: '4em', margin: 20 }}
              variant="outlined"
              value={supplement}
              onChange={e => setSupplement(Number.parseInt(e.target.value) | 0)}
              label="Montant supplémentaire"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container alignContent="center" alignItems="center">
        <Grid md={12} xs={12} style={{ padding: 30 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ height: '4em', padding: 30, margin: 20 }}
            onClick={onSubmit}>
            Terminer la vente
          </Button>
        </Grid>
      </Grid>
      <AddCustomer
        showAddCustomer={showAddCustomer}
        setShowAddCustomer={setShowAddCustomer}
      />
    </Fragment>
  );
}
