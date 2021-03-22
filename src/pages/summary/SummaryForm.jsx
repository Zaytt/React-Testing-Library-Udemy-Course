import React, { useState } from 'react';
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SummaryForm = () => {
  const [tcChecked, setTcChecked] = useState(false);
  const history = useHistory();

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
    </Popover>
  );

  const checkboxLabel = (
    <OverlayTrigger placement="right" overlay={popover}>
      <span>
        I agree to <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </span>
    </OverlayTrigger>
  );

  const handleClick = (event) => {
    event.preventDefault();
    history.push('/confirmation');
  };

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!tcChecked} onClick={handleClick}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
