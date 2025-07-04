import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { useAuth } from '../components/auth/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
const VerifyEmail: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    verifyEmail,
    resendVerificationCode
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      setError('Por favor, insira o código de verificação');
      return;
    }
    try {
      setIsLoading(true);
      await verifyEmail(code);
      navigate('/dashboard');
    } catch (err) {
      setError('Código inválido. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendCode = async () => {
    try {
      await resendVerificationCode();
      alert('Novo código enviado para seu email');
    } catch (err) {
      setError('Erro ao reenviar código. Por favor, tente novamente.');
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircleIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Verifique seu email
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enviamos um código de verificação para seu email. Por favor, insira
            o código abaixo para confirmar sua conta.
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center">
                <AlertCircleIcon className="text-red-500 mr-3" size={20} />
                <p className="text-red-700">{error}</p>
              </div>}
            <div>
              <Input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Digite o código de verificação" className="text-center text-lg tracking-wider" maxLength={6} />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Verificando...' : 'Verificar código'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <button onClick={handleResendCode} className="text-sm text-blue-600 hover:text-blue-500">
            Não recebeu o código? Clique para reenviar
          </button>
        </CardFooter>
      </Card>
    </div>;
};
export default VerifyEmail;