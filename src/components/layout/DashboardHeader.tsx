import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { LogOutIcon, BellIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
const DashboardHeader: React.FC = () => {
  const {
    currentUser,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'judge':
        return 'bg-orange-100 text-orange-800';
      case 'assistant':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  const getRoleVariant = (role: string): 'default' | 'destructive' | 'outline' | 'secondary' | 'success' | 'warning' | 'purple' | 'orange' => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'judge':
        return 'orange';
      case 'assistant':
        return 'success';
      default:
        return 'default';
    }
  };
  const translateRole = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'judge':
        return 'Juiz';
      case 'assistant':
        return 'Assistente';
      default:
        return 'Usuário';
    }
  };
  return <header className="bg-white border-b border-gray-200 py-3 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 relative">
            <BellIcon size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <p className="text-sm font-medium text-gray-700">
                {currentUser?.name}
              </p>
              <div className="flex items-center">
                <Badge variant={getRoleVariant(currentUser?.role || '')}>
                  {translateRole(currentUser?.role || '')}
                </Badge>
              </div>
            </div>
            <Button onClick={handleLogout} variant="secondary" size="icon" className="rounded-full">
              <LogOutIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>;
};
export default DashboardHeader;