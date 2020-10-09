import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';
import MaterialTable from 'material-table';
import tableIcons from '../../utils/icons';
import RegularTables1Example1 from '../../example-components/RegularTables1/RegularTables1Example1';
export default function RegularTables1() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Tables examples 1"
        titleDescription="Tables are the backbone of almost all web applications."
      />

      <ExampleWrapperSimple sectionHeading="Basic">
        <RegularTables1Example1 />
        <MaterialTable
          columns={[
            {
              field: 'url',
              title: 'Avatar',
              render: rowData => (
                <img
                  src={rowData.img}
                  style={{ width: 50, borderRadius: '50%' }}
                  alt="image"
                />
              )
            },
            { title: 'Adı', field: 'name' },
            { title: 'Soyadı', field: 'surname' },
            { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
            {
              title: 'Doğum Yeri',
              field: 'birthCity',
              lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }
            }
          ]}
          data={[
            {
              name: 'Mehmet',
              surname: 'Baran',
              birthYear: 1987,
              birthCity: 63,
              img: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4'
            }
          ]}
          options={{
            filtering: true
          }}
          title="Demo Title"
          icons={tableIcons}
        />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
