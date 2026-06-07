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
import GalleryPage from './pages/GalleryPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ShopProvider>
          <Router>
            {/* HEADER GLOBAL - Apare pe TOATE paginile */}
            <Header />
            
            {/* MAIN CONTENT - Padding pentru header fixed */}
            <main className="pt-[108px] sm:pt-[116px]">
              <Routes>
                {/* HOME PAGE */}
                <Route path="/" element={
                  <div className="min-h-screen bg-[#fdfbf8]">
                    <Hero />
                    <WelcomeCards />
                    <ProductCategories />
                    <Testimonials />
                    <Footer />
                  </div>
                } />
                
                {/* SHOP PAGE */}
                <Route path="/shop" element={<ShopPage />} />
                
                {/* GALLERY PAGES - Galerie de prezentare */}
                <Route path="/gallery/:category" element={<GalleryPage />} />
                <Route path="/gallery/:category/product/:productId" element={<ProductDetailPage />} />
                
                {/* ABOUT PAGE - Pagină distinctă */}
                <Route path="/about" element={<AboutPage />} />
                
                {/* CART PAGE */}
                <Route path="/cart" element={<CartPage />} />
                
                {/* PROFILE PAGE */}
                <Route path="/profile" element={<ProfilePage />} />
                
                {/* CONTACT PAGE */}
                <Route path="/contact" element={
                  <div className="min-h-screen bg-[#fdfbf8]">
                    <Contact />
                    <Footer />
                  </div>
                } />
              </Routes>
            </main>
          </Router>
        </ShopProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
