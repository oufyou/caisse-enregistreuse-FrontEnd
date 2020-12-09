import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';

const DetailsVente = props => {
  const { sale } = props;
  let totalPrice = 0;
  sale.saleLines.map(item => {
    totalPrice += Number(item.product.pu * item.quantity);
  });
  return (
    <>
      <Typography variant={'h3'}>
        {' '}
        Client: {sale.customer.firstName} {sale.customer.lastName}
      </Typography>
      <Typography variant={'h3'}> Telephone: {sale.customer.phone}</Typography>
      <Typography variant={'h3'}> Email: {sale.customer.email}</Typography>
      <Typography variant={'h3'}>
        {' '}
        Caissier: {sale.caissier.firstName} {sale.caissier.lastName}
      </Typography>
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
            {console.log(sale.saleLines)}
            {sale.saleLines.map(item => (
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
                        {item.product.nom}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="font-weight-bold text-first font-size-md">
                    {' '}
                    {item.product.pu} MAD
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="font-weight-bold text-first font-size-lg">
                    {' '}
                    {item.product.pu * item.quantity} MAD
                  </div>
                </div>
              </div>
            ))}
            <Typography style={{ padding: 10 }} variant="h4" align="center">
              Supplement : {sale.supplement} MAD{' '}
            </Typography>
            <Typography style={{ padding: 10 }} variant="h3" align="center">
              Total : {totalPrice} MAD{' '}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsVente;
