import React, { useEffect, useState } from 'react';
import tableIcons from '../../utils/icons';
import MaterialTable from 'material-table';
import SubCategoriesService from '../../service/SubCategoriesService';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

import CategoriesService from '../../service/CategoriesService';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const SubCategories = props => {
  let history = useHistory();

  const [Subcategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddSubCategorie, setShowAddSubCategorie] = useState(false);
  const [nomNewSubCategorie, setNomNewSubCategorie] = useState('');
  const [descNewSubCategorie, setDescNewSubCategorie] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    SubCategoriesService.createSubCategorie(
      nomNewSubCategorie,
      descNewSubCategorie,
      selectedCategorie
    );
    setShowAddSubCategorie(false);
    history.push(`/SubCategories`);
  };

  useEffect(() => {
    SubCategoriesService.getSubCategories().then(response =>
      setSubCategories(response.data)
    );
    CategoriesService.getCategories().then(response =>
      setCategories(response.data)
    );
  }, []);
  console.log(Subcategories);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddSubCategorie(true)}>
        {' '}
        Ajouter sous-catégorie
      </Button>
      <MaterialTable
        editable={{
          onRowAddCancelled: rowData => console.log('Row adding cancelled'),
          onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),

          onRowUpdate: (newData, oldData) => {
            return SubCategoriesService.updateSubCategory(oldData).then(
              response => {
                return SubCategoriesService.getSubCategories().then(response =>
                  setSubCategories(response.data)
                );
              }
            );
          },
          onRowDelete: oldData => {
            return SubCategoriesService.removeSubCategory(oldData.id).then(
              response => {
                return SubCategoriesService.getSubCategories().then(response =>
                  setSubCategories(response.data)
                );
              }
            );
          }
        }}
        columns={[
          /*{
            field: 'imagelink',
            title: 'Image',
            render: rowData => (
              <img
                src={rowData.imagelink}
                style={{ width: 50, borderRadius: '50%' }}
                alt="image"
              />
            )
          },*/
          { title: 'Nom', field: 'nom' },
          { title: 'Description', field: 'description' },
          { title: 'Catégorie mère', field: 'category.nom', editable: 'never' }
        ]}
        data={Subcategories}
        options={{
          filtering: true,
          pageSize: 10,
          pageSizeOptions: [10]
        }}
        title="Catégories"
        icons={tableIcons}
      />
      <Dialog
        style={{ padding: '3em' }}
        onClose={() => setShowAddSubCategorie(false)}
        aria-labelledby="simple-dialog-title"
        open={showAddSubCategorie}>
        <DialogTitle id="simple-dialog-title">
          Ajouter une sous catégorie
        </DialogTitle>
        <Box p={5}>
          <form onSubmit={onSubmit}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">
                Catégorie mère
              </InputLabel>
              <Select
                fullWidth
                native
                value={selectedCategorie}
                onChange={e => setSelectedCategorie(e.target.value)}
                label="Catégorie mère">
                <option aria-label="None" value="" />
                {categories.map(element => (
                  <option value={element.id}>{element.nom}</option>
                ))}
              </Select>
            </FormControl>
            <Typography variant="subtitle1">
              Nom de la sous catégorie
            </Typography>
            <TextField
              id="nomNewSubCategorie"
              name="nomNewSubCategorie"
              value={nomNewSubCategorie}
              onChange={e => setNomNewSubCategorie(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Typography variant="subtitle1">
              Description de la sous catégorie
            </Typography>
            <TextField
              id="descNewSubCategorie"
              name="descNewSubCategorie"
              value={descNewSubCategorie}
              onChange={e => setDescNewSubCategorie(e.target.value)}
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
                  onClick={() => setShowAddSubCategorie(false)}>
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

export default SubCategories;
