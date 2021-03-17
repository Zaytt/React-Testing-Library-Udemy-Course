import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import OrderDetailsProvider from './contexts/OrderDetails';

function App() {
  return (
    <Container className="App">
      <OrderDetailsProvider>
        {/* Summary page and order entry need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Confirmation page does not need provider */}
    </Container>
  );
}

export default App;
