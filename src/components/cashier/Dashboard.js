import React, { Fragment, useState } from 'react';

import { Card, CardContent, Grid } from '@material-ui/core';

import Badge from '@material-ui/core/Badge';

import Typography from '@material-ui/core/Typography';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import Box from '@material-ui/core/Box';
import { CartPanel } from './CartPanel';

export default function DashboardCashier() {
  const categories = [
    { id: 0, name: 'Softs', selected: false },
    { id: 0, name: 'Biers Speciales', selected: false },
    { id: 0, name: 'Boissons chaudes', selected: false },
    { id: 0, name: 'Pates, Pizzas, Lasagnes', selected: false },
    { id: 0, name: 'viandes', selected: false },
    { id: 0, name: 'Poissons', selected: false },
    { id: 0, name: 'Entrées chaudes', selected: false },
    { id: 0, name: 'Entrées froides', selected: true },
    { id: 0, name: 'Desserts', selected: false },
    { id: 0, name: 'Digestifs', selected: false },
    { id: 0, name: 'Spéciaux', selected: false },
    { id: 0, name: 'Réductions', selected: false }
  ];

  const produits = [
    { name: 'Cafe noire', price: '8', selected: false, color: '#FF5722' },
    { name: 'Pizza Margarita', price: '38', selected: false, color: '#4CAF50' },
    {
      name: 'Tacos Courdon bleu',
      price: '35',
      selected: false,
      color: '#2196F3'
    },
    { name: 'Panini Dinde', price: '13', selected: false, color: '#CDDC39' },
    { name: 'Coca cola', price: '12', selected: true, color: '#E91E63' },
    { name: 'Pizza Margarita', price: '38', selected: false, color: '#03A9F4' },
    {
      name: 'Tacos Courdon bleu',
      price: '35',
      selected: false,
      color: '#9C27B0'
    },
    { name: 'Panini Dinde', price: '13', selected: false, color: '#009688' },
    { name: 'Cafe noire', price: '8', selected: false, color: '#8BC34A' }
  ];
  const [cartItems, setCartItems] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} md={8}>
          {showCategories ? (
            <Grid container spacing={1} mb={5}>
              <Grid item xs={6} sm={4} md={2}>
                <Card
                  className="p-3"
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white'
                  }}
                  onClick={() => setShowCategories(false)}>
                  Hide categories
                </Card>
              </Grid>
              {categories.map(item => {
                return (
                  <Grid item xs={6} sm={4} md={2}>
                    <Card
                      className="text-center"
                      style={
                        item.selected ? { backgroundColor: '#E91E63' } : null
                      }>
                      <Box className="p-3">{item.name}</Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Card
              className="p-3"
              style={{
                backgroundColor: '#f44336',
                color: 'white'
              }}
              onClick={() => setShowCategories(true)}>
              Show categories
            </Card>
          )}
          <Box mb={5} mt={6} />
          <h5 className="display-5 mb-4 font-weight-bold">Categorie 1</h5>

          <Grid container spacing={2}>
            {produits.map(item => {
              return (
                <Grid item xs={6} sm={4} md={4}>
                  <Card
                    onClick={() => {
                      item.quantity = 1;
                      setCartItems(prevState => [...prevState, item]);
                    }}
                    style={{
                      backgroundColor: item.color,
                      color: 'white'
                    }}
                    className="text-center card-box elevation1 paper rounded border-0">
                    <CardContent className="p-3">
                      <LocalCafeIcon />
                      <br />
                      <Typography variant="h3">{item.name}</Typography>
                      <Badge color="primary">{item.price} MAD</Badge>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <CartPanel
            style={{
              overflow: 'scroll'
            }}
            items={cartItems}
            setItems={setCartItems}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
