import React, { useState } from 'react';
import { PlusIcon, UsersIcon, PencilIcon, TrashIcon, InfoIcon, SearchIcon } from 'lucide-react';
import { DeleteConfirmationDialog } from '../ui/delete-confirmation-dialog';
// Mock teams data
const initialTeams = [{
  id: 1,
  name: 'TechBots',
  members: 'João Silva, Maria Oliveira, Pedro Santos',
  robot: 'TechBot 3000',
  category: 'Sumô',
  federation: 'FIRST Robotics'
}, {
  id: 2,
  name: 'RoboMasters',
  members: 'Ana Costa, Carlos Ferreira',
  robot: 'Master X1',
  category: 'Seguidor de Linha',
  federation: 'RoboCup'
}, {
  id: 3,
  name: 'MechWarriors',
  members: 'Lucas Almeida, Julia Pereira, Marcos Souza',
  robot: 'Destroyer',
  category: 'Robô de Combate',
  federation: 'VEX Robotics'
}, {
  id: 4,
  name: 'RescueBots',
  members: 'Fernando Lima, Camila Rodrigues',
  robot: 'SafetyFirst',
  category: 'Resgate',
  federation: 'RoboCup'
}, {
  id: 5,
  name: 'CircuitBreakers',
  members: 'Rafael Mendes, Beatriz Gomes',
  robot: 'Voltage',
  category: 'Sumô',
  federation: 'FIRST Robotics'
}, {
  id: 6,
  name: 'ByteForce',
  members: 'Gabriel Costa, Larissa Martins, Bruno Cardoso',
  robot: 'Algorhythm',
  category: 'Seguidor de Linha',
  federation: 'VEX Robotics'
}];
// Mock categories for filter
const categories = ['Todos', 'Sumô', 'Seguidor de Linha', 'Robô de Combate', 'Resgate'];
const Teams: React.FC = () => {
  const [teams, setTeams] = useState(initialTeams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null
  });
  const handleOpenModal = (team = null) => {
    setCurrentTeam(team);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTeam(null);
  };
  const handleSaveTeam = (formData: any) => {
    if (currentTeam) {
      // Edit existing team
      setTeams(teams.map(team => team.id === currentTeam.id ? {
        ...formData,
        id: team.id
      } : team));
    } else {
      // Add new team
      const newId = Math.max(...teams.map(t => t.id), 0) + 1;
      setTeams([...teams, {
        ...formData,
        id: newId
      }]);
    }
    handleCloseModal();
  };
  const handleDeleteTeam = (id: number) => {
    setDeleteConfirmation({
      open: true,
      id
    });
  };
  const confirmDelete = () => {
    if (deleteConfirmation.id) {
      setTeams(teams.filter(team => team.id !== deleteConfirmation.id));
    }
    setDeleteConfirmation({
      open: false,
      id: null
    });
  };
  // Filter teams based on search term and selected category
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) || team.members.toLowerCase().includes(searchTerm.toLowerCase()) || team.robot.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || team.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Equipes</h1>
        <button onClick={() => handleOpenModal()} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <PlusIcon size={16} className="mr-1" />
          Nova Equipe
        </button>
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
      <DeleteConfirmationDialog open={deleteConfirmation.open} onClose={() => setDeleteConfirmation({
      open: false,
      id: null
    })} onConfirm={confirmDelete} title="Excluir equipe" description="Tem certeza que deseja excluir esta equipe? Esta ação não pode ser desfeita." />
      {filteredTeams.length > 0 ? <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipe
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membros
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Robô
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeams.map(team => <tr key={team.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <UsersIcon size={18} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {team.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {team.members}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{team.robot}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {team.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleOpenModal(team)} className="text-blue-600 hover:text-blue-900 mr-3">
                      <PencilIcon size={16} />
                    </button>
                    <button onClick={() => handleDeleteTeam(team.id)} className="text-red-600 hover:text-red-900">
                      <TrashIcon size={16} />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div> : <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center justify-center text-gray-500">
          <InfoIcon size={48} className="mb-4" />
          <p className="text-xl font-medium mb-2">Nenhuma equipe encontrada</p>
          <p className="mb-6">
            Tente ajustar seus filtros ou adicione uma nova equipe.
          </p>
        </div>}
      {/* Team Modal - simplified version */}
      {isModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {currentTeam ? 'Editar Equipe' : 'Nova Equipe'}
              </h3>
              <p className="text-gray-500 mb-6">
                {currentTeam ? 'Atualize as informações da equipe existente.' : 'Preencha as informações para criar uma nova equipe.'}
              </p>
              {/* Form would go here in a real implementation */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Equipe
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={currentTeam?.name || ''} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Membros
                  </label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={2} defaultValue={currentTeam?.members || ''} placeholder="Nomes separados por vírgula"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Robô
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={currentTeam?.robot || ''} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Federação
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={currentTeam?.federation || ''} placeholder="Nome da federação" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={currentTeam?.category || ''}>
                    {categories.filter(c => c !== 'Todos').map(category => <option key={category} value={category}>
                          {category}
                        </option>)}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button onClick={handleCloseModal} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Cancelar
                </button>
                <button onClick={() => handleSaveTeam({
              name: 'Nova Equipe',
              members: 'Membro 1, Membro 2',
              robot: 'Novo Robô',
              federation: 'FIRST Robotics',
              category: 'Sumô'
            })} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default Teams;