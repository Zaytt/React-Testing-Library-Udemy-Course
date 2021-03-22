import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useOrderDetails } from '../../contexts/OrderDetails';

const Confirmation = () => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(false);
  const history = useHistory();
  const [, , resetOrder] = useOrderDetails();

  const handleClick = () => {
    resetOrder();
    history.push('/');
  };

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then(({ data }) => {
        setOrder(data.orderNumber);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <Container style={{ textAlign: 'center', margin: 'auto auto', height: '100vh' }}>
      <h1>Thank you!</h1>
      <h2>{order ? `Your order number is ${order}` : 'Loading...'}</h2>
      <p>As per our terms and conditions, no ice will be delivered</p>
      <button onClick={handleClick}>Create new order</button>
    </Container>
  );
};

export default Confirmation;
