import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MonitorPlayIcon, CircleDotIcon, TimerIcon, UsersIcon, PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
// Mock data for arenas
const initialArenas = [{
  id: 1,
  name: 'Arena 1',
  status: 'active',
  currentMatch: {
    teams: 'TechBots vs RoboMasters',
    category: 'Sumô',
    startTime: '14:30',
    score: '2 - 1'
  }
}, {
  id: 2,
  name: 'Arena 2',
  status: 'active',
  currentMatch: {
    teams: 'ByteForce vs CircuitBreakers',
    category: 'Robô de Combate',
    startTime: '14:45',
    score: '1 - 1'
  }
}, {
  id: 3,
  name: 'Arena 3',
  status: 'preparing',
  nextMatch: {
    teams: 'MechWarriors vs RescueBots',
    category: 'Seguidor de Linha',
    scheduledTime: '15:00'
  }
}];
const ArenasList: React.FC = () => {
  const {
    currentUser
  } = useAuth();
  const [arenas, setArenas] = useState(initialArenas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArena, setCurrentArena] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    streamUrl: ''
  });
  const isAdmin = currentUser?.role === 'admin';
  const handleOpenModal = (arena = null) => {
    if (arena) {
      setCurrentArena(arena);
      setFormData({
        name: arena.name,
        streamUrl: arena.streamUrl || ''
      });
    } else {
      setCurrentArena(null);
      setFormData({
        name: '',
        streamUrl: ''
      });
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentArena(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSaveArena = () => {
    if (currentArena) {
      // Edit existing arena
      setArenas(arenas.map(arena => arena.id === currentArena.id ? {
        ...arena,
        ...formData
      } : arena));
    } else {
      // Add new arena
      const newId = Math.max(...arenas.map(a => a.id), 0) + 1;
      setArenas([...arenas, {
        ...formData,
        id: newId,
        status: 'available'
      }]);
    }
    handleCloseModal();
  };
  const handleDeleteArena = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta arena?')) {
      setArenas(arenas.filter(arena => arena.id !== id));
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" className="flex items-center gap-1">
            <CircleDotIcon size={12} className="animate-pulse" />
            Em andamento
          </Badge>;
      case 'preparing':
        return <Badge variant="warning" className="flex items-center gap-1">
            <TimerIcon size={12} />
            Preparando
          </Badge>;
      default:
        return <Badge variant="secondary" className="flex items-center gap-1">
            <CircleDotIcon size={12} />
            Disponível
          </Badge>;
    }
  };
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Arenas</h1>
        {isAdmin && <Button onClick={() => handleOpenModal()} className="flex items-center">
            <PlusIcon size={16} className="mr-1" />
            Nova Arena
          </Button>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {arenas.map(arena => <Card key={arena.id} className="hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Link to={`/dashboard/arenas/${arena.id}`}>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {arena.name}
                  </h2>
                </Link>
                <div className="flex items-center gap-2">
                  {getStatusBadge(arena.status)}
                  {isAdmin && <div className="flex items-center gap-1 ml-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => {
                  e.preventDefault();
                  handleOpenModal(arena);
                }}>
                        <PencilIcon size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700" onClick={e => {
                  e.preventDefault();
                  handleDeleteArena(arena.id);
                }}>
                        <TrashIcon size={14} />
                      </Button>
                    </div>}
                </div>
              </div>
              <Link to={`/dashboard/arenas/${arena.id}`}>
                {arena.status === 'active' && arena.currentMatch ? <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <UsersIcon size={16} className="mr-2" />
                      <span>{arena.currentMatch.teams}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="purple">
                        {arena.currentMatch.category}
                      </Badge>
                      <span className="text-lg font-bold text-gray-900">
                        {arena.currentMatch.score}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Início: {arena.currentMatch.startTime}</span>
                      <div className="flex items-center text-blue-600">
                        <MonitorPlayIcon size={16} className="mr-1" />
                        Assistir
                      </div>
                    </div>
                  </div> : arena.nextMatch && <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <UsersIcon size={16} className="mr-2" />
                        <span>{arena.nextMatch.teams}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="purple">
                          {arena.nextMatch.category}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Início: {arena.nextMatch.scheduledTime}
                        </span>
                      </div>
                    </div>}
              </Link>
            </div>
          </Card>)}
      </div>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogHeader>
          <DialogTitle>
            {currentArena ? 'Editar Arena' : 'Nova Arena'}
          </DialogTitle>
          <DialogDescription>
            {currentArena ? 'Atualize as informações da arena existente.' : 'Preencha as informações para criar uma nova arena.'}
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da Arena
              </label>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ex: Arena 1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL da Transmissão
              </label>
              <Input type="text" name="streamUrl" value={formData.streamUrl} onChange={handleChange} placeholder="URL do stream (opcional)" />
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button onClick={handleSaveArena}>Salvar</Button>
        </DialogFooter>
      </Dialog>
    </div>;
};
export default ArenasList;