import { Alert } from 'react-bootstrap';

import React from 'react';

const alertBanner = ({
  message = 'An unexpected error ocurred. Please try again later.',
  variant = 'danger',
}) => {
  return (
    <Alert variant={variant} style={{ background: 'red' }}>
      {message}
    </Alert>
  );
};

export default alertBanner;
