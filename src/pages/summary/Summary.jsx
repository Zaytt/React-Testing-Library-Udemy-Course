import React from 'react';
import { Container } from 'react-bootstrap';
import OrderSummary from './OrderSummary';
import SummaryForm from './SummaryForm';

const Summary = () => {
  return (
    <Container>
      <OrderSummary />
      <SummaryForm />
    </Container>
  );
};

export default Summary;
