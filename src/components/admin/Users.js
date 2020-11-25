import React, { useEffect, useState } from 'react';
import tableIcons from '../../utils/icons';
import MaterialTable from 'material-table';

import UsersService from '../../service/UsersService';

import TextField from '@material-ui/core/TextField';

const Users = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UsersService.getUsers().then(response => setUsers(response.data));
  }, []);
  console.log(users);
  return (
    <>
      <MaterialTable
        editable={{
          onRowAddCancelled: rowData => console.log('Row adding cancelled'),
          onRowUpdateCancelled: rowData => console.log('Row editing cancelled'),

          onRowUpdate: (newData, oldData) => {
            return UsersService.updateUser(newData).then(response => {
              return UsersService.getUsers().then(response =>
                setUsers(response.data)
              );
            });
          },
          onRowDelete: oldData => {
            return UsersService.removeUser(oldData.id).then(response => {
              return UsersService.getUsers().then(response =>
                setUsers(response.data)
              );
            });
          }
        }}
        columns={[
          {
            title: 'Type',
            field: 'role',
            customFilterAndSearch: (term, rowData) => {
              let s = '';
              rowData.roles.map(e => {
                s += e.name;
              });
              return s.toLowerCase().includes(term);
            },
            lookup: {
              user: 'Utilisateur',
              admin: 'Administrateur',
              cashier: 'Caissier'
            },
            render: rowData => (
              <>
                {rowData.roles.map(e => (
                  <span>{e.name} - </span>
                ))}
              </>
            )
          },
          { title: 'Prénom', field: 'firstName' },
          { title: 'Nom', field: 'lastName' },
          { title: 'Sexe', field: 'sexe' },
          { title: 'Date de naissance', field: 'bdate' },
          { title: 'N° Telephone', field: 'phone' },
          { title: 'Email', field: 'email' },
          { title: 'Addresse', field: 'adress' },
          { title: 'username', field: 'username' },
          {
            title: 'password',
            field: 'password',
            editComponent: props => (
              <TextField
                //value={props.value === undefined ? '' : props.value}
                value={props.value === undefined ? '' : props.value}
                onChange={event => props.onChange(event.target.value)}
                type={'text'}
              />
            ),
            render: () => <span>******</span>
          }
        ]}
        data={users}
        options={{
          filtering: true,
          pageSize: 10,
          pageSizeOptions: [10]
        }}
        title="Utilisateurs"
        icons={tableIcons}
      />
    </>
  );
};

export default Users;
