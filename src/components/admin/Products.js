import React, { useEffect, useState } from 'react';
import tableIcons from '../../utils/icons';
import MaterialTable from 'material-table';

import { Button } from '@material-ui/core';
import ProductsService from '../../service/ProductsService';
import { Delete } from '@material-ui/icons';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const Products = props => {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [nomNewProduct, setNomNewProduct] = useState('');
  const [descNewProduct, setDescNewProduct] = useState('');
  const [puNewProduct, setPuNewProduct] = useState(0);
  const [codebarreNewProduct, setCodebarreNewProduct] = useState('');
  const [codecolorNewProduct, setCodecolorNewProduct] = useState('');
  const [etatexisteNewProduct, setEtatexisteNewProduct] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    ProductsService.createProduct(
      nomNewProduct,
      descNewProduct,
      codebarreNewProduct,
      puNewProduct,
      etatexisteNewProduct,
      codecolorNewProduct
    );
    setShowAddProduct(false);
  };
  useEffect(() => {
    ProductsService.getProducts().then(response => setProducts(response.data));
  }, []);
  console.log(products);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddProduct(true)}>
        Ajouter produit
      </Button>
      <MaterialTable
        columns={[
          {
            field: 'imagelink',
            title: 'Couleur',
            render: rowData => (
              <span
                style={{
                  padding: '2em',
                  backgroundColor: rowData.codecolor
                }}>
                {rowData.codecolor}
              </span>
            )
          },
          { title: 'nom', field: 'nom' },
          { title: 'Code barre', field: 'codebarre' },
          { title: 'Prix unitaire', field: 'pu' },
          { title: 'Etat existe', field: 'etatexiste' }
        ]}
        data={products}
        options={{
          filtering: true
        }}
        title="Produits"
        icons={tableIcons}
        actions={[
          {
            icon: () => <Delete />,
            tooltip: 'supprimer produit',
            onClick: (event, rowData) =>
              ProductsService.removeProduct(rowData.id)
          }
        ]}
      />
      <Dialog
        style={{ padding: '3em' }}
        onClose={() => setShowAddProduct(false)}
        aria-labelledby="simple-dialog-title"
        open={showAddProduct}>
        <DialogTitle id="simple-dialog-title">Ajouter un produit</DialogTitle>
        <Box p={5}>
          <form onSubmit={onSubmit}>
            <Typography variant="subtitle1">Nom de produit</Typography>
            <TextField
              id="nomNewProduct"
              name="nomNewProduct"
              value={nomNewProduct}
              onChange={e => setNomNewProduct(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Typography variant="subtitle1">Description de produit</Typography>
            <TextField
              id="descNewProduct"
              name="descNewProduct"
              value={descNewProduct}
              onChange={e => setDescNewProduct(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Typography variant="subtitle1">Prix unitaire</Typography>
            <TextField
              id="puNewProduct"
              name="puNewProduct"
              value={puNewProduct}
              onChange={e => setPuNewProduct(e.target.value)}
              variant="outlined"
              type="number"
              fullWidth
            />
            <Typography variant="subtitle1">Code barre</Typography>
            <TextField
              id="codebarreNewProduct"
              name="codebarreNewProduct"
              value={codebarreNewProduct}
              onChange={e => setCodebarreNewProduct(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Typography variant="subtitle1">Code de couleur</Typography>
            <TextField
              id="codecolorNewProduct"
              name="codecolorNewProduct"
              value={codecolorNewProduct}
              onChange={e => setCodecolorNewProduct(e.target.value)}
              variant="outlined"
              type="color"
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
                  Ajouter Produit
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
                  onClick={() => setShowAddProduct(false)}>
                  Annuler
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
    </>
  );
};

export default Products;
