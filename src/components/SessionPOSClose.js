import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import SessionPOSService from '../service/SessionPOSService';
import AuthenticationService from '../service/AuthenticationService';

export default function SessionPOSClose() {
  const [montant, setMontant] = useState(0);
  const [comment, setComment] = useState('');
  const history = useHistory();
  if (sessionStorage.getItem('sessionPOS_State') === 'true') {
    history.push('/DashboardDefault');
  }
  const onSubmit = () => {
    SessionPOSService.closeSessionPOS(montant, comment).then(response => {
      AuthenticationService.logout();
      history.push(`/DashboardDefault`);
    });
  };
  return (
    <>
      <Grid md={2} xs={12}>
        <Typography variant="h3">Montant de fermeture de caisse</Typography>
      </Grid>
      <Grid md={5} xs={12}>
        <TextField
          fullWidth
          native
          style={{ height: '4em', margin: 20 }}
          variant="outlined"
          value={montant}
          onChange={e => setMontant(Number.parseInt(e.target.value))}
          label="Montant"
        />
      </Grid>
      <Grid md={5} xs={12}>
        <TextField
          fullWidth
          native
          style={{ height: '4em', margin: 20 }}
          variant="outlined"
          value={comment}
          onChange={e => setComment(e.target.value)}
          label="Commentaire"
        />
      </Grid>
      <Grid md={5} xs={12}>
        <Button
          fullWidth
          native
          color="primary"
          style={{ height: '4em', margin: 20 }}
          variant="contained"
          type="submit"
          onClick={() => onSubmit()}>
          Fermer la caisse
        </Button>
      </Grid>
    </>
  );
}
