import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ShopContextType {
  isShopOpen: boolean;
  openShop: () => void;
  closeShop: () => void;
  shopHistory: Array<{
    openedAt: string;
    closedAt: string;
    duration: string;
  }>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

interface ShopProviderProps {
  children: ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [shopHistory, setShopHistory] = useState<Array<{
    openedAt: string;
    closedAt: string;
    duration: string;
  }>>([]);

  const openShop = () => {
    setIsShopOpen(true);
    const now = new Date().toISOString();
    
    // Salvează în localStorage pentru persistență
    localStorage.setItem('shopStatus', 'open');
    localStorage.setItem('currentSession', JSON.stringify({
      openedAt: now,
      isActive: true
    }));
    
    console.log('Magazinul a fost deschis!');
  };

  const closeShop = () => {
    setIsShopOpen(false);
    
    const savedSession = localStorage.getItem('currentSession');
    if (savedSession) {
      const currentSession = JSON.parse(savedSession);
      if (currentSession.isActive) {
        const closedAt = new Date().toISOString();
        const openedAt = new Date(currentSession.openedAt);
        const durationMs = new Date(closedAt).getTime() - openedAt.getTime();
        const durationMinutes = Math.round(durationMs / (1000 * 60));
        
        const newSession = {
          openedAt: currentSession.openedAt,
          closedAt: closedAt,
          duration: `${durationMinutes} minute`
        };
        
        setShopHistory(prev => [...prev, newSession]);
        
        // Salvează în localStorage
        const existingHistory = JSON.parse(localStorage.getItem('shopHistory') || '[]');
        localStorage.setItem('shopHistory', JSON.stringify([...existingHistory, newSession]));
      }
    }
    
    localStorage.setItem('shopStatus', 'closed');
    localStorage.removeItem('currentSession');
    
    console.log('Magazinul a fost închis!');
  };

  // Încarcă starea la pornirea aplicației
  useEffect(() => {
    const savedStatus = localStorage.getItem('shopStatus');
    const savedHistory = localStorage.getItem('shopHistory');
    
    if (savedStatus === 'open') {
      setIsShopOpen(true);
    }
    
    if (savedHistory) {
      setShopHistory(JSON.parse(savedHistory));
    }
  }, []);

  const value = {
    isShopOpen,
    openShop,
    closeShop,
    shopHistory
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};


