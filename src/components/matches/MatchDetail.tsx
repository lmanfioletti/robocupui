import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, MapPinIcon, TagIcon, CheckCircleIcon, PlayIcon, PauseIcon, PencilIcon, ImageIcon, MessageSquareIcon, ArrowLeftIcon, PlusIcon, MinimizeIcon, MaximizeIcon, CircleDotIcon, TrashIcon } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '../ui/alert-dialog';
// Mock match data
const matchData = {
  id: 2,
  teams: 'MechWarriors vs CircuitBreakers',
  category: 'Robô de Combate',
  date: '2023-10-15',
  time: '15:00',
  location: 'Arena 2',
  status: 'in_progress',
  startTime: '15:05',
  team1: {
    id: 3,
    name: 'MechWarriors',
    robot: 'Destroyer',
    score: 2
  },
  team2: {
    id: 5,
    name: 'CircuitBreakers',
    robot: 'Voltage',
    score: 1
  },
  comments: [{
    id: 1,
    user: 'Carlos Ferreira (Assistente)',
    time: '15:10',
    text: 'O robô Destroyer está tendo dificuldades com o terreno irregular.'
  }, {
    id: 2,
    user: 'Marcela Santos (Juiz)',
    time: '15:15',
    text: 'Voltage acaba de marcar um ponto com uma manobra impressionante!'
  }],
  photos: [{
    id: 1,
    url: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3QlMjBjb21wZXRpdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    caption: 'Início da partida'
  }, {
    id: 2,
    url: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJvYm90JTIwY29tcGV0aXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    caption: 'Manobra do Voltage'
  }]
};
const MatchDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    currentUser
  } = useAuth();
  const [match, setMatch] = useState(matchData);
  const [newComment, setNewComment] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [isStreamExpanded, setIsStreamExpanded] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isJudgeOrAdmin = currentUser?.role === 'judge' || currentUser?.role === 'admin';
  const isAssistantOrHigher = currentUser?.role === 'assistant' || isJudgeOrAdmin;
  const handleStartMatch = () => {
    setMatch({
      ...match,
      status: 'in_progress',
      startTime: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    });
  };
  const handleEndMatch = () => {
    setMatch({
      ...match,
      status: 'completed',
      endTime: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    });
  };
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj = {
      id: match.comments.length + 1,
      user: `${currentUser?.name} (${currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)})`,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      text: newComment
    };
    setMatch({
      ...match,
      comments: [...match.comments, newCommentObj]
    });
    setNewComment('');
  };
  const handleDelete = () => {
    // Here you would delete the match
    setShowDeleteDialog(false);
    navigate('/dashboard/matches');
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="default" className="flex gap-1 px-3 py-1">
            <CalendarIcon size={14} />
            Agendada
          </Badge>;
      case 'in_progress':
        return <Badge variant="warning" className="flex gap-1 px-3 py-1">
            <PlayIcon size={14} />
            Em Andamento
          </Badge>;
      case 'completed':
        return <Badge variant="success" className="flex gap-1 px-3 py-1">
            <CheckCircleIcon size={14} />
            Finalizada
          </Badge>;
      default:
        return null;
    }
  };
  return <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-4 text-gray-500">
            <ArrowLeftIcon size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Detalhes da Partida
            </h1>
            <p className="text-gray-500 mt-1">
              {match.status === 'in_progress' ? 'Em andamento' : 'Finalizada'}
            </p>
          </div>
        </div>
        {isJudgeOrAdmin && <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} className="flex items-center">
            <TrashIcon size={16} className="mr-1" />
            Excluir Partida
          </Button>}
      </div>
      {/* Live Stream Section */}
      <div className={`mb-6 transition-all duration-300 ease-in-out ${isStreamExpanded ? 'h-[80vh]' : 'h-auto'}`}>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Badge variant="success" className="flex items-center gap-1">
                  <CircleDotIcon size={12} className="animate-pulse" />
                  Ao Vivo
                </Badge>
                <span className="ml-2 text-sm text-gray-500">
                  {match.location}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsStreamExpanded(!isStreamExpanded)} className="flex items-center gap-2">
                {isStreamExpanded ? <>
                    <MinimizeIcon size={16} />
                    Minimizar
                  </> : <>
                    <MaximizeIcon size={16} />
                    Expandir
                  </>}
              </Button>
            </div>
            <div className={`relative transition-all duration-300 ease-in-out ${isStreamExpanded ? 'h-[calc(80vh-120px)]' : 'aspect-video'}`}>
              <iframe src={match.status === 'in_progress' ? 'https://www.youtube.com/embed/live_stream?channel=CHANNEL_ID' : undefined} className="w-full h-full rounded-lg" allowFullScreen title="Live Stream" />
            </div>
            <div className={`mt-4 transition-opacity duration-300 ${isStreamExpanded ? 'opacity-0 h-0' : 'opacity-100'}`}>
              <div className="flex flex-col md:flex-row items-center justify-center bg-gray-50 rounded-lg p-6">
                <div className="flex-1 text-center">
                  <p className="text-xl font-semibold">{match.team1.name}</p>
                  <p className="text-4xl font-bold mt-2">{match.team1.score}</p>
                </div>
                <div className="mx-6 my-4 md:my-0 text-2xl font-bold text-gray-400">
                  VS
                </div>
                <div className="flex-1 text-center">
                  <p className="text-xl font-semibold">{match.team2.name}</p>
                  <p className="text-4xl font-bold mt-2">{match.team2.score}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 md:mb-0">
              {match.teams}
            </h2>
            <div className="flex items-center space-x-2">
              {getStatusBadge(match.status)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <CalendarIcon size={18} className="text-gray-400 mr-2" />
              <span className="text-gray-600">{match.date}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon size={18} className="text-gray-400 mr-2" />
              <span className="text-gray-600">{match.time}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon size={18} className="text-gray-400 mr-2" />
              <span className="text-gray-600">{match.location}</span>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <TagIcon size={18} className="text-gray-400 mr-2" />
            <Badge variant="purple">{match.category}</Badge>
          </div>
          {/* Match control buttons for judges and admins */}
          {isJudgeOrAdmin && <div className="flex flex-wrap gap-3 mb-6">
              {match.status === 'scheduled' && <Button onClick={handleStartMatch} variant="default" className="flex items-center">
                  <PlayIcon size={16} className="mr-1" />
                  Iniciar Partida
                </Button>}
              {match.status === 'in_progress' && <Button onClick={handleEndMatch} variant="destructive" className="flex items-center">
                  <PauseIcon size={16} className="mr-1" />
                  Finalizar Partida
                </Button>}
              {match.status !== 'completed' && <Button variant="outline" className="flex items-center" asChild>
                  <Link to={`/dashboard/matches/edit/${id}`}>
                    <PencilIcon size={16} className="mr-1" />
                    Editar Partida
                  </Link>
                </Button>}
            </div>}
          {/* Scoreboard */}
          <Card className="bg-gray-50 mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Placar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="flex-1 text-center">
                  <p className="text-lg font-medium">{match.team1.name}</p>
                  <p className="text-gray-500 text-sm mb-2">
                    {match.team1.robot}
                  </p>
                  <div className="text-4xl font-bold">{match.team1.score}</div>
                </div>
                <div className="my-4 md:my-0 md:mx-8 text-xl font-bold text-gray-400">
                  vs
                </div>
                <div className="flex-1 text-center">
                  <p className="text-lg font-medium">{match.team2.name}</p>
                  <p className="text-gray-500 text-sm mb-2">
                    {match.team2.robot}
                  </p>
                  <div className="text-4xl font-bold">{match.team2.score}</div>
                </div>
              </div>
              {/* Score control for judges - simplified */}
              {isJudgeOrAdmin && match.status === 'in_progress' && <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex space-x-2">
                      <Button variant="secondary" size="icon" className="rounded-full">
                        -
                      </Button>
                      <Button size="icon" className="rounded-full">
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex space-x-2">
                      <Button variant="secondary" size="icon" className="rounded-full">
                        -
                      </Button>
                      <Button size="icon" className="rounded-full">
                        +
                      </Button>
                    </div>
                  </div>
                </div>}
            </CardContent>
          </Card>
          {/* Photos section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Fotos</h3>
              {isAssistantOrHigher && <Button variant="link" onClick={() => setShowPhotoModal(true)} className="flex items-center text-blue-600">
                  <PlusIcon size={16} className="mr-1" />
                  Adicionar Foto
                </Button>}
            </div>
            {match.photos.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {match.photos.map(photo => <div key={photo.id} className="relative group">
                    <img src={photo.url} alt={photo.caption} className="w-full h-32 object-cover rounded-lg" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-xs rounded-b-lg">
                      {photo.caption}
                    </div>
                  </div>)}
              </div> : <Card className="flex flex-col items-center justify-center py-10 text-gray-500">
                <ImageIcon size={32} className="mb-2" />
                <p>Nenhuma foto disponível</p>
              </Card>}
          </div>
          {/* Comments section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Comentários</h3>
            </div>
            {match.comments.length > 0 ? <div className="space-y-4 mb-4">
                {match.comments.map(comment => <Card key={comment.id} className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-800">
                          {comment.user}
                        </span>
                        <span className="text-xs text-gray-500">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </CardContent>
                  </Card>)}
              </div> : <Card className="flex flex-col items-center justify-center py-10 text-gray-500 mb-4">
                <MessageSquareIcon size={32} className="mb-2" />
                <p>Nenhum comentário disponível</p>
              </Card>}
            {/* Comment form for assistants and higher */}
            {isAssistantOrHigher && <div className="mt-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Adicionar comentário
                </label>
                <div className="flex">
                  <Input id="comment" className="flex-1 rounded-r-none" placeholder="Escreva um comentário..." value={newComment} onChange={e => setNewComment(e.target.value)} />
                  <Button onClick={handleAddComment} className="rounded-l-none">
                    Enviar
                  </Button>
                </div>
              </div>}
          </div>
        </CardContent>
      </Card>
      {/* Add Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Partida</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta partida? Esta ação não pode
              ser desfeita.
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
export default MatchDetail;