import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import DashboardHeader from '../components/layout/DashboardHeader';
import Overview from '../components/dashboard/Overview';
import Categories from '../components/dashboard/Categories';
import Teams from '../components/dashboard/Teams';
import Matches from '../components/dashboard/Matches';
import Leaderboard from '../components/dashboard/Leaderboard';
import UserManagement from '../components/dashboard/UserManagement';
import NotFound from './NotFound';
import CategoryDetail from '../components/categories/CategoryDetail';
import Arenas from '../components/arenas/ArenasList';
import ArenaView from '../components/arenas/ArenaView';
import Settings from '../components/dashboard/Settings';
const Dashboard: React.FC = () => {
  const {
    currentUser
  } = useAuth();
  return <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:id" element={<CategoryDetail />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/matches/*" element={<Matches />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/arenas" element={<Arenas />} />
              <Route path="/arenas/:id" element={<ArenaView />} />
              {/* Admin only routes */}
              {currentUser?.role === 'admin' && <>
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/settings" element={<Settings />} />
                </>}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>;
};
export default Dashboard;