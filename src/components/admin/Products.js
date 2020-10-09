import React, { useEffect, useState } from 'react';
import tableIcons from '../../utils/icons';
import MaterialTable from 'material-table';

import { Button } from '@material-ui/core';
import ProductsService from '../../service/ProductsService';

const Products = props => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductsService.getProducts().then(response => setProducts(response.data));
  }, []);
  console.log(products);
  return (
    <>
      <Button variant="contained" color="primary">
        {' '}
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
      />
    </>
  );
};

export default Products;
