import React, { Fragment, useState } from 'react';

import { Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';

export default function Pay() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const cartItems = useSelector(state => state.Cart);
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} md={4}>
          {cartItems.map(item => (
            <div>{item.nom}</div>
          ))}
        </Grid>
      </Grid>
    </Fragment>
  );
}
