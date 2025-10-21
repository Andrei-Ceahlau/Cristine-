import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, ShoppingBag, Heart, Settings, LogOut, Edit3, Star } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

const ProfilePage: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Cristine User',
    email: 'user@cristine.com',
    phone: '+40 123 456 789',
    address: 'Suceava, România'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aici ai putea salva datele în backend
    console.log('User data saved:', userData);
  };

  const handleLogout = () => {
    // Aici ai putea face logout-ul real
    console.log('User logged out');
  };

  const stats = [
    { label: 'Comenzi', value: '12', icon: ShoppingBag, color: 'text-blue-500' },
    { label: 'Favorite', value: '8', icon: Heart, color: 'text-red-500' },
    { label: 'Puncte', value: '450', icon: Star, color: 'text-yellow-500' }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Header */}
      <div className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-md shadow-lg ${isDarkMode ? 'bg-slate-900/95' : 'bg-white/95'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-amber-600 hover:text-amber-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-lg font-medium">Înapoi</span>
            </Link>
            
            <h1 className={`text-2xl font-serif font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Profil utilizator
            </h1>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-amber-400 hover:text-amber-300 hover:bg-slate-800'
                  : 'text-amber-600 hover:text-amber-700 hover:bg-amber-50'
              }`}
            >
              <Edit3 className="h-4 w-4" />
              <span className="text-sm font-medium">
                {isEditing ? 'Anulează' : 'Editează'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Profile Header */}
          <div className={`rounded-2xl shadow-lg p-8 mb-8 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              
              {/* Avatar */}
              <div className="relative">
                <div className={`h-32 w-32 rounded-full flex items-center justify-center text-4xl font-bold ${
                  isDarkMode ? 'bg-slate-700 text-amber-400' : 'bg-amber-100 text-amber-600'
                }`}>
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </div>
                {isEditing && (
                  <button className={`absolute bottom-0 right-0 p-2 rounded-full shadow-lg ${
                    isDarkMode ? 'bg-slate-600 text-white' : 'bg-white text-gray-700'
                  }`}>
                    <Edit3 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* User Info */}
              <div className="flex-grow text-center md:text-left">
                <h2 className={`text-3xl font-serif font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {userData.name}
                </h2>
                <p className={`text-lg mb-4 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                  Membru din 2024
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                      <p className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {stat.value}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Personal Information */}
            <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <h3 className={`text-xl font-semibold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                <User className="h-5 w-5 mr-2 text-amber-600" />
                Informații personale
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    Nume complet
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-amber-500' 
                          : 'bg-white border-gray-300 text-gray-800 focus:border-amber-500'
                      }`}
                    />
                  ) : (
                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{userData.name}</p>
                  )}
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-amber-500' 
                          : 'bg-white border-gray-300 text-gray-800 focus:border-amber-500'
                      }`}
                    />
                  ) : (
                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{userData.email}</p>
                  )}
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    <Phone className="h-4 w-4 inline mr-1" />
                    Telefon
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-amber-500' 
                          : 'bg-white border-gray-300 text-gray-800 focus:border-amber-500'
                      }`}
                    />
                  ) : (
                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{userData.phone}</p>
                  )}
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Adresă
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.address}
                      onChange={(e) => setUserData({...userData, address: e.target.value})}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-700 border-slate-600 text-white focus:border-amber-500' 
                          : 'bg-white border-gray-300 text-gray-800 focus:border-amber-500'
                      }`}
                    />
                  ) : (
                    <p className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{userData.address}</p>
                  )}
                </div>
                
                {isEditing && (
                  <div className="pt-4">
                    <button
                      onClick={handleSave}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      Salvează modificările
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-2xl shadow-lg p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <h3 className={`text-xl font-semibold mb-6 flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                <Settings className="h-5 w-5 mr-2 text-amber-600" />
                Acțiuni rapide
              </h3>
              
              <div className="space-y-4">
                <Link
                  to="/shop"
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-slate-700 hover:bg-slate-600' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Magazin
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                      Explorează produsele noastre
                    </p>
                  </div>
                </Link>
                
                <Link
                  to="/cart"
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-slate-700 hover:bg-slate-600' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag className="h-6 w-6 text-green-500" />
                  <div>
                    <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Coș de cumpărături
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                      Finalizează comanda
                    </p>
                  </div>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center justify-center space-x-3 p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-red-800/20 text-red-400 hover:bg-red-800/30'
                      : 'bg-red-50 text-red-600 hover:bg-red-100'
                  }`}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-semibold">Deconectare</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
