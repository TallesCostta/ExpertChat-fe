import { useRef } from 'react';
import { Toast } from 'primereact/toast';

export function useToast() {
  const toast = useRef<Toast>(null);

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Sucesso',
      detail: message,
      life: 3000
    });
  };

  const showError = (message: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Erro',
      detail: message,
      life: 3000
    });
  };

  const showInfo = (message: string) => {
    toast.current?.show({
      severity: 'info',
      summary: 'Informação',
      detail: message,
      life: 3000
    });
  };

  const showWarn = (message: string) => {
    toast.current?.show({
      severity: 'warn',
      summary: 'Atenção',
      detail: message,
      life: 3000
    });
  };

  return {
    toast,
    showSuccess,
    showError,
    showInfo,
    showWarn
  };
}