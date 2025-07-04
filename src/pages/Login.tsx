import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { UserIcon, LockIcon, AlertCircleIcon } from 'lucide-react';
import { useAuth } from '../components/auth/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Get the "from" location from state, or default to dashboard
  const from = (location.state as {
    from?: {
      pathname: string;
    };
  })?.from?.pathname || '/dashboard';
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    try {
      setError('');
      setIsLoading(true);
      await login(email, password);
      navigate(from, {
        replace: true
      });
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  // Helper text to show which email to use for different roles
  const emailHelperText = <div className="text-xs text-gray-500 mt-2">
      <p>Para testar diferentes perfis, use:</p>
      <p>admin@example.com (Administrador)</p>
      <p>judge@example.com (Juiz)</p>
      <p>assistant@example.com (Assistente)</p>
      <p>user@example.com (Usuário)</p>
    </div>;
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-600">BotScore</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Entrar no Sistema
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
                <Input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="pl-10" placeholder="Email" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="pl-10" placeholder="Senha" />
              </div>
            </div>
            {emailHelperText}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Não tem uma conta? Cadastre-se
          </Link>
          <Link to="/forgot-password" className="font-medium text-gray-600 hover:text-gray-500">
            Esqueceu sua senha?
          </Link>
          <Link to="/" className="font-medium text-gray-600 hover:text-gray-500">
            Voltar para a página inicial
          </Link>
        </CardFooter>
      </Card>
    </div>;
};
export default Login;