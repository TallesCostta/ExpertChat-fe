import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../types/auth';
import { ApiError } from '../../utils/errors';

const AUTH_API_URL = 'https://low-demetra-donatti-21733ba9.koyeb.app/expertchat';

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data: LoginResponse = await response.json();

    if (!response.ok) {
      throw new ApiError(data.message, response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Erro ao conectar ao servidor de autenticação');
  }
}

export async function register(userData: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${AUTH_API_URL}/usuario/cadastro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data: RegisterResponse = await response.json();

    if (!response.ok) {
      throw new ApiError(data.message, response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Erro ao realizar cadastro');
  }
}