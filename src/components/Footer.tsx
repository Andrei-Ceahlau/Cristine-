import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3d2817] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* GRID PRINCIPAL - Layout îmbunătățit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* LINKURI UTILE */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-amber-300" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Linkuri Utile
            </h3>
            <div className="space-y-3 text-sm">
              <a href="#" className="block hover:text-amber-300 transition-colors duration-200">
                Politica de protecție a datelor cu caracter personal
              </a>
              <a href="#" className="block hover:text-amber-300 transition-colors duration-200">
                Termeni și condiții
              </a>
              <a href="#" className="block hover:text-amber-300 transition-colors duration-200">
                Accesibilitate
              </a>
              <a href="#" className="block hover:text-amber-300 transition-colors duration-200">
                Autoritatea pentru protecția consumatorului
              </a>
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="block hover:text-amber-300 transition-colors duration-200">
                Soluționarea online a litigiilor
              </a>
              <a href="#" className="block hover:text-amber-300 transition-colors duration-200">
                Informații nutriționale
              </a>
            </div>
          </div>

          {/* SOLUȚIONAREA ONLINE A LITIGIILOR */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-amber-300" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              Soluționarea Online a Litigiilor
            </h3>
            <p className="text-sm leading-relaxed text-gray-300 mb-3">
              Platforma europeană de soluționare online a litigiilor poate fi accesată la adresa:
            </p>
            <a 
              href="https://ec.europa.eu/consumers/odr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-amber-200 underline text-sm"
            >
              ec.europa.eu/consumers/odr
            </a>
          </div>

          {/* ANPC */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-amber-300" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>
              ANPC
            </h3>
            <p className="text-sm leading-relaxed text-gray-300 mb-3">
              Pentru informații despre drepturile consumatorilor, vizitați:
            </p>
            <a 
              href="https://anpc.ro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-amber-200 underline text-sm"
            >
              anpc.ro
            </a>
          </div>
        </div>

        {/* SOCIAL MEDIA & COPYRIGHT - Layout îmbunătățit */}
        <div className="border-t border-amber-900/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            
            {/* Social Icons */}
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-amber-300 transition-colors duration-200" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-amber-300 transition-colors duration-200" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm text-gray-300">© 2024 Cristine de casă. Toate drepturile rezervate.</p>
            </div>

            {/* Extra Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="hover:text-amber-300 transition-colors duration-200">Politica de confidențialitate</a>
              <a href="#" className="hover:text-amber-300 transition-colors duration-200">Harta site</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
