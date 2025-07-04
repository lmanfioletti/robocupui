import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { PlusIcon, ClipboardListIcon, PlayIcon, CheckCircleIcon, CalendarIcon, ClockIcon, SearchIcon, FilterIcon } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import MatchesList from '../matches/MatchesList';
import MatchDetail from '../matches/MatchDetail';
import MatchForm from '../matches/MatchForm';
// Mock match statuses for filter
const matchStatuses = [{
  value: 'all',
  label: 'Todas'
}, {
  value: 'scheduled',
  label: 'Agendadas'
}, {
  value: 'in_progress',
  label: 'Em Andamento'
}, {
  value: 'completed',
  label: 'Finalizadas'
}];
// Mock categories for filter
const categories = ['Todos', 'Sumô', 'Seguidor de Linha', 'Robô de Combate', 'Resgate'];
// Mock arenas for filter
const arenas = ['Todas', 'Arena 1', 'Arena 2', 'Arena 3'];
const Matches: React.FC = () => {
  const {
    currentUser
  } = useAuth();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedArena, setSelectedArena] = useState('Todas');
  // Only show main list filter controls on the main list view
  const isListView = location.pathname === '/dashboard/matches';
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Partidas</h1>
        {/* Only show add button for admin and judge */}
        {(currentUser?.role === 'admin' || currentUser?.role === 'judge') && isListView && <Link to="/dashboard/matches/new" className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <PlusIcon size={16} className="mr-1" />
              Nova Partida
            </Link>}
      </div>
      {/* Search and filters - only show on list view */}
      {isListView && <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={16} className="text-gray-400" />
              </div>
              <input type="text" placeholder="Buscar partidas..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="w-full md:w-48">
              <select className="block w-full px-3 py-2 border border-gray-300 rounded-md" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                {matchStatuses.map(status => <option key={status.value} value={status.value}>
                    {status.label}
                  </option>)}
              </select>
            </div>
            <div className="w-full md:w-48">
              <select className="block w-full px-3 py-2 border border-gray-300 rounded-md" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                {categories.map(category => <option key={category} value={category}>
                    {category === 'Todos' ? 'Todas as categorias' : category}
                  </option>)}
              </select>
            </div>
            <div className="w-full md:w-48">
              <select className="block w-full px-3 py-2 border border-gray-300 rounded-md" value={selectedArena} onChange={e => setSelectedArena(e.target.value)}>
                {arenas.map(arena => <option key={arena} value={arena}>
                    {arena}
                  </option>)}
              </select>
            </div>
          </div>
        </div>}
      <Routes>
        <Route path="/" element={<MatchesList searchTerm={searchTerm} selectedStatus={selectedStatus} selectedCategory={selectedCategory} selectedArena={selectedArena} />} />
        <Route path="/new" element={<MatchForm />} />
        <Route path="/edit/:id" element={<MatchForm />} />
        <Route path="/:id" element={<MatchDetail />} />
      </Routes>
    </div>;
};
export default Matches;