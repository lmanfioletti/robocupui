import React from 'react';
const Footer: React.FC = () => {
  return <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BotScore</h3>
            <p className="text-gray-400">
              Sistema de gerenciamento para campeonatos de robótica
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition">
                  Início
                </a>
              </li>
              <li>
                <a href="/dashboard/leaderboard" className="text-gray-400 hover:text-white transition">
                  Classificação
                </a>
              </li>
              <li>
                <a href="/dashboard/matches" className="text-gray-400 hover:text-white transition">
                  Partidas
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-400 mb-2">Email: contato@botscore.com</p>
            <p className="text-gray-400">Telefone: (00) 0000-0000</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} BotScore. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;