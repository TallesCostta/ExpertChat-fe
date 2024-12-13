import { API_CONFIG } from './config';
import { ApiError } from '../../utils/errors';

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export async function apiClient(
  endpoint: string,
  options: RequestOptions = {}
): Promise<Response> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiError(
        'Falha na comunicação com o servidor',
        response.status
      );
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('A requisição excedeu o tempo limite');
      }
      throw new ApiError(error.message);
    }
    
    throw new ApiError('Erro ao conectar ao servidor');
  }
}