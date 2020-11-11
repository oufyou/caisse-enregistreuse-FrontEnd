import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import TicketService from '../../service/TicketService';

const TicketZ = props => {
  const onSubmit = () => {};
  const [date, setDate] = useState(new Date().toISOString());
  const [ticketZByMonth, setTicketZByMonth] = useState();
  const [ticketZByDay, setTicketZByDay] = useState();
  const [selectedTicketZ, setSelectedTicketZ] = useState('day');

  const getTicketsZMonth = () => {
    TicketService.getTicketZMois(date).then(response =>
      setTicketZByMonth(response.data)
    );
  };
  const getTicketsZDay = () => {
    TicketService.getTicketZJour(date).then(response =>
      setTicketZByDay(response.data)
    );
  };
  return (
    <Grid container>
      <Grid md={3} xs={12} className="no-print">
        <Grid md={2} xs={12}>
          <Typography variant="h3">Date</Typography>
        </Grid>
        <Grid md={5} xs={12}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="yyyy-MM-dd"
            value={date}
            onChange={date => {
              setDate(date.toISOString());
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </Grid>
        <Grid md={3} xs={12}>
          <Button
            fullWidth
            native
            color="primary"
            style={{ height: '4em', margin: 20 }}
            variant="contained"
            type="submit"
            onClick={() => {
              setSelectedTicketZ('month');
              getTicketsZMonth();
            }}>
            Par mois
          </Button>
        </Grid>
        <Grid md={3} xs={12}>
          <Button
            fullWidth
            native
            color="primary"
            style={{ height: '4em', margin: 20 }}
            variant="contained"
            type="submit"
            onClick={() => {
              setSelectedTicketZ('day');
              getTicketsZDay();
            }}>
            Par jour
          </Button>
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
        {ticketZByMonth && selectedTicketZ === 'month' ? (
          <>
            <h3 style={{ textAlign: 'center' }}>
              Ticket Z pour le mois{' : '}
              {new Date(ticketZByMonth['Ticket Z du Mois']).getMonth() + 1}
              {' / '}
              {new Date(ticketZByMonth['Ticket Z du Mois']).getFullYear()}
            </h3>
            <br />
            <h3>1.General</h3>
            <Grid container>
              <Grid item xs={8}>
                <h5>Total des tickets:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>{ticketZByMonth.Total_des_tickets_Mois?.toFixed(2)} MAD</h5>
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
                <h5>
                  {ticketZByMonth.Totalencaissements_Mois?.toFixed(2)} MAD
                </h5>
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
                <h5>{ticketZByMonth.TotalfactureHT_Mois?.toFixed(2)} MAD</h5>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <h5>Total facturé TTC:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>{ticketZByMonth.TotalfactureTTC_Mois?.toFixed(2)} MAD</h5>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <h5>Total facturé TVA:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>{ticketZByMonth.TotalfactureTVA_Mois?.toFixed(2)} MAD</h5>
              </Grid>
            </Grid>
            <br />
            <h3>6.Somme facture TTC par vendeur</h3>
            {ticketZByMonth.TotalTTCparVendeur_Mois?.map(item => (
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
            {ticketZByMonth.TotalEncaissementsParTypePayement_Mois?.map(
              item => (
                <Grid container>
                  <Grid item xs={8}>
                    <h5>{item.type_payement}</h5>
                  </Grid>
                  <Grid item xs={4}>
                    <h5>{item.total.toFixed(2)} MAD</h5>
                  </Grid>
                </Grid>
              )
            )}
          </>
        ) : null}
        {ticketZByDay && selectedTicketZ === 'day' ? (
          <>
            <h3 style={{ textAlign: 'center' }}>
              Ticket Z pour le {' : '}
              {new Date(ticketZByDay['Ticket Z du Jour']).getDate()}
              {' / '}
              {new Date(ticketZByDay['Ticket Z du Jour']).getMonth() + 1}
              {' / '}
              {new Date(ticketZByDay['Ticket Z du Jour']).getFullYear()}
            </h3>
            <br />
            <h3>1.General</h3>
            <Grid container>
              <Grid item xs={8}>
                <h5>Total des tickets:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>{ticketZByDay.Total_des_tickets_Jour?.toFixed(2)} MAD</h5>
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
                <h5>{ticketZByDay.Totalencaissements_Jour?.toFixed(2)} MAD</h5>
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
                <h5>{ticketZByDay.TotalfactureHT_Jour?.toFixed(2)} MAD</h5>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <h5>Total facturé TTC:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>{ticketZByDay.TotalfactureTTC_Jour?.toFixed(2)} MAD</h5>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={8}>
                <h5>Total facturé TVA:</h5>
              </Grid>
              <Grid item xs={4}>
                <h5>{ticketZByDay.TotalfactureTVA_Jour?.toFixed(2)} MAD</h5>
              </Grid>
            </Grid>
            <br />
            <h3>6.Somme facture TTC par vendeur</h3>
            {ticketZByDay.TotalTTCparVendeur_Jour?.map(item => (
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
            {ticketZByDay.TotalEncaissementsParTypePayement_Jour?.map(item => (
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
        ) : null}{' '}
      </Grid>
    </Grid>
  );
};
export default TicketZ;
