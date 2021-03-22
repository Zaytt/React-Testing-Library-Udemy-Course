import React from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderSummary = () => {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>
        {[...orderDetails.scoops.entries()].map((entry) => (
          <li key={entry[0]}>{`${entry[1]} ${entry[0]}`}</li>
        ))}
      </ul>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ul>
        {[...orderDetails.toppings.keys()].map((key) => (
          <li key={key}>{`${key}`}</li>
        ))}
      </ul>
      <h2>Total: {orderDetails.totals.grandTotal}</h2>
    </div>
  );
};

export default OrderSummary;
