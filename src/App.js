import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import Summary from './pages/summary/Summary';
import Confirmation from './pages/confirmation/Confirmation';

import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
  return (
    <Container className="App">
      <Switch>
        {/* Summary page and order entry need provider */}
        <OrderDetailsProvider>
          <Route exact path="/" component={OrderEntry} />
          <Route exact path="/summary" render={Summary} />
          <Route exact path="/confirmation" component={Confirmation} />
        </OrderDetailsProvider>
        {/* Confirmation page does not need provider */}
      </Switch>
    </Container>
  );
}

export default App;
