import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { UsersIcon, TrophyIcon, ClipboardListIcon, ClockIcon, CalendarIcon, CheckCircleIcon, AlertTriangleIcon } from 'lucide-react';
const Overview: React.FC = () => {
  const {
    currentUser
  } = useAuth();
  // Mock data for overview statistics
  const stats = [{
    label: 'Categorias',
    value: 4,
    icon: TrophyIcon,
    color: 'text-blue-500'
  }, {
    label: 'Equipes',
    value: 16,
    icon: UsersIcon,
    color: 'text-green-500'
  }, {
    label: 'Partidas',
    value: 24,
    icon: ClipboardListIcon,
    color: 'text-orange-500'
  }, {
    label: 'Partidas Finalizadas',
    value: 10,
    icon: CheckCircleIcon,
    color: 'text-purple-500'
  }];
  // Mock data for upcoming matches
  const upcomingMatches = [{
    id: 1,
    teams: 'Equipe A vs Equipe B',
    category: 'Sumô',
    time: '14:30',
    date: '2023-10-15',
    location: 'Arena 1'
  }, {
    id: 2,
    teams: 'Equipe C vs Equipe D',
    category: 'Seguidor de Linha',
    time: '15:00',
    date: '2023-10-15',
    location: 'Arena 2'
  }, {
    id: 3,
    teams: 'Equipe E vs Equipe F',
    category: 'Robô de Combate',
    time: '16:15',
    date: '2023-10-15',
    location: 'Arena 1'
  }];
  // Mock data for recent results
  const recentResults = [{
    id: 1,
    teams: 'Equipe G vs Equipe H',
    category: 'Sumô',
    result: '3 - 1',
    winner: 'Equipe G'
  }, {
    id: 2,
    teams: 'Equipe I vs Equipe J',
    category: 'Seguidor de Linha',
    result: '2 - 2',
    winner: 'Empate'
  }, {
    id: 3,
    teams: 'Equipe K vs Equipe L',
    category: 'Robô de Combate',
    result: '0 - 3',
    winner: 'Equipe L'
  }];
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Visão Geral</h1>
        <p className="text-gray-500">Bem-vindo, {currentUser?.name}!</p>
      </div>
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className={`rounded-full p-3 ${stat.color.replace('text', 'bg')}-100 mr-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-800">
                {stat.value}
              </p>
            </div>
          </div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming matches */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Próximas Partidas
            </h2>
            <ClockIcon className="h-5 w-5 text-gray-400" />
          </div>
          {upcomingMatches.length > 0 ? <div className="space-y-4">
              {upcomingMatches.map(match => <div key={match.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium text-gray-800">{match.teams}</h3>
                    <span className="text-sm bg-yellow-100 text-yellow-800 py-0.5 px-2 rounded-full">
                      {match.category}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span className="mr-3">{match.date}</span>
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{match.time}</span>
                    <span className="ml-3 text-gray-400">
                      • {match.location}
                    </span>
                  </div>
                </div>)}
            </div> : <div className="flex flex-col items-center justify-center py-6 text-gray-500">
              <CalendarIcon className="h-10 w-10 mb-2" />
              <p>Não há partidas agendadas</p>
            </div>}
        </div>
        {/* Recent results */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Resultados Recentes
            </h2>
            <CheckCircleIcon className="h-5 w-5 text-gray-400" />
          </div>
          {recentResults.length > 0 ? <div className="space-y-4">
              {recentResults.map(result => <div key={result.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium text-gray-800">
                      {result.teams}
                    </h3>
                    <span className="text-sm bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full">
                      {result.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-800">
                      {result.result}
                    </span>
                    <span className="text-green-600">
                      Vencedor: {result.winner}
                    </span>
                  </div>
                </div>)}
            </div> : <div className="flex flex-col items-center justify-center py-6 text-gray-500">
              <AlertTriangleIcon className="h-10 w-10 mb-2" />
              <p>Nenhum resultado disponível</p>
            </div>}
        </div>
      </div>
    </div>;
};
export default Overview;