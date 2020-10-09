import React, { useEffect, useState } from 'react';
import tableIcons from '../../utils/icons';
import MaterialTable from 'material-table';
import CategoriesService from '../../service/CategoriesService';
import { Button } from '@material-ui/core';

const Categories = props => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoriesService.getCategories().then(response =>
      setCategories(response.data)
    );
  }, []);
  console.log(categories);
  return (
    <>
      <Button variant="contained" color="primary">
        {' '}
        Ajouter catégorie
      </Button>
      <MaterialTable
        columns={[
          {
            field: 'imagelink',
            title: 'Image',
            render: rowData => (
              <img
                src={rowData.imagelink}
                style={{ width: 50, borderRadius: '50%' }}
                alt="image"
              />
            )
          },
          { title: 'nom', field: 'nom' },
          { title: 'description', field: 'description' }
        ]}
        data={categories}
        options={{
          filtering: true
        }}
        title="Catégories"
        icons={tableIcons}
      />
    </>
  );
};

export default Categories;
