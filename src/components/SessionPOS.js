import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import SessionPOSService from '../service/SessionPOSService';

export default function SessionPOS() {
  const [montant, setMontant] = useState(0);
  const history = useHistory();
  if (sessionStorage.getItem('sessionPOS_State') === 'false') {
    history.push('/DashboardDefault');
  }
  const onSubmit = () => {
    SessionPOSService.startSessionPOS(montant).then(response =>
      history.push('/DashboardDefault')
    );
  };
  return (
    <>
      <Grid md={2} xs={12}>
        <Typography variant="h3">Montant d'ouverture</Typography>
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
        <Button
          fullWidth
          native
          color="primary"
          style={{ height: '4em', margin: 20 }}
          variant="contained"
          type="submit"
          onClick={onSubmit}>
          Démarrer la caisse
        </Button>
      </Grid>
    </>
  );
}
