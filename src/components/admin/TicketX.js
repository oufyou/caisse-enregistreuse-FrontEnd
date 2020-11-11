import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';

import TicketService from '../../service/TicketService';

const TicketX = props => {
  const [ticketX, setTicketX] = useState();
  useEffect(() => {
    TicketService.getTicketX().then(response => setTicketX(response.data));
  }, []);

  return (
    <Grid container>
      <Grid md={3} xs={12} className="no-print">
        <Grid md={2} xs={12}>
          <Typography variant="h3">Ticket X </Typography>
        </Grid>

        <Grid md={3} xs={12}>
          <Button
            fullWidth
            native
            color="primary"
            style={{ height: '4em', margin: 20 }}
            variant="contained"
            type="submit"
            onClick={() => window.print()}>
            Imprimer
          </Button>
        </Grid>
      </Grid>
      <Grid md={8} xs={12}>
        {ticketX ? (
          <>
            <h3 style={{ textAlign: 'center' }}>
              Ticket X : {ticketX.Ticket_X_Entre}
            </h3>
            <br />
            <h3>1.General</h3>
            <Grid container>
              <Grid item xs={8}>
                <h5>Total des tickets:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>{ticketX.Total_des_tickets?.toFixed(2)} MAD</h5>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <h5>Total des avoirs:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>0 MAD</h5>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <h5>Total des remboursements:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>0 MAD</h5>
              </Grid>
            </Grid>
            <br />
            <h3>2.Totaux encaissements/decaissements</h3>
            <Grid container>
              <Grid item xs={8}>
                <h5>Encaissements sur tickets:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>{ticketX.Totalencaissements?.toFixed(2)} MAD</h5>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <h5>Decaissement sur avoirs:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>0 MAD</h5>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <h5>Remboursements:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>0 MAD</h5>
              </Grid>
            </Grid>
            <br />
            <h3>3.CA Total HT, TTC, TVA</h3>
            <Grid container>
              <Grid item xs={8}>
                <h5>Total facturé HT:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>{ticketX.TotalfactureHT?.toFixed(2)} MAD</h5>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <h5>Total facturé TTC:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>{ticketX.TotalfactureTTC?.toFixed(2)} MAD</h5>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <h5>Total facturé TVA:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>{ticketX.TotalfactureTVA?.toFixed(2)} MAD</h5>
              </Grid>
            </Grid>
            <br />
            <h3>6.Somme facture TTC par vendeur</h3>
            {ticketX.TotalTTCparVendeur?.map(item => (
              <Grid container>
                <Grid item xs={8}>
                  <h5>{item.first_name + ' ' + item.last_name}</h5>
                </Grid>
                <Grid item xs={4}>
                  <h5>{item.total.toFixed(2)} MAD</h5>
                </Grid>
              </Grid>
            ))}
            <br />
            <h3>7.Somme facture TTC par type de paiement</h3>
            {ticketX.TotalEncaissementsParTypePayement?.map(item => (
              <Grid container>
                <Grid item xs={8}>
                  <h5>{item.type_payement}</h5>
                </Grid>
                <Grid item xs={4}>
                  <h5>{item.total.toFixed(2)} MAD</h5>
                </Grid>
              </Grid>
            ))}
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};
export default TicketX;
