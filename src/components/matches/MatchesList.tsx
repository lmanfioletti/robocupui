import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, PlayIcon, CheckCircleIcon, AlertCircleIcon, EyeIcon } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
// Mock matches data
const initialMatches = [{
  id: 1,
  teams: 'TechBots vs RoboMasters',
  category: 'Sumô',
  date: '2023-10-15',
  time: '14:30',
  location: 'Arena 1',
  status: 'scheduled',
  result: null
}, {
  id: 2,
  teams: 'MechWarriors vs CircuitBreakers',
  category: 'Robô de Combate',
  date: '2023-10-15',
  time: '15:00',
  location: 'Arena 2',
  status: 'in_progress',
  result: null
}, {
  id: 3,
  teams: 'ByteForce vs RescueBots',
  category: 'Seguidor de Linha',
  date: '2023-10-14',
  time: '16:15',
  location: 'Arena 1',
  status: 'completed',
  result: {
    winner: 'ByteForce',
    score: '245 - 198',
    time: '1:32'
  }
}, {
  id: 4,
  teams: 'RoboMasters vs CircuitBreakers',
  category: 'Sumô',
  date: '2023-10-14',
  time: '11:00',
  location: 'Arena 2',
  status: 'completed',
  result: {
    winner: 'CircuitBreakers',
    score: '3 - 1',
    time: '2:45'
  }
}, {
  id: 5,
  teams: 'TechBots vs MechWarriors',
  category: 'Resgate',
  date: '2023-10-16',
  time: '09:30',
  location: 'Arena 1',
  status: 'scheduled',
  result: null
}];
interface MatchesListProps {
  searchTerm: string;
  selectedStatus: string;
  selectedCategory: string;
  selectedArena: string;
}
const MatchesList: React.FC<MatchesListProps> = ({
  searchTerm,
  selectedStatus,
  selectedCategory,
  selectedArena
}) => {
  const {
    currentUser
  } = useAuth();
  // Filter matches based on search term, status, category and arena
  const filteredMatches = initialMatches.filter(match => {
    const matchesSearch = match.teams.toLowerCase().includes(searchTerm.toLowerCase()) || match.category.toLowerCase().includes(searchTerm.toLowerCase()) || match.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || match.status === selectedStatus;
    const matchesCategory = selectedCategory === 'Todos' || match.category === selectedCategory;
    const matchesArena = selectedArena === 'Todas' || match.location === selectedArena;
    return matchesSearch && matchesStatus && matchesCategory && matchesArena;
  });
  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CalendarIcon size={12} className="mr-1" />
            Agendada
          </span>;
      case 'in_progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <PlayIcon size={12} className="mr-1" />
            Em Andamento
          </span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon size={12} className="mr-1" />
            Finalizada
          </span>;
      default:
        return null;
    }
  };
  return <div>
      {filteredMatches.length > 0 ? <div className="space-y-4">
          {filteredMatches.map(match => <div key={match.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 md:mb-0">
                    {match.teams}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(match.status)}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {match.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-6 mb-2 md:mb-0">
                    <CalendarIcon size={16} className="mr-1" />
                    <span>{match.date}</span>
                  </div>
                  <div className="flex items-center mr-6 mb-2 md:mb-0">
                    <ClockIcon size={16} className="mr-1" />
                    <span>{match.time}</span>
                  </div>
                  <div>
                    <span>{match.location}</span>
                  </div>
                </div>
                {match.status === 'completed' && match.result && <div className="bg-gray-50 p-3 rounded-md mb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Resultado:
                        </span>
                        <span className="ml-2 text-sm font-semibold">
                          {match.result.score}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Vencedor:
                        </span>
                        <span className="ml-2 text-sm font-semibold text-green-600">
                          {match.result.winner}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          Tempo:
                        </span>
                        <span className="ml-2 text-sm font-semibold">
                          {match.result.time}
                        </span>
                      </div>
                    </div>
                  </div>}
                <div className="flex justify-end">
                  <Link to={`/dashboard/matches/${match.id}`} className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                    <EyeIcon size={16} className="mr-1" />
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>)}
        </div> : <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center justify-center text-gray-500">
          <AlertCircleIcon size={48} className="mb-4" />
          <p className="text-xl font-medium mb-2">Nenhuma partida encontrada</p>
          <p className="mb-6">
            Tente ajustar seus filtros ou adicione uma nova partida.
          </p>
        </div>}
    </div>;
};
export default MatchesList;