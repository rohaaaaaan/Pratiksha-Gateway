import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DestinationDetails from './pages/DestinationDetails';

import { SoundProvider } from './context/SoundContext';
import { BookingProvider } from './context/BookingContext';
import BookingModal from './components/BookingModal/BookingModal';

function App() {
  return (
    <SoundProvider>
      <BookingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destination/:id" element={<DestinationDetails />} />
          </Routes>
          <BookingModal />
        </Router>
      </BookingProvider>
    </SoundProvider>
  );
}

export default App;
