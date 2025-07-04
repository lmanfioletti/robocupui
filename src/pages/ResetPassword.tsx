import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { LockIcon, AlertCircleIcon } from 'lucide-react';
import { useAuth } from '../components/auth/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    confirmPasswordReset
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
    if (!formData.password || !formData.confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    if (!token) {
      setError('Token inválido');
      return;
    }
    try {
      setIsLoading(true);
      await confirmPasswordReset(token, formData.password);
      navigate('/login', {
        state: {
          message: 'Senha alterada com sucesso! Faça login com sua nova senha.'
        }
      });
    } catch (err) {
      setError('Erro ao redefinir senha. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  if (!token) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Link inválido
            </h2>
            <p className="text-gray-600 mb-6">
              Este link de redefinição de senha é inválido ou expirou.
            </p>
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500">
              Solicitar novo link
            </Link>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-600">BotScore</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Redefinir senha
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
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input id="password" name="password" type="password" autoComplete="new-password" required value={formData.password} onChange={handleChange} className="pl-10" placeholder="Nova senha" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required value={formData.confirmPassword} onChange={handleChange} className="pl-10" placeholder="Confirmar nova senha" />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Alterando senha...' : 'Redefinir senha'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/login" className="font-medium text-gray-600 hover:text-gray-500">
            Voltar para o login
          </Link>
        </CardFooter>
      </Card>
    </div>;
};
export default ResetPassword;