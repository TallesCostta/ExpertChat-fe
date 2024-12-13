import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api/auth';
import { useAuthStore } from '../store/useAuthStore';
import { formatDate } from '../utils/date';
import { getErrorMessage } from '../utils/errors';
import { useToast } from './useToast';

interface FormData {
  name: string;
  email: string;
  login: string;
  password: string;
  confirmPassword: string;
  phone: string;
  birthDate: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  login: '',
  password: '',
  confirmPassword: '',
  phone: '',
  birthDate: '',
};

export function useAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { showSuccess, showError } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await login({
          login: formData.login,
          senha: formData.password,
        });

        if (response.data) {
          const tokenExpiration = new Date();
          tokenExpiration.setSeconds(
            tokenExpiration.getSeconds() + response.data.expiresIn
          );

          setUser({
            login: formData.login,
            accessToken: response.data.accessToken,
            expiresIn: response.data.expiresIn,
            tokenExpiration,
          });

          showSuccess(response.message);
          navigate('/dashboard');
        }
      } else {
        const response = await register({
          usuDscNome: formData.name,
          usuDscEmail: formData.email,
          usuDscLogin: formData.login,
          usuDscSenha: formData.password,
          usuDscTelefone: formData.phone,
          usuDatNascimento: formatDate(formData.birthDate),
        });

        if (response.data) {
          showSuccess(response.message);
          
          // Auto login after successful registration
          const loginResponse = await login({
            login: formData.login,
            senha: formData.password,
          });

          if (loginResponse.data) {
            const tokenExpiration = new Date();
            tokenExpiration.setSeconds(
              tokenExpiration.getSeconds() + loginResponse.data.expiresIn
            );

            setUser({
              login: formData.login,
              accessToken: loginResponse.data.accessToken,
              expiresIn: loginResponse.data.expiresIn,
              tokenExpiration,
            });

            navigate('/dashboard');
          }
        }
      }
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setFormData(initialFormData);
  };

  return {
    isLogin,
    isLoading,
    error,
    formData,
    handleInputChange,
    handleSubmit,
    toggleAuthMode,
  };
}