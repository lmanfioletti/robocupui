import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { MenuIcon, XIcon } from 'lucide-react';
const Header: React.FC = () => {
  const {
    isAuthenticated
  } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Robocup UI
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Início
              </Link>
              <Link to="/dashboard/leaderboard" className="text-gray-700 hover:text-blue-600">
                Classificação
              </Link>
              <Link to="/dashboard/matches" className="text-gray-700 hover:text-blue-600">
                Partidas
              </Link>
            </nav>
            {isAuthenticated ? <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Dashboard
              </Link> : <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Entrar
              </Link>}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-blue-600 focus:outline-none">
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4 pb-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Início
              </Link>
              <Link to="/dashboard/leaderboard" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Classificação
              </Link>
              <Link to="/dashboard/matches" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                Partidas
              </Link>
              {isAuthenticated ? <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition inline-block w-full text-center" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link> : <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition inline-block w-full text-center" onClick={() => setIsMenuOpen(false)}>
                  Entrar
                </Link>}
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;