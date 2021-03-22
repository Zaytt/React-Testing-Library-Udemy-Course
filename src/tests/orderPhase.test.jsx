import { render, screen } from '../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('order phases for happy path', async () => {
  // render app
  render(<App />, { wrapper: BrowserRouter });
  // find scoops and toppings inputs
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' });
  const mmTopping = await screen.findByRole('checkbox', { name: 'M&Ms' });

  // clear scoops inputs
  userEvent.clear(vanillaInput);
  userEvent.clear(chocolateInput);

  // add scoops and toppings
  userEvent.type(vanillaInput, '1');
  userEvent.type(chocolateInput, '1');
  userEvent.click(mmTopping);

  // find the and click the order button
  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' });
  userEvent.click(orderButton);

  // check that summary info is correct
  const scoopsSubtotalHeading = await screen.findByRole('heading', { name: /Scoops: \$/i });
  expect(scoopsSubtotalHeading).toHaveTextContent('$4.00');

  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('1 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('M&Ms')).toBeInTheDocument();

  // accept terms and conditions
  const termsAndConditionsCheckbox = await screen.findByRole('checkbox', {
    name: /I agree to Terms and Conditions/i,
  });

  userEvent.click(termsAndConditionsCheckbox);
  // confirm button is enabled
  const confirmButton = await screen.findByRole('button', { name: 'Confirm order' });

  expect(confirmButton).toBeEnabled();
  // click button to confirm order
  userEvent.click(confirmButton);
  // check that theres an order number
  let orderHeading = screen.getByRole('heading', { name: /Loading.../i });
  orderHeading = await screen.findByRole('heading', { name: /your order number is/i });
  expect(orderHeading).toHaveTextContent(/your order number is \d{1,}/i);
  // click new order button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: 'Create new order' });
  userEvent.click(newOrderButton);
  // check that scoops and toppings subtotals have been reset
  expect(await screen.findByText('Scoops total: $0.00')).toBeInTheDocument();
  expect(await screen.findByText(`Toppings total: $0.00`)).toBeInTheDocument();
});
