import React, { useEffect, useState } from 'react';
import { ShieldIcon, InfoIcon, SaveIcon, AlertCircleIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
// Define all available permissions
const availablePermissions = {
  matches: {
    title: 'Partidas',
    permissions: {
      view: 'Visualizar partidas',
      create: 'Criar partidas',
      edit: 'Editar partidas',
      delete: 'Excluir partidas',
      score: 'Gerenciar pontuação',
      comment: 'Adicionar comentários'
    }
  },
  teams: {
    title: 'Equipes',
    permissions: {
      view: 'Visualizar equipes',
      create: 'Criar equipes',
      edit: 'Editar equipes',
      delete: 'Excluir equipes'
    }
  },
  arenas: {
    title: 'Arenas',
    permissions: {
      view: 'Visualizar arenas',
      create: 'Criar arenas',
      edit: 'Editar arenas',
      delete: 'Excluir arenas',
      stream: 'Gerenciar transmissões'
    }
  },
  categories: {
    title: 'Categorias',
    permissions: {
      view: 'Visualizar categorias',
      create: 'Criar categorias',
      edit: 'Editar categorias',
      delete: 'Excluir categorias',
      rules: 'Gerenciar regras'
    }
  },
  photos: {
    title: 'Fotos',
    permissions: {
      view: 'Visualizar fotos',
      upload: 'Enviar fotos',
      delete: 'Excluir fotos'
    }
  }
};
// Default role permissions
const defaultRolePermissions = {
  admin: {
    name: 'Administrador',
    color: 'destructive',
    description: 'Acesso total ao sistema',
    permissions: Object.fromEntries(Object.keys(availablePermissions).map(category => [category, Object.fromEntries(Object.keys(availablePermissions[category].permissions).map(permission => [permission, true]))]))
  },
  judge: {
    name: 'Juiz',
    color: 'orange',
    description: 'Gerencia partidas e pontuações',
    permissions: {
      matches: {
        view: true,
        create: true,
        edit: true,
        delete: false,
        score: true,
        comment: true
      },
      teams: {
        view: true,
        create: false,
        edit: false,
        delete: false
      },
      arenas: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        stream: true
      },
      categories: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        rules: true
      },
      photos: {
        view: true,
        upload: true,
        delete: true
      }
    }
  },
  assistant: {
    name: 'Assistente',
    color: 'success',
    description: 'Auxilia no registro de informações',
    permissions: {
      matches: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        score: false,
        comment: true
      },
      teams: {
        view: true,
        create: false,
        edit: false,
        delete: false
      },
      arenas: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        stream: false
      },
      categories: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        rules: false
      },
      photos: {
        view: true,
        upload: true,
        delete: false
      }
    }
  },
  user: {
    name: 'Usuário',
    color: 'default',
    description: 'Acesso básico de visualização',
    permissions: {
      matches: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        score: false,
        comment: false
      },
      teams: {
        view: true,
        create: false,
        edit: false,
        delete: false
      },
      arenas: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        stream: false
      },
      categories: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        rules: false
      },
      photos: {
        view: true,
        upload: false,
        delete: false
      }
    }
  }
};
const Settings: React.FC = () => {
  const [rolePermissions, setRolePermissions] = useState(defaultRolePermissions);
  const [saveStatus, setSaveStatus] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: ''
  });
  // Load saved permissions from localStorage on mount
  useEffect(() => {
    const savedPermissions = localStorage.getItem('rolePermissions');
    if (savedPermissions) {
      setRolePermissions(JSON.parse(savedPermissions));
    }
  }, []);
  const handlePermissionChange = (role: string, category: string, permission: string, checked: boolean) => {
    // Don't allow changes to admin permissions
    if (role === 'admin') return;
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        permissions: {
          ...prev[role].permissions,
          [category]: {
            ...prev[role].permissions[category],
            [permission]: checked
          }
        }
      }
    }));
  };
  const handleSave = () => {
    try {
      localStorage.setItem('rolePermissions', JSON.stringify(rolePermissions));
      setSaveStatus({
        show: true,
        type: 'success',
        message: 'Configurações salvas com sucesso!'
      });
    } catch (error) {
      setSaveStatus({
        show: true,
        type: 'error',
        message: 'Erro ao salvar as configurações.'
      });
    }
    // Hide the status message after 3 seconds
    setTimeout(() => {
      setSaveStatus(prev => ({
        ...prev,
        show: false
      }));
    }, 3000);
  };
  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja restaurar as configurações padrão? Esta ação não pode ser desfeita.')) {
      setRolePermissions(defaultRolePermissions);
      localStorage.removeItem('rolePermissions');
      setSaveStatus({
        show: true,
        type: 'success',
        message: 'Configurações restauradas com sucesso!'
      });
    }
  };
  return <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
          <p className="text-gray-500 mt-1">
            Gerencie as permissões de cada perfil do sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Restaurar Padrão
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <SaveIcon size={16} />
            Salvar Alterações
          </Button>
        </div>
      </div>
      {/* Save Status Message */}
      {saveStatus.show && <div className={`mb-6 p-4 rounded-lg flex items-center ${saveStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {saveStatus.type === 'success' ? <InfoIcon className="h-5 w-5 mr-2" /> : <AlertCircleIcon className="h-5 w-5 mr-2" />}
          {saveStatus.message}
        </div>}
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(rolePermissions).map(([role, {
        name,
        color,
        description,
        permissions
      }]) => <Card key={role}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <ShieldIcon className={`h-5 w-5 ${role === 'admin' ? 'text-red-500' : 'text-gray-400'}`} />
                  {name}
                  <Badge variant={color as any} className="ml-2">
                    {role}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-gray-500">{description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(availablePermissions).map(([category, {
              title,
              permissions: categoryPermissions
            }]) => <div key={category} className="space-y-2">
                        <h3 className="font-semibold text-gray-700">{title}</h3>
                        <div className="space-y-1">
                          {Object.entries(categoryPermissions).map(([permission, label]) => <label key={permission} className="flex items-center space-x-2">
                                <input type="checkbox" checked={permissions[category]?.[permission] || false} onChange={e => handlePermissionChange(role, category, permission, e.target.checked)} disabled={role === 'admin'} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm text-gray-600">
                                  {label}
                                </span>
                              </label>)}
                        </div>
                      </div>)}
                </div>
              </CardContent>
            </Card>)}
      </div>
    </div>;
};
export default Settings;