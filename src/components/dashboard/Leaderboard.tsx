import React, { useState } from 'react';
import { TrophyIcon, SearchIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
// Mock categories for filter
const categories = ['Todos', 'Sumô', 'Seguidor de Linha', 'Robô de Combate', 'Resgate'];
// Mock leaderboard data
const initialLeaderboard = [{
  id: 1,
  team: 'TechBots',
  category: 'Sumô',
  points: 12,
  matches: 5,
  wins: 4,
  draws: 0,
  losses: 1,
  pointsBalance: 8
}, {
  id: 2,
  team: 'RoboMasters',
  category: 'Seguidor de Linha',
  points: 9,
  matches: 4,
  wins: 3,
  draws: 0,
  losses: 1,
  pointsBalance: 5
}, {
  id: 3,
  team: 'MechWarriors',
  category: 'Robô de Combate',
  points: 7,
  matches: 3,
  wins: 2,
  draws: 1,
  losses: 0,
  pointsBalance: 4
}, {
  id: 4,
  team: 'CircuitBreakers',
  category: 'Sumô',
  points: 6,
  matches: 4,
  wins: 2,
  draws: 0,
  losses: 2,
  pointsBalance: 1
}, {
  id: 5,
  team: 'ByteForce',
  category: 'Seguidor de Linha',
  points: 4,
  matches: 3,
  wins: 1,
  draws: 1,
  losses: 1,
  pointsBalance: 0
}, {
  id: 6,
  team: 'RescueBots',
  category: 'Resgate',
  points: 3,
  matches: 3,
  wins: 1,
  draws: 0,
  losses: 2,
  pointsBalance: -2
}];
const Leaderboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortField, setSortField] = useState('points');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  // Filter and sort leaderboard data
  const filteredLeaderboard = initialLeaderboard.filter(item => {
    const matchesSearch = item.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const fieldA = a[sortField as keyof typeof a];
    const fieldB = b[sortField as keyof typeof b];
    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    }
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
    }
    return 0;
  });
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  const getSortIcon = (field: string) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <ArrowUpIcon size={14} className="ml-1" /> : <ArrowDownIcon size={14} className="ml-1" />;
  };
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Tabela de Classificação
        </h1>
      </div>
      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={16} className="text-gray-400" />
          </div>
          <input type="text" placeholder="Buscar equipes..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="w-full md:w-64">
          <select className="block w-full px-3 py-2 border border-gray-300 rounded-md" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            {categories.map(category => <option key={category} value={category}>
                {category === 'Todos' ? 'Todas as categorias' : category}
              </option>)}
          </select>
        </div>
      </div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                  Pos.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('team')}>
                  <div className="flex items-center">
                    Equipe
                    {getSortIcon('team')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('category')}>
                  <div className="flex items-center">
                    Categoria
                    {getSortIcon('category')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('points')}>
                  <div className="flex items-center justify-center">
                    Pts
                    {getSortIcon('points')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('matches')}>
                  <div className="flex items-center justify-center">
                    J{getSortIcon('matches')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('wins')}>
                  <div className="flex items-center justify-center">
                    V{getSortIcon('wins')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('draws')}>
                  <div className="flex items-center justify-center">
                    E{getSortIcon('draws')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('losses')}>
                  <div className="flex items-center justify-center">
                    D{getSortIcon('losses')}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('pointsBalance')}>
                  <div className="flex items-center justify-center">
                    SG
                    {getSortIcon('pointsBalance')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeaderboard.map((item, index) => <tr key={item.id} className={index < 3 ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center">
                      {index < 3 ? <div className={`
                          w-6 h-6 rounded-full flex items-center justify-center mr-1
                          ${index === 0 ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${index === 1 ? 'bg-gray-100 text-gray-800' : ''}
                          ${index === 2 ? 'bg-orange-100 text-orange-800' : ''}
                        `}>
                          <TrophyIcon size={12} />
                        </div> : null}
                      <span>{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.team}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-bold">
                    {item.points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {item.matches}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-center">
                    {item.wins}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {item.draws}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 text-center">
                    {item.losses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={item.pointsBalance > 0 ? 'text-green-600' : item.pointsBalance < 0 ? 'text-red-600' : 'text-gray-500'}>
                      {item.pointsBalance > 0 ? '+' : ''}
                      {item.pointsBalance}
                    </span>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default Leaderboard;