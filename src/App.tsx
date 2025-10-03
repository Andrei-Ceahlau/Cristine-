import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './contexts/ShopContext';
import { AuthProvider } from './contexts/AuthContext';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Offers from './components/Offers';
import Contact from './components/Contact';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';

const AppContent: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className={isDarkMode ? 'dark' : ''}>
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
    </div>
  );
};

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <ShopProvider>
          <Router>
            <AppContent />
          </Router>
        </ShopProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;