import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, Grid } from '@material-ui/core';

import Badge from '@material-ui/core/Badge';

import Typography from '@material-ui/core/Typography';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import Box from '@material-ui/core/Box';
import { CartPanel } from './CartPanel';
import CategoriesService from '../../service/CategoriesService';
import SubCategoriesService from '../../service/SubCategoriesService';
import ProductsService from '../../service/ProductsService';

export default function DashboardCashier() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    CategoriesService.getCategories().then(response =>
      setCategories(response.data)
    );
  }, []);

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
                      onClick={() => {
                        SubCategoriesService.getAllByCategory(
                          Number.parseInt(item.id)
                        ).then(response => setSubCategories(response.data));
                      }}
                      className="text-center"
                      style={
                        item.selected ? { backgroundColor: '#E91E63' } : null
                      }>
                      <Box className="p-3">{item.nom}</Box>
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
          {showCategories && subCategories && (
            <Grid container spacing={1} mb={5}>
              <Grid item xs={6} sm={4} md={2}></Grid>
              {subCategories.map(item => {
                return (
                  <Grid item xs={6} sm={4} md={2}>
                    <Card
                      onClick={() => {
                        ProductsService.getAllBySubCategory(
                          Number.parseInt(item.id)
                        ).then(response => setProducts(response.data));
                      }}
                      className="text-center"
                      style={
                        item.selected ? { backgroundColor: '#E91E63' } : null
                      }>
                      <Box className="p-3">{item.nom}</Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
          <Box mb={5} mt={6} />

          <Grid container spacing={2}>
            {products.map(item => {
              return (
                <Grid item xs={6} sm={4} md={4}>
                  <Card
                    onClick={() => {
                      const newItem = {
                        id: uuidv4(),
                        productId: item.id,
                        quantity: 1,
                        nom: item.nom,
                        pu: item.pu
                      };
                      setCartItems(prevState => [...prevState, newItem]);
                    }}
                    style={{
                      backgroundColor: item.codecolor,
                      color: 'white'
                    }}
                    className="text-center card-box elevation1 paper rounded border-0">
                    <CardContent className="p-3">
                      <LocalCafeIcon />
                      <br />
                      <Typography variant="h3">{item.nom}</Typography>
                      <Badge color="primary">{item.pu} MAD</Badge>
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
