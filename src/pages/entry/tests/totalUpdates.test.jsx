import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  // make sure subtotal starts at 0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');
  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings are selected', async () => {
  render(<Options optionType="toppings" />);

  // Make sure toppings subtotal starts at 0.00
  const toppingsSubtotal = screen.getByText(`Toppings total: $`, { exact: false });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // Select one of the topping and check that the subtotal is correct
  const mmToppingCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
  userEvent.click(mmToppingCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // Select the rest of the toppings and check that the subtotal is correct
  const hotFudgeToppingCheckbox = await screen.findByRole('checkbox', { name: /hot fudge/i });
  const butterCupToppingCheckbox = await screen.findByRole('checkbox', {
    name: /peanut butter cups/i,
  });
  userEvent.click(hotFudgeToppingCheckbox);
  userEvent.click(butterCupToppingCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('4.50');

  // Click on one of the selected checkboxes to remove the topping
  userEvent.click(mmToppingCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');
});

describe('Calculate grand total', () => {
  test('grand total updates when adding scoops first', async () => {
    render(<OrderEntry />);

    const grandTotalHeading = screen.getByRole('heading', { name: /grand total: \$/i });

    // Check that the grand total starts at 0
    expect(grandTotalHeading).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(grandTotalHeading).toHaveTextContent('2.00');

    const fudgeToppingInput = await screen.findByRole('checkbox', { name: /hot fudge/i });
    userEvent.click(fudgeToppingInput);

    expect(grandTotalHeading).toHaveTextContent('3.50');
  });

  test('grand total updates when adding toppings first', async () => {
    render(<OrderEntry />);

    const grandTotalHeading = screen.getByRole('heading', { name: /grand total: \$/i });
    const mmToppingInput = await screen.findByRole('checkbox', { name: 'M&Ms' });

    userEvent.click(mmToppingInput);
    expect(grandTotalHeading).toHaveTextContent('1.50');

    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });

    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(grandTotalHeading).toHaveTextContent('5.50');
  });

  test('grand total updates when an item is removed', async () => {
    render(<OrderEntry />);

    const grandTotalHeading = screen.getByRole('heading', { name: /grand total: \$/i });
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    const mmToppingInput = await screen.findByRole('checkbox', { name: 'M&Ms' });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    userEvent.click(mmToppingInput);

    expect(grandTotalHeading).toHaveTextContent('3.50');

    userEvent.type(vanillaInput, '0');

    expect(grandTotalHeading).toHaveTextContent('1.50');

    userEvent.click(mmToppingInput);

    expect(grandTotalHeading).toHaveTextContent('0.00');
  });
});
