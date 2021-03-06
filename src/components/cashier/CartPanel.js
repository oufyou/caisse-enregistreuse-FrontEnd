import React, { useState } from 'react';
import { Card, CardContent, Divider, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Delete } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { loadCart } from '../../reducers/Cart';

export const CartPanel = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  let totalPrice = 0;
  props.items.map(item => {
    totalPrice += Number(item.pu * item.quantity);
  });
  const [quantity, setQuantity] = useState(0);
  const addValue = value => {
    if (props.items.length === 0) return;
    else {
      if (value === 'ok') {
        props.setItems(oldItems => {
          oldItems[oldItems.length - 1].quantity = quantity;
          return [...oldItems];
        });
        setQuantity(1);
      } else if (value === 'c') setQuantity(0);
      else {
        setQuantity(pastValue =>
          parseInt(pastValue.toString() + value.toString())
        );
      }
    }
  };
  console.log(props.items);
  const keyboardKey = 'text-center font-weight-bolder font-size-xxl p-2';
  const onPay = () => {
    dispatch(loadCart(props.items));
    sessionStorage.setItem('cart', JSON.stringify(props.items));
    history.push('/Pay');
  };
  return (
    <Box p={1}>
      <Card
        className="bg-arielle-smile text-center font-size-xxl font-weight-bold"
        style={{ color: 'white', padding: 10 }}
        onClick={onPay}>
        PAYER
      </Card>
      <Card
        className="bg-asteroid text-center font-size-xxl font-weight-bold"
        style={{ color: 'white', padding: 10 }}>
        {totalPrice.toFixed(2)} DH
      </Card>
      <Card style={{}} className="card-box mb-4">
        <CardContent
          style={{
            height: '40vh',
            overflowY: 'scroll',
            scrollBehavior: 'smooth'
            /* TODO fix scrolling
             * TODO FIX LOGIC
             * */
          }}
          className="p-3">
          {props.items?.map(item => {
            return (
              <React.Fragment key={item.id}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex">
                    <div>
                      <div className="text-black-50 font-size-lg font-weight-bold">
                        {item.quantity} x {item.nom}
                      </div>
                    </div>
                  </div>
                  <div className="font-weight-bold text-first font-size-lg">
                    {' '}
                    {item.pu * item.quantity} MAD
                  </div>
                  <Delete
                    onClick={() => {
                      props.setItems(prevState =>
                        prevState.filter(e => e.id !== item.id)
                      );
                      console.log(item.id);
                    }}
                  />
                </div>
                <Divider className="my-2" />
              </React.Fragment>
            );
          })}
        </CardContent>
      </Card>
      <Grid container style={{ height: '30vh' }}>
        <Grid item xs={12} md={12}>
          <Box className="font-italic bg-gray-300 font-size-xxl text-center">
            {' '}
            > {quantity}{' '}
          </Box>
        </Grid>
        <Grid item xs={4} md={4} onClick={() => addValue(9)}>
          <Card className={keyboardKey}>9</Card>
        </Grid>
        <Grid item xs={4} md={4} onClick={() => addValue(8)}>
          <Card className={keyboardKey}>8</Card>
        </Grid>
        <Grid item xs={4} md={4} onClick={() => addValue(7)}>
          <Card className={keyboardKey}>7</Card>
        </Grid>
        <Grid item xs={4} md={4} onClick={() => addValue(6)}>
          <Card className={keyboardKey}>6</Card>
        </Grid>
        <Grid item xs={4} md={4} onClick={() => addValue(5)}>
          <Card className={keyboardKey}>5</Card>
        </Grid>
        <Grid item xs={4} md={4} onClick={() => addValue(4)}>
          <Card className={keyboardKey}>4</Card>
        </Grid>
        <Grid item xs={4} md={4} onClick={() => addValue(3)}>
          <Card className={keyboardKey}>3</Card>
        </Grid>
        <Grid item xs={4} md={4} onClick={() => addValue(2)}>
          <Card className={keyboardKey}>2</Card>
        </Grid>
        <Grid item xs={4} md={4} onClick={() => addValue(1)}>
          <Card className={keyboardKey}>1</Card>
        </Grid>
        <Grid item xs={4} md={4} onClick={() => addValue(0)}>
          <Card className={keyboardKey}>0</Card>
        </Grid>
        <Grid item xs={4} md={4} onClick={() => addValue('c')}>
          <Card className={keyboardKey}>C</Card>
        </Grid>
        <Grid item xs={4} md={4} onClick={() => addValue('ok')}>
          <Card className={keyboardKey}>OK</Card>
        </Grid>
      </Grid>
    </Box>
  );
};
