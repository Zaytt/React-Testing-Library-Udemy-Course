import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('initial conditions', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole('button', { name: /Confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test('clicking checkbox enables and disables confirm button', () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole('button', { name: /Confirm order/i });
  const checkbox = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i });

  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test('popover responds to mouse hover', async () => {
  render(<SummaryForm />);
  // popover starts hidden
  let nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouse over checkbox label
  const label = screen.getByText(/terms and conditions/i);
  userEvent.hover(label);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when mouse leaves checkbox label
  userEvent.unhover(label);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
