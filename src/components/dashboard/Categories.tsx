import React, { useState } from 'react';
import { PlusIcon, TagIcon, PencilIcon, TrashIcon, InfoIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { DeleteConfirmationDialog } from '../ui/delete-confirmation-dialog';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../ui/table';
import { Card, CardContent } from '../ui/card';
import { Link } from 'react-router-dom';
// Mock category data
const initialCategories = [{
  id: 1,
  name: 'Sumô',
  description: 'Dois robôs competem para empurrar o adversário para fora da arena.',
  criteria: 'Pontuação baseada em vitórias e tempo de empurrão.'
}, {
  id: 2,
  name: 'Seguidor de Linha',
  description: 'Robôs autônomos que seguem uma linha no menor tempo possível.',
  criteria: 'Pontuação baseada no tempo de conclusão do percurso.'
}, {
  id: 3,
  name: 'Robô de Combate',
  description: 'Robôs controlados remotamente que competem em batalhas.',
  criteria: 'Pontuação baseada em danos causados e estratégia.'
}, {
  id: 4,
  name: 'Resgate',
  description: 'Robôs que devem resgatar objetos em um campo de obstáculos.',
  criteria: 'Pontuação baseada em objetos resgatados e tempo.'
}];
const Categories: React.FC = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    criteria: ''
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null
  });
  const handleOpenModal = (category = null) => {
    if (category) {
      setCurrentCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        criteria: category.criteria
      });
    } else {
      setCurrentCategory(null);
      setFormData({
        name: '',
        description: '',
        criteria: ''
      });
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSaveCategory = () => {
    if (currentCategory) {
      // Edit existing category
      setCategories(categories.map(cat => cat.id === currentCategory.id ? {
        ...formData,
        id: cat.id
      } : cat));
    } else {
      // Add new category
      const newId = Math.max(...categories.map(c => c.id), 0) + 1;
      setCategories([...categories, {
        ...formData,
        id: newId
      }]);
    }
    handleCloseModal();
  };
  const handleDeleteCategory = (id: number) => {
    setDeleteConfirmation({
      open: true,
      id
    });
  };
  const confirmDelete = () => {
    if (deleteConfirmation.id) {
      setCategories(categories.filter(cat => cat.id !== deleteConfirmation.id));
    }
    setDeleteConfirmation({
      open: false,
      id: null
    });
  };
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
        <Button onClick={() => handleOpenModal()} className="flex items-center">
          <PlusIcon size={16} className="mr-1" />
          Nova Categoria
        </Button>
      </div>
      {categories.length > 0 ? <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Critérios de Pontuação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(category => <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <TagIcon size={18} />
                      </div>
                      <div className="ml-4">
                        <Link to={`/dashboard/categories/${category.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                          {category.name}
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {category.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {category.criteria}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenModal(category)} className="text-blue-600 hover:text-blue-900 mr-2">
                      <PencilIcon size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)} className="text-red-600 hover:text-red-900">
                      <TrashIcon size={16} />
                    </Button>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </Card> : <Card className="p-8 flex flex-col items-center justify-center text-gray-500">
          <InfoIcon size={48} className="mb-4" />
          <p className="text-xl font-medium mb-2">
            Nenhuma categoria encontrada
          </p>
          <p className="mb-6">
            Clique no botão acima para adicionar uma nova categoria.
          </p>
        </Card>}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogHeader>
          <DialogTitle>
            {currentCategory ? 'Editar Categoria' : 'Nova Categoria'}
          </DialogTitle>
          <DialogDescription>
            {currentCategory ? 'Atualize as informações da categoria existente.' : 'Preencha as informações para criar uma nova categoria.'}
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da Categoria
              </label>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <Textarea name="description" rows={3} value={formData.description} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Critérios de Pontuação
              </label>
              <Textarea name="criteria" rows={3} value={formData.criteria} onChange={handleChange} />
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button onClick={handleSaveCategory}>Salvar</Button>
        </DialogFooter>
      </Dialog>
      <DeleteConfirmationDialog open={deleteConfirmation.open} onClose={() => setDeleteConfirmation({
      open: false,
      id: null
    })} onConfirm={confirmDelete} title="Excluir categoria" description="Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita." />
    </div>;
};
export default Categories;