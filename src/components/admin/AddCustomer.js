import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';

import { useHistory } from 'react-router';
import CustomersService from '../../service/CustomersService';

const AddCustomer = props => {
  const history = useHistory();
  const { showAddCustomer, setShowAddCustomer } = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sexe, setSexe] = useState('');
  const [email, setEmail] = useState('');
  const [bdate, setBdate] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    const username = firstName + lastName;
    const password = firstName + lastName;
    const createdBy = sessionStorage.getItem('authenticatedUser');
    const updatedBy = sessionStorage.getItem('authenticatedUser');
    CustomersService.createCustomer(
      firstName,
      lastName,
      sexe,
      bdate,
      adress,
      phone,
      email,
      username,
      password,
      updatedBy,
      createdBy
    );
    setShowAddCustomer(false);
    history.push(`/Customers`);
  };
  return (
    <Dialog
      style={{ padding: '3em' }}
      onClose={() => setShowAddCustomer(false)}
      aria-labelledby="simple-dialog-title"
      open={showAddCustomer}>
      <DialogTitle id="simple-dialog-title">Ajouter un client</DialogTitle>
      <Box p={5}>
        <form onSubmit={onSubmit}>
          <Typography variant="subtitle1">Prénom</Typography>
          <TextField
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Typography variant="subtitle1">Nom</Typography>
          <TextField
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Typography variant="subtitle1">N° Téléphone</Typography>
          <TextField
            id="phone"
            name="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Typography variant="subtitle1">Email</Typography>
          <TextField
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Typography variant="subtitle1">Sexe</Typography>
          <TextField
            id="sexe"
            name="sexe"
            value={sexe}
            onChange={e => setSexe(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Typography variant="subtitle1">Date de naissance</Typography>
          <TextField
            type="date"
            id="bdate"
            name="bdate"
            value={bdate}
            onChange={e => setBdate(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Typography variant="subtitle1">Addresse</Typography>
          <TextField
            id="adress"
            name="adress"
            value={adress}
            onChange={e => setAdress(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Button
                fullWidth
                margin="normal"
                type="submit"
                variant="contained"
                color="primary"
                style={{ padding: '1em', marginTop: '2em' }}>
                Ajouter client
              </Button>
            </Grid>
            <Grid item sm={6}>
              <Button
                fullWidth
                margin="normal"
                type="reset"
                variant="contained"
                color="secondary"
                style={{ padding: '1em', marginTop: '2em' }}
                onClick={() => setShowAddCustomer(false)}>
                Annuler
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Dialog>
  );
};
export default AddCustomer;
