import { screen, render } from '@testing-library/react';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

import OrderSummary from '../OrderSummary';

const mockContextValue = [
  {
    scoops: new Map([['Chocolate', 1], ['Vanilla', 2]]),
    toppings: new Map([['M&Ms', 1]]),
    totals: {
      scoops: '$6.00',
      toppings: '$1.50',
      grandTotal: '$7.50',
    },
  },
];

test('summary displays correct amount and subtotal of scoops', () => {
  render(
    <OrderDetailsProvider value={mockContextValue}>
      <OrderSummary />
    </OrderDetailsProvider>
  );

  const scoopsSubtotalHeading = screen.getByRole('heading', { name: /Scoops: \$/i });
  expect(scoopsSubtotalHeading).toHaveTextContent('$6.00');

  const vanillaScoopsCount = screen.getByText('2 Vanilla');
  const chocolateScoopsCount = screen.getByText('1 Chocolate');

  expect(vanillaScoopsCount).toHaveTextContent('2');
  expect(chocolateScoopsCount).toHaveTextContent('1');
});

test('summary displays correct amount and subtotal of toppings', () => {
  render(
    <OrderDetailsProvider value={mockContextValue}>
      <OrderSummary />{' '}
    </OrderDetailsProvider>
  );
  const toppingsSubtotalHeading = screen.getByRole('heading', { name: /Toppings: \$/i });

  expect(toppingsSubtotalHeading).toHaveTextContent('$1.50');

  const mmToppings = screen.getByText('M&Ms');

  expect(mmToppings).toHaveTextContent('M&Ms');
});

test('summary display the correct total', () => {
  render(
    <OrderDetailsProvider value={mockContextValue}>
      <OrderSummary />
    </OrderDetailsProvider>
  );

  const totalHeading = screen.getByRole('heading', { name: /Total: \$/i });
  expect(totalHeading).toHaveTextContent('7.50');
});
