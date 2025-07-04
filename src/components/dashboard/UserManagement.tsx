import React, { useState } from 'react';
import { UserIcon, PencilIcon, InfoIcon, SearchIcon, ShieldIcon } from 'lucide-react';
// Mock users data
const initialUsers = [{
  id: 1,
  name: 'João Silva',
  email: 'joao.silva@example.com',
  role: 'admin',
  lastLogin: '2023-10-14 10:45'
}, {
  id: 2,
  name: 'Maria Oliveira',
  email: 'maria.oliveira@example.com',
  role: 'judge',
  lastLogin: '2023-10-14 09:30'
}, {
  id: 3,
  name: 'Pedro Santos',
  email: 'pedro.santos@example.com',
  role: 'assistant',
  lastLogin: '2023-10-13 15:20'
}, {
  id: 4,
  name: 'Ana Costa',
  email: 'ana.costa@example.com',
  role: 'user',
  lastLogin: '2023-10-12 14:15'
}, {
  id: 5,
  name: 'Carlos Ferreira',
  email: 'carlos.ferreira@example.com',
  role: 'judge',
  lastLogin: '2023-10-14 11:30'
}, {
  id: 6,
  name: 'Beatriz Gomes',
  email: 'beatriz.gomes@example.com',
  role: 'assistant',
  lastLogin: '2023-10-13 16:45'
}];
// User roles
const roles = [{
  value: 'all',
  label: 'Todos'
}, {
  value: 'admin',
  label: 'Administrador'
}, {
  value: 'judge',
  label: 'Juiz'
}, {
  value: 'assistant',
  label: 'Assistente'
}, {
  value: 'user',
  label: 'Usuário'
}];
const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const handleOpenModal = (user: any) => {
    // Now only allow editing existing users
    if (!user) return;
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };
  const handleSaveUser = (formData: any) => {
    if (currentUser) {
      // Edit existing user
      setUsers(users.map(user => user.id === currentUser.id ? {
        ...formData,
        id: user.id
      } : user));
    }
    handleCloseModal();
  };
  // Filter users based on search term and selected role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });
  // Helper function to get role display name
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'judge':
        return 'Juiz';
      case 'assistant':
        return 'Assistente';
      case 'user':
        return 'Usuário';
      default:
        return role;
    }
  };
  // Helper function to get role badge class
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'judge':
        return 'bg-orange-100 text-orange-800';
      case 'assistant':
        return 'bg-green-100 text-green-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Gerenciamento de Usuários
        </h1>
      </div>
      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={16} className="text-gray-400" />
          </div>
          <input type="text" placeholder="Buscar usuários..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="w-full md:w-64">
          <select className="block w-full px-3 py-2 border border-gray-300 rounded-md" value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
            {roles.map(role => <option key={role.value} value={role.value}>
                {role.label}
              </option>)}
          </select>
        </div>
      </div>
      {filteredUsers.length > 0 ? <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perfil
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Login
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
                        {user.role === 'admin' ? <ShieldIcon size={18} className="text-red-600" /> : <UserIcon size={18} />}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                      {getRoleDisplayName(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleOpenModal(user)} className="text-blue-600 hover:text-blue-900">
                      <PencilIcon size={16} />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div> : <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center justify-center text-gray-500">
          <InfoIcon size={48} className="mb-4" />
          <p className="text-xl font-medium mb-2">Nenhum usuário encontrado</p>
          <p className="mb-6">Tente ajustar seus filtros.</p>
        </div>}
      {/* User Edit Modal */}
      {isModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Editar Perfil do Usuário
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" value={currentUser.name} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" value={currentUser.email} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Perfil
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md" value={formData.role} onChange={e => setFormData(prev => ({
                ...prev,
                role: e.target.value
              }))}>
                    {roles.filter(r => r.value !== 'all').map(role => <option key={role.value} value={role.value}>
                          {role.label}
                        </option>)}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button onClick={handleCloseModal} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Cancelar
                </button>
                <button onClick={() => handleSaveUser({
              ...currentUser,
              role: formData.role
            })} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default UserManagement;