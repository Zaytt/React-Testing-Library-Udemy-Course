import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';

test('displays image for each scoop from the server', async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altTextArray = scoopImages.map((e) => e.alt);
  expect(altTextArray).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('display image for each available topping', async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
  expect(toppingImages).toHaveLength(3);

  // confirm alt text of images
  const altTextArray = toppingImages.map((e) => e.alt);
  expect(altTextArray).toEqual(['M&Ms topping', 'Hot fudge topping', 'Peanut butter cups topping']);
});
