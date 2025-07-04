import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, LockIcon, MailIcon, AlertCircleIcon } from 'lucide-react';
import { useAuth } from '../components/auth/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    register
  } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    try {
      setIsLoading(true);
      await register(formData.name, formData.email, formData.password);
      navigate('/verify-email');
    } catch (err) {
      setError('Erro ao criar conta. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-600">BotScore</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Criar uma conta
          </h2>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center">
                <AlertCircleIcon className="text-red-500 mr-3" size={20} />
                <p className="text-red-700">{error}</p>
              </div>}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input id="name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={handleChange} className="pl-10" placeholder="Nome completo" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="pl-10" placeholder="Email" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input id="password" name="password" type="password" autoComplete="new-password" required value={formData.password} onChange={handleChange} className="pl-10" placeholder="Senha" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required value={formData.confirmPassword} onChange={handleChange} className="pl-10" placeholder="Confirmar senha" />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Já tem uma conta? Faça login
          </Link>
          <Link to="/" className="font-medium text-gray-600 hover:text-gray-500">
            Voltar para a página inicial
          </Link>
        </CardFooter>
      </Card>
    </div>;
};
export default Register;