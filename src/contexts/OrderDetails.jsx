import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants/index';

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Create a context
const OrderDetails = createContext();

// create custom hook to check if we are inside of a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('useOrderDetails must be used within a useOrderDetailsProvider');
  }

  return context;
}

// Iterate through the values of the optionType map and sum them together
function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

// The Provider for the context
export function OrderDetailsProvider(props) {
  // A state object containing a map for each of the scoops and topping options
  // like: [ [Vanilla, 3], [Chocolate, 2] ]
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zero = formatCurrency(0);
  // State to keep the totals
  const [totals, setTotals] = useState({
    scoops: zero,
    toppings: zero,
    grandTotal: zero,
  });

  // Use effect to recalculate  subtotals and totals when the scoops or toppings changes
  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  // a memoized value that only recalculates when optionCounts or the totals change
  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with the new value
      const optionCountsMap = newOptionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }
    // getter: object containing option count for scoops and toppings, subtotal
    // setting: update option counts

    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
