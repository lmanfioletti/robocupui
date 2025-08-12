import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { HomeIcon, TagIcon, UsersIcon, ClipboardListIcon, TrophyIcon, UserIcon, SettingsIcon, ChevronLeftIcon, ChevronRightIcon, MonitorPlayIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
const Sidebar: React.FC = () => {
  const {
    currentUser
  } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const navLinkClass = ({
    isActive
  }: {
    isActive: boolean;
  }) => {
    return cn('flex items-center py-3 rounded-lg transition', collapsed ? 'justify-center' : 'px-4', isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100');
  };
  return <aside className={cn('bg-white border-r border-gray-200 transition-all duration-300', collapsed ? 'w-16' : 'w-64')}>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto py-4 px-2">
          <nav className="space-y-1">
            <NavLink to="/dashboard" end className={navLinkClass}>
              <HomeIcon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="ml-3">Visão Geral</span>}
            </NavLink>
            <NavLink to="/dashboard/categories" className={navLinkClass}>
              <TagIcon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="ml-3">Categorias</span>}
            </NavLink>
            <NavLink to="/dashboard/teams" className={navLinkClass}>
              <UsersIcon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="ml-3">Equipes</span>}
            </NavLink>
            <NavLink to="/dashboard/matches" className={navLinkClass}>
              <ClipboardListIcon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="ml-3">Partidas</span>}
            </NavLink>
            <NavLink to="/dashboard/arenas" className={navLinkClass}>
              <MonitorPlayIcon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="ml-3">Arenas</span>}
            </NavLink>
            <NavLink to="/dashboard/leaderboard" className={navLinkClass}>
              <TrophyIcon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="ml-3">Classificação</span>}
            </NavLink>
            {/* Admin only */}
            {currentUser?.role === 'admin' && <>
                <NavLink to="/dashboard/users" className={navLinkClass}>
                  <UserIcon size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3">Usuários</span>}
                </NavLink>
                <NavLink to="/dashboard/settings" className={navLinkClass}>
                  <SettingsIcon size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3">Configurações</span>}
                </NavLink>
              </>}
          </nav>
        </div>
        {/* Collapse toggle */}
        <div className="p-2 border-t border-gray-200">
          <Button onClick={() => setCollapsed(!collapsed)} variant="ghost" className="w-full flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100">
            {collapsed ? <ChevronRightIcon size={20} /> : <ChevronLeftIcon size={20} />}
          </Button>
        </div>
      </div>
    </aside>;
};
export default Sidebar;