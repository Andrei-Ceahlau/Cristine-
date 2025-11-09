import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './contexts/ShopContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import WelcomeCards from './components/WelcomeCards';
import ProductCategories from './components/ProductCategories';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ShopProvider>
          <Router>
            {/* HEADER GLOBAL - Apare pe TOATE paginile */}
            <Header />
            
            <Routes>
              {/* HOME PAGE */}
              <Route path="/" element={
                <div className="min-h-screen bg-white">
                  <Hero />
                  <WelcomeCards />
                  <ProductCategories />
                  <Testimonials />
                  <Footer />
                </div>
              } />
              
              {/* SHOP PAGE */}
              <Route path="/shop" element={<ShopPage />} />
              
              {/* ABOUT PAGE - Pagină distinctă */}
              <Route path="/about" element={<AboutPage />} />
              
              {/* CART PAGE */}
              <Route path="/cart" element={<CartPage />} />
              
              {/* PROFILE PAGE */}
              <Route path="/profile" element={<ProfilePage />} />
              
              {/* CONTACT PAGE */}
              <Route path="/contact" element={
                <div className="min-h-screen bg-white">
                  <Contact />
                  <Footer />
                </div>
              } />
            </Routes>
          </Router>
        </ShopProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
