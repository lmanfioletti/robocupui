import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, UsersIcon, ClipboardListIcon, TrophyIcon, InfoIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
// Mock data for category details
const categoryData = {
  id: 1,
  name: 'Sumô',
  description: 'Dois robôs competem para empurrar o adversário para fora da arena.',
  criteria: 'Pontuação baseada em vitórias e tempo de empurrão.',
  teams: [{
    id: 1,
    name: 'TechBots',
    members: 'João Silva, Maria Oliveira, Pedro Santos',
    robot: 'TechBot 3000',
    wins: 4,
    matches: 5
  }, {
    id: 5,
    name: 'CircuitBreakers',
    members: 'Rafael Mendes, Beatriz Gomes',
    robot: 'Voltage',
    wins: 2,
    matches: 4
  }],
  recentMatches: [{
    id: 1,
    teams: 'TechBots vs CircuitBreakers',
    date: '2023-10-15',
    time: '14:30',
    result: '2 - 1',
    winner: 'TechBots'
  }, {
    id: 2,
    teams: 'CircuitBreakers vs TechBots',
    date: '2023-10-14',
    time: '15:00',
    result: '3 - 2',
    winner: 'CircuitBreakers'
  }],
  rules: ['Robôs devem ter no máximo 20kg', 'Arena circular com 2m de diâmetro', 'Partidas com duração máxima de 3 minutos', 'Vitória por empurrão para fora da arena ou imobilização']
};
const CategoryDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  return <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-4 text-gray-500">
          <ArrowLeftIcon size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {categoryData.name}
          </h1>
          <p className="text-gray-500 mt-1">Detalhes da Categoria</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Descrição
                  </h3>
                  <p className="mt-1 text-gray-900">
                    {categoryData.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Critérios de Pontuação
                  </h3>
                  <p className="mt-1 text-gray-900">{categoryData.criteria}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Regras Principais
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {categoryData.rules.map((rule, index) => <li key={index} className="flex items-start text-gray-900">
                        <span className="flex-shrink-0 w-6">•</span>
                        <span>{rule}</span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Teams */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UsersIcon className="w-5 h-5 mr-2" />
                Equipes Participantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {categoryData.teams.map(team => <div key={team.id} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">{team.name}</h3>
                      <Badge variant="secondary">
                        {team.wins}/{team.matches} vitórias
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Membros: {team.members}
                    </p>
                    <p className="text-sm text-gray-500">Robô: {team.robot}</p>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Matches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardListIcon className="w-5 h-5 mr-2" />
                Partidas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.recentMatches.map(match => <div key={match.id} className="p-3 rounded-lg bg-gray-50">
                    <p className="font-medium text-gray-900">{match.teams}</p>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {match.date} às {match.time}
                      </span>
                      <span className="text-gray-900 font-medium">
                        {match.result}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-green-600">
                      Vencedor: {match.winner}
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrophyIcon className="w-5 h-5 mr-2" />
                Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total de Equipes</span>
                  <span className="font-medium">
                    {categoryData.teams.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Partidas Realizadas</span>
                  <span className="font-medium">
                    {categoryData.recentMatches.length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default CategoryDetail;