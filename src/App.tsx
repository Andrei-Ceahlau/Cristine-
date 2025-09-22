import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './contexts/ShopContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Offers from './components/Offers';
import Contact from './components/Contact';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <div className="min-h-screen">
                <Header />
                <Hero />
                <About />
                <Offers />
                <Contact />
              </div>
            } />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/offers" element={
              <div className="min-h-screen">
                <Header />
                <Offers />
              </div>
            } />
            <Route path="/contact" element={
              <div className="min-h-screen">
                <Header />
                <Contact />
              </div>
            } />
          </Routes>
        </Router>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;