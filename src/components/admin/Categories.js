import React, { useEffect, useState } from 'react';
import tableIcons from '../../utils/icons';
import MaterialTable from 'material-table';
import CategoriesService from '../../service/CategoriesService';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { Delete } from '@material-ui/icons';

const Categories = props => {
  let history = useHistory();

  const [categories, setCategories] = useState([]);
  const [showAddCategorie, setShowAddCategorie] = useState(false);
  const [nomNewCategorie, setNomNewCategorie] = useState('');
  const [descNewCategorie, setDescNewCategorie] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    CategoriesService.createCategorie(nomNewCategorie, descNewCategorie);
    setShowAddCategorie(false);
    history.push(`/Categories`);
  };

  useEffect(() => {
    CategoriesService.getCategories().then(response =>
      setCategories(response.data)
    );
  }, []);
  console.log(categories);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddCategorie(true)}>
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
          filtering: true,
          pageSize: 10,
          pageSizeOptions: [10],
          actionsColumnIndex: -1
        }}
        title="Catégories"
        icons={tableIcons}
        actions={[
          {
            icon: () => <Delete />,
            tooltip: 'supprimer catégorie',
            onClick: (event, rowData) =>
              CategoriesService.removeCategorie(rowData.id)
          }
        ]}
      />
      <Dialog
        style={{ padding: '3em' }}
        onClose={() => setShowAddCategorie(false)}
        aria-labelledby="simple-dialog-title"
        open={showAddCategorie}>
        <DialogTitle id="simple-dialog-title">
          Ajouter une catégorie
        </DialogTitle>
        <Box p={5}>
          <form onSubmit={onSubmit}>
            <Typography variant="subtitle1">Nom de la catégorie</Typography>
            <TextField
              id="nomNewCategorie"
              name="nomNewCategorie"
              value={nomNewCategorie}
              onChange={e => setNomNewCategorie(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Typography variant="subtitle1">
              Description de la catégorie
            </Typography>
            <TextField
              id="descNewCategorie"
              name="descNewCategorie"
              value={descNewCategorie}
              onChange={e => setDescNewCategorie(e.target.value)}
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
                  Ajouter Catégorie
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
                  onClick={() => setShowAddCategorie(false)}>
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

export default Categories;
