import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
// Mock categories for form
const categories = ['Sumô', 'Seguidor de Linha', 'Robô de Combate', 'Resgate'];
// Mock judges data
const judges = [{
  id: 1,
  name: 'Maria Santos',
  email: 'maria.santos@example.com'
}, {
  id: 2,
  name: 'Carlos Ferreira',
  email: 'carlos.ferreira@example.com'
}, {
  id: 3,
  name: 'Ana Beatriz',
  email: 'ana.beatriz@example.com'
}, {
  id: 4,
  name: 'Roberto Silva',
  email: 'roberto.silva@example.com'
}];
// Mock teams for form
const teams = [{
  id: 1,
  name: 'TechBots'
}, {
  id: 2,
  name: 'RoboMasters'
}, {
  id: 3,
  name: 'MechWarriors'
}, {
  id: 4,
  name: 'RescueBots'
}, {
  id: 5,
  name: 'CircuitBreakers'
}, {
  id: 6,
  name: 'ByteForce'
}];
// Mock locations for form
const locations = ['Arena 1', 'Arena 2', 'Arena 3'];
const MatchForm: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  // Default form state
  const [formData, setFormData] = useState({
    category: 'Sumô',
    team1: teams[0].id,
    team2: teams[1].id,
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    location: 'Arena 1',
    judge: judges[0].id,
    notes: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the data to your backend
    console.log('Form data submitted:', formData);
    // Navigate back to matches list
    navigate('/dashboard/matches');
  };
  return <div>
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-500 hover:text-gray-700">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Editar Partida' : 'Nova Partida'}
        </h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" required>
                {categories.map(category => <option key={category} value={category}>
                    {category}
                  </option>)}
              </select>
            </div>
            {/* Judge Selection */}
            <div>
              <label htmlFor="judge" className="block text-sm font-medium text-gray-700 mb-1">
                Juiz Responsável
              </label>
              <select id="judge" name="judge" value={formData.judge} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" required>
                {judges.map(judge => <option key={judge.id} value={judge.id}>
                    {judge.name}
                  </option>)}
              </select>
            </div>
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Local
              </label>
              <select id="location" name="location" value={formData.location} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" required>
                {locations.map(location => <option key={location} value={location}>
                    {location}
                  </option>)}
              </select>
            </div>
            {/* Teams */}
            <div>
              <label htmlFor="team1" className="block text-sm font-medium text-gray-700 mb-1">
                Equipe 1
              </label>
              <select id="team1" name="team1" value={formData.team1} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" required>
                {teams.map(team => <option key={team.id} value={team.id}>
                    {team.name}
                  </option>)}
              </select>
            </div>
            <div>
              <label htmlFor="team2" className="block text-sm font-medium text-gray-700 mb-1">
                Equipe 2
              </label>
              <select id="team2" name="team2" value={formData.team2} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" required>
                {teams.map(team => <option key={team.id} value={team.id}>
                    {team.name}
                  </option>)}
              </select>
            </div>
            {/* Date and Time */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Data
              </label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Horário
              </label>
              <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" required />
            </div>
            {/* Notes */}
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea id="notes" name="notes" rows={3} value={formData.notes} onChange={handleChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          {/* Form validation error would go here */}
          <div className="mt-8 flex justify-end">
            <button type="button" onClick={() => navigate(-1)} className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center">
              <SaveIcon size={16} className="mr-1" />
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default MatchForm;