import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, AlertCircleIcon, ArrowLeftIcon } from 'lucide-react';
import { useAuth } from '../components/auth/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const {
    resetPassword
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, insira seu email');
      return;
    }
    try {
      setIsLoading(true);
      await resetPassword(email);
      setIsEmailSent(true);
    } catch (err) {
      setError('Erro ao enviar email de recuperação. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-600">BotScore</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Recuperar senha
          </h2>
          {!isEmailSent && <p className="mt-2 text-sm text-gray-600">
              Digite seu email para receber as instruções de recuperação de
              senha
            </p>}
        </CardHeader>
        <CardContent>
          {!isEmailSent ? <form className="space-y-6" onSubmit={handleSubmit}>
              {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center">
                  <AlertCircleIcon className="text-red-500 mr-3" size={20} />
                  <p className="text-red-700">{error}</p>
                </div>}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="pl-10" placeholder="Email" />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Enviando...' : 'Enviar instruções'}
              </Button>
            </form> : <div className="text-center">
              <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <MailIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Email enviado!
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Enviamos as instruções de recuperação de senha para {email}
              </p>
              <Link to="/login" className="inline-flex items-center text-blue-600 hover:text-blue-500">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Voltar para o login
              </Link>
            </div>}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/login" className="font-medium text-gray-600 hover:text-gray-500">
            Lembrou sua senha? Faça login
          </Link>
        </CardFooter>
      </Card>
    </div>;
};
export default ForgotPassword;