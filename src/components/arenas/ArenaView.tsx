import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ArrowLeftIcon, CircleDotIcon, TimerIcon, TrophyIcon, InfoIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '../ui/alert-dialog';
// Mock data for a specific arena
const arenaData = {
  id: 1,
  name: 'Arena 1',
  status: 'active',
  currentMatch: {
    teams: {
      team1: {
        name: 'TechBots',
        score: 2
      },
      team2: {
        name: 'RoboMasters',
        score: 1
      }
    },
    category: 'Sumô',
    categoryInfo: {
      description: 'Dois robôs competem para empurrar o adversário para fora da arena.',
      criteria: 'Pontuação baseada em vitórias e tempo de empurrão.',
      rules: ['Robôs devem ter no máximo 20kg', 'Arena circular com 2m de diâmetro', 'Partidas com duração máxima de 3 minutos', 'Vitória por empurrão para fora da arena ou imobilização']
    },
    startTime: '14:30',
    duration: '12:45',
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=CHANNEL_ID'
  },
  comments: [{
    id: 1,
    user: 'Carlos Ferreira (Assistente)',
    time: '14:35',
    text: 'TechBots conseguiu um ponto com uma manobra impressionante!'
  }, {
    id: 2,
    user: 'Maria Santos (Juiz)',
    time: '14:40',
    text: 'RoboMasters está se recuperando após o último round.'
  }]
};
const ArenaView: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    currentUser
  } = useAuth();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isAdmin = currentUser?.role === 'admin';
  const handleDelete = () => {
    // Here you would delete the arena
    setShowDeleteDialog(false);
    navigate('/dashboard/arenas');
  };
  return <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-4 text-gray-500">
            <ArrowLeftIcon size={20} />
          </Button>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {arenaData.name}
                </h1>
                <p className="text-gray-500 mt-1">Partida em Andamento</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success" className="flex items-center gap-1">
                  <CircleDotIcon size={12} className="animate-pulse" />
                  Ao Vivo
                </Badge>
                {isAdmin && <>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/arenas/edit/${id}`)} className="flex items-center">
                      <PencilIcon size={14} className="mr-1" />
                      Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)} className="flex items-center">
                      <TrashIcon size={14} className="mr-1" />
                      Excluir
                    </Button>
                  </>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Live Stream and Scoreboard */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-900 rounded-lg mb-6">
                <iframe src={arenaData.currentMatch.streamUrl} className="w-full h-full rounded-lg" allowFullScreen title="Live Stream"></iframe>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center bg-gray-50 rounded-lg p-6">
                <div className="flex-1 text-center">
                  <p className="text-xl font-semibold">
                    {arenaData.currentMatch.teams.team1.name}
                  </p>
                  <p className="text-4xl font-bold mt-2">
                    {arenaData.currentMatch.teams.team1.score}
                  </p>
                </div>
                <div className="mx-6 my-4 md:my-0 text-2xl font-bold text-gray-400">
                  VS
                </div>
                <div className="flex-1 text-center">
                  <p className="text-xl font-semibold">
                    {arenaData.currentMatch.teams.team2.name}
                  </p>
                  <p className="text-4xl font-bold mt-2">
                    {arenaData.currentMatch.teams.team2.score}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Sidebar - Match Info and Category Details */}
        <div className="space-y-6">
          {/* Match Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrophyIcon className="w-5 h-5 mr-2" />
                Informações da Partida
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Categoria</span>
                  <Badge variant="purple">
                    {arenaData.currentMatch.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Início</span>
                  <span>{arenaData.currentMatch.startTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Duração</span>
                  <span>{arenaData.currentMatch.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Category Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <InfoIcon className="w-5 h-5 mr-2" />
                Detalhes da Categoria {arenaData.currentMatch.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Descrição
                  </h3>
                  <p className="text-gray-900">
                    {arenaData.currentMatch.categoryInfo.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Critérios de Pontuação
                  </h3>
                  <p className="text-gray-900">
                    {arenaData.currentMatch.categoryInfo.criteria}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Regras
                  </h3>
                  <ul className="space-y-2">
                    {arenaData.currentMatch.categoryInfo.rules.map((rule, index) => <li key={index} className="flex text-gray-900">
                          <span className="mr-2">•</span>
                          <span>{rule}</span>
                        </li>)}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Add Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Arena</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta arena? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>;
};
export default ArenaView;