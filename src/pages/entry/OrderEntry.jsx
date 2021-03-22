import React from 'react';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();
  const history = useHistory();

  return (
    <Container>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <button onClick={() => history.push('/summary')}>Order Sundae!</button>
    </Container>
  );
};

export default OrderEntry;
