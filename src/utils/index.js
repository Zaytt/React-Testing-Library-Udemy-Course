/**
 * Formats a number as currency
 * @param {number} amount
 * @returns {string} amount formatted as currency
 *
 * @example
 *    formatCurrency(2)
 *    => "$2.00"
 *
 * @example
 *    formatCurrency(1.5)
 *    => "$1.50"
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}
