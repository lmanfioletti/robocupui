import React from 'react';
import { Link } from 'react-router-dom';
const NotFound: React.FC = () => {
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Página não encontrada
      </h2>
      <p className="text-gray-600 mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">
        Voltar para a página inicial
      </Link>
    </div>;
};
export default NotFound;